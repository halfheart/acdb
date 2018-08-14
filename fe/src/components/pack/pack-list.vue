<template>
  <div>
    <v-list>
      <v-list-tile
      v-for="(i, index) in d.ds"
      :key="index"
      @click="">
        <v-list-tile-title>
          {{ i.name }}
        </v-list-tile-title>
        <v-spacer />
        <pack-mod-btn @pack-moded="list()" :id="i._id" />
        <pack-del-btn @pack-deleted="list()" :id="i._id" />
      </v-list-tile>
    </v-list>
    <pack-add-btn @pack-added="list()" />
  </div>
</template>

<script>
import listMixin from '@/components/mixins/list-mixin'

import packAddBtn from '@/components/pack/pack-add-btn'
import packModBtn from '@/components/pack/pack-mod-btn'
import packDelBtn from '@/components/pack/pack-del-btn'
export default {
  mixins: [
    listMixin
  ],
  components: {
    packAddBtn,
    packModBtn,
    packDelBtn
  },
  data () {
    return {
      p: {
        page: 1,
        limit: 10,
        sort: 1,
        order: '_id'
      },
      path: 'data/pack'
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
    }
  }
}
</script>
