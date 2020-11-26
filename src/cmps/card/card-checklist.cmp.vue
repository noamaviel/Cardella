<template>
    <section>
        <div >
            <h3>{{ checklist.title }}</h3>
        </div>
        <ul v-if="checklist.todos">
            <li v-for="(todo, index) in checklist.todos" :index="index" :key="todo.id">
                <label v-if="todo.isDone" :style="{ 'text-decoration': 'line-through' }" >
                    <input type="checkbox" v-model="todo.isDone" @change="onCheckbox"/>
                    {{ todo.title }}
                </label>

                <label v-else :style="{ 'text-decoration': 'none' }">
                    <input type="checkbox" v-model="todo.isDone" @change="onCheckbox"/>
                    {{ todo.title }}
                </label>
            </li>
        </ul>
    </section>
</template>

<script>
// import cardEdit from "../card/card-edit.cmp.vue";

export default {
    props: {
        checklist: Object,
    },
    data() {
        return {
            // checklist: {
            //     id: "",
            //     title: "",
            //     todos: [
            //         {
            //             id: "",
            //             title: "",
            //             isDone: false,
            //         },
            //     ],
            // },
        };
    },
    methods: {
         onCheckbox() {
            // noteService.updateLocalStorage();
            console.log('checkbox clicked')
           
        }
    },
    components: {
        // cardEdit,
    },
    created() {},
};
</script>

<style scoped>
</style>