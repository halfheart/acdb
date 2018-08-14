<template>
  <v-card>
    <v-container grid-list-md>
      <now-loading :show="pending" />
      <v-fade-transition>
        <v-form ref="form" v-show="!pending">
          <v-container>
            <v-card-title>{{ title }}</v-card-title>
            <v-card-text>
              <v-text-field
              label="이름"
              v-model="form.name"
              :rules="rules.name"
              ></v-text-field>
              <v-text-field
              label="직업"
              v-model="form.subname"
              :rules="rules.subname"
              ></v-text-field>
              <v-select
              :label="this.$cfg.const.FACTION"
              v-model="form.faction"
              :items="items.faction"
              :rules="rules.faction">
              </v-select>
              <v-combobox
              :label="this.$cfg.const.TRAIT"
              v-model="form.traits"
              :items="items.trait"
              multiple
              chips
              deletable-chips>
              </v-combobox>
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
              :label="this.$cfg.const.HEALTH"
              v-model="form.health"
              ></v-text-field>
              <v-text-field
              :label="this.$cfg.const.SANITY"
              v-model="form.sanity"
              ></v-text-field>
              <v-textarea
              label="앞면 텍스트"
              v-model="form.text">
              </v-textarea>
              <v-textarea
              label="앞면 맛글"
              v-model="form.flavor">
              </v-textarea>
              <v-text-field
              label="뒷면 이름"
              v-model="form.backName"
              ></v-text-field>
              <v-textarea
              label="뒷면 텍스트"
              v-model="form.backText">
              </v-textarea>
              <v-textarea
              label="뒷면 맛글"
              v-model="form.backFlavor">
              </v-textarea>
              <v-text-field
              label="덱 사이즈"
              v-model="form.deckSize"
              ></v-text-field>
              <v-select
              label="필수 카드"
              v-model="form.deckReq_ids"
              :items="items.requirement"
              item-text="name"
              item-value="_id"
              multiple
              chips
              deletable-chips
              ></v-select>
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
              <v-layout v-for="(i, index) in this.$cfg.const.FACTIONS" :key="index">
                <v-flex md6>
                  <v-switch :label="i" v-model="deckOptions[index].sw" />
                </v-flex>
                <v-flex md3>
                  <v-text-field label="min" v-model="deckOptions[index].min" :disabled="!deckOptions[index].sw" />
                </v-flex>
                <v-flex md3>
                  <v-text-field label="max" v-model="deckOptions[index].max" :disabled="!deckOptions[index].sw" />
                </v-flex>
              </v-layout>
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
import nowLoading from '@/components/now-loading'
export default {
  components: {
    nowLoading
  },
  props: {
    title: { type: String, default: '' }
  },
  data () {
    return {
      items: {
        faction: this.$cfg.const.FACTIONS,
        trait: this.$cfg.const.TRAITS,
        requirement: [],
        pack: []
      },
      rules: {
        name: [
          (v) => !!v || '이름을 입력하세요'
        ],
        subname: [
          (v) => !!v || '직업을 입력하세요'
        ],
        faction: [
          (v) => !!v || '진영을 선택하세요'
        ],
        illustrator: [
          (v) => !!v || '삽화가를 입력하세요'
        ],
        number: [
          (v) => !!v || '카드 번호를 입력하세요'
        ],
        pack: [
          (v) => !!v || '수록 팩을 선택하세요'
        ]
      },
      deckOptions: [],
      pending: true,
      form: {
        _id: '',
        name: '', // required
        faction: '', // required
        type: this.$cfg.const.INVESTIGATOR, // required
        illustrator: '', // required
        pack_id: '', // required
        number: '', // required
        subname: '',
        img: '',
        isUnique: true,
        qty: 1,
        isDoubleFaced: true,
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
        health: 0,
        sanity: 0,
        attack: null,
        horror: null,
        enemyHP: null,
        text: '',
        flavor: '',
        deckSize: 30,
        deckOptions: [],
        deckReq_ids: []
      }
    }
  },
  created () {
    this.createDeckOptions()
  },
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        this.form.deckOptions = []
        this.deckOptions.map((i) => {
          if (!i.sw) return
          this.form.deckOptions.push({
            faction: i.faction,
            min: i.min,
            max: i.max
          })
        })
        this.$emit('form-submit', this.form)
      }
    },
    close () {
      this.$emit('form-close')
    },
    createDeckOptions () {
      const factions = this.$cfg.const.FACTIONS

      factions.forEach((i) => {
        this.deckOptions.push({
          sw: false,
          faction: i,
          min: 0,
          max: 5
        })
      })
    },
    iniDeckOptions () {
      this.deckOptions.map((i) => {
        i.sw = false
        i.min = 0
        i.max = 5
      })
    },
    setDeckOptions (arr = []) {
      arr.forEach((i) => {
        this.deckOptions.map((j) => {
          if (j.faction === i.faction) {
            j.sw = true
            j.min = i.min
            j.max = i.max
          }
        })
      })
    },
    reset () {
      this.$refs.form.reset()
      this.$nextTick(() => {
        this.iniDeckOptions()
      })
      this.pending = true
    },
    async setForm (_id) {
      try {
        if (_id) {
          const cardRes = await this.fetchCard(_id)
          if (!cardRes.data.success) throw new Error(cardRes.data.msg)
          this.form = cardRes.data.card
          this.setDeckOptions(this.form.deckOptions)
        }
        const reqRes = await this.fetchRequirements()
        const packRes = await this.fetchPacks()

        if (!reqRes.data.success) throw new Error(reqRes.data.msg)
        if (!packRes.data.success) throw new Error(packRes.data.msg)

        this.items.requirement = reqRes.data.d.ds
        this.items.pack = packRes.data.d.ds

        this.pending = false
      } catch (err) {
        console.error(err.message)
      }
    },
    async fetchCard (_id) {
      try {
        const res = await this.$axios.get(`${this.$cfg.path.api}data/card/${_id}`)
        if (!res.data.success) throw new Error(res.data.msg)
        return res
      } catch (err) {
        console.log(err)
      }
    },
    async fetchRequirements () {
      try {
        const query = {
          type: {
            $ne: this.$cfg.const.INVESTIGATOR
          }
        }
        const select = 'name'
        const res = await this.$axios.get(`${this.$cfg.path.api}data/card`, {
          params: {
            draw: 0,
            sort: 'name',
            order: 1,
            skip: 0,
            limit: 0,
            query: query,
            select: select
          }
        })

        if (!res.data.success) throw new Error(res.data.msg)
        return res
      } catch (err) {
        console.log(err.message)
      }
    },
    async fetchPacks () {
      try {
        const query = {}
        const select = 'name'
        const res = await this.$axios.get(`${this.$cfg.path.api}data/pack`, {
          params: {
            draw: 0,
            sort: 'name',
            order: 1,
            skip: 0,
            limit: 0,
            query: query,
            select: select
          }
        })
        if (!res.data.success) throw new Error(res.data.msg)
        return res
      } catch (err) {
        console.log(err.message)
      }
    }
  }
}
</script>
