<template>
    <section class="list-menu">
        <h3>List actions</h3>
        <ul>
            <li @click="removeList">Delete list</li>
            <li v-if="!isNew" @click="onOpenNewCard">Add card</li>
            <div v-else>
                <input
                    type="text"
                    v-model="newCardTitle"
                    placeholder="Enter a title for this card..."
                />
                <button @click="addCard">Add card</button>
                <button @click="onCloseNewCard">X</button>
            </div>

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
        return {
            isNew: false,
            newCardTitle: "",
        };
    },
    methods: {
        onOpenNewCard() {
            this.isNew = true;
        },
        onCloseNewCard() {
            this.isNew = false;
        },
        removeList() {
            this.$store.dispatch({
                type: "removeList",
                listId: this.list.id,
            });
        },
        addCard() {
            this.$store.dispatch({
                type: "addCard",
                cardTitle: this.newCardTitle,
                listId: this.list.id,
            });
            this.isNew = false;
            this.newCardTitle = "";
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
