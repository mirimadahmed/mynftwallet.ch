import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

/* eslint-disable no-new */
const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    user: null,
    nfts: {
      "eth": [],
      "bsc": [],
      "matic": [],
      "avalanche": [],
      "fantom": [],
    },
  },
  getters: {
    isLoggedIn(state) {
      return state.user
    },
    nfts(state) {
      return state.nfts
    },
  },
  mutations: {
    setAuthentication(state, user) {
      state.user = user;
    },
    setNFTs(state, payload) {
      state.nfts[payload.chain] = payload.nfts;
    }
  }
})

export default store
