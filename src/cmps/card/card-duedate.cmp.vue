<template>
    <div class="block">
        <el-date-picker
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
        currDueDate: Date,
    },
    data() {
        return {
            newDueDate: new Date(this.currDueDate)
        };
    },
    methods: {
        emitDueDateChange() {
            this.$emit("setDueDate", this.newDueDate);
        },
    },
};
</script>