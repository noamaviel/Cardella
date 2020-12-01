<template>
    <!-- When the card is removed, the card-edit vue tries to be rendered even though the card
    is already deleted. In order to prevent errors, we check that the card is not undefined. -->
    <section class="card-edit-container flex" v-if="card">
        <div class="main-area">
           
            <h3
                contenteditable="true"
                @keypress.enter.prevent="updateCardTitle"
                @blur="updateCardTitle"
            >
                <i class="far fa-credit-card"></i> {{ card.title }}
            </h3>
            <h4>in list {{ list.title }}</h4>

            <!-- <card-labels-cmp/> -->
            <card-preview-labels
                v-if="card.labels"
                :labels="card.labels"
                @updateCard="updateCard"
            />

            <div class="main-area-top flex">
                <template v-if="card.dueDate" class="due-date-container flex">
                    <h4>Due date</h4>
                    <h4>{{ dueDateToShow }}</h4>
                </template>

                <template
                    v-if="card.members.length > 0"
                    class="members-container flex"
                >
                    <h4>Members</h4>
                    <members-cmp :members="card.members" />
                </template>
            </div>

            <!-- <template v-if="card.labels">
            <h4>Labels</h4>
            <labels-cmp>{{card.labels}}</labels-cmp>
            </template> -->

            <h3><i class="fas fa-stream"></i> Description</h3>
            <textarea
                type="textarea"
                v-model="card.description"
                placeholder="Add a more detailed description..."
                class="textarea-input"
                rows="5"
                max-rows="6"
                @blur="updateCardDescription"
            />
            <template v-if="card.uploadImgUrl">
                <h3><i class="fas fa-paperclip"></i>Image</h3>
                <img v-if="!isLoading" :src="card.uploadImgUrl" />
                <img
                    v-else
                    src="https://i.pinimg.com/originals/78/e8/26/78e826ca1b9351214dfdd5e47f7e2024.gif"
                />
                <i class="far fa-trash-alt" @click="removeImg"></i>
            </template>

            <checklists-cmp
                v-if="card.checklists"
                :checklists="card.checklists"
                @updateCard="updateCard"
            />

            <!-- <h3>Activity</h3> -->
            <!-- consider change to "Comments" as these are not activities -->
            <!-- <input type="text" placeholder="Write a comment... v-model="comment""/> -->
            <!-- <ul>
            <li v-for="comment in comments" :key="comment.id">{{ comment }}</li>
        </ul> -->
        </div>

        <div class="edit-card-menu-area flex">
             <router-link to="../../.."><i class="far fa-times-circle"></i></router-link>
            <button class="main-btn-card-edit" @click="onAddMembers">Members</button>
            <add-card-members
                v-if="isAddMembers"
                :currCardMembers="card.members"
                :boardMembers="board.members"
                @setCardMembers="setCardMembers"
            />
            <button class="main-btn-card-edit" @click="onLabelsEdit">Labels</button>
            <labels-editor
                v-if="isLabelsEdit"
                :labels="card.labels"
                @updateCard="updateCard"
            />
            <button class="main-btn-card-edit" @click="onAddChecklist">Checklist</button>
            <add-checklist
                v-if="isAddChecklist"
                :checklists="card.checklists"
                :isAddChecklist="this.isAddChecklist"
                @newChecklist="onNewChecklist"
            />
            <button class="main-btn-card-edit" @click="onOpenDatePicker">Due Date</button>
            <card-due-date
                v-if="isDisplayDatePicker"
                :currTimestemp="card.dueDate"
                @setDueDate="setDueDate"
            />

            <button class="main-btn-card-edit">
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

            <button class="main-btn-card-edit" @click="onOpenColorPallette">Card Color</button>
            <card-color v-if="isDisplayColorPallette" @setColor="changeColor" />

            <router-link class="main-btn-card-edit" to="../../..">
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
import addChecklist from "@/cmps/card/add-checklist.cmp.vue";
import addCardMembers from "@/cmps/card/card-add-members.cmp.vue";
import cardPreviewLabels from "@/cmps/card/card-preview-labels.cmp.vue";
import labelsEditor from "@/cmps/card/labels-editor.cmp.vue";
import moment from "moment";
// import cardLabelsCmp from '@/cmps/card/card-labels.cmp.vue';

export default {
    props: {},
    data() {
        return {
            listId: "",
            cardId: "",
            isDisplayColorPallette: false,
            isDisplayUploadImg: false,
            isDisplayDatePicker: false,
            isAddChecklist: false,
            isAddMembers: false,
            isLabelsEdit: false,
        };
    },
    computed: {
        board() {
            return this.$store.getters.getCurrBoard;
        },
        list() {
            if (this.board.lists) {
                const listIdx = this.board.lists.findIndex(
                    (list) => list.id === this.listId
                );
                return this.board.lists[listIdx];
            }
            return "";
        },
        card() {
            if (this.list.cards) {
                const cardIdx = this.list.cards.findIndex(
                    (card) => card.id === this.cardId
                );
                return this.list.cards[cardIdx];
            }
            return "";
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
        onAddChecklist() {
            this.isAddChecklist = !this.isAddChecklist;
            // this.isAddChecklist = true;
        },
        onAddMembers() {
            this.isAddMembers = !this.isAddMembers;
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
            this.updateCard();
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
            console.log('updateCard in card-edit');
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
            this.card.dueDate = dueDate;
            this.updateCard();
        },
        setCardMembers(members) {
            this.card.members = members;
            this.updateCard();
        },
        onLabelsEdit() {
            this.isLabelsEdit = !this.isLabelsEdit;
        },
    },
    created() {
        const listId = this.$route.params.listId;
        const cardId = this.$route.params.cardId;
        this.cardId = cardId;
        this.listId = listId;
    },
    components: {
        cardColor,
        checklistsCmp,
        cardDueDate,
        membersCmp,
        addChecklist,
        addCardMembers,
        cardPreviewLabels,
        labelsEditor,
        // cardLabelsCmp
    },
};
</script>
      