<template>
    <div class="color-picker flex">
        <div
            v-for="(color, idx) in colors"
            :style="{ backgroundColor: color }"
            @click="selectColor(color)"
            :key="idx"
            class="color-square"
        ></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            colors: [
                "#ececec",
                "#5699b4",
                "#2fb3a3",
                "#ffd56b",
                "#f8a663",
                "#e66646",
                "#bdbdbd",
                "#2f2f2f",
            ],
        };
    },
    methods: {
        selectColor(color) {
            this.$emit("setBgc", color);
        },
    },
};
</script>

    