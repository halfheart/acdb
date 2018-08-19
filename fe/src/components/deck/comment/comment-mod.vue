<template>
  <v-form ref="form">
  <v-layout row>
    <v-textarea
    box
    append-icon="close"
    @click:append="close()"
    v-model="form.content"
    :rules="rules.content"
    counter="300"
    >
    </v-textarea>
    <v-btn flat @click="submit()">
      등록
    </v-btn>
  </v-layout>
  </v-form>
</template>
<script>
import commentAdd from './comment-add'
export default {
  extends: commentAdd,
  props: {
    comment_id: { type: String, default: '' },
    content: { type: String, default: '' }
  },
  data () {
    return {
      form: {
        _id: this.comment_id,
        content: this.content
      }
    }
  },
  methods: {
    submit () {
      this.$axios.put(`${this.$cfg.path.api}data/deck/comment`, {
        _id: this.form._id,
        content: this.form.content
      })
      .then((res) => {
        if (!res.data.success) throw new Error(res.data.msg)
        console.log('수정됨')
        this.list()
        this.close()
      })
      .catch((err) => {
        console.log(err.message)
      })
    },
    list () {
      this.$emit('list')
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>
