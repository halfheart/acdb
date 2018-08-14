<template>
  <v-dialog v-model="show">
    <v-btn
    fab
    bottom
    right
    icon
    fixed
    slot="activator"
    color="primary">
      <v-icon>add</v-icon>
    </v-btn>
    <pack-form ref="form" :title="title" @form-submit="submit($event)" @form-close="close()" />
  </v-dialog>
</template>

<script>
import packForm from '@/components/pack/pack-form'
export default {
  components: {
    packForm
  },
  props: {
    id: { type: String, default: '' }
  },
  data () {
    return {
      title: '팩 추가',
      show: false
    }
  },
  methods: {
    submit (e) {
      this.$axios.post(`${this.$cfg.path.api}data/pack`, e)
      .then((res) => {
        if (!res.data.success) throw new Error(res.data.msg)
        console.log('추가됨')
        this.$emit('pack-added')
        this.close()
      })
      .catch((err) => {
        console.log(err.message)
      })
    },
    close () {
      this.$refs.form.reset()
      this.show = false
    }
  },
  watch: {
    show (val) {
      if (!val) this.close()
      if (val) this.$refs.form.setForm(this.id)
    }
  }
}
</script>
