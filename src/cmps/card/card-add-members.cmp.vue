<template>
    <el-select
        v-model="cardMemberIds"
        multiple
        placeholder="Select member/s"
        @change="emitCardMembersChange"
    >
        <el-option
            v-for="member in boardMembers"
            :key="member._id"
            :label="member.fullName"
            :value="member._id"
        >
        </el-option>
    <members-cmp :members="boardMembers" />
    </el-select>
</template>

<script>
import membersCmp from "@/cmps/members.cmp.vue";

export default {
    props: {
        currCardMembers: Array,
        boardMembers: Array,
    },
    data() {
        return {
            cardMemberIds: this.currCardMembers.map((member) => member._id),
        };
    },
    methods: {
        getMemberById(memberId) {
            return this.boardMembers.find((member) => member._id === memberId);
        },
        emitCardMembersChange() {
            const newCardMembers = this.cardMemberIds.map((id) =>
                this.getMemberById(id)
            );
            this.$emit("setCardMembers", newCardMembers);
        },
    },
    components: {
        membersCmp,
    },
};
</script>
