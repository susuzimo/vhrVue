import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    hidden:true,
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    hidden:true,
    component: Home
  },
  {
    path: '/home',
    name: '已',
    component: Home,
    children:[

    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
