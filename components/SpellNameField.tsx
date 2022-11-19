import { ChangeEvent, ChangeEventHandler, useState } from "react";
import { SpellType, SrdType } from "../utils/models"
import SpellApiService from "../utils/SpellApiService";

function SuggestedSpells({
  input,
  allSrdSpells,
  acceptSuggestion
}: {
  input: string,
  allSrdSpells: SrdType[],
  acceptSuggestion: Function
}) {

  let possibleSpells: SrdType[] = [];
  if (input.length < 2) {
    possibleSpells = [];
  } else {
    possibleSpells = allSrdSpells.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase())
    })
  }

  const spellsList = possibleSpells.map((sp) => {
    return (
      <button onClick={() => acceptSuggestion(sp)} className="block">{sp.name}</button>
    )
  })

  return (
    <div>
      { spellsList }
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

  const [message, setMessage] = useState('start typing, and I\'ll look for your spell');
  const [value, setValue] = useState(initialValue);

  const acceptSuggestion = (srd: SrdType) => {
    setValue(srd.name);
    setName(srd.name);

    const srdData = SpellApiService.get(srd.index);
    srdData.then((data: SpellType) => {
      setAll(data); 
    })

    console.log(srd);
  }

  const onChange: ChangeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }

  return (
    <>
      <label className="font-bold" htmlFor='name'>Spell Name</label>
      <input value={ value } className="border block mb-3 px-1" type="text" name='name' onChange={ onChange } />
      <SuggestedSpells input={ value } allSrdSpells={ allSrdSpells } acceptSuggestion={ acceptSuggestion } />
      <p>{ message }</p>
    </>
  )

}

export default SpellNameField