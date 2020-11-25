import Vue from 'vue'
import Vuex from 'vuex'

import { boardStore } from './modules/board-store.js'
import { listStore } from './modules/list-store.js'
import { cardStore } from './modules/card-store.js'
import { userStore } from './modules/user-store.js'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    boardStore,
    listStore,
    cardStore,
    userStore
  }
})
