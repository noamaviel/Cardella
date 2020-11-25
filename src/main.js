import Vue from 'vue'
import app from './app.vue'
import './registerServiceWorker'
import router from './router/router'
import store from './store/store'
// import boardService from './services/board-service'


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(app)
}).$mount('#app')

