<template>
  <v-dialog v-model="show">
    <v-btn
    flat
    small
    icon
    slot="activator">
      <v-icon>delete</v-icon>
    </v-btn>
    <confirm-card
    :title="title"
    :msg="msg"
    @click-confirm="submit()"
    @click-cancel="close()" />
  </v-dialog>
</template>

<script>
import confirmCard from '@/components/confirm-card'

export default {
  components: {
    confirmCard
  },
  props: {
    deck_id: { type: String, default: '' }
  },
  data () {
    return {
      title: '덱 삭제',
      msg: '정말 삭제하시겠습니까?',
      show: false,
      path: 'data/deck'
    }
  },
  methods: {
    submit () {
      this.$axios.delete(`${this.$cfg.path.api}${this.path}`, {
        params: {
          _id: this.deck_id
        }
      })
      .then((res) => {
        if (!res.data.success) throw new Error(res.data.msg)
        console.log('삭제됨')
        this.$router.push({ name: 'deckList' })
        this.close()
      })
      .catch((err) => {
        console.log(err.message)
      })
    },
    close () {
      this.show = false
    }
  }
}
</script>
