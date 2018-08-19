<template>
  <v-dialog v-model="show">
    <a slot="activator">삭제</a>
    <confirm-card
    :title="title"
    :msg="msg"
    @click-confirm="del()"
    @click-cancel="close()" />
  </v-dialog>
</template>

<script>
import confirmCard from '@/components/confirm-card'
export default {
  props: {
    comment_id: { type: String, default: '' }
  },
  components: {
    confirmCard
  },
  data () {
    return {
      show: false,
      title: '댓글 삭제',
      msg: '정말 삭제하시겠습니까?',
      path: 'data/deck/comment'
    }
  },
  methods: {
    close () {
      this.show = false
    },
    del () {
      this.$axios.delete(`${this.$cfg.path.api}${this.path}`, {
        params: {
          _id: this.comment_id
        }
      })
      .then((res) => {
        if (!res.data.success) throw new Error(res.data.msg)
        this.$emit('comment-deleted')
        console.log('삭제됨')
        this.close()
      })
      .catch((err) => {
        console.log(err.message)
      })
    }
  }
}
</script>
