import { SpellType } from "./models"

export const blankCard: SpellType = {
  name: '',
  level: 0,
  schoolOfMagic: '',
  desc: '',
  range: 'Self',
  duration: 'Instantaneous',
  ritual: false,
  concentration: false,
  castingTime: '1 action',
  components: {
    verbal: false,
    somatic: false,
    material: true
  }
}
