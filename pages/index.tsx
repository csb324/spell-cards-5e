import { useEffect, useState } from "react";

import { SrdType } from "../utils/models";
import SpellApiService from "../utils/SpellApiService";
import ThemeChooser from "../components/ThemeChooser";
import FontSnippet from "../components/FontSnippet";
import AllCards from "../components/AllCards";
import OneCard from "../components/OneCard";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import { initCards } from "../stores/cardsReducer";

function App() {
  const [allSrdSpells, setAllSrdSpells] = useState<SrdType[]>([]);
  const dispatch = useAppDispatch();

  const activeCard = useAppSelector((state) => state.ui.activeCard);

  useEffect(() => {
    if(typeof window !== 'undefined') {
      dispatch(initCards(JSON.parse(localStorage.getItem("cards") || "[]")))
    } 
  });

  if(allSrdSpells.length === 0) {
    SpellApiService.getList().then((list) => {
      setAllSrdSpells(list.results)
    });
  }

  return (      
    <div className="container mx-auto p-4">
      <FontSnippet />
      <h1 className="uppercase text-center tracking-wider text-4xl mb-6">5e Spell Card Printable Generator</h1>
      <ThemeChooser />
      { (activeCard === -1) ? 
        <AllCards/> :
        <OneCard/>
      }
    </div>
  )
}

export default App;
