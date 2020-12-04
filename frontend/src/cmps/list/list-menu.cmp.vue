<template>
  <section class="list-menu flex .f-row">
    <div class="list-menu-header flex">
      <h3>List Actions</h3>
    </div>
    <div class="list-menu-content flex">
      <ul>
        <li @click="removeList">Delete list</li>
        <li v-if="!isNew" @click="onOpenNewCard">Add card</li>
        <div v-else>
          <input
            type="text"
            v-model="newCardTitle"
            placeholder="Enter a title for this card..."
            @keyup.enter="addCard"
          />
          <button class="clr-btn" @click="addCard">Add card</button>
          <button class="clr-btn" @click="onCloseNewCard">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <!-- <li>Sort by</li> -->
        <!-- <ul>
                    <li>Date created</li>
                    <li>Due date</li>
                    <li>Card name</li>
                </ul> -->
      </ul>
    </div>
  </section>
</template>

<script>
import Swal from "sweetalert2";

export default {
  props: {
    list: Object,
  },
  data() {
    return {
      isNew: false,
      newCardTitle: "",
    };
  },

  methods: {
    onOpenNewCard() {
      this.isNew = true;
    },
    onCloseNewCard() {
      this.isNew = false;
    },
    async removeList() {
      const result = await Swal.fire({
        title: "Are you sure you want to delete this list?",
        showDenyButton: true,
        confirmButtonText: `Yes`,
        denyButtonText: `No`,
      });
      if (result.isConfirmed) {
        this.$store.dispatch({
          type: "removeList",
          listId: this.list.id,
        });
      } else {
        this.closeListMenu();
      }
    },
    closeListMenu() {
      this.$emit("closeListMenu");
    },
    addCard() {
      this.$store.dispatch({
        type: "addCard",
        cardTitle: this.newCardTitle,
        listId: this.list.id,
      });
      this.isNew = false;
      this.newCardTitle = "";
    },
  },

  created() {},
};
</script>

<style scoped>
.list-menu {
  cursor: pointer;
}
</style>
