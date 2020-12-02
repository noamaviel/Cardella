<template>
    <section>
        <ul class="colors-container flex">
            <li
                class="color"
                style="background-color: #bfe4dd"
                @click="changeColor($event, '#bfe4dd')"
            ></li>
            <li
                class="color"
                style="background-color: #ffe9b2"
                @click="changeColor($event, '#ffe9b2')"
            ></li>
            <li
                class="color"
                style="background-color: #f5cfa4"
                @click="changeColor($event, '#f5cfa4')"
            ></li>
            <li
                class="color"
                style="background-color: #e0dfdf"
                @click="changeColor($event, '#e0dfdf')"
            ></li>
            <li
                class="color"
                style="background-color: #f6b6b4"
                @click="changeColor($event, '#f6b6b4')"
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