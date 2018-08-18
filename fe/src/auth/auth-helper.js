import VueCookie from 'vue-cookie'
import cfg from '../../static/cfg'

export default {
  setUserInfo (token, _id, username, email) {
    const exp = { expires: cfg.cookie.expiresIn }
    VueCookie.set('token', token, exp)
    VueCookie.set('user_id', _id, exp)
    VueCookie.set('username', username, exp)
    VueCookie.set('useremail', email, exp)
  },
  destroyUserInfo () {
    VueCookie.delete('token')
    VueCookie.delete('user_id')
    VueCookie.delete('username')
    VueCookie.delete('useremail')
  },
  getUserInfo () {
    return {
      token: VueCookie.get('token'),
      username: VueCookie.get('username'),
      email: VueCookie.get('useremail'),
      _id: VueCookie.get('user_id')
    }
  },
  isLoggedin () {
    const token = VueCookie.get('token')
    if (token) return true
    return false
  }
}
