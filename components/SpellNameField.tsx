import { ChangeEvent, ChangeEventHandler, useState } from "react";
import { SpellType, SrdType } from "../utils/models"
import SpellApiService from "../utils/SpellApiService";

function SuggestedSpells({
  input,
  allSrdSpells,
  acceptSuggestion,
}: {
  input: string,
  allSrdSpells: SrdType[],
  acceptSuggestion: Function,
}) {
  let message = 'start typing, and I\'ll look for your spell';
  let possibleSpells: SrdType[] = [];
  if (input.length < 2) {
    possibleSpells = [];
  } else {
    possibleSpells = allSrdSpells.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase())
    })
  }

  if(possibleSpells.length === 0 && input.length >= 2) {
    message = 'Custom spell!';
  }

  const select = (sp: SrdType) => {
    acceptSuggestion(sp)
  }

  const spellsList = possibleSpells.map((sp) => {
    return (
      <button key={sp.index} onClick={() => select(sp)} className="flex w-full pl-1 mb-1 justify-start hover:bg-slate-200">
        <span className="flex-grow text-left">{sp.name}</span>
        <span className="text-green-700 inline-block px-2 bg-green-300 bg-opacity-30">+</span>
      </button>
    )
  })

  return (
    <div className="block">
      <p className="text-xs">{ message }</p>

      { spellsList.length > 0 && (<div className="border">
        { spellsList }
      </div>)}

    </div>
  )
}

function SpellNameField({
  initialValue,
  setAll,
  setName,
  allSrdSpells
}: {
  initialValue: string,
  setAll: Function,
  setName: Function,
  allSrdSpells: SrdType[]
}) {
  const [value, setValue] = useState(initialValue);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const acceptSuggestion = (srd: SrdType) => {
    setValue(srd.name);
    const srdData = SpellApiService.get(srd.index);
    srdData.then((data: SpellType) => {
      setAll(data); 
    })
    setShowSuggestions(false);
  }

  const onChange: ChangeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setShowSuggestions(true);
    setValue(event.target.value);
    setName(event.target.value);
  }

  return (
    <>
      <label className="font-bold" htmlFor='name'>Spell Name</label>
      <input value={ value } className="border block px-1" type="text" name='name' onChange={ onChange } />
      { showSuggestions && <SuggestedSpells input={ value } allSrdSpells={ allSrdSpells } acceptSuggestion={ acceptSuggestion } /> }
    </>
  )

}

export default SpellNameField