import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/login/Login' // 登录页
import Index from '@/components/Index' // 验证页
import Home from '@/components/home/Home'
Vue.use(VueRouter)

const routes = [
  
  {
    // 重定向到路径'/login'
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    // 使用meta在路由中携带附加信息
    meta: { 
      title: '登录',
      index: 1, // 根据index 确定前进或回退
      requiresAuth: false // 是否需要权限
    }
  },
  {
    path: '/index',
    name: 'Index',
    component: Index,
    meta: {
      title: '验证',
      index: 2, 
      requiresAuth: false 
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      title: '主页',
      index: 3, 
      requiresAuth: true 
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
