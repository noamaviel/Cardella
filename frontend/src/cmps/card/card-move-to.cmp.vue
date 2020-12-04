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
                    v-for="i in cardsCountOfCurrlist"
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
import { utilService } from "../../services/util-service.js";

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
        cardsCountOfCurrlist() {
            return this.list.cards.length;
        },
        cardsCountPerList() {
            const cardsCountPerList = this.board.lists.map(
                (list) => list.cards.length
            );
            return cardsCountPerList;
        },
        cardIdxInCurrlist() {
            return this.list.cards.indexOf(this.card);
        },
    },
    methods: {
        onMoveCard() {
            //Remove card from origin idx
            let moveResult = {
                removedIndex: this.cardIdxInCurrlist,
                payload: this.card,
            };
            this.list.cards = utilService.applyDrag(
                this.list.cards,
                moveResult
            );
            //Move card to another idx of the same list
            if (this.selectedListToMoveTo.id === this.list.id) {
                moveResult = {
                    addedIndex: this.selectedIdxToMoveTo,
                    payload: this.card,
                };
                const selectedListToMoveToIdx = this.board.lists.indexOf(
                    this.selectedListToMoveTo
                );
                this.board.lists[
                    selectedListToMoveToIdx
                ].cards = utilService.applyDrag(
                    this.board.lists[selectedListToMoveToIdx].cards,
                    moveResult
                );
                this.$store.dispatch({
                    type: "updateBoardV2",
                    board: this.board,
                });
                this.$router.push(`/board/${this.board._id}`);
            }
            //TO DO - Add card to other list
        },
    },
    created() {
        this.selectedIdxToMoveTo = this.cardIdxInCurrlist;
    },
};
</script>

<style>
</style>