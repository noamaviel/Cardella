<template>
    <section
        class="app"
        style="
            background-image: url(https://res.cloudinary.com/morshva/image/upload/v1606573776/7_op2qhx.jpg);
        "
    >
        <board-header :board="board" />
        <div class="lists-container flex">
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
            </Container>
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
    //   methods: {
    //     onColumnDrop(dropResult) {
    //       let inLists = JSON.parse(JSON.stringify(this.board.lists));
    //       inLists = utilService.applyDrag(inLists, dropResult);
    //       this.board.lists = inLists;
    //       let updtBoard = JSON.parse(JSON.stringify(this.board));
    //       this.$store.dispatch({ type: "updateBoardV2", board: updtBoard });
    //     },
    methods: {
        onColumnDrop(dropResult) {
            let inLists = JSON.parse(JSON.stringify(this.board.lists));
            inLists = utilService.applyDrag(inLists, dropResult);
            this.board.lists = inLists;
            let updtBoard = JSON.parse(JSON.stringify(this.board));
            this.$store.dispatch({ type: "updateBoardV2", board: updtBoard });
        },
        // onUpdate(type) {
        //     console.log("type in onUpdate", type);
        //     if (type === "board") {
        //         this.$store.dispatch({
        //             type: "loadBoard",
        //             boardId: this.board._id,
        //         });
        //     } else {
        //         console.log("error in updateType");
        //     }
        // },
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
        // },
        "$route.params.boardId"(val) {
            this.loadBoard();
            console.log(val);
        },
    },
};
</script>
