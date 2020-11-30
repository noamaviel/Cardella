<template>
  <section class="activities-container">
    <div class="activities">
      <div class="activity" v-for="activity in activities" :key="activity.id">
        <div class="activity-content">
          <p>
            <!-- <avatar
              class="avatar"
              :src="activity.createdBy.imgUrl"
              :username="activity.createdBy.fullName"
              :lighten="100"
              :size="30"
              background-color="#f15656"
              color="#172b4d"
            /> -->
            <span class="name">{{ activity.createdBy.fullname }}</span>
            <span> left a comment: </span>
            <!-- <span v-if="activity.isComment">left a comment:</span> -->
            <!-- <span v-if="isShowInCard">{{ activity.text | removeInCard }}</span> -->
            <span>{{ activity.txt }}</span>
          </p>
          <small class="time">{{ activity.createdAt | timeSince }}</small>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import moment from "moment";
// import Avatar from "vue-avatar";
export default {
  props: {
    activities: Array,
    // members: Array,
  },
  // computed: {
  //   activitiesToShow() {
  //     return this.activities.slice(0, 20);
  //   },
  // },
  filters: {
    timeSince(timestamp) {
      return moment(timestamp).fromNow();
    },
  },
  components: {
    // Avatar,
  },
};
</script>
