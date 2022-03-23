import Vue from 'vue'
import axios from 'axios'


// 新建一个axios实例，并配置
const http = axios.create({
  baseURL: 'http://localhost:3000'
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
    config.data = {
      ...config.data,
      timestamp: Date.parse(new Date())
    }
  }
  return config
})

// 封装get、post请求

const get = (url, params) => {
  params = params || {}
  return new Promise((resolve, reject) => {
    http.get(url, { params: params})
    .then(res => {
      resolve(res.data)
    }).catch(err => {
      Toast(err)
  })
  })
}
const post = (url, params) => {
  params = params || {}
  return new Promise((resolve, reject) => {
    http.post(url, params)
    .then(res => {
      resolve(res.data)
    }).catch(err => {
      Toast('请求失败')
  })
  })
}
export default {
  post,
  get
}