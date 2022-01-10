import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

axios.defaults.baseURL = 'http://localhost:3000'

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
