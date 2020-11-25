<template>
    <section class="side-menu">
        <button>Menu</button>
        <ul class="menu-actions">
            <li>Change background</li>
            <li>Delete board</li>
            <h4>Activity Log</h4>
        </ul>
        <ul class="activity-log">
            <!-- <li v-for="activity in activities" :key="activity.id"></li> -->
        </ul>
    </section>
</template>

<script>
export default {
    props: {
        board: Object,
    },
    data() {
        return {};
    },
    computed: {
    },
    methods: {
        getActivities() {
            //     this.
            // }
        },
        created() {},
    },
};
</script>