<template>
  <div>
    <v-layout justify-space-between class="mb-2">
      <div class="user-name">{{ author.username }}</div>
      <div v-if="$auth.isLoggedin && $auth.getUserInfo()._id === author._id">
        <a class="mr-3" @click="edit()">수정</a>
        <comment-del @comment-deleted="list()" :comment_id="comment_id" />
      </div>
    </v-layout>
    <v-layout v-if="!mod">
      <div class="mb-2">{{ content }}</div>
    </v-layout>
    <comment-mod
    ref="modform"
    v-if="mod && $auth.isLoggedin && $auth.getUserInfo()._id === author._id"
    @close="mod = false"
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
    },
    edit () {
      if (!this.mod) this.mod = true
      else this.$refs.modform.submit()
    }
  }
}
</script>
