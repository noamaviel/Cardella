<template>
    <section class="checklists">
        <ul v-if="checklists.length">
            <h3><i class="fas fa-check"></i> Checklists</h3>
            <li
                v-for="(checklist, index) in checklists"
                :index="index"
                :key="checklist.id"
            >
                <card-checklist :checklist="checklist" :board="board" />
                <button class="delete-btn" @click="onRemoveChecklist(index)">
                    Delete
                </button>
            </li>
        </ul>
    </section>
</template>

<script>
import cardChecklist from "../card/card-checklist.cmp";

export default {
    props: {
        board: Object,
        checklists: Array,
    },
    data() {
        return {};
    },
    methods: {
        onRemoveChecklist(index) {
            console.log("onRemoveCheclist", index);
            this.checklists.splice(index, 1);
            let updtBoard = JSON.parse(JSON.stringify(this.board));
            this.$store.dispatch({ type: "updateBoardV2", board: updtBoard });
        },
    },
    components: {
        cardChecklist,
    },
    created() {
        console.log("this.board in checklists", this.board);
    },
};
</script>
