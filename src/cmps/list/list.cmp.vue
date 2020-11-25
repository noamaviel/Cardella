
<template>
    <section class="list-container">
        <h1>list</h1>
        <card-preview v-for="card in list.cards" :key="card.id" :card="card" />
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
    components: {
        cardPreview,
    },
};
</script>

<style>
</style>