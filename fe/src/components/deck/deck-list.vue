<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <now-loading :show="pending" />
      <template v-if="!pending">
        <v-flex v-for="(i, index) in d.ds" :key="index" md4>
          <v-card>
            <v-card-media
            :src="imgPath(i.investigator_id._id)"
            height="150">
            </v-card-media>
            <v-card-title primary-title>
              <h3 class="headline mb-0">{{ i.name }}</h3>
            </v-card-title>
            <v-card-text>

            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn flat color="indigo" :href="$cfg.path.web+'deck/read?deck_id='+i._id">
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

import nowLoading from '@/components/now-loading'

export default {
  mixins: [
    listMixin
  ],
  components: {
    nowLoading
  },
  data () {
    return {
      path: 'data/deck/'
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
