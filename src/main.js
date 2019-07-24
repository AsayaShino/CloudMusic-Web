import Vue from 'vue'
import App from './App.vue'
import store from './store'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import axios from 'axios'

Vue.use(iView)
Vue.prototype.axios = axios

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
