<template>
  <section class="card-checklist">
    <div class="edit-card-checklist flex">
      <h3 class="edit-card-title"><i class="el-icon-finished"></i></h3>
      <h3
        class="checklist-title flex"
        contenteditable="true"
        @keypress.enter.prevent="updateChecklistTitle"
        @blur="updateChecklistTitle"
      >
        {{ checklist.title }}
      </h3>
    </div>
    <section class="progress-bar-container flex f-row">
      <h5 class="progress-bar-title">
        {{ getPercentage }}
      </h5>
      <div class="progress-bar flex">
        <div
          class="progress-bar-percent"
          :style="{ width: getPercentage }"
        ></div>
      </div>
    </section>
    <div class="checklist-list-container">
      <ul v-if="checklist.todos">
        <li class="flex"
          v-for="(todo, index) in checklist.todos"
          :index="index"
          :key="todo.id"
        >
          <button class="checklist-btn-remove-todo" @click="onRemoveTodo(index)">
            <i class="el-icon-close"></i>
          </button>

          <label
            v-if="todo.isDone"
            :style="{ 'text-decoration': 'line-through' }"
          >
            <input class="checkbox" type="checkbox" v-model="todo.isDone" @change="onCheckbox" />
            {{ todo.title }}
          </label>

          <label v-else :style="{ 'text-decoration': 'none' }">
            <input class="checkbox" type="checkbox" v-model="todo.isDone" @change="onCheckbox" />
            {{ todo.title }}
          </label>
        </li>
      </ul>
    </div>
    
    <button class="checklist-btn-add-item clr-btn" v-if="!isAddTodoForm" @click="onAddTodoForm">
      Add an item
    </button>
    <form class="add-todo-item-container flex" v-if="isAddTodoForm" @submit.prevent="onAddTodo">
      <input
        class="checklist-input"
        type="text"
        placeholder="Add an item"
        v-model="tmpTodo.title"
      />
      <button class="checklist-btn-add-todo clr-btn">Add</button>
      <button class="checklist-btn close-add-todo close" @click="onCloseAddTodo">
        <i class="el-icon-close"></i>
      </button>
    </form>
  </section>
</template>

<script>
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
            isAddTodoForm: false,
        };
    },
    computed: {
        getPercentage() {
            const doneCount = this.checklist.todos.reduce(
                (acc, todo) => (acc += todo.isDone ? 1 : 0),
                0
            );
            if (doneCount === 0) {
                return "0";
            } else {
                return (
                    ((doneCount / this.checklist.todos.length) * 100).toFixed(
                        0
                    ) + "%"
                );
            }
        },
    },
    methods: {
        onCheckbox() {
            this.$emit("updateCard");
        },
        onAddTodo() {
            this.tmpTodo.id = utilService.makeId();
            let newTodo = JSON.parse(JSON.stringify(this.tmpTodo));
            this.checklist.todos.splice(
                this.checklist.todos.length,
                0,
                newTodo
            );
            this.tmpTodo.title = "";
            this.$emit("updateCard");
        },
        onRemoveTodo(index) {
            this.checklist.todos.splice(index, 1);
            this.$emit("updateCard");
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
            this.$emit("updateCard");
        },
    },
};
</script>