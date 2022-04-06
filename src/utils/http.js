import Vue from 'vue'
import { Toast } from 'vant'
import axios from 'axios'
Vue.use(Toast)

// 新建一个axios实例，并配置
const http = axios.create({
  baseURL: 'http://localhost:3000',
  // 允许跨域请求携带cookie
  withCredentials: true
})

// 响应拦截
http.interceptors.response.use(config => {
  // 对响应数据做什么
  return config
}, error => {
  // 对响应错误做什么
  if (error.response.status === 404) {
    Toast(error.response.data.message)
  } else {
    Toast('服务器异常')
  }
  return Promise.reject(error)
})
// 请求拦截
http.interceptors.request.use(config => {

  // 添加时间戳，防止缓存
  if (config.method === 'post') {
    // 传递参数cache 走缓存
    if (config.data.cache) {
      return config
    }
    // config.data = {
    //   ...config.data,
    //   timestamp: Date.parse(new Date())
    // }
    // 时间戳必须拼接在URL上
    config.url += '?timestamp=' + Date.parse(new Date())
  }
  return config
})

// 封装get、post请求

const get = (url, params, config) => {
  params = params || {}
  config = config || {}
  return new Promise((resolve, reject) => {
    http.get(url, { params: params}, config)
    .then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
  })
  })
}
const post = (url, params, config) => {
  params = params || {}
  config = config || {}
  return new Promise((resolve, reject) => {
    http.post(url, params, config)
    .then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
  })
  })
}
export default {
  post,
  get
}