<template>
  <v-container grid-list-md class="__content">
    <v-breadcrumbs divider=">">
      <v-breadcrumbs-item v-for="(i, index) in items" :key="index" :to="i.to" :disabled="false">
        {{ i.title }}
      </v-breadcrumbs-item>
    </v-breadcrumbs>
    <router-view />
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          title: 'ArkhamDBkr',
          to: '/'
        },
        {
          title: '카드 목록',
          to: '/card/list'
        }
      ]
    }
  }
}
</script>
