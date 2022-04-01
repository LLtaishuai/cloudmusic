import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from '@/utils/http.js' // 引入封装的axios
Vue.config.productionTip = false
Vue.prototype.$http = http // 全局挂载封装的axios方法
/* 全局使用视频播放插件  */
import Video from 'video.js'
import 'video.js/dist/video-js.css'
Vue.prototype.$video = Video
/*全局使用Toast*/
import { Toast } from 'vant'
Vue.use(Toast)
Vue.prototype.$toast = Toast
// 全局路由守卫
router.beforeEach((to, from, next) => {
  // 获取登录状态
  const isLogin = JSON.parse(localStorage.getItem('userInfo'))
  // 判断页面是否需要登录
  if (to.meta.requiresAuth) {
    if (isLogin) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
  // 如果要去login页面
  if (to.fullPath === '/login') {
    if (isLogin) {
      next('/home')
    } else {
      next()
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
