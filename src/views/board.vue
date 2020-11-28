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
            // this.$store.dispatch({ type: "updateBoardV2", board: this.board });
        },
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
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(68, 68, 68, 0.465);
}
</style>