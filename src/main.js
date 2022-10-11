import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/css/reset.css'
import './assets/css/iconfont.css'
import api from './api/index'
//echarts
import * as echarts from 'echarts'
console.log('---echarts', echarts)
Vue.prototype.$echarts = echarts

Vue.prototype.$api = api

//导入语言
//import './lang/index'
import i18n from './lang/index'

import './router/permission'

import './utils/localStorage'

Vue.config.productionTip = false

new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')
