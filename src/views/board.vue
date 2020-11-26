<template>
    <section class="board">
        <board-header :board="board" />
        <list-cmp v-for="list in board.lists" :key="list.id" :list="list" />
        <list-add />
    </section>
</template>

<script>
import boardHeader from "@/cmps/board/board-header.cmp.vue";
import listCmp from "@/cmps/list/list.cmp.vue";
import { eventBus, EVENT_UPDATE_BOARD } from '../services/eventbus-service.js'
import listAdd from "@/cmps/list/list-add.cmp.vue";

export default {
    data() {
        return {};
    },
    computed: {
        board() {
            return this.$store.getters.getCurrBoard;
        },
    },
    methods: {},
    components: {
        boardHeader,
        listCmp,
        listAdd,
    },
    created() {
        const boardId = this.$route.params.boardId;
        this.$store.dispatch({ type: "loadBoard", boardId });

        eventBus.$on(EVENT_UPDATE_BOARD, () => {
            // console.log("board in board-cmp:", this.board);
            this.$store.dispatch({type: "updateBoard" });
        });
    },
};
</script>