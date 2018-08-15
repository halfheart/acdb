<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <now-loading :show="pending" />
      <template v-show="!pending">
        <v-flex v-for="(i, index) in d.ds" :key="index" md4>
          <v-card>
            <v-card-media
            :src="imgPath(i._id)"
            height="150">
            </v-card-media>
            <v-card-title primary-title>
              <h3 class="headline mb-0">{{ i.name }}</h3>
              <div>{{ i.backFlavor | flavor }}</div>
            </v-card-title>
            <v-card-text>
              <ul>
                <li>덱 사이즈: {{ i.deckSize }}장</li>
                <li v-for="(i, index) in i.deckReq_ids" :key="index">
                  <card-popover :card="i" />1장
                </li>
                <li>
                  <span v-for="j in i.deckOptions">
                    <span v-if="j.faction !== $cfg.const.FACTIONS[0]">
                      <span v-html="factionIcon(j.faction, false)"></span>{{ `~${j.max}` }}
                    </span>
                  </span>
                </li>
              </ul>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn flat color="indigo" :href="$cfg.path.web+'deck/new/builder?investigator_id='+i._id">
                선택
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </template>
    </v-layout>
  </v-container>
</template>

<script>
import listMixin from '@/components/mixins/list-mixin'
import filterMixin from '@/components/mixins/filter-mixin'

import nowLoading from '@/components/now-loading'
import cardPopover from '@/components/card/card-popover'

export default {
  mixins: [
    listMixin,
    filterMixin
  ],
  components: {
    nowLoading,
    cardPopover
  },
  data () {
    return {
      p: {
        page: 1,
        limit: 0,
        sort: '_id',
        order: 1
      },
      path: 'data/card'
    }
  },
  created () {
    this.list()
  },
  methods: {
    list () {
      const q = { type: this.$cfg.const.INVESTIGATOR }
      const s = ''
      this.fetchList(this.path, q, s)
    },
    imgPath (_id) {
      return `http://localhost:3000/images/${_id}.jpg`
    }
  }
}
</script>
