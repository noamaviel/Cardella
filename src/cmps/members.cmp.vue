<template>
    <section class="board-avatar">
        <ul class="avatar-list flex">
            <li
                class="avatar"
                v-for="member in members"
                :key="member._id"
                :title="member.fullName"
            >
                <avatar
                    class="avatar"
                    :src="member.imgUrl"
                    :username="member.fullName"
                    :lighten="100"
                    :size="30"
                    background-color="#dfe1e6"
                    color="#172b4d"
                />
            </li>
        </ul>
    </section>
</template>

<script>
import Avatar from "vue-avatar";

export default {
    props: {
        members: Array,
    },
    data() {
        return {};
    },
    computed: {},
    methods: {},
    created() {},
    components: {
        Avatar,
    },
};
</script>