import Vue from 'vue'
import App from './App.vue'
import router from 'router'
import 'hungry'
import 'assets/font/iconfont.css'
import ZkTable from 'vue-table-with-tree-grid'
 
// 注册渲染表格的组件
Vue.component('tree-table', ZkTable)

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
