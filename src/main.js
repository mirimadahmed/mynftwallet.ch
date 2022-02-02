import Vue from 'vue'
import App from './App.vue'
import Moralis from 'moralis'
import store from './store'
import router from './router'

Vue.config.productionTip = false

const serverUrl = process.env.VUE_APP_MORALIS_SERVER_URL
const appId = process.env.VUE_APP_MORALIS_APP_ID
Moralis.start({ serverUrl, appId })
const web3 = new Moralis.Web3();

Vue.prototype.$moralis = Moralis
Vue.prototype.$web3 = web3

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
