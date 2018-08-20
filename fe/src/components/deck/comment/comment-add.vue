<template>
  <v-form ref="form">
  <v-layout row>
    <v-textarea
    box
    auto-grow
    v-model="form.content"
    :rules="rules.content"
    counter="300">
    </v-textarea>
    <v-btn flat @click="submit()">
      등록
    </v-btn>
  </v-layout>
  </v-form>
</template>

<style>
textarea {
  margin-top: 0 !important;
}
</style>

<script>
export default {
  props: {
    target_id: { type: String, default: '' }
  },
  data () {
    return {
      path: 'data/deck/comment',
      form: {
        _target: '',
        _author: '',
        content: ''
      },
      rules: {
        content: [
          (v) => !!v || '1자 이상 입력하세요.',
          (v) => v.length <= 300 || '코멘트는 300자까지 등록 가능합니다.'
        ]
      }
    }
  },
  methods: {
    list () {
      this.$emit('list')
    },
    submit () {
      if (!this.$refs.form.validate()) return
      if (!this.$auth.isLoggedin) return

      const author = this.$auth.getUserInfo()._id
      if (author === null) return

      const form = this.form
      form._author = author
      form._target = this.target_id

      this.$axios.post(`${this.$cfg.path.api}${this.path}`, this.form)
      .then((res) => {
        if (!res.data.success) throw new Error(res.data.msg)
        this.form.content = ''
        this.list()
        console.log('등록됨')
      })
      .catch((err) => {
        console.log(err.message)
      })
    }
  }
}
</script>
