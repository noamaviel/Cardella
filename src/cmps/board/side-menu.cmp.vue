<template>
  <section class="side-menu">
    <ul class="menu-actions">
      <li>Change background</li>
      <li>Delete board</li>
      <h4>Activity Log:</h4>
      <board-activity-log />
    </ul>
  </section>
</template>

<script>
import boardActivityLog from "@/cmps/board/board-activity-log.cmp.vue";

export default {
  props: {
    board: Object,
  },
  computed: {},
  methods: {
    getActivities() {
      //     this.
      // }
    },
    created() {},
  },
  components: {
    boardActivityLog,
  },
};
</script>