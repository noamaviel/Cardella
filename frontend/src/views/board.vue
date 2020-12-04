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
        <filtered-list-cmp />
        <div class="lists-container drag-component">
            <!-- Outer Component Start -->
            <Container
                :non-drag-area-selector="pauseDrag"
                orientation="horizontal"
                @drop="onColumnDrop($event)"
                :animation-duration="400"
            >
                <Draggable v-for="(list, index) in board.lists" :key="list.id">
                    <list-cmp
                        class="drag-component"
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
import filteredListCmp from "../cmps/board/filtered-list.cmp.vue";

const mediaQuery = window.matchMedia("(max-width: 770px)");
export default {
    data() {
        return {
            showModal: false,
            preventDrag: false,
        };
    },
    computed: {
        board() {
            return this.$store.getters.getCurrBoard;
        },
        pauseDrag() {
            if (this.preventDrag) {
                return ".drag-component";
            } else {
                return "";
            }
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
        onSocketEvent(updatedBoard) {
            // console.log("socket update event", updatedBoard);
            this.$store.commit({ type: "setCurrBoard", board: updatedBoard });
        },
        onWindowWidthChange() {
            if (mediaQuery.matches) {
                this.preventDrag = true;
            } else {
                console.log("onWindowWidthChange - else");
                this.preventDrag = false;
            }
        },
    },
    components: {
        Container,
        Draggable,
        boardHeader,
        listCmp,
        listAdd,
        filteredListCmp,
    },
    created() {
        socketService.setup();
        socketService.on("update", this.onSocketEvent);

        const boardId = this.$route.params.boardId;
        this.$store.dispatch({ type: "loadBoard", boardId });

        mediaQuery.addEventListener("change", () => {
            this.onWindowWidthChange();
        });
        this.onWindowWidthChange();
    },
    destroyed() {
        socketService.off("update", this.onSocketEvent);
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
