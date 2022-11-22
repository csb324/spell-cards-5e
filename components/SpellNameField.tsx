import { ChangeEvent, ChangeEventHandler, useState } from "react";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import { editCard } from "../stores/uiStateReducer";
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

function SpellNameField() {
  const cardData = useAppSelector((state) => state.ui.activeCardData);
  const dispatch = useAppDispatch();
  const [showSuggestions, setShowSuggestions] = useState(cardData.name.length === 0);

  const setName = (newName: string) => {
    const newData = {...cardData};
    newData.name = newName;
    dispatch(editCard(newData));
  }


  const acceptSuggestion = (srd: SrdType) => {
    setName(srd.name);
    const srdData = SpellApiService.get(srd.index);
    srdData.then((data: SpellType) => {
      dispatch(editCard(data));
    })
    setShowSuggestions(false);
  }

  const onChange: ChangeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setShowSuggestions(true);
    setName(event.target.value);
  }

  const allSrdSpells: SrdType[] = [];

  return (
    <>
      <label className="font-bold" htmlFor='name'>Spell Name</label>
      <input value={ cardData.name } className="border block px-1" type="text" name='name' onChange={ onChange } />
      { showSuggestions && <SuggestedSpells input={ cardData.name } allSrdSpells={ allSrdSpells } acceptSuggestion={ acceptSuggestion } /> }
    </>
  )

}

export default SpellNameField