<template>
  <section class="add-list-container">
    <button
      class="add-another-list-button"
      v-if="!isNew"
      @click="onOpenNewList"
    >
      + Add another list
    </button>
    <div class="add-list-button-inside flex" v-else>
      <input
        type="text"
        v-model="newListTitle"
        placeholder="Enter list title..."
        @keyup.enter="addList"
      />
      <div class="add-list-inside-cont">
        <button @click="addList">Add list</button>
        <button @click="onCloseNewList"><i class="fas fa-times"></i></button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isNew: false,
      newListTitle: "",
    };
  },
  methods: {
    onOpenNewList() {
      this.isNew = true;
    },
    onCloseNewList() {
      this.isNew = false;
    },
    addList() {
      this.$store.dispatch({
        type: "addList",
        listTitle: this.newListTitle,
      });
      this.isNew = false;
      this.newListTitle = "";
    },
  },
};
</script>
 