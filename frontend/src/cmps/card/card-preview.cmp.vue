<template>
  <section class="card-preview-container">
    <div class="card-content">
      <card-preview-labels
        class="card-top-labels"
        v-if="card.labels"
        :labels="card.labels"
        @updateCard="onUpdateCard"
      />
      <div class="card-trash flex">
        <i class="far fa-trash-alt" @click.prevent="emitRemoveCard"></i>
      </div>

      <img :src="card.uploadImgUrl" />
      <h5 class="card-title">{{ card.title }}</h5>
      <members-cmp :members="card.members" />

      <p v-if="card.checklists && card.checklists.length">
        <i class="el-icon-finished"></i>
        {{ checklistCount }}
      </p>
    </div>
  </section>
</template>

<script>
import membersCmp from "@/cmps/members.cmp.vue";
import cardPreviewLabels from "@/cmps/card/card-preview-labels.cmp.vue";

export default {
  props: {
    card: Object,
  },
  data() {
    return {};
  },
  computed: {
    checklistCount() {
      const todosCount = this.card?.checklists?.reduce(
        (todos, checklist) => (todos += checklist.todos.length),
        0
      );
      if (!todosCount) return "";
      return (
        this.card.checklists.reduce(
          (doneTodos, checklist) =>
            doneTodos +
            checklist.todos.reduce(
              (doneTodosInTask, todo) =>
                todo.isDone ? doneTodosInTask + 1 : doneTodosInTask,
              0
            ),
          0
        ) +
        "/" +
        todosCount
      );
    },
  },
  methods: {
    emitRemoveCard() {
      console.log("we are here");
      this.$emit("removeCard", this.card.id);
    },
    onUpdateCard() {
      this.$emit("updateCard");
    },
  },
  components: {
    membersCmp,
    cardPreviewLabels,
  },
};
</script>
