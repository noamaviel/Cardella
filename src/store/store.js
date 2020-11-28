import Vue from 'vue'
import Vuex from 'vuex'

import { boardStore } from './modules/board-store.js'
import { userStore } from './modules/user-store.js'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false
  },
  getters: {
    isLoading(state) {
      return state.isLoading;
    }
  },
  mutations: {
    setIsLoading(state, { isLoading }) {
      state.isLoading = isLoading;
    },
  },
  modules: {
    boardStore,
    userStore
  }
})
