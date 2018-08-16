<template>
  <v-card>
    <now-loading :show="pending" />
    <v-data-table
    v-if="!pending"
    :items="d.ds"
    :headers="headers"
    hide-actions
    disable-initial-sort>
      <template slot="items" slot-scope="cards">
        <td>
          <v-btn-toggle
          v-model="toggleBtn[cards.item._id]"
          @change="addToDeck(cards.item, toggleBtn[cards.item._id])">
            <v-btn v-for="i in cards.item.qty + 1" :value="i" :key="i" flat>{{ i }}</v-btn>
          </v-btn-toggle>
        </td>
        <td>
          <card-popover :card="cards.item" />
        </td>
        <td v-html="factionIcon(cards.item.faction)"></td>
        <td>{{ cards.item.cost }}</td>
        <td>{{ cards.item.type }}</td>
      </template>
    </v-data-table>
  </v-card>
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
  props: {
    investigator_id: { type: String, default: '' },
    deck: { type: Object, default: null }
  },
  data () {
    return {
      toggleBtn: {},
      headers: [
        {
          text: '',
          sortable: false
        },
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
        }
      ],
      path: 'data/card/',
      investigator: {},
      pending: true
    }
  },
  created () {
    this.fetchResource()
  },
  mounted () {
    this.setDeck()
  },
  methods: {
    setDeck () {
      let obj = {}
      Object.keys(this.deck).map((key) => {
        obj[key] = this.deck[key]
      })

      this.$set(this, 'toggleBtn', obj)
    },
    reset () {
      this.toggleBtn = {}
    },
    fetchResource () {
      this.fetchInvestigator()
      .then((res) => {
        if (!res.data.success) throw new Error(res.data.msg)
        this.investigator = res.data.card
        this.fetchForOptions(this.investigator)
      })
      .catch((err) => {
        console.log(err.message)
      })
    },
    fetchInvestigator () {
      const _id = this.investigator_id
      return this.$axios.get(`${this.$cfg.path.api}${this.path}${_id}`)
    },
    fetchForOptions (investigator = {}) {
      const Opts = investigator.deckOptions
      let q = {
        type: { $ne: this.$cfg.const.INVESTIGATOR },
        subtype: { $nin: this.$cfg.const.SUBTYPES },
        only: { $ne: true },
        $or: []
      }
      const s = ''

      Opts.forEach((i) => {
        q.$or.push({
          faction: i.faction,
          xp: {
            $gte: i.min,
            $lte: i.max
          }
        })
      })

      this.fetchList(this.path, q, s)
    },
    addToDeck (card = {}, qty = 0) {
      if (!qty) {
        this.$emit('remove-from-deck', card._id)
      } else {
        this.$emit('add-to-deck', {
          card,
          qty
        })
      }
    }
  }
}
</script>
