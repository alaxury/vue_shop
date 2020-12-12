import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import TreeTable from 'vue-table-with-tree-grid'

// 导入全局样式
import './assets/css/global.css'
// 导入字体图标库
import './assets/fonts/iconfont.css'

import axios from 'axios'

axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/'
// axios 拦截
axios.interceptors.request.use(config => {
  // NProgress.start()
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.component('tree-table', TreeTable)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
