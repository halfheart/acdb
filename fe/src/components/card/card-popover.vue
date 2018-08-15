<template>
  <v-menu
  max-width="400"
  v-model="show"
  offset-x
  offset-overflow
  open-on-hover>
    <a
    class="pr-2"
    v-html="cardNameFormat(card)"
    slot="activator">
    </a>
    <card-info :card="card" />
  </v-menu>
</template>

<script>
import filterMixin from '@/components/mixins/filter-mixin'
import cardInfo from '@/components/card/card-info'
export default {
  mixins: [
    filterMixin
  ],
  components: {
    cardInfo
  },
  props: {
    card: { type: Object, default: null }
  },
  data () {
    return {
      show: false
    }
  }
}
</script>
