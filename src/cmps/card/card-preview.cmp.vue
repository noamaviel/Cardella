<template>
    <section class="card-preview-container">
        <h3>{{ card.title }}</h3>
        <router-link to="../../.."
            ><i class="far fa-trash-alt" @click.stop="emitRemoveCard"></i
        ></router-link>
    </section>
</template>

<script>
export default {
    props: {
        card: Object,
    },
    data() {
        return {};
    },
    methods: {
        emitRemoveCard() {
            console.log('we are here')
            this.$emit("removeCard", this.card.id);
        },
    },
};
</script>

<style>
.far {
    cursor: pointer;
}
</style>