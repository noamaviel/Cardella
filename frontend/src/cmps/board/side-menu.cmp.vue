<template>
    <section class="side-menu">
        <div class="side-menu-header">
            <h3>Menu</h3>
        </div>
        <div class="side-menu-nav">
            <h5 @click="removeBoard">
                <i class="far fa-trash-alt"></i> Delete Board
            </h5>
            <h5><i class="fas fa-palette"></i> Change Background</h5>
        </div>
        <div class="activity-title">
            <h5><i class="fas fa-list-ul"></i> Activity Log:</h5>
        </div>
        <div class="side-activities">
            <board-activity-log
                class="activity-preview"
                :activities="board.boardActivities"
            />
        </div>
    </section>
</template>

<script>
import boardActivityLog from "@/cmps/board/board-activity-log.cmp.vue";

export default {
    props: {
        board: Object,
    },
    computed: {},
    methods: {
        removeBoard() {
            this.$store.dispatch({
                type: "removeBoard",
                boardId: this.board._id,
            });
        },
    },
    components: {
        boardActivityLog,
    },
};
</script>


