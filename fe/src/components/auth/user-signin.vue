<template>
  <v-dialog v-model="show">
    <v-btn flat icon slot="activator">
      <v-icon>lock_open</v-icon>
    </v-btn>
    <v-card>
      <v-form ref="form">
        <v-card-title>
          로그인
        </v-card-title>
        <v-card-text>
          <v-text-field
          label="이메일"
          v-model="form.email"
          :rules="rules.email">
          </v-text-field>
          <v-text-field
          label="비밀번호"
          v-model="form.pwd"
          :rules="rules.pwd">
          </v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <span v-if="err.message" class="isDanger">
            <v-icon color="error" small>warning</v-icon>{{ err.message }}
          </span>
          <v-btn flat @click="submit()">로그인</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.isDanger {
  color: #FF0000;
}
</style>

<script>
export default {
  data () {
    return {
      show: false,
      err: {
        message: ''
      },
      form: {
        email: '',
        pwd: ''
      },
      rules: {
        email: [
          (v) => !!v || '이메일을 입력해주세요',
          (v) => /.+@+.+\.+../.test(v) || '올바른 이메일을 입력해주세요'
        ],
        pwd: [
          (v) => !!v || '비밀번호를 입력해주세요',
          (v) => (v && v.length >= 6) || '비밀번호는 6자리 이상 입력해주세요'
        ]
      }
    }
  },
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        this.$axios.post(`${this.$cfg.path.api}auth/sign/in`, this.form)
        .then((res) => {
          if (!res.data.success) throw new Error(res.data.msg)
          this.err.message = ''
          console.log('로그인됨', res.data.token)
          this.show = false
        })
        .catch((err) => {
          this.err.message = err.message
          console.log(err.message)
        })
      }
    }
  },
  watch: {
    show (val) {
      if (!val) this.$refs.form.reset()
    }
  }
}
</script>
