import { userService } from '@/services/user-service.js';

var localLoggedinUser = null;
if (sessionStorage.user) localLoggedinUser = JSON.parse(sessionStorage.user);

export const userStore = {
	state: {
		loggedinUser: localLoggedinUser,
		users: [],
		isLogin: false,
	},
	getters: {
		users(state) {
			return state.users;
		},
		loggedinUser(state) {
			return state.loggedinUser;
		},
		isLogin(state) {
			return state.isLogin;
		},
	},
	mutations: {
		setUser(state, { user }) {
			state.loggedinUser = user;
		},
		setUsers(state, { users }) {
			state.users = users;
		},
		// removeUser(state, { userId }) {
		// 	state.users = state.users.filter((user) => user._id !== userId);
		// },
		setLoginSignUp(state, { action }) {
			if (action === 'login') state.isLogin = true;
			else state.isLogin = false;
		},
	},
	actions: {
		async login(context, { userCred }) {
			const user = await userService.login(userCred);
			context.commit({ type: 'setUser', user });
			return user;
		},
		async signup(context, { userCred }) {
			const user = await userService.signup(userCred);
			context.commit({ type: 'setUser', user });
			return user;
		},
		async logout(context) {
			await userService.logout();
			context.commit({ type: 'setUsers', users: [] });
			context.commit({ type: 'setUser', user: null });
			return;
		},
		async loadUsers(context) {
			const users = await userService.getUsers();
			context.commit({ type: 'setUsers', users });
		},
		// async removeUser(context, { userId }) {
		// 	await userService.remove(userId);
		// 	context.commit({ type: 'removeUser', userId });
		// },
		// async updateUser(context, { user }) {
		// 	user = await userService.update(user);
		// 	context.commit({ type: 'setUser', user });
		// },
	},
};