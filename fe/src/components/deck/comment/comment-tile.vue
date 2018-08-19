<template>
  <div>
    <v-layout class="mb-2" row justify-space-between>
      <div class="user-name">{{ author.username }}</div>
      <div v-if="$auth.isLoggedin && $auth.getUserInfo()._id === author._id">
        <a class="mr-3" @click="mod = true">수정</a>
        <comment-del @comment-deleted="list()" :comment_id="comment_id" />
      </div>
    </v-layout>
      <div class="mb-2" v-if="!mod">{{ content }}</div>
      <comment-mod
      v-if="mod"
      @close="mod = !mod"
      @list="list()"
      :comment_id="comment_id"
      :content="content" />
    <v-divider class="mb-2" />
  </div>
</template>

<style>
.user-name {
  font-weight: bold;
}
</style>

<script>
import commentDel from './comment-del'
import commentMod from './comment-mod'
export default {
  components: {
    commentDel,
    commentMod
  },
  props: {
    comment_id: { type: String, default: '' },
    content: { type: String, default: '' },
    author: { type: Object, default: '' },
    _parent: { type: String, default: '' },
    depth: { type: Number, default: 1 }
  },
  data () {
    return {
      mod: false,
      form: {
        _id: this.comment_id,
        content: this.content,
        _author: this.author._id
      }
    }
  },
  methods: {
    list () {
      this.$emit('list')
    }
  }
}
</script>
