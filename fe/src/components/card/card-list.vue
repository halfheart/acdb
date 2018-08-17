<template>
  <div>
    <v-data-table
    :items="d.ds"
    :headers="headers"
    hide-actions
    disable-initial-sort>
      <template slot="items" slot-scope="cards">
        <td>
          <card-popover :card="cards.item" />
        </td>
        <td v-html="factionIcon(cards.item.faction)"></td>
        <td>{{ cards.item.cost }}</td>
        <td>{{ cards.item.type }}</td>
        <td v-html="testIcons(cards.item)"></td>
        <td>{{ cards.item.traits | traits }}</td>
        <td>{{ cards.item.pack_id.name, cards.item.number | cardNumber }}</td>
        <td>
          <v-layout row>
            <investigator-mod v-if="cards.item.type === $cfg.const.INVESTIGATOR" :card_id="cards.item._id" @card-moded="list()" />
            <playercard-mod v-if="cards.item.type !== $cfg.const.INVESTIGATOR" :card_id="cards.item._id" @card-moded="list()" />
            <card-del-btn :card_id="cards.item._id" @card-deleted="list()" />
          </v-layout>
        </td>
      </template>
    </v-data-table>
    <v-pagination
    @input="list()"
    :length="getTotalPage"
    v-model="p.page" />
    <card-add-fab @card-added="list()" />
  </div>
</template>

<script>
import filterMixin from '@/components/mixins/filter-mixin'
import listMixin from '@/components/mixins/list-mixin'

import cardPopover from '@/components/card/card-popover'
import cardAddFab from '@/components/card/card-add-fab'
import investigatorMod from '@/components/card/investigator/investigator-mod'
import playercardMod from '@/components/card/playercard/playercard-mod'
import cardDelBtn from '@/components/card/card-del-btn'
export default {
  mixins: [
    filterMixin,
    listMixin
  ],
  components: {
    cardPopover,
    cardAddFab,
    cardDelBtn,
    investigatorMod,
    playercardMod
  },
  data () {
    return {
      p: {
        page: 1,
        limit: 20,
        sort: 1,
        order: 'number'
      },
      path: 'data/card',
      headers: [
        {
          text: '이름',
          sortable: true,
          value: 'name'
        },
        {
          text: '진영',
          sortable: true,
          value: 'faction'
        },
        {
          text: '비용',
          sortable: true,
          value: 'cost'
        },
        {
          text: '유형',
          sortable: true,
          value: 'type'
        },
        {
          text: '테스트',
          sortable: false
        },
        {
          text: '특성',
          sortable: false
        },
        {
          text: '세트',
          sortable: true,
          value: 'number'
        },
        {
          text: '편집',
          align: 'center',
          sortable: false
        }
      ]
    }
  },
  created () {
    this.list()
  },
  methods: {
    list () {
      const q = { name: { $ne: 'Random Basic Weakness' } }
      const s = ''
      this.fetchList(this.path, q, s)
    }
  }
}
</script>
