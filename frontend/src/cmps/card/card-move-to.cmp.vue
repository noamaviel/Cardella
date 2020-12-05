<template>
    <section class="card-move-to-menu flex f-col">
        <div class="list-drop-down">
            <div>List:</div>

            <select v-model="selectedListToMoveTo">
                <option
                    v-for="currList in board.lists"
                    :key="currList.id"
                    :value="currList"
                >
                    {{ currList.title }}
                </option>
            </select>

            <div>Position:</div>
            <select v-model="selectedIdxToMoveTo">
                <option
                    v-for="i in cardsCountToshow"
                    :key="i - 1"
                    :value="i - 1"
                >
                    {{ i }}
                </option>
            </select>

            <button @click="onMoveCard">Move</button>
        </div>
    </section>
</template>

<script>
export default {
    props: {
        board: Object,
        list: Object,
        card: Object,
    },
    data() {
        return {
            selectedListToMoveTo: this.list,
            selectedIdxToMoveTo: null,
        };
    },
    computed: {
        cardsCountToshow() {
            if (this.selectedListToMoveTo.id === this.list.id) {
                return this.list.cards.length;
            } else {
                const selectedListToMoveToIdx = this.board.lists.indexOf(
                    this.selectedListToMoveTo
                );
                return this.board.lists[selectedListToMoveToIdx].cards.length;
            }
        },
        cardIdxInCurrlist() {
            return this.list.cards.indexOf(this.card);
        },
    },
    methods: {
        removeCardFromCurrIdx() {
            const removedCard = this.list.cards.splice(
                this.cardIdxInCurrlist,
                1
            )[0];
            return removedCard;
        },
        addCardToSelectedListIdx() {
            const selectedListToMoveToIdx = this.board.lists.indexOf(
                this.selectedListToMoveTo
            );
            const addedCard = this.board.lists[
                selectedListToMoveToIdx
            ].cards.splice(this.selectedIdxToMoveTo, 0, this.card);
            return addedCard;
        },
        onMoveCard() {
            this.removeCardFromCurrIdx();
            this.addCardToSelectedListIdx();
            this.$store.dispatch({
                type: "updateBoardV2",
                board: this.board,
            });
            this.$router.push(`/board/${this.board._id}`);
        },
    },
    created() {
        this.selectedIdxToMoveTo = this.cardIdxInCurrlist;
    },
};
</script>

<style>
</style>