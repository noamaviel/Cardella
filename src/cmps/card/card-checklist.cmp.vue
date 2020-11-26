<template>
    <section>
        <div>
            <h3>{{ checklist.title }}</h3>
        </div>
        <ul v-if="checklist.todos">
            <li
                v-for="(todo, index) in checklist.todos"
                :index="index"
                :key="todo.id"
            >
                <label
                    v-if="todo.isDone"
                    :style="{ 'text-decoration': 'line-through' }"
                >
                    <input
                        type="checkbox"
                        v-model="todo.isDone"
                        @change="onCheckbox"
                    />
                    {{ todo.title }}
                </label>

                <label v-else :style="{ 'text-decoration': 'none' }">
                    <input
                        type="checkbox"
                        v-model="todo.isDone"
                        @change="onCheckbox"
                    />
                    {{ todo.title }}
                </label>
                <button @click="onRemoveTodo(index)">X</button>
            </li>
        </ul>
        <form @submit.prevent="onAddTodo">
            <input
                type="text"
                placeholder="Add your todo"
                v-model="tmpTodo.title"
            />
            <button>Add Todo</button>
        </form>
    </section>
</template>

<script>
// import cardEdit from "../card/card-edit.cmp.vue";
import {
    eventBus,
    EVENT_UPDATE_BOARD,
} from "../../services/eventbus-service.js";
import { utilService } from "../../services/util-service.js";

export default {
    props: {
        checklist: Object,
    },
    data() {
        return {
            tmpTodo: {
                id: "",
                title: "",
                isDone: false,
            },
        };
    },
    methods: {
        onCheckbox() {
            // noteService.updateLocalStorage();
            console.log("checkbox clicked");
            eventBus.$emit(EVENT_UPDATE_BOARD);
        },
        onAddTodo() {
            this.tmpTodo.id = utilService.makeId();
            let newTodo = JSON.parse(JSON.stringify(this.tmpTodo));
            console.log("onAddTodo", newTodo);
            this.checklist.todos.splice(this.checklist.todos.length, 0, newTodo);
            eventBus.$emit(EVENT_UPDATE_BOARD);
            this.tmpTodo.title = '';
        },
        onRemoveTodo(index) {
            console.log("onRemoveTodo", index);
            this.checklist.todos.splice(index, 1);
            eventBus.$emit(EVENT_UPDATE_BOARD);
        },
    },
    components: {
        // cardEdit,
    },
    created() {},
};
</script>

<style scoped>
</style>