<template>
  <v-card>
    <now-loading :show="pending" />
    <v-fade-transition>
      <v-form ref="form" v-show="!pending">
        <v-card-title>
          {{ title }}
        </v-card-title>
        <v-card-text>
          <v-text-field
          label="팩 이름"
          :rules="nameRules"
          v-model="form.name">
          </v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn flat @click="submit()">확인</v-btn>
          <v-btn flat @click="close()">취소</v-btn>
        </v-card-actions>
      </v-form>
    </v-fade-transition>
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
      form: {
        _id: '',
        name: '',
        parent_id: null
      },
      pending: true,
      nameRules: [
        (v) => !!v || '이름을 입력해주세요'
      ]
    }
  },
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        this.$emit('form-submit', this.form)
      }
    },
    close () {
      this.$emit('form-close')
    },
    reset () {
      this.$refs.form.reset()

      this.pending = true
    },
    setForm (_id) {
      if (!_id) {
        this.pending = false
        return
      }
      this.$axios.get(`${this.$cfg.path.api}data/pack/${_id}`)
      .then((res) => {
        if (!res.data.success) throw new Error(res.data.msg)
        this.form = res.data.pack
        this.pending = false
      })
      .catch((err) => {
        console.log(err.message)
      })
    }
  }
}
</script>
