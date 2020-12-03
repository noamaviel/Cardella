<template>
    <section class="board-filter">
        <div class="filter-container">
            <input type="text" placeholder="Search" v-model="filterBy.txt" @input="onSearchTxt"/><i
                class="fas fa-search"
            ></i>
        </div>
        <h3 v-if="filteredList.length">{{ filteredList[0].lists[0].title }}</h3>
    </section>
</template>
<script>
// import { boardService } from "../../services/board-service.js";
export default {
    props: {},
    data() {
        return {
            filterBy: {
                txt: "",
            },
            filteredList: [],
        };
    },
    computed: {
       
    },
    methods: {
       onSearchTxt() {
            console.log("onSearchTxt", this.filterBy.txt);
            // let searchResult = boardService.getBoards(this.filterBy);
            this.$store.dispatch({ type: "query", filterBy: this.filterBy });
            let getter = this.$store.getters.getFilteredList;
            console.log("onSearchTxtGetter", getter);
            this.filteredList = getter;
        },
    },
    components: {},
    created() {},
};
</script>
