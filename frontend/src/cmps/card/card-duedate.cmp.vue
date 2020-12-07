<template>
    <div class="block">
        <el-date-picker
            ref="picker"
            v-model="newDueDate"
            type="datetime"
            placeholder="Select date and time"
            format="dd/MM/yyyy HH:mm"
            @change="emitDueDateChange"
        >
        </el-date-picker>
    </div>
</template>

<script>
export default {
    props: {
        currTimestemp: Number,
    },
    data() {
        return {
            newDueDate: this.currTimestemp
                ? new Date(this.currTimestemp)
                : Date.now(),
        };
    },
    methods: {
        emitDueDateChange() {
            this.$emit("setDueDate", this.newDueDate.getTime());
        },
    },
    mounted() {
        this.$refs.picker.focus();
        this.$refs.picker.$el.getElementsByTagName("input")[0].style.display =
            "none";
    },
};
</script>