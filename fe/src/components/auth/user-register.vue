<template>
  <v-dialog v-model="show">
    <v-btn flat icon slot="activator">
      <v-icon>person_add</v-icon>
    </v-btn>
    <v-card>
      <v-form ref="form">
        <v-card-title>
          회원가입
        </v-card-title>
        <v-card-text>
          <v-text-field
          label="이메일"
          v-model="form.email"
          :rules="rules.email">
          </v-text-field>
          <v-text-field
          label="사용자명"
          v-model="form.username"
          :rules="rules.username">
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
          <v-btn flat @click="submit()">회원가입</v-btn>
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
        username: '',
        pwd: ''
      },
      rules: {
        email: [
          (v) => !!v || '이메일을 입력해주세요',
          (v) => /.+@+.+\.+../.test(v) || '올바른 이메일을 입력해주세요'
        ],
        username: [
          (v) => !!v || '사용자명을 입력해주세요',
          (v) => (v && v.length >= 2 && v.length <= 8) || '사용자명은 2자 이상 8자 이하입니다.'
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
        this.$axios.post(`${this.$cfg.path.api}auth/register`, this.form)
        .then((res) => {
          if (!res.data.success) throw new Error(res.data.msg)
          this.err.message = ''
          console.log('회원가입 완료')
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
