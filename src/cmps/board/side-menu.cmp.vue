<template>
    <section class="side-menu">
        <button>Menu</button>
        <ul>
            <li>Change background</li>
            <li>Delete board</li>
            <h4>Activity Log</h4>
        </ul>
        <h4>{{board.title}}</h4>
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
    computed: {},
    methods: {
        getActivities() {
            //     this.
            // }
        },
        created() {},
    },
};
</script>