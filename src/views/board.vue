<template>
    <section class="board">
        <board-header :board="board" />
        <div class="lists-container flex">
            <!-- Outer Component Start -->
            <list-cmp
                v-for="list in board.lists"
                :key="list.id"
                :list="list"
            />
            <!-- Outer Component End -->
            <div v-if="showModal" class="modal-route">
                <div class="modal-content">
                    <router-view></router-view>
                </div>
            </div>
            <list-add />
        </div>
    </section>
</template>

<script>
import boardHeader from "@/cmps/board/board-header.cmp.vue";
import listCmp from "@/cmps/list/list.cmp.vue";
import { eventBus, EVENT_UPDATE_BOARD } from "../services/eventbus-service.js";
import listAdd from "@/cmps/list/list-add.cmp.vue";

export default {
    data() {
        return {
            showModal: false,
        };
    },
    computed: {
        board() {
            return this.$store.getters.getCurrBoard;
        },
    },
    methods: {
        // showCardEdit(cardId) {
        //     this.$router.push(`/card/${cardId}`);
        // },
    },
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
            this.$store.dispatch({ type: "updateBoard" });
        });
    },
    watch: {
        $route(newVal) {
            this.showModal = newVal.meta && newVal.meta.showModal;
        },
    },
};
</script>

<style scoped>
.modal-route {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(#000000, 0.5);
}

.modal-route .modal-content {
    width: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
}
</style>