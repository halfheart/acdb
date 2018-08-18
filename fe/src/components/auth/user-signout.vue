<template>
  <v-btn flat icon @click="signout()"><v-icon>lock</v-icon></v-btn>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    signout () {
      this.$axios.post(`${this.$cfg.path.api}auth/sign/out`)
      .then((res) => {
        if (!res.data.success) throw new Error(res.data.msg)
        console.log('로그아웃됨')
        this.$auth.destroyUserInfo()
        location.reload()
        this.$emit('isLoggedout')
      })
      .catch((err) => {
        console.log(err.message)
      })
    }
  }
}
</script>
