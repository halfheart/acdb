<template>
  <v-container grid-list-md class="__content">
    <v-layout row wrap>
      <v-flex md6>
        <v-card>
          <now-loading :show="pending" />
          <template v-if="!pending">
            <v-card-title primary-title>
              <span class="mr-2 ml-2" v-html="factionIcon(deck.investigator_id.faction, false)"></span>
              <h3 class="headline mb-0">{{ deck.name }}</h3>
              <div class="__divider"></div>
              <v-icon small class="mr-2">visibility</v-icon>{{ deck.view_cnt }}
            </v-card-title>
            <v-card-actions>
              <v-btn flat icon @click="mod()">
                <v-icon>edit</v-icon>
              </v-btn>
              <deck-del-btn :deck_id="deck_id" />
            </v-card-actions>
            <v-card-text class="__decklist">
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
.__decklist {
  column-count: 2;
}
.__divider {
  margin-top: 4px;
  margin-bottom: 4px;
  border-top: solid 1px #999999;
  width: 100%;
}
</style>

<style>
.isDanger {
  color: #FF0000;
}
</style>

<script>
import filterMixin from '@/components/mixins/filter-mixin'

import nowLoading from '@/components/now-loading'
import cardPopover from '@/components/card/card-popover'
import deckDelBtn from '@/components/deck/deck-del-btn'

export default {
  mixins: [
    filterMixin
  ],
  props: {
    deck_id: { type: String, default: '' }
  },
  components: {
    nowLoading,
    cardPopover,
    deckDelBtn
  },
  data () {
    return {
      pending: true,
      deck: {
        name: '',
        introduce: '',
        view_cnt: '',
        investigator_id: '',
        cards: [],
        ut: '',
        cmt_ids: []
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
      const inv = this.deck.investigator_id

      return inv.name
    },
    deckLimit: function () {
      if (this.pending === true) return 30
      const inv = this.deck.investigator_id

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
      this.$axios.get(`${this.$cfg.path.api}data/deck/read/${this.deck_id}`)
      .then((res) => {
        if (!res.data.success) throw new Error(res.data.msg)
        const deck = res.data.deck

        this.deck = deck

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
