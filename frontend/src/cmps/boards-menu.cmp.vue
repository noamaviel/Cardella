<template>
    <section class="boards-menu-container">
        <div class="boards-menu">
            <ul class="boards-list">
                <li
                    v-for="board in boards"
                    :key="board._id"
                    @click="closeBoardsMenu"
                    class="board-line flex"
                >
                    <router-link :to="'/board/' + board._id" class="link">
                        <img
                            v-if="board && board.style.backgroundImgUrl"
                            :src="board.style.backgroundImgUrl"
                            class="img-preview"
                        />
                        <div
                            v-else
                            :style="{
                                'background-color': board.style.backgroundColor,
                            }"
                            class="bgc-preview"
                        ></div>
                        {{ board.title }}
                    </router-link>
                </li>
            </ul>
            <button @click="addBoard" class="create-board-btn">
                + Create a board
            </button>
        </div>
    </section>
</template>

<script>
export default {
    props: {},
    methods: {
        async addBoard() {
            const newBoard = await this.$store.dispatch({
                type: "addBoard",
            });
            this.$router.push(`/board/${newBoard._id}`);
            this.closeBoardsMenu();
        },
        closeBoardsMenu() {
            this.$emit("closeBoardsMenu");
        },
    },
    computed: {
        boards() {
            return this.$store.getters.getBoards;
        },
    },
    created() {
        this.$store.dispatch({ type: "loadBoards" });
    },
};
</script>

