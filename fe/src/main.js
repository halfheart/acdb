// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import cfg from '../static/cfg'

import axios from 'axios'
import auth from './auth/auth-helper'
import mong from './helper/mongodb-helper'
import moment from 'moment'

moment.locale('ko')

Vue.use(Vuetify)

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$cfg = cfg
Vue.prototype.$auth = auth
Vue.prototype.$mong = mong
Vue.prototype.$moment = moment

axios.interceptors.request.use((config) => {
  const token = auth.getUserInfo().token
  config.headers.Authorization = token
  return config
}, (err) => {
  return Promise.reject(err)
})

axios.interceptors.response.use((res) => {
  const rtk = res.headers['www-authenticate']
  if (rtk) {
    axios.defaults.headers.common.Authorization = auth.getUserInfo().token
  }
  const userinfo = res.data.userinfo
  if (userinfo) {
    const _id = userinfo._id
    const username = userinfo.username
    const email = userinfo.email
    auth.setUserInfo(rtk, _id, username, email)
  }
  return Promise.resolve(res)
}, (err) => {
  return Promise.reject(err)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
