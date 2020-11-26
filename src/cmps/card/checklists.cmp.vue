<template>
    <section>
        <ul v-if="checklists">
            <li
                v-for="(checklist, index) in checklists"
                :index="index"
                :key="checklist.id"
            >
                <button @click="onRemoveChecklist(index)">
                    Delete Checklist
                </button>
                <card-checklist :checklist="checklist" />
            </li>
        </ul>
    </section>
</template>

<script>
// import cardEdit from "../card/card-edit.cmp.vue";
// import {
//     eventBus,
//     EVENT_UPDATE_BOARD,
// } from "../../services/eventbus-service.js";
// import { utilService } from "../../services/util-service.js";
import cardChecklist from "../card/card-checklist.cmp";
import {
    eventBus,
    EVENT_UPDATE_BOARD,
} from "../../services/eventbus-service.js";

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
            eventBus.$emit(EVENT_UPDATE_BOARD);
        },
    },
    components: {
        cardChecklist,
    },
    created() {},
};
</script>

<style scoped>
</style>