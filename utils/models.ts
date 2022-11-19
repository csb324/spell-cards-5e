export type ComponentType = {
  verbal: boolean,
  somatic: boolean,
  material: boolean
}

export type SpellType = {
  name: string,
  level: number,
  schoolOfMagic: string,
  
  desc: string,
  higherLevelDesc?: string,
  
  range: string,
  duration: string,
  castingTime: string,
  ritual: boolean,
  
  concentration: boolean,
  damageAtCharacterLevel?: Record<number, string>,
  components: ComponentType
}

export type SrdType = {
  index: string,
  name: string,
  url: string
}