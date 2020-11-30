<template>
  <section>
    <div class="home" style="text-align: center">🐢</div>
    <app-footer />
  </section>
</template>
<script>
import appFooter from "@/cmps/app-footer.cmp.vue";

export default {
  name: "home-page",
  components: {
    appFooter,
  },
};
</script>
