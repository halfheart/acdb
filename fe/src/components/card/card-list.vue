<template>
  <div>
    <v-data-table
    :items="d.ds"
    :headers="headers"
    hide-actions
    disable-initial-sort>
      <template slot="items" slot-scope="cards">
        <td>
          <card-popover :card="cards.item" />
        </td>
        <td v-html="factionWithIcon(cards.item.faction)"></td>
        <td>{{ cards.item.cost }}</td>
        <td>{{ cards.item.type }}</td>
        <td v-html="testIcons(cards.item)"></td>
        <td>{{ cards.item.traits | traits }}</td>
        <td>{{ cards.item.pack_id.name, cards.item.number | cardNumber }}</td>
        <td>
          <investigator-mod v-if="cards.item.type === $cfg.const.INVESTIGATOR" :id="cards.item._id" @card-moded="list()" />
          <playercard-mod v-if="cards.item.type !== $cfg.const.INVESTIGATOR" :id="cards.item._id" @card-moded="list()" />
          <card-del-btn :id="cards.item._id" @card-deleted="list()" />
        </td>
      </template>
    </v-data-table>
    <v-pagination
    @input="list()"
    :length="getTotalPage"
    v-model="p.page" />
    <card-add-fab @card-added="list()" />
  </div>
</template>

<script>
import filterMixin from '@/components/mixins/filter-mixin'

import cardPopover from '@/components/card/card-popover'
import cardAddFab from '@/components/card/card-add-fab'
import investigatorMod from '@/components/card/investigator/investigator-mod'
import playercardMod from '@/components/card/playercard/playercard-mod'
import cardDelBtn from '@/components/card/card-del-btn'
export default {
  mixins: [
    filterMixin
  ],
  components: {
    cardPopover,
    cardAddFab,
    cardDelBtn,
    investigatorMod,
    playercardMod
  },
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
      headers: [
        {
          text: '이름',
          sortable: true,
          value: 'name'
        },
        {
          text: '진영',
          sortable: true,
          value: 'faction'
        },
        {
          text: '비용',
          sortable: true,
          value: 'cost'
        },
        {
          text: '유형',
          sortable: true,
          value: 'type'
        },
        {
          text: '테스트',
          sortable: false
        },
        {
          text: '특성',
          sortable: false
        },
        {
          text: '세트',
          sortable: true,
          value: 'number'
        },
        {
          text: '편집',
          sortable: false
        }
      ]
    }
  },
  computed: {
    setSkip () {
      if (this.p.page === 0) return 0
      const page = this.p.page
      const limit = this.p.limit
      return limit * (page - 1)
    },
    getTotalPage () {
      if (this.d.cnt === 0) return 0
      return Math.ceil(this.d.cnt / this.p.limit)
    }
  },
  created () {
    this.list()
  },
  methods: {
    list () {
      const query = {}
      const select = ''
      this.$axios.get(`${this.$cfg.path.api}data/card`, {
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
      })
      .catch((err) => {
        console.log(err.message)
      })
    }
  }
}
</script>
