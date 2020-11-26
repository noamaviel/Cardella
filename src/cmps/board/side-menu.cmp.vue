<template>
  <section class="side-menu">
    <button @click="onOpenMenu">Menu</button>
    <side-menu v-if="isMenu" @closeMenu="closeMenu" :board="board" />
    <!-- <ul class="menu-actions">
      <li>Change background</li>
      <li>Delete board</li>
      <h4>Activity Log</h4>
    </ul> -->

    <!-- <ul class="activity-log"> -->
    <!-- <li v-for="activity in activities" :key="activity.id"></li> -->
    <!-- </ul> -->
  </section>
</template>

<script>
export default {
  props: {
    board: Object,
  },
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {},
  methods: {
    onOpenMenu() {
      this.isOpen = true;
    },
    onCloseMenu() {
      this.isOpen = false;
    },
    getActivities() {
      //     this.
      // }
    },
    created() {},
  },
};
</script>