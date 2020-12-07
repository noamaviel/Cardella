<template>
    <section class="add-checklist-container flex">
        <form @submit.prevent="onAddChecklist">
            <input
                type="text"
                v-model="tmpChecklist.title"
                placeholder="Add checklist title"
            />
            <button class="add-checklist-btn clr-btn">Add</button>
        </form>
    </section>
</template>

<script>
import { utilService } from "../../services/util-service.js";

export default {
    props: {
       
    },
    data() {
        return {
            tmpChecklist: {
                id: '',
                title: '',
                todos: [],
            },
        };
    },
    methods: {
        onAddChecklist() {
            this.tmpChecklist.id = utilService.makeId();
            let newChecklist = JSON.parse(JSON.stringify(this.tmpChecklist));
            this.$emit('newChecklist', newChecklist);
            this.tmpChecklist.title = '';
        },
    },
    components: {},
    created() {},
};
</script>
