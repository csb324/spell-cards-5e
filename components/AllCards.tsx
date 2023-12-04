import { remove } from "../stores/cardsReducer";
import { RootState } from "../stores/rootReducer";
import { useAppDispatch, useAppSelector } from "../stores/hooks";


import Card from "./Card";
import { createNewCard, fetchSpells, getClassSpellsThunk, setActiveCardCreator, removeAllCards } from "../stores/thunks";
import { useState } from "react";
import { PcClass } from "../utils/SpellApiService";
import PreloadedClassList from "./PreloadedClassList";

function AllCards() {
  const cardsData = useAppSelector((state: RootState) => state.cards.list);
  const srdSpells = useAppSelector((state) => state.ui.srdSpells);
  const dispatch = useAppDispatch();
  
  const [classListOpen, setClassListOpen] = useState(false);

  const openListOfClasses = () => {
    if(srdSpells.length == 0) {
      console.log("huh, you're here");
      dispatch(fetchSpells());
    }
    setClassListOpen(true)
  }

  const cards = cardsData.map((c, index) => {
    const selector = setActiveCardCreator(index);
    return (
      <>
        { index % 9 === 0 && index > 0 && <div className="pagebreak print:mt-4 print:w-full"></div> }
        <Card key={c.name} spell={c} select={() => { dispatch(selector) }} remove={() => dispatch(remove(index))} isActive={ false }/>
      </>      
    )
  });

  return(
    <>
      <div>
        <button className="print:hidden uppercase font-mono leading-6 px-3 rounded-md text-white bg-green-500 hover:bg-green-600" 
          onClick={() => dispatch(createNewCard())}>
            add card
        </button>
        
        <button className="print:hidden uppercase font-mono leading-6 px-3 ml-2 rounded-md text-white bg-green-500 hover:bg-green-600" 
          onClick={() => openListOfClasses()}>
            add SRE cards by class
        </button>

        <button className="print:hidden uppercase font-mono leading-6 px-3 ml-2 rounded-md bg-blue-700 hover:bg-blue-800 text-white" 
          onClick={() => print()}>
            print cards
        </button>

        <button className="print:hidden uppercase font-mono leading-6 px-3 ml-2 rounded-md bg-red-700 hover:bg-red-800 text-white" 
          onClick={() => dispatch(removeAllCards())}>
          remove all cards
        </button>

        { classListOpen && <PreloadedClassList closeList={() => setClassListOpen(false)} getClassSpells={(c: PcClass, l: number) => dispatch(getClassSpellsThunk(c, l))} /> }

      </div>
      <div className="flex-wrap flex flex-grow">
        { cards }
      </div>
    </>
  )
}

export default AllCards;