<template>
    <section
        class="app-container"
        v-if="board && board.style"
        :style="{
            'background-color': board.style.backgroundColor,
            'background-image': `url(${board.style.backgroundImgUrl})`,
        }"
    >
        <board-header :board="board" />
        <div class="lists-container">
            <!-- Outer Component Start -->
            <Container
                orientation="horizontal"
                @drop="onColumnDrop($event)"
                :animation-duration="400"
            >
                <Draggable v-for="(list, index) in board.lists" :key="list.id">
                    <list-cmp
                        :list="list"
                        :index="index"
                        :lists="board.lists"
                        :board="board"   
                    />
                </Draggable>
                <list-add />
            </Container>
            <!-- Outer Component End -->
            <div v-if="showModal" class="modal-route">
                <div class="modal-content">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { Container, Draggable } from "vue-smooth-dnd";
import { utilService } from "../services/util-service.js";
import boardHeader from "@/cmps/board/board-header.cmp.vue";
import listCmp from "@/cmps/list/list.cmp.vue";
import listAdd from "@/cmps/list/list-add.cmp.vue";
import socketService from "@/services/socket-service.js";

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
        onColumnDrop(dropResult) {
            let inLists = JSON.parse(JSON.stringify(this.board.lists));
            inLists = utilService.applyDrag(inLists, dropResult);
            this.board.lists = inLists;
            let updtBoard = JSON.parse(JSON.stringify(this.board));
            this.$store.dispatch({ type: "updateBoardV2", board: updtBoard });
        },
        loadBoard() {
            const boardId = this.$route.params.boardId;
            this.$store.dispatch({ type: "loadBoard", boardId });
        },
        //      sendUpdate() {
        //   socketService.emit('update', 'board')
        // },
        // changeRoom() {
        //   socketService.emit('topic', boardId)
        // }
    },
    components: {
        Container,
        Draggable,
        boardHeader,
        listCmp,
        listAdd,
    },
    created() {
        const boardId = this.$route.params.boardId;
        this.$store.dispatch({ type: "loadBoard", boardId });

        socketService.setup();
        // socketService.emit("update topic", boardId);
        // socketService.on("update", this.onUpdate);
    },
    destroyed() {
        socketService.off("update", this.onUpdate);
        socketService.terminate();
    },
    watch: {
        $route: {
            immediate: true,
            handler: function (newVal) {
                this.showModal = newVal.meta && newVal.meta.showModal;
            },
        },
        "$route.params.boardId"(val) {
            this.loadBoard();
            console.log(val);
        },
    },
};
</script>
