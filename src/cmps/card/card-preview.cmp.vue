<template>
  <section class="card-preview-container">
    <card-preview-labels v-if="card.labels" :labels="card.labels" @updateCard="onUpdateCard"/>
    <img :src="card.uploadImgUrl" />
    <div class="card-content">
      <i class="far fa-trash-alt" @click.prevent="emitRemoveCard"></i>
      <h5 class="card-title">{{ card.title }}</h5>
      <members-cmp :members="card.members" />
    </div>
  </section>
</template>

<script>
import membersCmp from "@/cmps/members.cmp.vue";
import cardPreviewLabels from "@/cmps/card/card-preview-labels.cmp.vue"

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
    onUpdateCard(){
     this.$emit('updateCard');
    }
  },
  components: {
    membersCmp,
    cardPreviewLabels
  },
};
</script>

<style>
.far {
  cursor: pointer;
}
</style>