<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex md6>
        <v-card>
          <v-form ref="form">
            <now-loading :show="pending" />
            <template v-if="!pending">
              <v-card-title>
                <v-layout column>
                  <div>
                    {{ `${invName} Deck.`}}
                    <span :class="{ isDanger : !validateSize }">{{ `(${deckSize}/${deckLimit})` }}</span>
                  </div>
                  <div>
                    <v-text-field
                    label="덱 이름"
                    v-model="form.name"
                    :rules="rules.name"
                    ></v-text-field>
                  </div>
                  <div>
                    <v-textarea
                    label="덱 소개"
                    v-model="form.introduce"
                    ></v-textarea>
                  </div>
                  <div v-if="requiredXp > 0">
                    {{ `XP required: ${requiredXp}`}}
                  </div>
                </v-layout>
              </v-card-title>
              <v-card-actions>
                <span v-if="err.message" class="isDanger err"><v-icon small color="error">warning</v-icon>{{ err.message }}</span>
                <v-spacer />
                <v-btn
                flat
                ripple
                @click="submit()"
                :disabled="!deckValidate">
                  submit
                </v-btn>
                <v-btn
                flat
                @click="reset()">
                  reset
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
          </v-form>
        </v-card>
      </v-flex>
      <v-flex md6>
        <deck-source
        v-if="!pending"
        ref="source"
        @add-to-deck="addToDeck($event)"
        @remove-from-deck="removeFromDeck($event)"
        :investigator_id="form.investigator_id"
        :deck="toggleBtn" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style>
.err {
  font-size: 9pt;
}
</style>

<script>
import deckSource from '@/components/deck/deck-source'

import deckRead from '@/components/deck/deck-read'
export default {
  extends: deckRead,
  props: {
    investigator_id: { type: String, default: '' }
  },
  components: {
    deckSource
  },
  data () {
    return {
      err: {
        message: ''
      },
      form: {
        name: '',
        _author: '',
        introduce: '',
        investigator_id: '',
        cards: [] // { card_id, qty, require }
      },
      rules: {
        name: [
          (v) => !!v || '덱 이름을 입력하세요.',
          (v) => (v && v.length <= 20) || '덱 이름은 20자 이하입니다.'
        ]
      },
      toggleBtn: {}
    }
  },
  computed: {
    deckValidate: function () {
      if (!this.validateSize) {
        this.err.message = '카드가 너무 적습니다.'
        return false
      }
      if (!this.validateQty) {
        this.err.message = '같은 이름의 카드는 두 장 까지 넣을 수 있습니다.'
        return false
      }
      this.err.message = ''
      return true
    },
    validateSize: function () {
      return this.deckSize >= this.deckLimit
    },
    validateQty: function () {
      const deck = this.deck.cards
      let result = true
      deck.forEach((i) => {
        if (this.qtyOf(i.card.name) > 2) result = false
      })

      return result
    }
  },
  created () {
    this.fetchInvestigator()
  },
  methods: {
    fetchDeck () {
      // overriding NOP
    },
    submit () {
      if (!this.$refs.form.validate()) {
        this.err.message = '양식을 모두 입력해주세요.'
        return
      }
      this.err.message = ''
      const deck = this.deck.cards
      const cards = deck.map((i) => {
        return {
          card_id: i.card._id,
          qty: i.qty,
          required: i.required
        }
      })

      this.form.cards = cards
      this.form._author = this.$auth.getUserInfo()._id

      this.$axios.post(`${this.$cfg.path.api}data/deck`, this.form)
      .then((res) => {
        if (!res.data.success) throw new Error(res.data.msg)
        console.log('추가됨')
        this.$router.push({ name: 'deckRead', query: { deck_id: res.data._id } })
      })
      .catch((err) => {
        console.log(err.message)
      })
    },
    reset () {
      this.$refs.source.reset()

      const deck = this.deck.cards
      deck.forEach((i, index) => {
        if (!i.required) deck.splice(index, 1, null)
      })

      let index = deck.indexOf(null)
      while (index !== -1) {
        deck.splice(index, 1)
        index = deck.indexOf(null)
      }
    },
    fetchInvestigator () {
      const _id = this.investigator_id
      this.$axios.get(`${this.$cfg.path.api}data/card/${_id}`)
      .then((res) => {
        if (!res.data.success) throw new Error(res.data.msg)
        const inv = res.data.card
        this.deck.investigator_id = inv
        this.form.investigator_id = inv._id

        const query = { _id: { $in: inv.deckReq_ids } }
        return this.$axios.get(`${this.$cfg.path.api}data/card/`, {
          params: {
            draw: 0,
            sort: 1,
            limit: 0,
            skip: 0,
            order: '_id',
            select: '',
            query: query
          }
        })
      })
      .then((res) => {
        if (!res.data.success) throw new Error(res.data.msg)
        res.data.d.ds.forEach((i) => {
          this.deck.cards.push({
            card: i,
            qty: 1,
            required: true
          })
        })
        this.pending = false
      })
      .catch((err) => {
        console.log(err.message)
      })
    },
    indexOfCard (_id) {
      const deck = this.deck.cards
      let index = deck.findIndex((i) => {
        return i.card._id === _id
      })

      return index
    },
    isAlready (_id) {
      if (this.indexOfCard(_id) !== -1) return true
      return false
    },
    qtyOf (name) {
      let qty = 0
      const deck = this.deck.cards

      deck.forEach((i) => {
        if (i.card.name === name) qty += i.qty
      })

      return qty
    },
    addToDeck (e) {
      const _id = e.card._id
      const qty = e.qty
      const deck = this.deck.cards
      const index = this.indexOfCard(_id)
      if (!this.isAlready(_id)) {
        deck.push({
          card: e.card,
          qty: qty,
          required: false
        })
      } else {
        deck[index].qty = qty
      }
    },
    removeFromDeck (e) {
      const index = this.indexOfCard(e)
      if (index !== -1) this.deck.cards.splice(index, 1)
    }
  }
}
</script>
