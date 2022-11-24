import { useState } from "react";

import { SrdType } from "../utils/models";
import SpellApiService from "../utils/SpellApiService";
import ThemeChooser from "../components/ThemeChooser";
import FontSnippet from "../components/FontSnippet";
import AllCards from "../components/AllCards";
import OneCard from "../components/OneCard";
import { useAppSelector } from "../stores/hooks";

function App() {
  const [allSrdSpells, setAllSrdSpells] = useState<SrdType[]>([]);

  const activeCard = useAppSelector((state) => state.ui.activeCard);

  if(allSrdSpells.length === 0) {
    SpellApiService.getList().then((list) => {
      setAllSrdSpells(list.results)
    });
  }

  return (      
    <div className="container mx-auto p-4">
      <FontSnippet />
      <ThemeChooser />
      { (activeCard === -1) ? 
        <AllCards/> :
        <OneCard/>
      }
    </div>
  )
}

export default App;
