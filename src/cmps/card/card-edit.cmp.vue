<template>
    <section
        class="card-edit"
        style="
            display: flex;
            padding: 10px;
            margin: 5px;
            border: 1px solid black;
            width: 400px;
            height: 400px;
            background-color: grey;
        "
    >
        <div class="main-area" style="flex-grow: 1">
            <button @click="onCloseCard">x</button>
            <h1>CARD EDIT!</h1>
            <h2>card.title</h2>
            <h4>list.title</h4>
            <h3>Members</h3>
            <!-- <members-cmp></members-cmp> -->
            <h3>Labels</h3>
            <!-- <labels-cmp>{{card.labels}}</labels-cmp> -->
            <h3>Due date</h3>
            <!-- <due-date-cmp>
            <label>
			<my-checkbox
				:value=""
				v-model=""
			/>
            date-picker input (consider a npm package)
		</label>            
        </due-date-cmp> -->
            <h3>Checklist</h3>
            <!-- <checklist-cmp>
            status bar
            todo list
            <button>Add an item</button>
        </checklist-cmp> -->
            <h3>Description</h3>
            <!-- <input
      type="textarea"
      v-model=""
      placeholder="Add a more detailed description..."
      rows="3" (consider)
      max-rows="6" (consider)
    /> -->
            <h3>Image</h3>
            <img src="" />
            <h3>Activity</h3>
            <!-- consider change to "Comments" as these are not activities -->
            <!-- <input type="text" placeholder="Write a comment... v-model="comment""/> -->
            <!-- <ul>
            <li v-for="comment in comments" :key="comment.id">{{ comment }}</li>
        </ul> -->
        </div>

        <div class="menu-area" style="display: flex; flex-direction: column">
            <button>Members</button>
            <button>Labels</button>
            <button>Checklist</button>
            <button>Due Date</button>
            <button>Upload Image</button>
            <button @click="onOpenColorPallette">Card Color</button>
            <card-color v-if="isDisplayColorPallette" @setColor="changeColor"/>
            <button>Delete card</button>
            <button @click="updateCard">save</button>
            <button @click="onCloseCard">cancel</button>
        </div>
    </section>
</template>

<script>
import cardColor from "../card/card-color.cmp"

export default {
    props: {
        card: Object,
    },
    data() {
        return {
            isDisplayColorPallette: false
            // comment: "",
        };
    },
    methods: {
        onCloseCard() {
            this.$emit('closeCard');
        },
        changeColor(color) {
            console.log('color:', color)
            this.isDisplayColorPallette = false;
            this.card.style.bgColor = color;
          //TODO - Set color of BGC
        },
        onOpenColorPallette() {
            console.log('color button clicked')
          this.isDisplayColorPallette = !this.isDisplayColorPallette;
        },
        updateCard() {},
    },
    components: {
    cardColor
    },
    created() {
        console.log('onCardEditCreated', this.card)
    }
};
</script>