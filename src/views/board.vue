<template>
  <section class="board">
    <board-header :board="board" />
    <div class="lists-container flex">
      <!-- Outer Component Start -->
      <list-cmp v-for="list in board.lists" :key="list.id" :list="list" />
      <!-- Outer Component End -->
      <div v-if="showModal" class="modal-route">
        <div class="modal-content">
          <router-view></router-view>
        </div>
      </div>
      <list-add />
    </div>
  </section>
</template>

<script>
import boardHeader from "@/cmps/board/board-header.cmp.vue";
import listCmp from "@/cmps/list/list.cmp.vue";
import listAdd from "@/cmps/list/list-add.cmp.vue";

export default {
  data() {
    return {
      showModal: false,
    };
  },
  computed: {
    board() {
      return this.$store.getters.getCurrBoard;
    },
  },
  methods: {
    // showCardEdit(cardId) {
    //     this.$router.push(`/card/${cardId}`);
    // },
  },
  components: {
    boardHeader,
    listCmp,
    listAdd,
  },
  created() {
    const boardId = this.$route.params.boardId;
    this.$store.dispatch({ type: "loadBoard", boardId });

    },
    watch: {
        $route(newVal) {
            this.showModal = newVal.meta && newVal.meta.showModal;
        },
    },
};
</script>

<style scoped>
.modal-route {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(#000000, 0.5);
}

.modal-route .modal-content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(68, 68, 68, 0.465)
}
</style>