<template>
    <div class="block">
        <span class="demonstration"></span>
        <el-date-picker
            v-model="value"
            type="datetime"
            placeholder="Select date and time"
            default-time="12:30:00"
        >
        </el-date-picker>
    </div>
</template>

<script>
export default {
    data() {
        return {
            value: "",
        };
    },
};
</script>