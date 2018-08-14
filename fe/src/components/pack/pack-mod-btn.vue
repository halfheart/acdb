<template>
  <v-dialog v-model="show">
    <v-btn
    flat
    icon
    slot="activator">
      <v-icon>edit</v-icon>
    </v-btn>
    <pack-form ref="form" :title="title" @form-close="close()" @form-submit="submit($event)" />
  </v-dialog>
</template>

<script>
import packAddBtn from '@/components/pack/pack-add-btn'

export default {
  extends: packAddBtn,
  data () {
    return {
      title: '팩 수정'
    }
  },
  methods: {
    submit (e) {
      this.$axios.put(`${this.$cfg.path.api}data/pack`, e)
      .then((res) => {
        if (!res.data.success) throw new Error(res.data.msg)
        console.log('수정됨')
        this.$emit('pack-moded')
        this.close()
      })
      .catch((err) => {
        console.log(err.message)
      })
    }
  }
}
</script>
