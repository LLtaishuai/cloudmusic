import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/login/Login' // 登录页
import Register from '@/components/Register' // 注册页
import Index from '@/components/Index' // 验证页
import Scan from '@/components/Scan' // 扫码
import Auth from '@/components/Auth' // 验证码
import Home from '@/components/Home' // 主页
import Hot from '@/components/Hot' // 热点页
import User from '@/components/User' // 用户页
import SearchMusic from '@/components/searchmusic/SearchMusic' // 搜索
import MvPlay from '@/components/home/MvPlay' // MV播放
import MusicPlay from '@/components/home/MusicPlay' // music播放
import DayMusic from '@/components/home/DayMusic' // 每日推荐
import Radio from '@/components/home/Radio' // 电台
import Singer from '@/components/home/Singer' // 歌手
import Video from '@/components/home/Video' // 歌手
Vue.use(VueRouter)

const routes = [
  
  {
    // 重定向到路径'/login'
    path: '/',
    redirect: '/login'
  },
  { // login
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
  { // register
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { 
      title: '注册',
      index: 1, // 根据index 确定前进或回退
      requiresAuth: false // 是否需要权限
    }
  },
  { // index
    path: '/index',
    name: 'Index',
    component: Index,
    meta: {
      title: '验证',
      index: 2, 
      requiresAuth: false 
    }
  },
  { // 扫码登录
    path: '/scan',
    name: 'Scan',
    component: Scan,
    meta: {
      title: '扫码登录',
      index: 2, 
      requiresAuth: false 
    }
  },
  { // 验证码登录
    path: '/auth',
    name: 'Auth',
    component: Auth,
    meta: {
      title: '验证码登录',
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
  { // 视频播放
    path: '/mvplay',
    name: 'MvPlay',
    component: MvPlay,
    meta: {
      title: 'MvPlay',
      index: 5, 
      requiresAuth: true 
    }
  },
  { // 音乐播放
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
    path: '/hot',
    name: 'Hot',
    component: Hot,
    meta: {
      title: 'hot',
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
  },
  { // 每日推荐
    path: '/daymusic',
    name: 'DayMusic',
    component: DayMusic,
    meta: {
      title: 'DayMusic',
      index: 9,
      requiresAuth: true
    }
  },
  { // 电台
    path: '/radio',
    name: 'Radio',
    component: Radio,
    meta: {
      title: 'Radio',
      index: 10,
      requiresAuth: true
    }
  },
  { // 视频
    path: '/video',
    name: 'Video',
    component: Video,
    meta: {
      title: 'Video',
      index: 11,
      requiresAuth: true
    }
  },
  { // 歌手
    path: '/singer',
    name: 'Singer',
    component: Singer,
    meta: {
      title: 'Singer',
      index: 12,
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
