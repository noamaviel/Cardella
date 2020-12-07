<template>
  <section class="card-move-to-menu flex f-col">
    <div class="list-drop-down">
      <div>List:</div>

      <select
        class="list-select"
        v-model="selectedListToMoveTo"
        @change="onListSelected"
      >
        <option
          v-for="currList in board.lists"
          :key="currList.id"
          :value="currList"
        >
          {{ currList.title }}
        </option>
      </select>

      <div>Position:</div>
      <div class="position-container flex">
        <select class="position-select flex" v-model="selectedIdxToMoveTo">
          <option v-for="i in cardsCountToshow" :key="i - 1" :value="i - 1">
            {{ i }}
          </option>
        </select>
        <button class="clr-btn" @click="onMoveCard">Move</button>
      </div>
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
      if (this.selectedListToMoveTo.id === this.list.id)
        return this.list.cards.length;
      const selectedListToMoveToIdx = this.board.lists.indexOf(
        this.selectedListToMoveTo
      );
      return this.board.lists[selectedListToMoveToIdx].cards.length + 1;
    },
    cardIdxInCurrlist() {
      return this.list.cards.indexOf(this.card);
    },
  },
  methods: {
    removeCardFromCurrIdx() {
      return this.list.cards.splice(this.cardIdxInCurrlist, 1)[0];
    },
    addCardToSelectedListIdx() {
      const selectedListToMoveToIdx = this.board.lists.indexOf(
        this.selectedListToMoveTo
      );
      return this.board.lists[selectedListToMoveToIdx].cards.splice(
        this.selectedIdxToMoveTo,
        0,
        this.card
      );
    },
    onMoveCard() {
      this.removeCardFromCurrIdx();
      this.addCardToSelectedListIdx();
      this.$store.dispatch({
        type: "updateBoard",
        board: this.board,
      });
      this.$router.push(`/board/${this.board._id}`);
    },
    onListSelected() {
      if (this.selectedListToMoveTo.id === this.list.id) {
        this.selectedIdxToMoveTo = this.cardIdxInCurrlist;
      } else {
        this.selectedIdxToMoveTo = 0;
      }
    },
  },
  created() {
    this.selectedIdxToMoveTo = this.cardIdxInCurrlist;
  },
};
</script>

<style>
</style>