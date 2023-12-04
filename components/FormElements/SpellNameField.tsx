import { ChangeEvent, ChangeEventHandler, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { acceptSuggestionThunk, fetchSpells } from "../../stores/thunks";
import { updateActiveCard } from "../../stores/uiStateReducer";
import { SrdType } from "../../utils/models"

function SuggestedSpells({
  input,
  allSrdSpells,
  acceptSuggestion,
}: {
  input: string,
  allSrdSpells: SrdType[],
  acceptSuggestion: Function,
}) {
  let message = <p className="text-xs">Start typing, and I&rsquo;ll look for your spell in the SRD database</p>;
  let possibleSpells: SrdType[] = [];
  if (input.length < 2) {
    possibleSpells = [];
  } else {
    possibleSpells = allSrdSpells.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase())
    })
  }

  if(possibleSpells.length === 0 && input.length >= 2) {
    const searchQuery = input.toLowerCase().split(" ").join("+");
    message = <p className="text-xs">
      Custom spell! <a className="text-blue-700" href={`https://www.google.com/search?q=dnd+5e+${searchQuery}`} rel="noreferrer" target="_blank">Google &ldquo;dnd 5e {input}&rdquo;</a>
    </p>
  }

  const select = (sp: SrdType) => {
    acceptSuggestion(sp)
  }

  const spellsList = possibleSpells.map((sp) => {
    return (
      <button key={sp.index} onClick={() => select(sp)} className="flex w-full pl-1 border-b justify-start hover:bg-slate-200">
        <span className="flex-grow text-left">{sp.name}</span>
        <span className="text-green-700 inline-block px-2 bg-green-300 bg-opacity-30">+</span>
      </button>
    )
  })

  return (
    <div className="block">
      { message }

      { spellsList.length > 0 && (<div className="border border-b-0">
        { spellsList }
      </div>)}

    </div>
  )
}

function SpellNameField() {
  const cardData = useAppSelector((state) => state.ui.activeCardData);
  const srdSpells = useAppSelector((state) => state.ui.srdSpells);
  const dispatch = useAppDispatch();
  const [showSuggestions, setShowSuggestions] = useState(cardData.name.length === 0);

  if(srdSpells.length == 0) {
    console.log("huh, you're here");
    dispatch(fetchSpells());
  }

  const setName = (newName: string) => {
    const newData = {...cardData};
    newData.name = newName;
    dispatch(updateActiveCard(newData));
  }

  const acceptSuggestion = (srd: SrdType) => {
    // setName(srd.name);
    // const srdData = SpellApiService.get(srd.index);
    // srdData.then((data: SpellType) => {
    //   dispatch(updateActiveCard(data));
    // })
    dispatch(acceptSuggestionThunk(srd));
    setShowSuggestions(false);
  }

  const onChange: ChangeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setShowSuggestions(true);
    setName(event.target.value);
  }

  return (
    <>
      <label className="font-bold text-sm" htmlFor='name'>Spell Name</label>
      <input value={ cardData.name } className="border w-full block px-1" type="text" name='name' onChange={ onChange } />
      { showSuggestions && <SuggestedSpells input={ cardData.name } allSrdSpells={ srdSpells } acceptSuggestion={ acceptSuggestion } /> }
    </>
  )

}

export default SpellNameField