import Vue from 'vue'
import VueRouter from 'vue-router'
import homePage from '../views/home-page.vue'
import publicBoard from '../views/board.vue'
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
    name: 'Public Board',
    component: publicBoard,
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
  // {
  //   path: '/board/:boardId/list/:listId', 
  //   name: 'List',
  //   component: listCmp
  // },
  // {
  //   path: '/board/create',
  //   name: 'Create Board',
  //   component: createBoard
  // },
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
