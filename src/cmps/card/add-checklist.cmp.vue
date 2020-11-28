<template>
    <section>
        <h1>Add checklist</h1>
        <form @submit.prevent="onAddChecklist">
            <input
                type="text"
                v-model="tmpChecklist.title"
                placeholder="Add checklist title"
            />
            <button>Add</button>
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
            console.log("onAddChecklist", newChecklist);
            this.$emit('newChecklist', newChecklist);
            // this.checklists.splice(this.checklists.length, 0, newChecklist);
            // this.$store.dispatch({ type: "updateBoardV2", board: this.board });
            this.tmpChecklist.title = '';
            // this.isAddChecklist = false;
        },
    },
    components: {},
    created() {},
};
</script>
