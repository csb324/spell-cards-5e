import { useState } from "react";
import { PcClass } from "../utils/SpellApiService";
import { buttonClasses } from "../utils/constants";

type PreloadedClassListProps = {
  getClassSpells: Function,
  closeList: Function
}

function PreloadedClassList({
  getClassSpells,
  closeList
}: PreloadedClassListProps) {
  const [maxLevel, setMaxLevel] = useState(9);

  const maxLevelUp = () => {
    if(maxLevel == 9) {
      return;
    }

    setMaxLevel(maxLevel + 1);
  }

  const maxLevelDown = () => {
    if(maxLevel == 0) {
      return;
    }

    setMaxLevel(maxLevel - 1);  
  }

  const classes: PcClass[] = ['barbarian', 'bard', 'cleric', 'druid', 'fighter', 'monk', 'paladin', 'ranger', 'rogue', 'sorcerer', 'warlock', 'wizard']
  return (
    <div className="flex flex-wrap items-center print:hidden mb-2 p-3 pt-1 rounded-sm bg-blue-50">
      <p className="text-sm uppercase tracking-wide w-full">Import SRD Spells</p>
      <div className="order-3 self-start">
        <button className="print:hidden uppercase font-mono text-xs leading-6 px-3  rounded-md bg-slate-300 hover:bg-slate-400" onClick={() => closeList()}>never mind</button>
      </div>
      <ul className="flex-grow flex flex-wrap max-w-2xl">
        { classes.map((c) => 
          <li key={`${c}-spells`} className="mr-2">
            <button onClick={() => getClassSpells(c, maxLevel)} className={buttonClasses}>{c}</button>
          </li>
        )}
      </ul>

      <div className="flex flex-grow flex-wrap md:justify-center pb-2 mt-2 md:-mt-3">
        <p className="text-xs w-full md:text-center">Maximum Spell Level</p>
        <button onClick={() => maxLevelDown()} className={buttonClasses}>-</button>
          <p className="text-md mr-1 font-sans">{maxLevel}</p>
        <button onClick={() => maxLevelUp()} className={buttonClasses}>+</button>
      </div>
    </div>
  )
} 

export default PreloadedClassList