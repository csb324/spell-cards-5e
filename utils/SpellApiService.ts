import { SpellType  } from "./models";

const SpellApiService = {
    convertDamagePerLevel: (apiResponse: Record<string, any>): Record<number, string> => {
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
            material: apiResponse["components"].includes('M')
        }
        const damageAtCharacterLevel = SpellApiService.convertDamagePerLevel(apiResponse);

        const convertedSpell = {
            name: apiResponse["name"],
            level: apiResponse["level"],
            desc: apiResponse["desc"].join("/n"),
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

    get: (_spellName: string): SpellType => {
        const sacredFlameResponse = {
            "_id": "63781ec0310d9066554c3f90",
            "higher_level": [],
            "index": "sacred-flame",
            "name": "Sacred Flame",
            "desc": [
            "Flame-like radiance descends on a creature that you can see within range. The target must succeed on a dexterity saving throw or take 1d8 radiant damage. The target gains no benefit from cover for this saving throw.",
            "The spell's damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8)."
            ],
            "range": "60 feet",
            "components": [
                "V",
                "S"
            ],
            "ritual": false,
            "duration": "Instantaneous",
            "concentration": false,
            "casting_time": "1 action",
            "level": 0,
            "damage": {
            "damage_type": {
                "index": "radiant",
                "name": "Radiant",
                "url": "/api/damage-types/radiant"
            },
            "damage_at_character_level": {
                "1": "1d8",
                "5": "2d8",
                "11": "3d8",
                "17": "4d8"
            }
            },
            "dc": {
            "dc_type": {
                "index": "dex",
                "name": "DEX",
                "url": "/api/ability-scores/dex"
            },
            "dc_success": "none"
            },
            "school": {
            "index": "evocation",
            "name": "Evocation",
            "url": "/api/magic-schools/evocation"
            },
            "classes": [
            {
                "index": "cleric",
                "name": "Cleric",
                "url": "/api/classes/cleric"
            }
            ],
            "subclasses": [
            {
                "index": "lore",
                "name": "Lore",
                "url": "/api/subclasses/lore"
            }
            ],
            "url": "/api/spells/sacred-flame"
        };
        return SpellApiService.convert(sacredFlameResponse); 
    }
}

export default SpellApiService;