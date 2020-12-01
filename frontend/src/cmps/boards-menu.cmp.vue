<template>
  <section class="boards-menu-container">
    <div class="boards-menu">
      <ul class="boards-list">
        <li v-for="board in boards" :key="board._id">
          <router-link :to="board._id">{{ board.title }}</router-link>
        </li>
      </ul>
      <button @click="addBoard">Create a board</button>
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
      this.$router.push(newBoard._id);
    },
  },
  computed: {
    boards() {
      return this.$store.getters.getBoards;
    },
  },

  created() {
    this.$store.dispatch({ type: 'loadBoards'})
  },
};
</script>


