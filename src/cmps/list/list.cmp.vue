
<template>
  <section class="list-container">
    <div class="list-menu-container flex f-center">
      <h5
        class="list-title"
        contenteditable="true"
        @keypress.enter.prevent="updateListTitle"
        @blur="updateListTitle"
      >
        {{ list.title }}
      </h5>

      <div class="list-open-menu" @click="toggleOpenListMenu">
        <i class="fas fa-ellipsis-h"></i>
      </div>
    </div>

    <list-menu v-if="isMenuOpen" :list="list" />

    <Container
      group-name="list"
      @drop="(dropResult) => onDrop(dropResult)"
      :get-child-payload="getCardPayload(list.id)"
      :animation-duration="400"
    >
      <Draggable v-for="card in list.cards" :key="card.id">
        <router-link :to="`list/${list.id}/card/${card.id}`" append>
          <card-preview
            v-bind:style="{ backgroundColor: card.style.bgColor }"
            :card="card"
            @removeCard="removeCard"
          />
        </router-link>
      </Draggable>
    </Container>
    <div class="add-card-container">
      <button
        class="add-another-card-button"
        v-if="!isNew"
        @click="onOpenNewCard"
      >
        + Add another card
      </button>
      <div class="add-card-button-inside flex" v-else>
        <input
          type="text"
          v-model="newCardTitle"
          placeholder="Enter a title for this card..."
          @keyup.enter="addCard"
        />
        <div class="add-card-inside-cont">
          <button @click="addCard">Add card</button>
          <button @click="onCloseNewCard">X</button>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { Container, Draggable } from "vue-smooth-dnd";
import { utilService } from "../../services/util-service.js";
import cardPreview from "../card/card-preview.cmp";
import listMenu from "../list/list-menu.cmp";
export default {
  props: {
    list: Object,
    lists: Array,
    index: Number,
  },
  data() {
    return {
      isNew: false,
      newCardTitle: "",
      isMenuOpen: false,
    };
  },
  computed: {},
  methods: {
    toggleOpenListMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    onDrop(dropResult) {
      this.list.cards = utilService.applyDrag(this.list.cards, dropResult);
      // this.$store.dispatch({ type: "updateBoardV2", board: this.board });
    },
    getCardPayload(listId) {
      return (index) => {
        return this.lists.filter((p) => p.id === listId)[0].cards[index];
      };
    },
    onOpenNewCard() {
      this.isNew = true;
    },
    onCloseNewCard() {
      this.isNew = false;
    },
    updateListTitle(ev) {
      if (this.list.title === ev.target.innerText) return;
      if (!ev.target.innerText) {
        ev.target.innerText = this.list.title;
        return;
      }
      this.list.title = ev.target.innerText;
      ev.target.blur();
      this.$store.dispatch({
        type: "updateList",
        list: this.list,
      });
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
    removeCard(cardId) {
      this.$store.dispatch({
        type: "removeCard",
        cardId,
        listId: this.list.id,
      });
    },
  },
  components: {
    Container,
    Draggable,
    cardPreview,
    listMenu,
  },
  created() {},
};
</script>