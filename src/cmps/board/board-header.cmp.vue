<template>
    <section class="board-header">
        <h2
            contenteditable="true"
            @keypress.enter.prevent="updateBoardTitle"
            @blur="updateBoardTitle"
        >
            {{ board.title }}
        </h2>
        <board-members />
        <board-filter :board="board"/>
        <side-menu :board="board"/>
    </section>
</template>

<script>
import boardMembers from "@/cmps/board/board-members.cmp.vue";
import boardFilter from "@/cmps/board/board-filter.cmp.vue";
import sideMenu from "@/cmps/board/side-menu.cmp.vue";

export default {
    props: {
        board: Object,
    },
    methods: {
        updateBoardTitle(ev) {
            if (this.board.title === ev.target.innerText) return;
            if (!ev.target.innerText) {
                ev.target.innerText = this.board.title;
                return;
            }
            this.board.title = ev.target.innerText;
            ev.target.blur();
        },
    },
    components: {
        boardMembers,
        boardFilter,
        sideMenu,
    },
};
</script>