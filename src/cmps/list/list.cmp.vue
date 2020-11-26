
<template>
    <section class="list-container">
        <div class="list-menu">
            <i class="fas fa-ellipsis-h"></i>
        </div>

        <h1
            contenteditable="true"
            @keypress.enter.prevent="updateListTitle"
            @blur="updateListTitle"
        >
            {{ list.title }}
        </h1>

        <card-preview
            v-bind:style="{ backgroundColor: card.style.bgColor }"
            v-for="card in list.cards"
            :key="card.id"
            :card="card"
            @removeCard="removeCard"
        />
        <button class="add-card-btn" v-if="!isNew" @click="onOpenNewCard">
            + Add another card
        </button>
        <div v-else>
            <input
                type="text"
                v-model="newCardTitle"
                placeholder="Enter a title for this card..."
            />
            <button @click="addCard">Add card</button>
            <button>x</button>
        </div>
    </section>
</template>

<script>
import cardPreview from "../card/card-preview.cmp";

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
    computed: {},
    methods: {
        onOpenNewCard() {
            this.isNew = true;
        },
        updateListTitle(ev) {
            if (this.list.title === ev.target.innerText) return;
            if (!ev.target.innerText) {
                ev.target.innerText = this.list.title;
                return;
            }
            this.list.title = ev.target.innerText;
            ev.target.blur();
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
        cardPreview,
    },
    created() {},
};
</script>
