<template>
    <section
        class="card-preview-container"
        style="
            display: inline-block;
            padding: 10px;
            margin: 5px;
            border: 1px solid black;
            width: 200px;
            height: 100px;
        "
    >
        <h1>card</h1>
        {{ card.title }}
        <button @click="onOpenEdit">Edit</button>
        <card-edit v-if="isEdited" @closeCard="onCloseCard" :card="card" />
    </section>
</template>

<script>
import cardEdit from "../card/card-edit.cmp.vue";

export default {
    props: {
        card: Object,
    },
    data() {
        return {
            isEdited: false,
        };
    },
    methods: {
        onOpenEdit() {
            this.isEdited = true;
        },
        onCloseCard() {
            this.isEdited = false;
        },
    },
    components: {
        cardEdit,
    },
    created() {
        console.log('card in Card Preview', this.card)
    }
};
</script>

<style>
</style>