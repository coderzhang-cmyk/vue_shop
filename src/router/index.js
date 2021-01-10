import Vue from 'vue'
import VueRouter from 'vue-router'

const Home =() => import('views/home/Home')

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home
    }
  ],
  mode: 'history'
})

export default router