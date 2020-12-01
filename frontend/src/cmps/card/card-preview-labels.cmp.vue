<template>
    <section
        :class="{ 'labels-open': isTitled, 'labels-closed': !isTitled }"
        v-if="labels.length"
    >
        <ul class="labels-list flex">
            <li class="li-label flex"
                v-for="(label, index) in labels"
                :key="label.id"
                @click.prevent="onIsTitled"
                :style="{ backgroundColor: label.color }"
            >
                {{ labelForLiDisplay(label.title) }}
                <button @click.stop.prevent="onRemoveLabel(index)" v-if="isTitled"><i class="fas fa-times"></i></button>
            </li>
        </ul>
    </section>
</template>

<script>
export default {
    props: {
        labels: Array,
    },
    data() {
        return {
            isTitled: false,
        };
    },
    methods: {
        onIsTitled() {
            this.isTitled = !this.isTitled;
        },
        labelForLiDisplay(title) {
            if (this.isTitled) return title
            else return '...'
        },
        onRemoveLabel(index) {
            this.labels.splice(index, 1);
            this.$emit('updateCard');
        }
    },
    components: {},
    created() {},
};
</script>
