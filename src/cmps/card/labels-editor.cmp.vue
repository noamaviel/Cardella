<template>
    <section>
        <form @submit.prevent="onCustomLabel" v-if="isCustomEdit">
            <input type="text" v-model="customLabelTitle" />
            <button>Save</button>
            <button @click.prevent="onCloseCustomEdit">X</button>
        </form>
        <ul>
            <li
                v-for="(label, index) in labelsPallette"
                :key="label.id"
                :style="{ backgroundColor: label.color }"
                @click="onAddLabel(index)"
            >
                {{ label.title }}
                <button @click.stop="onLabelEdit(index)">Edit</button>
            </li>
        </ul>
    </section>
</template>

<script>
import { utilService } from "../../services/util-service.js";

export default {
    props: {
        labels: Array,
    },
    data() {
        return {
            isCustomEdit: false,
            customLabelIndex: 0,
            customLabelTitle: "",
            labelsPallette: [
                {
                    id: "101",
                    title: "Fun",
                    color: "#A54657",
                },
                {
                    id: "102",
                    title: "High Priority",
                    color: "#582630",
                },
                {
                    id: "103",
                    title: "Low Priority",
                    color: "#F7EE7F",
                },
                {
                    id: "104",
                    title: "Back-end",
                    color: "#3D5467",
                },
                {
                    id: "105",
                    title: "Front-end",
                    color: "#F1A66A",
                },
                {
                    id: "106",
                    title: "Extra",
                    color: "#F26157",
                },
            ],
        };
    },
    methods: {
        onAddLabel(index) {
            let tmpLabel = JSON.parse(
                JSON.stringify(this.labelsPallette[index])
            );
            tmpLabel.id = utilService.makeId();
            this.labels.splice(this.labels.length, 0, tmpLabel);
        },
        onLabelEdit(index) {
            this.isCustomEdit = true;
            this.customLabelTitle = this.labelsPallette[index].title;
            this.customLabelIndex = index;
        },
        onCustomLabel() {
            console.log("onCustomLabel", this.customLabelTitle);
            this.labelsPallette[
                this.customLabelIndex
            ].title = this.customLabelTitle;
            this.isCustomEdit = false;
        },
        onCloseCustomEdit() {
            this.isCustomEdit = false;
        },
    },
    components: {},
    created() {
       
    },
};
</script>
