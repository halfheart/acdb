<template>
  <v-card height="100%">
    <v-container>
      <template v-if="comments.length > 0">
        <comment-tile
        v-for="(i, index) in comments"
        :key="i._id"
        @list="list()"
        :comment_id="i._id"
        :author="i._author"
        :content="i.content"
        />
      </template>
      <template v-else>
        <v-layout justify-center>
          <div class="mt-4 mb-5">
            <v-icon>chat_bubble_outline</v-icon>등록된 댓글이 없습니다.
          </div>
        </v-layout>
      </template>
      <comment-add @list="list()" :target_id="target_id" />
    </v-container>
  </v-card>
</template>

<script>
import commentTile from './comment-tile'
import commentAdd from './comment-add'
export default {
  props: {
    comments: { type: Array, default: null },
    target_id: { type: String, default: '' }
  },
  components: {
    commentTile,
    commentAdd
  },
  data () {
    return {

    }
  },
  methods: {
    list () {
      this.$emit('list')
    }
  }
}
</script>
