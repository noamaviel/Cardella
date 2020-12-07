<template>
    <!-- When the card is removed, the card-edit vue tries to be rendered even though the card
    is already deleted. In order to prevent errors, we check that the card is not undefined. -->

    <section class="card-edit-container flex" v-if="card">
        <div class="main-area">
            <section class="edit-card-title flex">
                <i class="el-icon-postcard"></i>
                <h3
                    class="contenteditable-title flex"
                    contenteditable="true"
                    @keypress.enter.prevent="updateCardTitle"
                    @blur="updateCardTitle"
                >
                    {{ card.title }}
                </h3>
            </section>

            <div class="edit-card-in-list flex">
                <h5>in list:</h5>
                <h5>{{ list.title }}</h5>
            </div>

            <!-- <card-labels-cmp/> -->
            <card-preview-labels
                class="card-preview-labels"
                v-if="card.labels"
                :labels="card.labels"
                @updateCard="updateCard"
            />

            <div class="members-dueDate-container flex">
                <div v-if="card.dueDate" class="due-date-container flex f-col">
                    <h5><b>Due date:</b></h5>
                    <h5>{{ dueDateToShow }}</h5>
                </div>
                <div
                    v-if="card.members.length > 0"
                    class="members-container flex f-col"
                >
                    <h5><b>Members</b></h5>
                    <members-cmp :members="card.members" />
                </div>
            </div>

            <div class="edit-card-desc">
                <h3 class="edit-card-title">
                    <i class="el-icon-document"></i> Description
                </h3>
                <textarea
                    type="textarea"
                    v-model="card.description"
                    placeholder="Add a more detailed description..."
                    class="textarea-input"
                    rows="5"
                    max-rows="6"
                    @blur="updateCardDescription"
                />
            </div>

            <div class="edit-card-img" v-if="card.uploadImgUrl">
                <h3 class="edit-card-title">
                    <i class="el-icon-paperclip"></i>Image
                </h3>

                <section class="img-delete-container flex f-row">
                    <img
                        class="uploaded-img"
                        v-if="!isLoading"
                        :src="card.uploadImgUrl"
                    />
                    <img
                        class="loading-img"
                        v-else
                        src="https://i.pinimg.com/originals/78/e8/26/78e826ca1b9351214dfdd5e47f7e2024.gif"
                    />
                    <h5 @click="removeImg">
                        <i class="el-icon-delete"></i>
                    </h5>
                </section>
            </div>

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

        <div class="edit-card-buttons-area flex">
            <router-link class="close-edit-card flex" to="../../.."
                ><i class="fas fa-times"></i
            ></router-link>

            <div class="edit-card-buttons-container flex f-col">
                <button
                    class="main-btn-card-edit flex clr-btn"
                    @click="onLabelsEdit"
                >
                    <i class="el-icon-collection-tag"></i>Labels
                </button>

                <section class="card-edit-labels-list">
                    <labels-editor
                        v-if="isLabelsEdit"
                        :labels="card.labels"
                        @updateCard="updateCard"
                    />
                </section>

                <!-- <div class="edit-card-buttons-container flex f-col">
        <button class="main-btn-card-edit flex clr-btn" @click="onLabelsEdit">
          <i class="el-icon-collection-tag"></i>Labels
        </button>

        <labels-editor
          v-if="isLabelsEdit"
          :labels="card.labels"
          @updateCard="updateCard"
        /> -->

                <button
                    class="main-btn-card-edit flex clr-btn"
                    @click="onAddMembers"
                >
                    <i class="el-icon-user"></i>Members
                </button>
                <add-card-members
                    v-if="isAddMembers"
                    :currCardMembers="card.members"
                    :boardMembers="board.members"
                    @setCardMembers="setCardMembers"
                />

                <button
                    class="main-btn-card-edit flex clr-btn"
                    @click="onOpenDatePicker"
                >
                    <i class="el-icon-time"></i>Due Date
                </button>
                <card-due-date
                    class="card-edit-due-date"
                    v-if="isDisplayDatePicker"
                    :currTimestemp="card.dueDate"
                    @setDueDate="setDueDate"
                />

                <button
                    @click="$refs.fileInput.click()"
                    class="main-btn-card-edit flex clr-btn"
                >
                    <i class="el-icon-picture-outline"></i>
                    Upload Image
                </button>
                <input
                    style="display: none"
                    ref="fileInput"
                    type="file"
                    name="img-uploader"
                    id="imgUploader"
                    @change="onUploadImg"
                />

                <button
                    class="main-btn-card-edit flex clr-btn"
                    @click="onAddChecklist"
                >
                    <i class="el-icon-document-checked"></i>Checklist
                </button>
                <add-checklist
                    v-if="isAddChecklist"
                    :checklists="card.checklists"
                    :isAddChecklist="this.isAddChecklist"
                    @newChecklist="onNewChecklist"
                />

                <button
                    class="main-btn-card-edit flex clr-btn"
                    @click="onOpenColorPallette"
                >
                    <i class="el-icon-brush"></i>Card Color
                </button>
                <card-color
                    class="card-edit-color"
                    v-if="isDisplayColorPallette"
                    @setColor="changeColor"
                />

                <button
                    class="main-btn-card-edit flex clr-btn"
                    @click="onOpenMoveTo"
                >
                    <i class="el-icon-right"></i>Move To
                </button>

                <card-move-to
                    v-if="isDisplayMoveTo"
                    :board="board"
                    :list="list"
                    :card="card"
                />

                <button
                    class="main-btn-card-edit flex clr-btn"
                    @click="removeCard"
                >
                    <i class="el-icon-delete"></i>Delete card
                </button>
            </div>
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
import cardMoveTo from "@/cmps/card/card-move-to.cmp.vue";
import moment from "moment";
// import cardLabelsCmp from '@/cmps/card/card-labels.cmp.vue';
import Swal from "sweetalert2";

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
            isDisplayMoveTo: false,
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
        onOpenMoveTo() {
            this.isDisplayMoveTo = !this.isDisplayMoveTo;
        },
        onOpenUploadImgField() {
            this.isDisplayUploadImg = !this.isDisplayUploadImg;
        },
        onOpenDatePicker() {
            this.isDisplayDatePicker = !this.isDisplayDatePicker;
            // const pickerElement = document.getElementsByClassName(
            //     "el-picker-panel el-date-picker el-popper has-time"
            // )[0];
            // pickerElement.style.dis
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
            console.log("updateCard in card-edit");
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
        async removeCard() {
            const result = await Swal.fire({
                title: "Are you sure you want to delete this card?",
                showDenyButton: true,
                confirmButtonText: `Yes`,
                denyButtonText: `No`,
            });
            if (result.isConfirmed) {
                this.$store.dispatch({
                    type: "removeCard",
                    cardId: this.card.id,
                    listId: this.list.id,
                });
                this.$router.push(`/board/${this.board._id}`);
            }
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
        cardMoveTo,
        // cardLabelsCmp
    },
};
</script>