<template>
    <section>
       <section >
       
        <ul class="colors-container flex">
            <li class="color" style="background-color: #F6B6B4" @click="changeColor($event,'#F6B6B4')"></li>
            <li class="color" style="background-color: #C1C1C1" @click="changeColor($event, '#C1C1C1')"></li>
            <li class="color" style="background-color: #BFE4DD" @click="changeColor($event, '#BFE4DD' )"></li>
            <li class="color" style="background-color: #FFFFFF" @click="changeColor($event, '#FFFFFF')"></li>
            <li class="color" style="background-color: #F5FFC6" @click="changeColor($event, '#F5FFC6')"></li>

        </ul>
    </section>
    </section>
</template>

<script>
// import cardEdit from "../card/card-edit.cmp.vue";

export default {
    props: {},
    data() {
        return {
        };
    },
    methods: {
        changeColor(event, color) {
              this.$emit('setColor', color);
        },
    },
    components: {
        // cardEdit,
    },
    created() {
       
    }
}
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