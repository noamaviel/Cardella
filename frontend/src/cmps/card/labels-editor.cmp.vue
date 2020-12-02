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
        class="edit-label"
        v-for="(label, index) in labelsPallette"
        :key="label.id"
        :style="{ backgroundColor: label.color}"
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
          color: "#43798f",
        },
        {
          id: "102",
          title: "High Priority",
          color: "#2A9D8F",
        },
        {
          id: "103",
          title: "Low Priority",
          color: "#E9C46A",
        },
        {
          id: "104",
          title: "Back-end",
          color: "#F4A261",
        },
        {
          id: "105",
          title: "Front-end",
          color: "#E76F51",
        },
        {
          id: "106",
          title: "Extra",
          color: "#bdbdbd",
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

