<template>
  <section>
    <form @submit.prevent="onCustomLabel" v-if="isCustomEdit">
      <input type="text" v-model="customLabelTitle" />
      <button>Save</button>
      <button @click.prevent="onCloseCustomEdit">
        <i class="el-icon-close"></i>
      </button>
    </form>
    <ul class="labels-list flex f-center f-col">
      <li
        class="edit-label flex"
        v-for="(label, index) in labelsPallette"
        :key="label.id"
        :style="{ backgroundColor: label.color }"
        @click="onAddLabel(index)"
      >
        <p class="label-title">
          {{ label.title }}
        </p>

        <button class="edit-label-btn clr-btn" @click.stop="onLabelEdit(index)">
          <i class="el-icon-edit"> </i>
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
          title: "Clinical",
          color: "#43798f",
        },
        {
          id: "102",
          title: "Database",
          color: "#2A9D8F",
        },
        {
          id: "103",
          title: "DM",
          color: "#E9C46A",
        },
        {
          id: "104",
          title: "Design",
          color: "#F4A261",
        },
        {
          id: "105",
          title: "TBD",
          color: "#E76F51",
        },
        {
          id: "106",
          title: "TBD",
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

