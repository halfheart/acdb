<template>
  <v-card width="400">
    <v-card-title :class="factionColor(card.faction)">
      <div>
        <div class="headline" v-html="nameWithUnique(card)"></div>
        <span v-if="card.subname">{{ card.subname }}</span>
      </div>
    </v-card-title>
    <v-card-text>
      <div v-html="factionIcon(card.faction)" class="pb-1"></div>
      <div class="pb-1">
        <span>{{ card.type }}</span>
        <span v-if="card.slots.length > 0">{{ card.slots | slots }}</span>
        <span v-if="card.subtype">{{ card.subtype }}</span>
      </div>
      <div class="trait-list pb-1">
        {{ card.traits | traits }}
      </div>
      <div v-if="card.cost" class="pb-1">
        {{ `${$cfg.const.COST}: ${card.cost}` }}
      </div>
      <div class="pb-1">
        <span v-if="card.will">{{ `${$cfg.const.WILLPOWER}: ${card.will}` }}</span>
        <span v-if="card.int">{{ `${$cfg.const.INTELLECT}: ${card.int}` }}</span>
        <span v-if="card.combat">{{ `${$cfg.const.COMBAT}: ${card.combat}` }}</span>
        <span v-if="card.agi">{{ `${$cfg.const.AGILITY}: ${card.agi}` }}</span>
        <span v-if="card.wild">{{ `${$cfg.const.WILD}: ${card.wild}` }}</span>
      </div>
      <div v-if="card.health > 0 || card.sanity > 0" class="pb-1">
        <span>{{ `${$cfg.const.HEALTH}: ${card.health}` }}</span>
        <span>{{ `${$cfg.const.SANITY}: ${card.sanity}` }}</span>
      </div>
      <div class="text-box pb-1" v-html="cardText(card.text)"></div>
      <div class="flavor pb-1">
        {{ card.flavor }}
      </div>
      <div class="pb-1"><v-icon>brush</v-icon>{{ card.illustrator }}</div>
      <div class="pb-1">{{ card.pack_id.name, card.number | cardNumber }}</div>
    </v-card-text>
  </v-card>
</template>

<style>
.card-text {
  margin-bottom: 3px;
  line-height: 1.4;
}
div.text-box {
  border-left: solid #666666;
  padding-left: 5px;
  margin-bottom: 3px;
}
div.flavor {
  font-style: italic;
}
div.trait-list {
  font-style: italic;
  font-weight: bold;
}
</style>

<script>
import filterMixin from '@/components/mixins/filter-mixin'

export default {
  mixins: [
    filterMixin
  ],
  props: {
    card: { type: Object, default: null }
  },
  data () {
    return {

    }
  }
}
</script>
