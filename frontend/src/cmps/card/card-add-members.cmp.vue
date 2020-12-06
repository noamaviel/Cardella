<template>
  <ul class="add-members flex f-col">
    <li
      class="edit-card-member flex f-row"
      v-for="user in users"
      :key="user._id"
      @click="toggleMember(user._id)"
    >
    
      <div class="avatar-img">
        <avatar
          class="avatar"
          :src="user.imgUrl"
          :username="user.fullName"
          :lighten="100"
          :size="30"
          background-color="#dfe1e6"
          color="#172b4d"
        />
      </div>
      <i v-if="user.isSelected" class="fas fa-check"></i>
      <span class="member-name"> {{ user.fullName }}</span>
      
    </li>
  </ul>
</template>

<script>
import Avatar from "vue-avatar";

export default {
  props: {
    currCardMembers: Array,
    boardMembers: Array,
  },
  data() {
    return {
      users: [],
    };
  },
  methods: {
    emitCardMembersChange() {
      const copyOfUsers = JSON.parse(JSON.stringify(this.users));
      const newCardUsers = copyOfUsers.filter(
        (user) => user.isSelected === true
      );
      newCardUsers.forEach((user) => delete user.isSelected);
      console.log(
        "🚀 ~ file: card-add-members.cmp.vue ~ line 47 ~ emitCardMembersChange ~ newCardUsers",
        newCardUsers
      );
      this.$emit("setCardMembers", newCardUsers);
    },
    toggleMember(memberId) {
      const user = this.users.find((user) => user._id === memberId);
      user.isSelected = !user.isSelected;
      this.emitCardMembersChange();
    },
  },
  created() {
    const users = JSON.parse(JSON.stringify(this.boardMembers));
    users.forEach((user) => {
      if (this.currCardMembers.find((member) => member._id === user._id))
        user.isSelected = true;
      else user.isSelected = false;
    });
    this.users = users;
  },

  components: {
    Avatar,
  },
};
</script>
