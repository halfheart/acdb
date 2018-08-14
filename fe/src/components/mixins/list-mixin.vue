<template>

</template>

<script>
export default {
  data () {
    return {
      p: {
        page: 1,
        limit: 10,
        sort: 1,
        order: 'number'
      },
      d: {
        cnt: 0,
        draw: 0,
        ds: []
      },
      pending: true
    }
  },
  computed: {
    setSkip () {
      if (this.p.page <= 0) return 0
      const page = this.p.page
      const limit = this.p.limit
      return limit * (page - 1)
    },
    getTotalPage () {
      if (this.d.cnt === 0) return 0
      return Math.ceil(this.d.cnt / this.p.limit)
    }
  },
  methods: {
    fetchList (path = '', query = {}, select = '') {
      this.$axios.get(`${this.$cfg.path.api}${path}`, {
        params: {
          draw: this.d.draw + 1,
          query: query,
          skip: this.setSkip,
          sort: this.p.sort,
          order: this.p.order,
          limit: this.p.limit,
          select: select
        }
      })
      .then((res) => {
        if (!res.data.success) throw new Error(res.data.msg)
        this.d = res.data.d
        this.pending = false
      })
      .catch((err) => {
        console.log(err.message)
      })
    }
  }
}
</script>
