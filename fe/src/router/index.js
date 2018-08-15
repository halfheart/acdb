import Vue from 'vue'
import Router from 'vue-router'
import packList from '@/components/pack/pack-list'
import cardList from '@/components/card/card-list'
import deckList from '@/components/deck/deck-list'
import deckNew from '@/components/deck/deck-new'
import deckRead from '@/components/deck/deck-read'
import deckEdit from '@/components/deck/deck-edit'
import deckBuilder from '@/components/deck/deck-builder'

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
    },
    {
      path: '/deck/list',
      name: 'deckList',
      component: deckList
    },
    {
      path: '/deck/new',
      name: 'deckNew',
      component: deckNew
    },
    {
      path: '/deck/read',
      name: 'deckRead',
      component: deckRead,
      props: (route) => ({
        deck_id: route.query.deck_id
      })
    },
    {
      path: '/deck/edit',
      name: 'deckEdit',
      component: deckEdit,
      props: (route) => ({
        deck_id: route.query.deck_id,
        investigator_id: route.query.investigator_id
      })
    },
    {
      path: '/deck/new/builder',
      name: 'deckBuilder',
      component: deckBuilder,
      props: (route) => ({
        investigator_id: route.query.investigator_id
      })
    }
  ]
})
