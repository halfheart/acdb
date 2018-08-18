import Vue from 'vue'
import Router from 'vue-router'

import intro from '@/components/intro'
import packList from '@/components/pack/pack-list'
import cardList from '@/components/card/card-list'
import deckIndex from '@/components/deck/index'
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
      name: 'intro',
      component: intro
    },
    {
      path: '/deck',
      component: deckIndex,
      children: [
        {
          path: 'list',
          name: 'deckList',
          component: deckList,
          children: [
            {
              path: 'read',
              name: 'deckRead',
              component: deckRead,
              props: (route) => ({
                deck_id: route.query.deck_id
              })
            }
          ]
        },
        {
          path: 'new',
          name: 'deckNew',
          component: deckNew
        },
        {
          path: 'edit',
          name: 'deckEdit',
          component: deckEdit,
          props: (route) => ({
            deck_id: route.query.deck_id
          })
        },
        {
          path: 'new/builder',
          name: 'deckBuilder',
          component: deckBuilder,
          props: (route) => ({
            investigator_id: route.query.investigator_id
          })
        }
      ]
    },
    {
      path: '/pack/list',
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
