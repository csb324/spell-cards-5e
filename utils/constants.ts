import { SpellType } from "./models"

export enum SchoolOfMagic {
  abjuration = 'Abjuration',
  conjuration = 'Conjuration',
  divination = 'Divination',
  enchantment = 'Enchantment',
  evocation = 'Evocation',
  illusion = 'Illusion',
  necromancy = 'Necromancy',
  transmutation = 'Transmutation',
  other = 'Other'
}

export const blankCard: SpellType = {
  name: '',
  level: 0,
  schoolOfMagic: SchoolOfMagic.other,
  desc: '',
  range: 'Self',
  duration: 'Instantaneous',
  ritual: false,
  concentration: false,
  castingTime: '1 action',
  components: {
    verbal: true,
    somatic: false,
    material: false
  },
  descSize: 10
}

export const buttonClasses = "bg-slate-300 text-sm px-3 rounded-md font-sans uppercase mr-1 overflow-hidden";
  
export const SIZE_MAXIMUM = 16;
export const SIZE_MINIMUM = 7;
