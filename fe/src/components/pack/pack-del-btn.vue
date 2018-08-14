<template>
  <v-dialog v-model="show">
    <v-btn
    flat
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
    id: { type: String, default: '' }
  },
  data () {
    return {
      title: '팩 삭제',
      msg: '정말 삭제하시겠습니까?',
      show: false
    }
  },
  methods: {
    submit () {
      this.$axios.delete(`${this.$cfg.path.api}data/pack`, {
        params: {
          _id: this.id
        }
      })
      .then((res) => {
        if (!res.data.success) throw new Error(res.data.msg)
        console.log('삭제됨')
        this.$emit('pack-deleted')
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
