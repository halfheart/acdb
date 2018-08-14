<template>
  <v-dialog v-model="show" persistent>
    <v-btn
    icon
    flat
    color="primary"
    slot="activator">
      <v-icon>edit</v-icon>
    </v-btn>
    <playercard-form ref="form" :title="title" @form-submit="submit($event)" @form-close="close()" />
  </v-dialog>
</template>

<script>
import investigatorMod from '@/components/card/investigator/investigator-mod'

import playercardForm from '@/components/card/playercard/playercard-form'
export default {
  extends: investigatorMod,
  components: {
    playercardForm
  },
  data () {
    return {
      title: '플레이어 카드 수정'
    }
  }
}
</script>
