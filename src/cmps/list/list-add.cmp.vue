<template>
    <section class="add-list">
        <button class="add-list-btn" v-if="!isNew" @click="onOpenNewList">
            + Add another list
        </button>
        <div v-else>
            <input
                type="text"
                v-model="newListTitle"
                placeholder="Enter list title..."
            />
            <button @click="addList">Add list</button>
            <button @click="onCloseNewList">X</button>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            isNew: false,
            newListTitle: "",
        };
    },
    methods: {
        onOpenNewList() {
            this.isNew = true;
        },
        onCloseNewList() {
            this.isNew = false;
        },
        addList() {
            this.$store.dispatch({
                type: "addList",
                listTitle: this.newListTitle,
            });
            this.isNew = false;
            this.newListTitle = "";
        },
    },
};
</script>
 