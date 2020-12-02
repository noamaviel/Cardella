<template>
  <section>
    <form @submit.prevent="onCustomLabel" v-if="isCustomEdit">
      <input type="text" v-model="customLabelTitle" />
      <button>Save</button>
      <button @click.prevent="onCloseCustomEdit">
        <i class="fas fa-times"></i>
      </button>
    </form>
    <ul class="flex f-center f-col">
      <li
        class="edit-label "
        v-for="(label, index) in labelsPallette"
        :key="label.id"
        :style="{ backgroundColor: label.bgcColor, color: label.color }"
        @click="onAddLabel(index)"
      >
        {{ label.title }}
        <button class="edit-label-btn clr-btn" @click.stop="onLabelEdit(index)">
          <i class="fas fa-pencil-alt"> </i>
        </button>
      
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
          bgcColor: "#A54657",
          color: "#F4F5F7",
        },
        {
          id: "102",
          title: "High Priority",
          bgcColor: "#582630",
          color: "#F4F5F7",
        },
        {
          id: "103",
          title: "Low Priority",
          bgcColor: "#F7EE7F",
          color: "$clr1",
        },
        {
          id: "104",
          title: "Back-end",
          bgcColor: "#6089AC",
          color: "#F4F5F7",
        },
        {
          id: "105",
          title: "Front-end",
          bgcColor: "#F1A66A",
          color: "$clr1",
        },
        {
          id: "106",
          title: "Extra",
          bgcColor: "#F26157",
          color: "$clr1",
        },
      ],
    };
  },
  methods: {
    onAddLabel(index) {
      let tmpLabel = JSON.parse(JSON.stringify(this.labelsPallette[index]));
      tmpLabel.id = utilService.makeId();
      this.labels.splice(this.labels.length, 0, tmpLabel);
      this.$emit("updateCard");
    },
    onLabelEdit(index) {
      this.isCustomEdit = true;
      this.customLabelTitle = this.labelsPallette[index].title;
      this.customLabelIndex = index;
    },
    onCustomLabel() {
      console.log("onCustomLabel", this.customLabelTitle);
      this.labelsPallette[this.customLabelIndex].title = this.customLabelTitle;
      this.isCustomEdit = false;
    },
    onCloseCustomEdit() {
      this.isCustomEdit = false;
    },
  },
  components: {},
  created() {},
};
</script>

