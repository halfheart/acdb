import Vue from 'vue'
import Router from 'vue-router'
import packList from '@/components/pack/pack-list'
import cardList from '@/components/card/card-list'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'packList',
      component: packList
    },
    {
      path: '/card/list',
      name: 'cardList',
      component: cardList
    }
  ]
})
