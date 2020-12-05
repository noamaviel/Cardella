<template>
  <section>
    <!-- <h1>Filtered List CMP {{ filteredList }}</h1> -->
    <div class="search-results flex">
      <div class="search-results-title flex">
        <h3 v-if="filteredList.length > 0">Search Results</h3>
      </div>
      <ul>
        <li
          v-for="card in filteredList"
          :key="card.id"
          @click="onFilterCard(card.boardId, card.listId, card.id)"
        >

          <b>{{ card.title }}</b>
          <br>

          <span>In list:</span>
          {{ card.listTitle }}
          <br>

           <span>In board:</span> 
           {{ card.boardTitle }} 

        </li>
      </ul>
    </div>
  </section>
</template>
<script>
export default {
  props: {
    // filteredList: Array,
  },
  data() {
    return {};
  },
  computed: {
    filteredList() {
      return this.$store.getters.getFilteredList;
    },
  },
  methods: {
    onFilterCard(boardId, listId, cardId) {
      console.log("onFilterCard", boardId, listId, cardId);
      let currBoard = this.$store.getters.getCurrBoard;
      if (boardId !== currBoard._id) {
        let boardPath = `/board/${boardId}`;
        console.log("boardPath", boardPath);
        this.$router.push(boardPath);
      }
      let path = `/board/${boardId}/list/${listId}/card/${cardId}`;
      setTimeout(() => {
        this.$router.push(path);
      }, 1000);
    },
  },
  created() {
    console.log("filteredListCmp", this.filteredList);
  },
};
</script>
