<template>
  <v-layout row wrap justify-end align-center>
    <div v-if="date !== null">
      <v-icon small class="mr-3" title="작성 시간">date_range</v-icon>{{ $moment(date).fromNow() }}
    </div>
    <div v-if="view_cnt !== null">
      <v-icon small class="mx-3" title="조회수">visibility</v-icon>{{ view_cnt }}
    </div>
    <div v-if="cmt_cnt !== null">
      <v-icon small class="mx-3" title="댓글 수">chat_bubble</v-icon>{{ cmt_cnt }}
    </div>
    <div v-if="fav_cnt !== null">
      <v-icon small class="mx-3" title="좋아요 수">favorite</v-icon>{{ fav_cnt }}
    </div>
  </v-layout>
</template>

<script>
export default {
  props: {
    date: { type: Date, default: null },
    view_cnt: { type: Number, default: null },
    cmt_cnt: { type: Number, default: null },
    fav_cnt: { type: Number, default: null }
  },
  data () {
    return {

    }
  }
}
</script>
