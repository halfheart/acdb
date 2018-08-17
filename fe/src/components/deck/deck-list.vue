<template>
  <v-container fluid grid-list-md class="pa-0">
    <v-layout row wrap>
      <now-loading :show="pending" />
      <template v-if="!pending && d.cnt > 0">
        <v-flex v-for="(i, index) in d.ds" :key="index" md4 xs12>
          <v-card
          :href="$cfg.path.web+'deck/read?deck_id='+i._id">
            <v-card-media
            :src="imgPath(i.investigator_id._id)"
            height="150">
            </v-card-media>
            <v-card-title primary-title>
              <h3 class="headline mb-0">{{ i.name }}</h3>
              <div class="mt-3">{{ i.introduce | flavor(50) }}</div>
            </v-card-title>
            <v-card-text>
              <v-icon small class="mr-2">visibility</v-icon>{{ i.view_cnt }}
            </v-card-text>
          </v-card>
        </v-flex>
      </template>
      <template v-else-if="!pending && d.cnt > 0">
        데이터가 없습니다.
      </template>
    </v-layout>
  </v-container>
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
    }
  }
}
</script>
