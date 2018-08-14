<template>
  <v-dialog v-model="show" persistent>
    <v-btn
    icon
    color="primary"
    slot="activator">
      <v-icon>person_add</v-icon>
    </v-btn>
    <investigator-form ref="form" :title="title" @form-submit="submit($event)" @form-close="close()" />
  </v-dialog>
</template>

<script>
import investigatorForm from '@/components/card/investigator/investigator-form'
export default {
  components: {
    investigatorForm
  },
  data () {
    return {
      title: '조사자 추가',
      show: false
    }
  },
  methods: {
    submit (e) {
      this.$axios.post(`${this.$cfg.path.api}data/card`, e)
      .then((res) => {
        if (!res.data.success) throw new Error(res.data.msg)
        console.log('추가됨')
        this.close()
        this.$emit('card-added')
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
      if (val) this.$refs.form.setForm()
    }
  }
}
</script>
