<template>
    <section>
        <div>
            <h3
                contenteditable="true"
                @keypress.enter.prevent="updateChecklistTitle"
                @blur="updateChecklistTitle"
            >
                {{ checklist.title }}
            </h3>
           
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
        <button v-if="!isAddTodoForm" @click="onAddTodoForm">
            Add an item
        </button>
        <form v-if="isAddTodoForm" @submit.prevent="onAddTodo">
            <input
                type="text"
                placeholder="Add your todo"
                v-model="tmpTodo.title"
            />
            <button>Add Todo</button>
            <button @click="onCloseAddTodo">X</button>
        </form>
    </section>
</template>

<script>
// import cardEdit from "../card/card-edit.cmp.vue";

import { utilService } from "../../services/util-service.js";

export default {
    props: {
        checklist: Object,
        board: Object
    },
    data() {
        return {
            tmpTodo: {
                id: "",
                title: "",
                isDone: false,
            },
            isAddTodoForm: false,
        };
    },
    methods: {
        onCheckbox() {
            console.log("checkbox clicked");
             this.$store.dispatch({ type: "updateBoardV2", board: this.board });
        },
        onAddTodo() {
            this.tmpTodo.id = utilService.makeId();
            let newTodo = JSON.parse(JSON.stringify(this.tmpTodo));
            console.log("onAddTodo", newTodo);
            this.checklist.todos.splice(
                this.checklist.todos.length,
                0,
                newTodo
            );
            this.$store.dispatch({ type: "updateBoardV2", board: this.board });
            this.tmpTodo.title = "";
        },
        onRemoveTodo(index) {
            console.log("onRemoveTodo", index);
            this.checklist.todos.splice(index, 1);
            this.$store.dispatch({ type: "updateBoardV2", board: this.board });
        },
        onAddTodoForm() {
            this.isAddTodoForm = true;
            console.log("onAddTodoForm");
        },
        onCloseAddTodo() {
            this.isAddTodoForm = false;
        },
        updateChecklistTitle(ev) {
            if (this.checklist.title === ev.target.innerText) return;
            if (!ev.target.innerText) {
                ev.target.innerText = this.checklist.title;
                return;
            }
            this.checklist.title = ev.target.innerText;
            ev.target.blur();
             this.$store.dispatch({ type: "updateBoardV2", board: this.board });
        },
       
    },
    components: {
        // cardEdit,
    },
    created() {
       
    },
};
</script>

<style scoped>
</style>