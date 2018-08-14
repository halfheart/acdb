<template>
  <v-dialog v-model="show" persistent>
    <v-btn
    icon
    flat
    color="primary"
    slot="activator">
      <v-icon>edit</v-icon>
    </v-btn>
    <investigator-form ref="form" :title="title" @form-submit="submit($event)" @form-close="close()" />
  </v-dialog>
</template>

<script>
import investigatorAdd from './investigator-add'

export default {
  extends: investigatorAdd,
  props: {
    id: { type: String, default: '' }
  },
  data () {
    return {
      title: '조사자 수정'
    }
  },
  methods: {
    submit (e) {
      this.$axios.put(`${this.$cfg.path.api}data/card`, e)
      .then((res) => {
        if (!res.data.success) throw new Error(res.data.msg)
        console.log('수정됨')
        this.close()
        this.$emit('card-moded')
      })
      .catch((err) => {
        console.log(err.message)
      })
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
