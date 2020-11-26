<template>
    <section class="list-menu">
        <ul>
            <li @click="removeList">Delete list</li>
            <li>Add card</li>
            <!-- <li>Sort by</li> -->
            <!-- <ul>
                    <li>Date created</li>
                    <li>Due date</li>
                    <li>Card name</li>
                </ul> -->
        </ul>
    </section>
</template>

<script>
export default {
    props: {
        list: Object,
    },
    data() {
        return {};
    },
    computed: {},
    methods: {
        removeList() {
            this.$store.dispatch({
                type: "removeList",
                listId: this.list.id,
            });
        },
    },
    created() {},
};
</script>

<style scoped>
.list-menu {
    cursor: pointer;
}
</style>
