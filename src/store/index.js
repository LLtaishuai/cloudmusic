import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用户登录信息，每次刷新页面从localstorage中取
    userInfo: JSON.parse(localStorage.getItem('userInfo'))
  },
  getters: {
  },
  mutations: {
    // 保存用户信息
    saveUser (state, rightData) {
      state.userInfo = rightData
      localStorage.setItem('userInfo', JSON.stringify(rightData))
    }
  },
  actions: {
  },
  modules: {
  }
})
