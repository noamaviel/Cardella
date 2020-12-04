<template>
  <section>
    <header class="main-header">
      <div class="main-header-left">
        <button class="clr-btn">
          <router-link to="/"><i class="fas fa-home"></i> </router-link>
        </button>
      </div>

      <div class="logo">
        <router-link to="/"> <img src="@/assets/img/logo.png" /></router-link>
      </div>
      <div class="main-header-right">
        <button class="clr-btn board-open-menu" @click="toggleBoardsMenu">
          <i class="fas fa-th"></i>
          Boards
        </button>

        <boards-menu
          v-if="isOpen"
          :isOpen="isOpen"
          @closeBoardsMenu="closeBoardsMenu"
        />
        <button class="clr-btn">
          <router-link to="/login">Login</router-link>
        </button>
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
    closeBoardsMenu() {
      this.isOpen = false;
    },
  },
  components: {
    boardsMenu,
  },
};
</script>