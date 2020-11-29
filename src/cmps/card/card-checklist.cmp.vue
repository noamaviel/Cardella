<template>
    <section class="card-checklist">
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
                <button class="checklist-btn" @click="onRemoveTodo(index)">
                    X
                </button>
            </li>
        </ul>
        <button
            class="checklist-btn"
            v-if="!isAddTodoForm"
            @click="onAddTodoForm"
        >
            Add an item
        </button>
        <form v-if="isAddTodoForm" @submit.prevent="onAddTodo">
            <input
                class="checklist-input"
                type="text"
                placeholder="Add your todo"
                v-model="tmpTodo.title"
            />
            <button class="checklist-btn">Add Todo</button>
            <button class="checklist-btn close" @click="onCloseAddTodo">X</button>
        </form>
    </section>
</template>

<script>
import { utilService } from "../../services/util-service.js";

export default {
    props: {
        checklist: Object,
        board: Object,
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
            let updtBoard = JSON.parse(JSON.stringify(this.board));
            this.$store.dispatch({ type: "updateBoardV2", board: updtBoard });
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
            let updtBoard = JSON.parse(JSON.stringify(this.board));
            this.$store.dispatch({ type: "updateBoardV2", board: updtBoard });
            this.tmpTodo.title = "";
        },
        onRemoveTodo(index) {
            this.checklist.todos.splice(index, 1);
            let updtBoard = JSON.parse(JSON.stringify(this.board));
            this.$store.dispatch({ type: "updateBoardV2", board: updtBoard });
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
            let updtBoard = JSON.parse(JSON.stringify(this.board));
            this.$store.dispatch({ type: "updateBoardV2", board: updtBoard });
        },
    },
};
</script>

<style scoped>
</style>