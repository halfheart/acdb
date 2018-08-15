<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex md6>
        <v-card>
          <now-loading :show="pending" />
          <template v-if="!pending">
            <v-card-title>
              <v-layout column>
                <div>
                  {{ `${invName} Deck. (${deckSize}/${deckLimit})`}}
                </div>
                <div v-if="requiredXp > 0">
                  {{ `XP required: ${requiredXp}`}}
                </div>
              </v-layout>
            </v-card-title>
            <v-card-actions>
              <v-btn flat icon @click="mod()">
                <v-icon>edit</v-icon>
              </v-btn>
            </v-card-actions>
            <v-card-text>
              <template v-for="s in subheaders" v-if="haveContents(s)">
                <v-subheader>{{ s.title }}</v-subheader>
                <div v-for="(i, index) in deck.cards" v-if="s.value(i)" :key="index" class="pa-1 pl-4">
                  {{ `${i.qty}x ` }}
                  <card-popover :card="i.card" />
                </div>
              </template>
            </v-card-text>
          </template>
        </v-card>
      </v-flex>
      <v-flex md6>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<style>
.isDanger {
  color: #FF0000;
}
</style>

<script>
import filterMixin from '@/components/mixins/filter-mixin'

import nowLoading from '@/components/now-loading'
import cardPopover from '@/components/card/card-popover'

export default {
  mixins: [
    filterMixin
  ],
  props: {
    deck_id: { type: String, default: '' }
  },
  components: {
    nowLoading,
    cardPopover
  },
  data () {
    return {
      pending: true,
      deck: {
        investigator: {},
        cards: []
      },
      subheaders: [
        {
          title: 'Deck Requirements',
          value: (v) => { return v.required }
        },
        {
          title: 'Asset',
          value: (v) => { return v.card.type === 'Asset' && !v.required }
        },
        {
          title: 'Event',
          value: (v) => { return v.card.type === 'Event' && !v.required }
        },
        {
          title: 'Skill',
          value: (v) => { return v.card.type === 'Skill' && !v.required }
        }
      ]
    }
  },
  computed: {
    requiredXp: function () {
      let result = 0

      const deck = this.deck.cards

      deck.forEach((i) => {
        result += i.card.xp * i.qty
      })

      return result
    },
    invName: function () {
      if (this.pending === true) return ''
      const inv = this.deck.investigator

      return inv.name
    },
    deckLimit: function () {
      if (this.pending === true) return 30
      const inv = this.deck.investigator

      return inv.deckSize
    },
    deckSize: function () {
      let result = 0

      const deck = this.deck.cards

      deck.forEach((i) => {
        if (!i.required) result += i.qty
      })

      return result
    }
  },
  created () {
    this.fetchDeck()
  },
  methods: {
    mod () {
      this.$router.push({ name: 'deckEdit', query: { deck_id: this.deck_id } })
    },
    fetchDeck () {
      this.$axios.get(`${this.$cfg.path.api}data/deck/${this.deck_id}`)
      .then((res) => {
        if (!res.data.success) throw new Error(res.data.msg)
        const deck = res.data.deck

        this.deck.investigator = deck.investigator_id

        const cards = deck.cards.map((i) => {
          return {
            card: i.card_id,
            qty: i.qty,
            required: i.required
          }
        })

        this.deck.cards = cards
        this.pending = false
      })
      .catch((err) => {
        console.log(err.message)
      })
    },
    haveContents (obj = {}) {
      const deck = this.deck.cards
      let result = false
      deck.forEach((i) => {
        if (obj.value(i)) result = true
      })
      return result
    }
  }
}
</script>
