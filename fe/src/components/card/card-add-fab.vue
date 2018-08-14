<template>
  <v-speed-dial
  bottom
  right
  icon
  fixed
  v-model="fab"
  >
    <v-btn
    fab
    slot="activator"
    color="primary"
    v-model="fab">
      <v-icon>add</v-icon>
      <v-icon>close</v-icon>
    </v-btn>
    <investigator-add @card-added="$emit('card-added')" />
    <playercard-add @card-added="$emit('card-added')" />
  </v-speed-dial>
</template>

<script>
import investigatorAdd from '@/components/card/investigator/investigator-add'
import playercardAdd from '@/components/card/playercard/playercard-add'
export default {
  components: {
    investigatorAdd,
    playercardAdd
  },
  data () {
    return {
      fab: false
    }
  },
  methods: {
    list () {
      this.$emit('list')
    }
  }
}
</script>
