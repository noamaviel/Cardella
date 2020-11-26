
<template>
    <section class="list-container">
        <h1
            contenteditable="true"
            @keypress.enter.prevent="updateListTitle"
            @blur="updateListTitle"
        >
            {{ list.title }}
        </h1>
        <card-preview v-bind:style="{backgroundColor: card.style.bgColor}" v-for="card in list.cards" :key="card.id" :card="card" />
    </section>
</template>

<script>
import cardPreview from "../card/card-preview.cmp";

export default {
    props: {
        list: Object,
    },
    data() {
        return {};
    },
    computed: {},
    methods: {
         updateListTitle(ev) {
            if (this.list.title === ev.target.innerText) return;
            if (!ev.target.innerText) {
                ev.target.innerText = this.list.title;
                return;
            }
            this.list.title = ev.target.innerText;
            ev.target.blur();
        },
    },
    components: {
        cardPreview,
    },
    created() {

    }
};
</script>

<style>
</style>