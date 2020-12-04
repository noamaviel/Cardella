<template>
    <section class="board-header">
        <div class="left-board-header flex">
            <h2
                class="board-title"
                contenteditable="true"
                @keypress.enter.prevent="updateBoardTitle"
                @blur="updateBoardTitle"
            >
                {{ board.title }}
            </h2>
        </div>
        <div class="avater-board-header flex f-center">
            <members-cmp :members="board.members" />
        </div>

        <div class="right-board-header flex">
            <board-filter :board="board" />
            <button class="clr-btn menu-btn" @click="toggleMenu">
                <i class="fas fa-bars"></i>
            </button>
            <transition name="fade">
                <side-menu v-if="isOpen" :board="board" @click="toggleMenu" />
            </transition>
        </div>
    </section>
</template>

<script>
import membersCmp from "@/cmps/members.cmp.vue";
import boardFilter from "@/cmps/board/board-filter.cmp.vue";
import sideMenu from "@/cmps/board/side-menu.cmp.vue";

export default {
    props: {
        board: Object,
    },
    data() {
        return {
            isOpen: false,
        };
    },
    methods: {
        updateBoardTitle(ev) {
            if (this.board.title === ev.target.innerText) return;
            if (!ev.target.innerText) {
                ev.target.innerText = this.board.title;
                return;
            }
            // console.log("store title before:", this.$store.getters.getCurrBoard.title)
            this.board.title = ev.target.innerText;
            // console.log("store title after:", this.$store.getters.getCurrBoard.title)
            ev.target.blur();
            this.$store.dispatch({
                type: "updateBoardV2",
                board: this.board,
            });
        },
        toggleMenu() {
            this.isOpen = !this.isOpen;
        },
    },
    components: {
        membersCmp,
        boardFilter,
        sideMenu,
    },
};
</script>