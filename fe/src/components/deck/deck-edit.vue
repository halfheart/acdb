<script>
import deckBuilder from './deck-builder'

export default {
  extends: deckBuilder,
  props: {
    deck_id: { type: String, default: '' }
  },
  data () {
    return {
      form: {
        _id: ''
      }
    }
  },
  methods: {
    fetchInvestigator () {
      // overriding NOP
    },
    fetchDeck () {
      this.$axios.get(`${this.$cfg.path.api}data/deck/${this.deck_id}`)
      .then((res) => {
        if (!res.data.success) throw new Error(res.data.msg)
        const deck = res.data.deck

        this.deck.investigator_id = deck.investigator_id
        this.form = {
          _id: deck._id,
          name: deck.name,
          introduce: deck.introduce,
          investigator_id: deck.investigator_id._id
        }

        const cards = deck.cards.map((i) => {
          return {
            card: i.card_id,
            qty: i.qty,
            required: i.required
          }
        })

        this.deck.cards = cards

        cards.forEach((i) => {
          this.toggleBtn[i.card._id] = i.qty
        })

        this.pending = false
      })
      .catch((err) => {
        console.log(err.message)
      })
    },
    submit () {
      const deck = this.deck.cards
      const cards = deck.map((i) => {
        return {
          card_id: i.card._id,
          qty: i.qty,
          required: i.required
        }
      })

      this.form.cards = cards

      this.$axios.put(`${this.$cfg.path.api}data/deck`, this.form)
      .then((res) => {
        if (!res.data.success) throw new Error(res.data.msg)
        console.log('수정됨')
        this.$router.push({ name: 'deckRead', query: { deck_id: res.data._id } })
      })
      .catch((err) => {
        console.log(err.message)
      })
    }
  }
}
</script>
