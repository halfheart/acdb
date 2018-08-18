<template>
  <v-card height="100%">
    <v-card-text>
      <v-form ref="form">
      <v-layout column>
        <template v-for="(i, index) in d.ds">
          <div :key="index">{{ `${i._author.username}: ${i.content}` }}</div>
        </template>
        <v-layout row>
          <v-textarea
          box
          v-model="form.content"
          :rules="rules.content"
          counter="300">
          </v-textarea>
          <v-btn flat @click="submit()">
            등록
          </v-btn>
        </v-layout>
      </v-layout>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import listMixin from '@/components/mixins/list-mixin'

export default {
  mixins: [
    listMixin
  ],
  props: {
    target_id: { type: String, default: '' },
    cmt_ids: { type: Array, default: [] }
  },
  data () {
    return {
      path: 'data/deck/comment',
      form: {
        _target: '',
        _author: '',
        content: ''
      },
      comments: this.cmt_ids,
      rules: {
        content: [
          (v) => !!v || '1자 이상 입력하세요.',
          (v) => v.length <= 300 || '코멘트는 300자까지 등록 가능합니다.'
        ]
      }
    }
  },
  created () {
    this.fetchComments()
  },
  methods: {
    fetchComments () {
      console.log(this.comments)
      const q = { _id: { $in: this.comments } }
      const s = ''
      this.fetchList(this.path, q, s)
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

        this.comments.push(res.data.cmt_id)
        console.log(JSON.stringify(this.comments))

        this.fetchComments()
        console.log('등록됨')
      })
      .catch((err) => {
        console.log(err.message)
      })
    }
  }
}
</script>
