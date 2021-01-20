import Vue from 'vue'
import App from './App.vue'
import router from 'router'
import 'hungry'
import 'assets/font/iconfont.css'
import ZkTable from 'vue-table-with-tree-grid'
import VueQuillEditor from 'vue-quill-editor'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// 注册渲染表格的组件
Vue.component('tree-table', ZkTable)

Vue.use(VueQuillEditor)

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()

Vue.filter('formatDate', (val) => {
  const date = new Date(val);
  const y = date.getFullYear();
  const m =
    date.getMonth() + 1 > 10
      ? date.getMonth() + 1
      : `0${date.getMonth() + 1}`;
  const d = date.getDate() > 10 ? date.getDate() : `0${date.getDate()}`;
  const h = date.getHours() > 10 ? date.getHours() : `0${date.getHours()}`;
  const b =
    date.getMinutes() > 10 ? date.getMinutes() : `0${date.getMinutes()}`;
  const s =
    date.getSeconds() > 10 ? date.getSeconds() : `0${date.getSeconds()}`;
  return `${y}-${m}-${d} ${h}:${b}:${s}`;

})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
