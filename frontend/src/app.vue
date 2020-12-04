<template>
  <div id="app" class="app">
    <app-header />
    <router-view />
  </div>
</template>

<script>
import appHeader from "@/cmps/app-header.cmp.vue";

export default {
  title: "Cardella",
  components: {
    appHeader,
  },
};
</script>