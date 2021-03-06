module.exports = {
  path: {
    api: 'http://localhost:3000/api/',
    web: 'http://localhost:8080/#/'
  },
  cookie: {
    expiresIn: '30m'
  },
  const: {
    FACTIONS: ['Neutral', 'Survivor', 'Guardian', 'Mystic', 'Seeker', 'Rogue'],
    TRAITS: ['Item', 'Tactic', 'Weapon', 'Relic'],
    INVESTIGATOR: '조사자',
    TYPES: ['Asset', 'Event', 'Skill', 'Treachery'],
    SUBTYPES: ['Weakness', 'Basic Weakness'],
    SLOTS: ['Hand', 'Hand x2', 'Ally', 'Body', 'Arcane', 'Arcane x2', 'Accessory'],
    WILLPOWER: 'Willpower',
    COMBAT: 'Combat',
    INTELLECT: 'Intellect',
    AGILITY: 'Agility',
    WILD: 'Wild',
    HEALTH: 'Health',
    SANITY: 'Sanity',
    COST: '비용',
    XP: '레벨',
    FACTION: '진영',
    TRAIT: '특성',
    SLOT: '슬롯',
    TYPE: '카드 종류',
    SUBTYPE: '서브 타입',
    UNIQUE: '유니크',
    REACTION: 'Reaction',
    ELDERSIGN: 'Elder Sign',
    FASTACTION: 'Fast Action',
    ACTION: 'Action',
    AUTOFAIL: 'Auto Fail',
    SKULL: 'Skull',
    TABLET: 'Tablet',
    CULTIST: 'Cultist',
    ELDERTHING: 'Elder Thing'
  }
}
