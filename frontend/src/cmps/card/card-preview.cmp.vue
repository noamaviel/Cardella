<template>
  <section class="card-preview-container">
    <img v-if="card.uploadImgUrl" :src="card.uploadImgUrl" />
    <div class="card-content">
      <card-preview-labels
        class="card-top-labels"
        v-if="card.labels && card.labels.length"
        :labels="card.labels"
        @updateCard="onUpdateCard"
      />

      <p class="card-title">{{ card.title }}</p>

      <section class="card-bottom flex">
        <div class="card-bottom-left">
          <members-cmp v-if="card.members && card.members.length" :members="card.members" />
        </div>
        <div class="card-bottom-right flex">
          <!-- <span
            ><i class="el-icon-delete card-trash" @click.prevent="emitRemoveCard"></i
          ></span> -->
          <span v-if="card.checklists && card.checklists.length">
            <i class="el-icon-finished"></i>
            {{ checklistCount }}
          </span>
        </div>
      </section>
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
