<template>
  <v-card>
    <v-card-title>
      {{ title }}
    </v-card-title>
    <v-card-text>
      {{ msg }}
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn flat @click="confirm()">{{ confirmBtn }}</v-btn>
      <v-btn flat @click="cancel()">{{ cancelBtn }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    title: { type: String, default: '' },
    msg: { type: String, default: '' },
    confirmBtn: { type: String, default: '확인' },
    cancelBtn: { type: String, default: '취소' }
  },
  data () {
    return {
      //
    }
  },
  methods: {
    confirm () {
      this.$emit('click-confirm')
    },
    cancel () {
      this.$emit('cick-cencel')
    }
  }
}
</script>
