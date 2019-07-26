import Vue from 'vue'
import App from './App.vue'
import store from './store'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import { post, commit, timestamp } from './comdat'

Vue.use(iView)
Vue.prototype.post = post
Vue.prototype.commit = commit
Vue.prototype.timestamp = timestamp()

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
