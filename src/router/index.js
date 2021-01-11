import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('views/login/Login')
const Home = () => import('views/home/Home')

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home
    }
  ],
  mode: 'history'
})

router.beforeEach((to, from, next) => {

  // 所有这个项目的组件除了login都得登录后才能看到,所以使用前置守卫进行判断
  if (to.path === '/login') return next()
  sessionStorage.getItem('token') ? next() : next('/login')
})

export default router