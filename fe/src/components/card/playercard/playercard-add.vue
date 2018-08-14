<template>
  <v-dialog v-model="show" persistent>
    <v-btn
    icon
    color="primary"
    slot="activator">
      <v-icon>library_add</v-icon>
    </v-btn>
    <playercard-form ref="form" :title="title" @form-submit="submit($event)" @form-close="close()" />
  </v-dialog>
</template>

<script>
import investigatorAdd from '@/components/card/investigator/investigator-add'
import playercardForm from '@/components/card/playercard/playercard-form'
export default {
  extends: investigatorAdd,
  components: {
    playercardForm
  },
  data () {
    return {
      title: '플레이어 카드 추가'
    }
  }
}
</script>
