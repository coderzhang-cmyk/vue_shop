import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('views/login/Login')
const Home = () => import('views/home/Home')
const Welcome = () => import('views/welcome/Welcome')
const Users = () => import('views/users/Users')
const Roles = () => import('views/roles/Roles')
const Rights = () => import('views/rights/Rights')
const Goods = () => import('views/goods/Goods')
const Params = () => import('views/params/Params')
const Categories = () => import('views/categories/Categories')
const Orders = () => import('views/orders/Orders')
const Reports = () => import('views/reports/Reports')

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
      redirect: '/welcome',
      component: Home,
      children: [
        {
          path: '/welcome',
          component: Welcome
        },
        {
          path: '/users',
          component: Users
        },
        {
          path: '/roles',
          component: Roles
        },
        {
          path: '/rights',
          component: Rights
        },
        {
          path: '/goods',
          component: Goods
        },
        {
          path: '/params',
          component: Params
        },
        {
          path: '/categories',
          component: Categories
        },
        {
          path: '/orders',
          component: Orders
        },
        {
          path: '/reports',
          component: Reports
        }
      ]
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