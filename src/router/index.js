import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/login/Login' // 登录页
import Index from '@/components/Index' // 验证页
import Home from '@/components/Home' // 主页
import Video from '@/components/Video' // 视频页
import User from '@/components/User' // 用户页
import SearchMusic from '@/components/searchmusic/SearchMusic' // 搜索
import MvPlay from '@/components/home/MvPlay' // MV播放
import MusicPlay from '@/components/home/MusicPlay' // music播放
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
  { // 主页
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      title: '主页',
      index: 3, 
      requiresAuth: true 
    }
  },
  { // 音乐搜索
    path: '/searchmusic',
    name: 'searchMusic',
    component: SearchMusic,
    meta: {
      title: 'SearchMusic',
      index: 4, 
      requiresAuth: true 
    }
  },
  { // MV播放
    path: '/mvplay',
    name: 'MvPlay',
    component: MvPlay,
    meta: {
      title: 'MvPlay',
      index: 5, 
      requiresAuth: true 
    }
  },
  { // MV播放
    path: '/musicplay',
    name: 'MusicPlay',
    component: MusicPlay,
    meta: {
      title: 'MusicPlay',
      index: 6, 
      requiresAuth: true 
    }
  },
  { // 视频
    path: '/video',
    name: 'Video',
    component: Video,
    meta: {
      title: 'video',
      index: 7,
      requiresAuth: true
    }
  },
  { // 我的
    path: '/user',
    name: 'User',
    component: User,
    meta: {
      title: 'User',
      index: 8,
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
