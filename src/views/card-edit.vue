<template>
    <!-- When the card is removed, the card-edit vue tries to be rendered even though the card
    is already deleted. In order to prevent errors, we check that the card is not undefined. -->
    <section class="card-edit" v-if="card">
        <div class="main-area" style="flex-grow: 1">
            <router-link to="../../..">X</router-link>
            <!-- <div class="addChecklistModal">
                <form>
                    <input type="text" />
                    <button>Add Checklist</button>
                </form>
            </div> -->
            <h2
                contenteditable="true"
                @keypress.enter.prevent="updateCardTitle"
                @blur="updateCardTitle"
            >
                {{ card.title }}
            </h2>
            <h4>in list {{ list.title }}</h4>

            <h3>Members</h3>
            <members-cmp :members="membersToCard" />

            <template v-if="card.labels">
                <h3>Labels</h3>
                <!-- <labels-cmp>{{card.labels}}</labels-cmp> -->
            </template>

            <template v-if="card.dueDate">
                <h3>Due date</h3>
                <h3>{{ dueDateToShow }}</h3>
            </template>

            <template v-if="card.checklists">
                <h3>Checklist</h3>
                <checklists-cmp
                    v-if="card.checklists"
                    :checklists="card.checklists"
                />
            </template>

            <template v-if="card.uploadImgUrl">
                <h3>Image</h3>
                <img v-if="!isLoading" :src="card.uploadImgUrl" />
                <img
                    v-else
                    src="https://i.pinimg.com/originals/78/e8/26/78e826ca1b9351214dfdd5e47f7e2024.gif"
                />
                <i class="far fa-trash-alt" @click="removeImg"></i>
            </template>

            <h3>Description</h3>
            <textarea
                type="textarea"
                v-model="card.description"
                placeholder="Add a more detailed description..."
                rows="5"
                max-rows="6"
                @blur="updateCardDescription"
            />
            <!-- <h3>Activity</h3> -->
            <!-- consider change to "Comments" as these are not activities -->
            <!-- <input type="text" placeholder="Write a comment... v-model="comment""/> -->
            <!-- <ul>
            <li v-for="comment in comments" :key="comment.id">{{ comment }}</li>
        </ul> -->
        </div>

        <div class="menu-area" style="display: flex; flex-direction: column">
            <button>Members</button>
            <button>Labels</button>
            <button>Checklist</button>
            <button @click="onOpenDatePicker">Due Date</button>
            <card-due-date
                v-if="isDisplayDatePicker"
                :currTimestemp="card.dueDate"
                @setDueDate="setDueDate"
            />

            <button>
                <label for="imgUploader" @click.prevent="onOpenUploadImgField"
                    >Upload Image</label
                >
            </button>
            <input
                type="file"
                name="img-uploader"
                id="imgUploader"
                v-if="isDisplayUploadImg"
                @change="onUploadImg"
            />

            <button @click="onOpenColorPallette">Card Color</button>
            <card-color v-if="isDisplayColorPallette" @setColor="changeColor" />

            <router-link to="../../..">
                <button @click="removeCard">Delete card</button>
            </router-link>

            <!-- <button>
                <router-link to="../../..">Cancel</router-link>
            </button> -->
        </div>
    </section>
</template>

<script>
import cardColor from "@/cmps/card/card-color.cmp";
import checklistsCmp from "@/cmps/card/checklists.cmp.vue";
import { uploadImg } from "@/services/upload-img-service.js";
import cardDueDate from "@/cmps/card/card-duedate.cmp.vue";
import membersCmp from "@/cmps/members.cmp.vue";
import moment from "moment";

export default {
    props: {},
    data() {
        return {
            isDisplayColorPallette: false,
            isDisplayUploadImg: false,
            isDisplayDatePicker: false,
        };
    },
    computed: {
        board() {
            return this.$store.getters.getCurrBoard;
        },
        list() {
            const listId = this.$route.params.listId;
            const listIdx = this.board.lists.findIndex(
                (list) => list.id === listId
            );
            return this.board.lists[listIdx];
        },
        card() {
            const cardId = this.$route.params.cardId;
            const cardIdx = this.list.cards.findIndex(
                (card) => card.id === cardId
            );
            return this.list.cards[cardIdx];
        },
        dueDateToShow() {
            return moment(this.card.dueDate).calendar({
                lastDay: "[Yesterday at] HH:mm",
                sameDay: "[Today at] HH:mm",
                nextDay: "[Tomorrow at] HH:mm",
                lastWeek: "[Last] dddd [at] HH:mm",
                nextWeek: "dddd [at] HH:mm",
                sameElse: "DD/MM/YYYY [at] HH:mm",
            });
        },
        isLoading() {
            return this.$store.getters.isLoading;
        },
        membersToCard() {
            const members = this.card.members && this.card.createdBy.imgUrl;
            return members;
        },
    },
    methods: {
        changeColor(color) {
            this.isDisplayColorPallette = false;
            this.card.style.bgColor = color;
            this.updateCard();
        },
        onOpenColorPallette() {
            this.isDisplayColorPallette = !this.isDisplayColorPallette;
        },
        onOpenUploadImgField() {
            this.isDisplayUploadImg = !this.isDisplayUploadImg;
        },
        onOpenDatePicker() {
            this.isDisplayDatePicker = !this.isDisplayDatePicker;
        },
        updateCardTitle(ev) {
            if (this.card.title === ev.target.innerText) return;
            if (!ev.target.innerText) {
                ev.target.innerText = this.card.title;
                return;
            }
            this.card.title = ev.target.innerText;
            ev.target.blur();
            this.updateCard();
        },
        updateCardDescription() {
            this.updateCard();
        },
        updateCard() {
            this.$store.dispatch({
                type: "updateCard",
                card: this.card,
                list: this.list,
            });
        },
        async onUploadImg(ev) {
            const res = await uploadImg(ev);
            this.card.uploadImgUrl = res.secure_url;
            this.isDisplayUploadImg = false;
            this.updateCard();
        },
        removeCard() {
            this.$store.dispatch({
                type: "removeCard",
                cardId: this.card.id,
                listId: this.list.id,
            });
        },
        removeImg() {
            this.card.uploadImgUrl = "";
            this.$store.dispatch({
                type: "updateCard",
                card: this.card,
                list: this.list,
            });
        },
        setDueDate(dueDate) {
            console.log("dueDate:", dueDate);
            this.card.dueDate = dueDate;
            this.updateCard();
        },
    },
    components: {
        cardColor,
        checklistsCmp,
        cardDueDate,
        membersCmp,
    },
};
</script>