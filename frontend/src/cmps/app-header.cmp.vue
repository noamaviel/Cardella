<template>
  <section>
    <header class="main-header">
      <div class="main-header-left">
        <router-link to="/"
          ><h4><i class="fas fa-home"></i></h4
        ></router-link>
        <router-link to="/board/5fc4ba9114c9a871c81fe2bb"
          ><h4>Public Board</h4></router-link
        >
      </div>
      <div class="logo">
        <router-link to="/"><h1>Cardella</h1></router-link>
      </div>
      <div class="main-header-right">
        <h4>
          <button class="board-open-menu" @click="toggleBoardsMenu">
            Boards
          </button>
        </h4>
        <!-- @blur="toggleBoardsMenu" -->
        <boards-menu v-if="isOpen" />
        <router-link to="/login"><h4>Login</h4></router-link>
      </div>
    </header>
  </section>
</template>


<script>
import boardsMenu from "@/cmps/boards-menu.cmp.vue";

export default {
  props: {},
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggleBoardsMenu() {
      this.isOpen = !this.isOpen;
    },
  },
  components: {
    boardsMenu,
  },
};
</script>