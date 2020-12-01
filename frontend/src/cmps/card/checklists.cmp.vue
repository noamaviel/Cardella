<template>
    <section class="checklists">
        <ul v-if="checklists.length">
            <h3><i class="fas fa-check"></i> Checklists</h3>
            <li
                v-for="(checklist, index) in checklists"
                :index="index"
                :key="checklist.id"
            >
                <card-checklist
                    :checklist="checklist"
                    @updateCard="onUpdateCard"
                />
                <button class="delete-btn" @click="onRemoveChecklist(index)">
                    Delete
                </button>
            </li>
        </ul>
    </section>
</template>

<script>
import cardChecklist from "../card/card-checklist.cmp";

export default {
    props: {
        checklists: Array,
    },
    data() {
        return {};
    },
    methods: {
        onRemoveChecklist(index) {
            console.log("onRemoveCheclist", index);
            this.checklists.splice(index, 1);
            this.$emit("updateCard");
        },
        onUpdateCard() {
            this.$emit("updateCard");
        },
    },
    components: {
        cardChecklist,
    },
    created() {},
};
</script>
