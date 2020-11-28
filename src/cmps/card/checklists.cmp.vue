<template>
    <section>
        <ul v-if="checklists">
              <h3>Checklists</h3>
            <li
                v-for="(checklist, index) in checklists"
                :index="index"
                :key="checklist.id"
            >
                <button @click="onRemoveChecklist(index)">
                    Delete Checklist
                </button>
                <card-checklist :checklist="checklist" :board="board" />
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
            this.$store.dispatch({ type: "updateBoardV2", board: this.board });
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
