<template>
    <section class="card-preview-container">
        <img :src="card.uploadImgUrl" />
        <h3>{{ card.title }}</h3>
        <members-cmp :members="card.members"/>
        <i class="far fa-trash-alt" @click.prevent="emitRemoveCard"></i>
    </section>
</template>

<script>
import membersCmp from "@/cmps/members.cmp.vue";

export default {
    props: {
        card: Object,
    },
    data() {
        return {};
    },
    methods: {
        emitRemoveCard() {
            console.log("we are here");
            this.$emit("removeCard", this.card.id);
        },
    },
    components: {
        membersCmp,
    },
};
</script>

<style>
.far {
    cursor: pointer;
}
</style>