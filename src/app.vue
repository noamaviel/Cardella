<template>
    <div id="app">
        <app-header />
        <router-view />
        <app-footer />
    </div>
</template>

<script>
import appHeader from "@/cmps/app-header.cmp.vue";
import appFooter from "@/cmps/app-footer.cmp.vue";

export default {
    components: {
        appHeader,
        appFooter,
    },
};
</script>