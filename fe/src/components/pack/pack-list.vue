<template>
  <div>
    <v-list>
      <v-list-tile
      v-for="(i, index) in d.packs"
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
import packAddBtn from '@/components/pack/pack-add-btn'
import packModBtn from '@/components/pack/pack-mod-btn'
import packDelBtn from '@/components/pack/pack-del-btn'
export default {
  components: {
    packAddBtn,
    packModBtn,
    packDelBtn
  },
  data () {
    return {
      p: {
        page: 0,
        limit: 10,
        sort: 1,
        order: '_id'
      },
      d: {
        cnt: 0,
        draw: 0,
        packs: []
      }
    }
  },
  computed: {
    setSkip () {
      if (this.p.page === 0) return 0
      const page = this.p.page
      const limit = this.p.limit
      return limit * (page - 1)
    }
  },
  mounted () {
    this.list()
  },
  methods: {
    list () {
      const query = {}
      this.$axios.get(`${this.$cfg.path.api}data/pack`, {
        params: {
          draw: this.d.draw + 1,
          skip: this.setSkip,
          query: query,
          limit: this.p.limit,
          order: this.p.order,
          sort: this.p.sort
        }
      })
      .then((res) => {
        if (!res.data.success) throw new Error(res.data.msg)
        this.d = res.data.d
      })
      .catch((err) => {
        console.log(err.message)
      })
    }
  }
}
</script>
