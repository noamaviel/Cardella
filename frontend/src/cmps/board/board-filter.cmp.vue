<template>
  <section class="board-filter">
    <div class="filter-container">
      <input
        type="text"
        placeholder="Search"
        v-model="filterBy.txt"
        @input="onSearchTxt"
      />
      <button class="close-search-btn clr-btn" @click.stop.prevent="onCleanSearch">
        <i class="el-icon-close"></i>
      </button>
      <i class="fas fa-search"></i>
    </div>
  </section>
</template>
<script>
export default {
  props: {},
  data() {
    return {
      filterBy: {
        txt: "",
      },
    };
  },
  computed: {
    filteredList() {
      return this.$store.getters.getFilteredList;
    },
  },
  methods: {
    onSearchTxt() {
      console.log("onSearchTxt", this.filterBy.txt);
      this.$store.dispatch({ type: "query", filterBy: this.filterBy });
    },
    onCleanSearch() {
      this.filterBy.txt = "";
      this.onSearchTxt();
    },
  },
  components: {},
  created() {},
};
</script>
