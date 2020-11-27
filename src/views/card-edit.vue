<template>
    <section class="card-edit">
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
            <!-- <members-cmp></members-cmp> -->
            <h3>Labels</h3>
            <!-- <labels-cmp>{{card.labels}}</labels-cmp> -->
            <h3>Due date</h3>
            <!-- <due-date-cmp>
            <label>
			<my-checkbox
				:value=""
				v-model=""
			/>
            date-picker input (consider a npm package)
		</label>            
        </due-date-cmp> -->
            <checklists-cmp
                v-if="card.checklists"
                :checklists="card.checklists"
            />
            <!-- <checklist-cmp>
            status bar
            todo list
            <button>Add an item</button>
        </checklist-cmp> -->
            <h3>Description</h3>
            <textarea
                type="textarea"
                v-model="card.description"
                placeholder="Add a more detailed description..."
                rows="5"
                max-rows="6"
                @blur="updateCardDescription"
            ></textarea>
            <h3>Image</h3>
            <img src="" />
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
            <button>Checklist</button>
            <button>Due Date</button>
            <button>Upload Image</button>
            <button @click="onOpenColorPallette">Card Color</button>
            <card-color v-if="isDisplayColorPallette" @setColor="changeColor" />
            <button>Delete card</button>
            <router-link to="../../..">Cancel</router-link>
        </div>
    </section>
</template>

<script>
import cardColor from "@/cmps/card/card-color.cmp";
// import checklists from "../card/checklists.cmp"
import checklistsCmp from "@/cmps/card/checklists.cmp.vue";
// import ChecklistsCmp from './checklists.cmp.vue';
// import cardChecklist from "../card/card-checklist.cmp"

export default {
    data() {
        return {
            isDisplayColorPallette: false,
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
    },
    methods: {
        onCloseCard() {
            this.$emit("closeCard");
        },
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
        updateCardTitle(ev) {
            debugger
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
    },
    components: {
        cardColor,
        // checklists
        checklistsCmp,
        // cardChecklist
    },
    created() {},
};
</script>