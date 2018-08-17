// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import cfg from '../static/cfg'

import axios from 'axios'
import cookie from 'vue-cookie'

Vue.use(Vuetify)

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$cfg = cfg

const token = cookie.get('token')
if (token) axios.defaults.headers.common.Authorization = cookie.get('token')
axios.interceptors.response.use((res) => {
  if (res.data.token) cookie.set('token', res.data.token, { expires: '2m' })
  axios.defaults.headers.common.Authorization = cookie.get('token')
  return Promise.resolve(res)
}, (err) => {
  /*
  if (err.response.status === '401') {
    Vue.router.push({ name: 'deckList' })
    return
  }
  */
  return Promise.reject(err)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
