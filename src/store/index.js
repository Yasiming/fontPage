import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    USERINFO: {}
  },
  getters: {},
  mutations: {
    USERINFO(state, payload) {
      state.USERINFO = payload
    }
  },
  actions: {
    userInfo(state, payload) {
      state.commit('USERINFO', payload)
    }
  },
  modules: {}
})
