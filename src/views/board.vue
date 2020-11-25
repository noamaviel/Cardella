<template>
    <section class="board">
        <h1>This is the public board!!!</h1>
        <board-header :board="board" />
        <!-- <list-cmp /> -->
        <!-- <list-add /> -->
    </section>
</template>

<script>
import boardHeader from "@/cmps/board/board-header.cmp.vue";
// import listCmp from "@/cmps/list/list.cmp.vue";
// import listAdd from "@/cmps/list/list-add.cmp.vue";

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
        // listCmp,
        // listAdd,
    },
    created() {
        const boardId = this.$route.params.id;
        this.$store.dispatch({ type: "loadBoard", boardId });
    },
};
</script>