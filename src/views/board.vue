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
        return {
            board: {
                _id: "b101",
                title: "Robot dev proj",
                createdAt: 1589983468418,
            },
        };
    },
    computed: {},
    methods: {},
    components: {
        boardHeader,
        // listCmp,
        // listAdd,
    },
    created() {
        // this.$store.dispatch({ type: "loadBoard" });
    },
};
</script>