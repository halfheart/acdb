<template>

</template>

<script>
export default {
  data () {
    return {

    }
  },
  filters: {
    slots: function (arr = []) {
      let result = ''

      arr.forEach((i) => {
        result += `${i}. `
      })

      return result
    },
    traits: function (arr = []) {
      let result = ''

      arr.forEach((i) => {
        result += `${i}. `
      })

      return result
    },
    cardNumber: function (p = '', n = '') {
      return `${p} #${n}`
    }
  },
  methods: {
    factionColor (str = '') {
      const factions = this.$cfg.const.FACTIONS
      if (str === factions[1]) return 'red white--text'
      if (str === factions[2]) return 'indigo white--text'
      if (str === factions[3]) return 'purple white--text'
      if (str === factions[4]) return 'orange white--text'
      if (str === factions[5]) return 'green white--text'
      return 'grey white--text'
    },
    nameWithUnique (obj = {}) {
      if (!obj.isUnique) return obj.name
      return `<span class="font-icon icon-unique" title="${this.$cfg.const.UNIQUE}"></span>${obj.name}`
    },
    factionWithIcon (str = '') {
      const factions = this.$cfg.const.FACTIONS
      const ename = ['neutral', 'survivor', 'guardian', 'mystic', 'seeker', 'rogue']
      let result = str

      factions.forEach((i, index) => {
        if (index === 0) return
        if (str === i) result = `<span class="img-icon icon-${ename[index]}" title="${str}"></span>${str}`
      })
      return result
    },
    testIcons (obj = {}) {
      if (obj.type === this.$cfg.const.INVESTIGATOR) return ''

      let w = obj.will
      let i = obj.int
      let c = obj.combat
      let a = obj.agi
      let x = obj.wild
      let result = ''

      while (w > 0) {
        result += `<span class="font-icon icon-willpower" title="${this.$cfg.const.WILLPOWER}"></span>`
        w--
      }
      while (i > 0) {
        result += `<span class="font-icon icon-intellect" title="${this.$cfg.const.INTELLECT}"></span>`
        i--
      }
      while (c > 0) {
        result += `<span class="font-icon icon-combat" title="${this.$cfg.const.COMBAT}"></span>`
        c--
      }
      while (a > 0) {
        result += `<span class="font-icon icon-agility" title="${this.$cfg.const.AGILITY}"></span>`
        a--
      }
      while (x > 0) {
        result += `<span class="font-icon icon-wild" title="${this.$cfg.const.WILD}"></span>`
        x--
      }

      return result
    },
    cardText (str = '') {
      let result = ''

      str = str.replace(/\[reaction\]/gi, `<span class="font-icon icon-reaction" title="${this.$cfg.const.REACTION}"></span>`)
      str = str.replace(/\[action\]/gi, `<span class="font-icon icon-action" title="${this.$cfg.const.ACTION}"></span>`)
      str = str.replace(/\[auto fail\]/gi, `<span class="font-icon icon-autofail" title="${this.$cfg.const.AUTOFAIL}"></span>`)
      str = str.replace(/\[skull\]/gi, `<span class="font-icon icon-skull" title="${this.$cfg.const.SKULL}"></span>`)
      str = str.replace(/\[cultist\]/gi, `<span class="font-icon icon-cultist" title="${this.$cfg.const.CULTIST}"></span>`)
      str = str.replace(/\[tablet\]/gi, `<span class="font-icon icon-tablet" title="${this.$cfg.const.TABLET}"></span>`)
      str = str.replace(/\[elder thing\]/gi, `<span class="font-icon icon-elderthing" title="${this.$cfg.const.ELDERTHING}"></span>`)
      str = str.replace(/\[elder sign\]/gi, `<span class="font-icon icon-eldersign" title="${this.$cfg.const.ELDERSIGN}"></span>`)
      str = str.replace(/\[fast action\]/gi, `<span class="font-icon icon-fastaction" title="${this.$cfg.const.FASTACTION}"></span>`)
      str = str.replace(/\[combat\]/gi, `<span class="font-icon icon-combat" title="${this.$cfg.const.COMBAT}"></span>`)
      str = str.replace(/\[agility\]/gi, `<span class="font-icon icon-agility" title="${this.$cfg.const.AGILITY}"></span>`)
      str = str.replace(/\[intellect\]/gi, `<span class="font-icon icon-intellect" title="${this.$cfg.const.INTELLECT}"></span>`)
      str = str.replace(/\[willpower\]/gi, `<span class="font-icon icon-willpower" title="${this.$cfg.const.WILLPOWER}"></span>`)

      str = str.split('\n')
      str.forEach((i) => {
        result += `<p class="card-text">${i}</p>`
      })

      return result
    }
  }
}
</script>

<style>
@font-face {
  font-family: "arkham-icons";
  src: url('http://localhost:3000/fonts/arkham-icons.woff') format('woff'),
      url('http://localhost:3000/fonts/arkham-icons.tfilter.type') format('truetype'),
      url('http://localhost:3000/fonts/arkham-icons.svg') format('svg'),
      url('http://localhost:3000/fonts/arkham-icons.ofilter.type') format('opentype')
}
.icon-action:before {
  content: "i";
}
.icon-combat:before {
  content: "c";
  color: #663300;
}
.icon-agility:before {
  content: "a";
  color: #006633;
}
.icon-willpower:before {
  content: "p";
  color: #333399;
}
.icon-intellect:before {
  content: "b";
  color: #330066;
}
.icon-reaction:before {
  content: "!";
}
.icon-fastaction:before {
  content: "j";
}
.icon-unique:before {
  content: "s"
}
.icon-eldersign:before {
  content: "o"
}
.icon-autofail:before {
  content: "m"
}
.icon-skull:before {
  content: "k"
}
.icon-cultist:before {
  content: "l"
}
.icon-elderthing:before {
  content: "n"
}
.icon-tablet:before {
  content: "q"
}
.icon-wild:before {
  content: "?";
  font-weight: bold;
  padding-right: 3px;
  padding-left: 3px;
}
.font-icon {
  font-family: "arkham-icons";
  font-size: 15pt;
}
.icon-guardian {
  background-image: url('http://localhost:3000/images/system/guardian_icon.png');
}
.icon-seeker {
  background-image: url('http://localhost:3000/images/system/seeker_icon.png');
}
.icon-rogue {
  background-image: url('http://localhost:3000/images/system/rogue_icon.png');
}
.icon-survivor {
  background-image: url('http://localhost:3000/images/system/survivor_icon.png');
}
.icon-mystic {
  background-image: url('http://localhost:3000/images/system/mystic_icon.png');
}
.img-icon {
  width: 1.3em;
  height: 1.3em;
  background-position: center;
  background-repeat: no-repeat;
  display: inline-block;
  box-sizing: border-box;
}
</style>
