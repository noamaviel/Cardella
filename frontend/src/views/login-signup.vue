<template>
	<section class="login flex f-col f-center">
		<h4 class="title">{{ titleToShow }}</h4>
		<form @submit.prevent="sendUserDetails" class="flex f-col">
			<input v-if="!isLogin" type="text" v-model="user.userName" placeholder="Enter Username" />
			<div class="pass">
				<input :type="showPass" v-model="user.password" placeholder="Enter Password" /><i
					:class="showPassClass"
					@click="isShowPass = !isShowPass"
				></i>
			</div>
			<button>{{ btnTextToShow }}</button>
		</form>
	</section>
</template>

<script>
export default {
	data() {
		return {
			user: {
				userName: '',
				password: '',
				isadmin: false,
			},
			isShowPass: false,
		};
	},
	methods: {
		async sendUserDetails() {
			if ((!this.isLogin && !this.user.userName) || !this.user.password) {
				console.log('Fill all the details!');
				return;
			}
			const res = await this.$store.dispatch({
				type: this.isLogin ? 'login' : 'signup',
				userCred: this.user,
			});
			if (res.err) {
				console.log('err',res.err);
			}
		},
	},
	computed: {
		titleToShow() {
			return this.isLogin ? 'Login' : 'Sign Up';
		},
		btnTextToShow() {
			return this.isLogin ? 'Login' : 'Sign Up';
		},
		showPass() {
			return this.isShowPass ? 'text' : 'password';
		},
		showPassClass() {
			return {
				'fas fa-eye': !this.isShowPass,
				'fas fa-eye-slash': this.isShowPass,
			};
		},
		isLogin() {
			return this.$store.getters.isLogin;
		},
	},
	watch: {},
};
</script>