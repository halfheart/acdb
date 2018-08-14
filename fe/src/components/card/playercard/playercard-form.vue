<template>
  <v-card>
    <v-container grid-list-md>
      <now-loading :show="pending" />
      <v-fade-transition>
        <v-form ref="form" v-show="!pending">
          <v-container>
            <v-card-title>{{ title }}</v-card-title>
            <v-card-text>
              <v-layout>
                <v-flex md4>
                  <v-switch
                  v-model="form.isUnique"
                  :label="this.$cfg.const.UNIQUE" />
                </v-flex>
                <v-flex md8>
                  <v-text-field
                  label="이름"
                  v-model="form.name"
                  :rules="rules.name"
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-text-field
              label="부제목"
              v-model="form.subname"
              ></v-text-field>
              <v-select
              :label="this.$cfg.const.FACTION"
              v-model="form.faction"
              :items="items.faction"
              :rules="rules.faction">
              </v-select>
              <v-select
              :label="this.$cfg.const.TYPE"
              v-model="form.type"
              :items="items.type"
              :rules="rules.type">
              </v-select>
              <v-select
              :label="this.$cfg.const.SUBTYPE"
              v-model="form.subtype"
              :items="items.subtype"
              clearable>
              </v-select>
              <v-combobox
              :label="this.$cfg.const.TRAIT"
              v-model="form.trait"
              :items="items.trait"
              multiple
              chips
              deletable-chips>
              </v-combobox>
              <v-combobox
              :label="this.$cfg.const.SLOT"
              v-model="form.slots"
              :items="items.slot"
              multiple
              chips
              deletable-chips>
              </v-combobox>
              <v-text-field
              :label="this.$cfg.const.COST"
              v-model="form.cost"
              ></v-text-field>
              <v-text-field
              :label="this.$cfg.const.XP"
              v-model="form.xp"
              ></v-text-field>
              <v-text-field
              :label="this.$cfg.const.WILLPOWER"
              v-model="form.will"
              ></v-text-field>
              <v-text-field
              :label="this.$cfg.const.INTELLECT"
              v-model="form.int"
              ></v-text-field>
              <v-text-field
              :label="this.$cfg.const.COMBAT"
              v-model="form.combat"
              ></v-text-field>
              <v-text-field
              :label="this.$cfg.const.AGILITY"
              v-model="form.agi"
              ></v-text-field>
              <v-text-field
              :label="this.$cfg.const.WILD"
              v-model="form.wild"
              ></v-text-field>
              <v-text-field
              :label="this.$cfg.const.HEALTH"
              v-model="form.health"
              ></v-text-field>
              <v-text-field
              :label="this.$cfg.const.SANITY"
              v-model="form.sanity"
              ></v-text-field>
              <v-textarea
              label="텍스트"
              v-model="form.text">
              </v-textarea>
              <v-textarea
              label="맛글"
              v-model="form.flavor">
              </v-textarea>
              <v-text-field
              label="삽화가"
              v-model="form.illustrator"
              :rules="rules.illustrator"
              ></v-text-field>
              <v-text-field
              label="번호"
              v-model="form.number"
              :rules="rules.number"
              ></v-text-field>
              <v-select
              label="수록 세트"
              :items="items.pack"
              item-text="name"
              item-value="_id"
              v-model="form.pack_id"
              :rules="rules.pack"
              ></v-select>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn @click="submit()">확인</v-btn>
              <v-btn @click="close()">취소</v-btn>
            </v-card-actions>
          </v-container>
        </v-form>
      </v-fade-transition>
    </v-container>
  </v-card>
</template>

<script>
import investigatorForm from '@/components/card/investigator/investigator-form'
export default {
  extends: investigatorForm,
  data () {
    return {
      rules: {
        type: [
          (v) => !!v || '카드 종류를 선택하세요'
        ]
      },
      items: {
        type: this.$cfg.const.TYPES,
        subtype: this.$cfg.const.SUBTYPES,
        slot: this.$cfg.const.SLOTS
      },
      form: {
        _id: '',
        name: '', // required
        faction: '', // required
        type: '', // required
        illustrator: '', // required
        pack_id: '', // required
        number: '', // required
        subname: '',
        img: '',
        isUnique: false,
        qty: 1,
        isDoubleFaced: false,
        backName: '',
        backText: '',
        backFlavor: '',
        backImg: '',
        subtype: '',
        cost: null,
        xp: null,
        traits: [],
        slots: [],
        will: null,
        int: null,
        combat: null,
        agi: null,
        wild: null,
        health: null,
        sanity: null,
        attack: null,
        horror: null,
        enemyHP: null,
        text: '',
        flavor: '',
        deckSize: null,
        deckOptions: [],
        deckReq_ids: []
      }
    }
  },
  created () {
    // overriding NOP
  },
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        this.$emit('form-submit', this.form)
      }
    },
    async setForm (_id) {
      try {
        if (_id) {
          const cardRes = await this.fetchCard(_id)
          if (!cardRes.data.success) throw new Error(cardRes.data.msg)
          this.form = cardRes.data.card
        }
        const packRes = await this.fetchPacks()

        if (!packRes.data.success) throw new Error(packRes.data.msg)

        this.items.pack = packRes.data.d.ds

        this.pending = false
      } catch (err) {
        console.error(err.message)
      }
    },
    createDeckOptions () {
      // overriding NOP
    },
    iniDeckOptions () {
      // overriding NOP
    },
    setDeckOptions () {
      // overriding NOP
    },
    fetchRequirements () {
      // overriding NOP
    }
  }
}
</script>
