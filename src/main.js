import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css
import App from './App'
import router from './router'
import store from './store'
import i18n from './lang' // Internationalization
import './icons' // icon
import './errorLog' // error log
import * as filters from './filters' // global filters
<<<<<<< HEAD
import './mock' // simulation data
=======
// import './mock' // simulation data
>>>>>>> 759667730197835a878690b89b384df622d555d8
// font-awesome
import 'font-awesome/css/font-awesome.css'
/*
 * 注册 - 业务模块
 */
import dashboard from '@/module-dashboard/' // 面板
import base from '@/module-manage/' // 用户管理
import hmmm from '@/module-hmmm/' // 黑马面面

<<<<<<< HEAD
// 引入dayjs格式化时间
import dayjs from 'dayjs'
// 将dayjs挂载到全局
Vue.prototype.$dayjs = dayjs

// 过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
=======
import Component from '@/components'
Vue.use(Component) // 注册自己的插件
>>>>>>> 759667730197835a878690b89b384df622d555d8

Vue.use(dashboard, store)
Vue.use(base, store)
// Vue.use(list, store)
// Vue.use(form, store)
// Vue.use(details, store)
Vue.use(hmmm, store)

/*
 * 注册 - 组件
 */

// 饿了么
Vue.use(Element, {
  size: 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})
// 过滤器
<<<<<<< HEAD
// Object.keys(filters).forEach(key => {
//   Vue.filter(key, filters[key])
// })
=======
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
>>>>>>> 759667730197835a878690b89b384df622d555d8

Vue.config.productionTip = false

/* eslint-disable */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
