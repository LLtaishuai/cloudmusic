import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: JSON.parse(localStorage.getItem('userInfo'))
  },
  getters: {
  },
  mutations: {
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
