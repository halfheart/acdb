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
             height="100%"
            :to="'/deck/list/read?deck_id='+i._id">
              <v-card-media
              :src="imgPath(i.investigator_id._id)"
              height="150">
              </v-card-media>
              <v-card-title primary-title :class="$style.introduce">
                <div>
                  <div class="headline">{{ i.name | flavor(15) }}</div>
                  <div class="mt-3">{{ i.introduce | flavor(50) }}</div>
                </div>
              </v-card-title>
              <v-card-text>
                <v-layout>
                  {{ `${i._author.username}` }}
                  <v-spacer />
                  <card-popover :card="i.investigator_id" />덱
                </v-layout>
              </v-card-text>
              <v-divider />
              <v-card-text>
                <content-info
                :date="$mong.getDate(i._id)"
                :view_cnt="i.view_cnt"
                :cmt_cnt="i.cmt_ids.length"
                :fav_cnt="i._fav.length" />
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

<style module>
.introduce {
  min-height: 130px;
  align-items: start;
}
</style>

<script>
import listMixin from '@/components/mixins/list-mixin'
import filterMixin from '@/components/mixins/filter-mixin'

import nowLoading from '@/components/now-loading'
import contentInfo from '@/components/content-info'
import cardPopover from '@/components/card/card-popover'

export default {
  mixins: [
    listMixin,
    filterMixin
  ],
  components: {
    nowLoading,
    contentInfo,
    cardPopover
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
