<template>
    <section class="board-filter">
        <div class="filter-container">
            <input
                type="text"
                placeholder="Search"
                v-model="filterBy.txt"
                @input="onSearchTxt"
            /><i class="el-icon-search"></i>
        </div>
        <button @click.stop.prevent="onCleanSearch">X</button>
        
    </section>
</template>
<script>
export default {
    props: {},
    data() {
        return {
            filterBy: {
                txt: "",
            },
        };
    },
    computed: {
        filteredList() {
            return this.$store.getters.getFilteredList;
        },
    },
    methods: {
        onSearchTxt() {
            console.log("onSearchTxt", this.filterBy.txt);
            this.$store.dispatch({ type: "query", filterBy: this.filterBy });
        },
        onCleanSearch() {
          this.filterBy.txt = '';
          this.onSearchTxt();
        },
    },
    components: {
       
    },
    created() {},
};
</script>
