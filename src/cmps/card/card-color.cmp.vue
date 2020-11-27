<template>
    <section>
        <ul class="colors-container flex">
            <li
                class="color"
                style="background-color: #f6b6b4"
                @click="changeColor($event, '#F6B6B4')"
            ></li>
            <li
                class="color"
                style="background-color: #c1c1c1"
                @click="changeColor($event, '#C1C1C1')"
            ></li>
            <li
                class="color"
                style="background-color: #bfe4dd"
                @click="changeColor($event, '#BFE4DD')"
            ></li>
            <li
                class="color"
                style="background-color: #ffffff"
                @click="changeColor($event, '#FFFFFF')"
            ></li>
            <li
                class="color"
                style="background-color: #f5ffc6"
                @click="changeColor($event, '#F5FFC6')"
            ></li>
        </ul>
    </section>
</template>

<script>
export default {
    props: {},
    data() {
        return {};
    },
    methods: {
        changeColor(event, color) {
            this.$emit("setColor", color);
        },
    },
};
</script>

<style scoped>
.colors-container {
    display: flex;
    margin-top: 10px;
    align-items: center;
    justify-content: space-around;
    width: 120px;
    padding-right: 40px;
}

.color {
    cursor: pointer;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 1px solid rgb(59, 59, 59);
    margin-bottom: 3px;
}
</style>