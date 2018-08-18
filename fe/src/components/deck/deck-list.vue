<template>
  <v-layout column>
    <v-flex>
      <router-view transition="slide-y-transition" />
    </v-flex>
    <v-flex>
      <v-layout row wrap>
        <now-loading :show="pending" />
        <template v-if="!pending && d.cnt > 0">
          <v-flex v-for="(i, index) in d.ds" :key="index" md4 xs12>
            <v-card
            :to="'/deck/list/read?deck_id='+i._id">
              <v-card-media
              :src="imgPath(i.investigator_id._id)"
              height="150">
              </v-card-media>
              <v-card-title primary-title>
                <div>
                  <div class="headline">{{ i.name | flavor(15) }}</div>
                  <div class="mt-3">{{ i.introduce | flavor(50) }}</div>
                </div>
              </v-card-title>
              <v-card-title>
                <v-layout justify-space-between>
                  <span>{{ `작성자: ${i._author.username}` }}</span>
                  <span>{{ `${i.investigator_id.name} 덱` }}</span>
                </v-layout>
              </v-card-title>
              <v-divider />
              <v-card-text class="text-md-right">
                <span class="mr-3"><v-icon small class="mr-2" title="조회수">visibility</v-icon>{{ i.view_cnt }}</span>
                <span class="mr-3"><v-icon small class="mr-2" title="댓글 수">chat_bubble</v-icon>{{ i.cmt_ids.length }}</span>
                <span><v-icon small class="mr-2" title="좋아요 수">favorite</v-icon>{{ i._fav.length }}</span>
              </v-card-text>
            </v-card>
          </v-flex>
        </template>
        <template v-else-if="!pending && d.cnt > 0">
          데이터가 없습니다.
        </template>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import listMixin from '@/components/mixins/list-mixin'
import filterMixin from '@/components/mixins/filter-mixin'

import nowLoading from '@/components/now-loading'

export default {
  mixins: [
    listMixin,
    filterMixin
  ],
  components: {
    nowLoading
  },
  props: {
    limit: { type: Number, default: 0 }
  },
  data () {
    return {
      path: 'data/deck/',
      p: {
        page: 1,
        limit: this.limit,
        sort: -1,
        order: '_id'
      }
    }
  },
  created () {
    this.list()
  },
  methods: {
    list () {
      const q = {}
      const s = ''
      this.fetchList(this.path, q, s)
    },
    imgPath (_id) {
      return `http://localhost:3000/images/${_id}.jpg`
    },
    deckTotal (cards) {
      let qty = 0
      cards.forEach((i) => {
        qty += i.qty
      })

      return qty
    }
  }
}
</script>
