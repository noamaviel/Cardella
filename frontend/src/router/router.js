import Vue from 'vue'
import VueRouter from 'vue-router'
import homePage from '../views/home-page.vue'
import board from '../views/board.vue'
// import createBoard from '../views/board-create.vue'
import login from '../views/login-signup.vue'
import userDetails from '../views/user-details.vue'
// import listCmp from '../cmps/list/list.cmp.vue'  
import CardEdit from '../views/card-edit.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home Page',
    component: homePage
  },
  {
    path: '/board/:boardId?',
    name: 'Board',
    component: board,
    children: [
      {
        path: '/board/:boardId/list/:listId/card/:cardId',
        name: 'Card',
        component: CardEdit,
        meta: {
          showModal: true
        }
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: login
  },
  {
    path: '/user/:id?',
    name: 'User Details',
    component: userDetails
  },


]

const router = new VueRouter({
  routes
})

export default router
