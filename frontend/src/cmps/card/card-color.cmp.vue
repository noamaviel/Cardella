<template>
    <section>
        <ul class="colors-container flex ">
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
                style="background-color: #FFFFFF"
                @click="changeColor($event, '#FFFFFF')"
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

