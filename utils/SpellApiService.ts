import { SpellType, SrdType  } from "./models";

type SrdSpellsReponse = {
  results: SrdType[],
  count: number
}

const SpellApiService = {

  getList: async (): Promise<SrdSpellsReponse> => {
    const list = await fetch('https://www.dnd5eapi.co/api/spells');
    return list.json();
  },
  
  convertDamagePerLevel: (apiResponse: Record<string, any>): Record<number, string> => {
    if(!apiResponse["damage"] || !apiResponse["damage"]["damage_at_character_level"]) {
      return {};
    }

    const damageAtCharacterLevel: Record<number, string> = {};
    const damageTable = apiResponse["damage"]["damage_at_character_level"];

    Object.keys(damageTable as Record<string, string>).forEach((k) => {
      damageAtCharacterLevel[parseInt(k)] = damageTable[k];
    });
    return damageAtCharacterLevel;
  },
  
  convert: (apiResponse: Record<string, any>): SpellType => {
    const components = {
      verbal: apiResponse["components"].includes('V'),
      somatic: apiResponse["components"].includes('S'),
      material: apiResponse["components"].includes('M'),
      materialDesc: apiResponse["material"] ? apiResponse["material"].replace(/^\.+|\.+$/g, '') : ''
    }
    const damageAtCharacterLevel = SpellApiService.convertDamagePerLevel(apiResponse);
    
    const convertedSpell = {
      name: apiResponse["name"],
      level: apiResponse["level"],
      desc: apiResponse["desc"].join("\n"),
      higherLevelDesc: apiResponse["higher_level"].join("\n"),
      schoolOfMagic: apiResponse["school"]["name"],
      range: apiResponse["range"],
      duration: apiResponse["duration"],
      ritual: apiResponse["ritual"],
      concentration: apiResponse["concentration"],
      castingTime: apiResponse["casting_time"],
      damageAtCharacterLevel,
      components
    };
    return convertedSpell;
  },
  
  get: async (spellName: string): Promise<SpellType> => {
    const data = await fetch('https://www.dnd5eapi.co/api/spells/' + spellName);
    const json = await data.json();
    return SpellApiService.convert(json);
  }
}

export default SpellApiService;