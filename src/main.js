import Vue from 'vue'
import App from './App.vue'
import store from './store'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import { get } from './comdat'

Vue.use(iView)
Vue.prototype.get = get

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
