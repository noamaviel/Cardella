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

            <template v-if="card.members">
                <h3>Members</h3>
                <board-members :members="card.members" />
            </template>

            <template v-if="card.labels">
                <h3>Labels</h3>
                <!-- <labels-cmp>{{card.labels}}</labels-cmp> -->
            </template>

            <template v-if="card.dueDate">
                <h3>Due date</h3>
                <h2>{{ dueDateToShow }}</h2>
            </template>

            <!-- <template v-if="card.checklists"> -->
            <!-- <h3>Checklist</h3> -->
            <checklists-cmp
                v-if="card.checklists"
                :checklists="card.checklists"
                :board="this.board"
            />
            <!-- </template> -->

            <template v-if="card.uploadImgUrl">
                <h3>Image</h3>
                <img :src="card.uploadImgUrl" />
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
            <h3>Activity</h3>
            <!-- consider change to "Comments" as these are not activities -->
            <!-- <input type="text" placeholder="Write a comment... v-model="comment""/> -->
            <!-- <ul>
            <li v-for="comment in comments" :key="comment.id">{{ comment }}</li>
        </ul> -->
        </div>

        <div class="menu-area" style="display: flex; flex-direction: column">
            <button>Members</button>
            <button>Labels</button>
            <button @click="onAddChecklist">Checklist</button>
            <add-checklist
                v-if="isAddChecklist"
                :checklists="card.checklists"
                :isAddChecklist="this.isAddChecklist"
                @newChecklist="onNewChecklist"
            />
            <button>Due Date</button>
            <card-due-date
                :currDueDate="new Date(card.dueDate)"
                @setDueDate="setDueDate"
            />

            <button>
                <label for="imgUploader">Upload Image</label>
            </button>
            <input
                type="file"
                name="img-uploader"
                id="imgUploader"
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
import boardMembers from "@/cmps/board/board-members.cmp.vue";
import addChecklist from "@/cmps/card/add-checklist.cmp.vue";
import moment from "moment";

export default {
    props: {},
    data() {
        return {
            isDisplayColorPallette: false,
            isAddChecklist: false,
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
            console.log("card() in cardEdit", this.list.cards[cardIdx]);
            return this.list.cards[cardIdx];
        },
        dueDateToShow() {
            return moment(this.card.dueDate).fromNow();
        },
    },
    methods: {
        changeColor(color) {
            console.log("color:", color);
            this.isDisplayColorPallette = false;
            this.card.style.bgColor = color;
            this.updateCard();
        },
        onOpenColorPallette() {
            console.log("color button clicked");
            this.isDisplayColorPallette = !this.isDisplayColorPallette;
        },
        onAddChecklist() {
            this.isAddChecklist = true;
        },
        onNewChecklist(newChecklist) {
            if (this.card.checklists) {
                this.card.checklists.splice(
                    this.card.checklists.length,
                    0,
                    newChecklist
                );
            } else {
                this.card.checklists = [newChecklist];
            }

            this.isAddChecklist = false;
            let updtBoard = JSON.parse(JSON.stringify(this.board));
            this.$store.dispatch({ type: "updateBoardV2", board: updtBoard });
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
            this.updateCard();
        },
        removeCard() {
            this.$store.dispatch({
                type: "removeCard",
                cardId: this.card.id,
                listId: this.list.id,
            });
        },
        setDueDate(dueDate) {
            console.log("dueDate:", dueDate);
            this.card.dueDate = dueDate.getTime();
            this.updateCard();
        },
    },
    components: {
        cardColor,
        checklistsCmp,
        cardDueDate,
        boardMembers,
        addChecklist,
    },
};
</script>