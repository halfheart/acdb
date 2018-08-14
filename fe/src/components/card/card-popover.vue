<template>
  <v-menu
  v-model="show"
  offset-x
  open-on-hover
  transition="slide-x-transition">
    <a
    class="pa-2"
    v-html="nameWithUnique(card)"
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
