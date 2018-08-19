<template>
  <v-layout row wrap>
    <v-flex md6>
      <v-card height="100%">
        <now-loading :show="pending" />
        <template v-if="!pending">
          <v-card-title primary-title>
            <span class="mr-2 pl-3" v-html="factionIcon(deck.investigator_id.faction, false)"></span>
            <h3 class="headline mb-0">{{ deck.name }}</h3>
            <v-spacer />
            <v-btn flat icon :to="'/deck/list'"><v-icon>close</v-icon></v-btn>
          </v-card-title>
          <v-divider />
          <v-card-title>
            <v-layout justify-space-between class="pl-3">
              <v-flex>{{ `${deck._author.username}` }}</v-flex>
              <v-flex><v-icon small class="mr-2" title="조회수">visibility</v-icon>{{ deck.view_cnt }}</v-flex>
              <v-flex><v-icon small class="mr-2" title="댓글 수">chat_bubble</v-icon>{{ deck.cmt_ids.length }}</v-flex>
              <v-flex><v-icon small class="mr-2" title="좋아요 수">favorite</v-icon>{{ deck._fav.length }}</v-flex>
            </v-layout>
            <v-spacer />
            <template v-if="this.$auth.isLoggedin() && this.$auth.getUserInfo()._id === deck._author._id">
              <v-btn small flat icon @click="mod()"><v-icon>edit</v-icon></v-btn>
              <deck-del-btn :deck_id="deck_id" />
            </template>
          </v-card-title>
          <v-card-text>
            <div class="__decklist">
              <template v-for="s in subheaders" v-if="haveContents(s)">
                <v-subheader>{{ s.title }}</v-subheader>
                <div v-for="(i, index) in deck.cards" v-if="s.value(i)" :key="index" class="pa-1 pl-4">
                  {{ `${i.qty}x ` }}
                  <card-popover :card="i.card" />
                </div>
              </template>
            </div>
          </v-card-text>
          <v-divider />
          <v-card-text>
            {{ deck.introduce }}
          </v-card-text>
        </template>
      </v-card>
    </v-flex>
    <v-flex md6>
      <comment-list ref="comments" @list="fetchComments()" :target_id="deck_id" :comments="comments.d.ds" />
    </v-flex>
  </v-layout>
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

import commentList from '@/components/deck/comment/comment-list'
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
    deckDelBtn,
    commentList
  },
  data () {
    return {
      pending: true,
      comments: {
        d: {
          draw: 0,
          cnt: 0,
          ds: []
        }
      },
      deck: {
        _id: this.deck_id,
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
  watch: {
    deck_id () {
      this.fetchDeck()
      this.fetchComments()
    }
  },
  created () {
    this.fetchDeck()
    this.fetchComments()
  },
  methods: {
    mod () {
      this.$router.push({ name: 'deckEdit', query: { deck_id: this.deck_id } })
    },
    fetchComments () {
      const query = { _target: this.deck_id }
      const select = ''
      this.$axios.get(`${this.$cfg.path.api}data/deck/comment`, {
        params: {
          draw: this.comments.d.draw + 1,
          limit: 0,
          skip: 0,
          sort: 1,
          order: '_id',
          query: query,
          select: select
        }
      })
      .then((res) => {
        if (!res.data.success) throw new Error(res.data.msg)
        this.comments.d = res.data.d
      })
      .catch((err) => {
        console.log(err.message)
      })
    },
    fetchDeck () {
      this.pending = true
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
        window.scrollTo(0, 0)
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
    },
    deckTotal (cards) {
      let qty = 0

      cards.forEach((i) => {
        qty += i.qty
      })

      return qty
    }
  }
}
</script>
