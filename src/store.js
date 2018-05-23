import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

Vue.use(Vuex)

const VuexLocal = new VuexPersist({
  // key: 'vuex',
  storage: window.localStorage,
  reducer: state => ({
    isLogin: state.isLogin
  })
})

export default new Vuex.Store({
  plugins: [
    VuexLocal.plugin
  ],
  state: {
    isLogin: false
  },
  mutations: {
    changeLoginState (state, newState) {
      state.isLogin = newState
    }
  },
  actions: {

  }
})
