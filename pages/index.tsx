import { useState } from "react";
import { EditorState, ContentState } from "draft-js";

import Card from '../components/Card';
import { SpellType, SrdType } from "../utils/models";
import { blankCard } from "../utils/constants";
import SpellApiService from "../utils/SpellApiService";
import EditCard from "../components/EditCard";
import ThemeChooser from "../components/ThemeChooser";
import FontSnippet from "../components/FontSnippet";
import AllCards from "../components/AllCards";
import OneCard from "../components/OneCard";

function App() {
  const [activeCard, setActiveCard] = useState(-1);
  const [cardsData, setCardsData] = useState<SpellType[]>([]);
  const [allSrdSpells, setAllSrdSpells] = useState<SrdType[]>([]);
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty()
  );
  const [higherLevelEditorState, setHigherLevelEditorState] = useState(
    () => EditorState.createEmpty()
  );

  if(allSrdSpells.length === 0) {
    SpellApiService.getList().then((list) => {
      setAllSrdSpells(list.results)
    });
  }


  const selectFunction = (index:number) => {
    return () => {
      if(index > 0) {
        setEditorState(EditorState.createWithContent(ContentState.createFromText(cardsData[index].desc, "/n")));
        
        if(cardsData[index].higherLevelDesc !== undefined) {
          setHigherLevelEditorState(
            EditorState.createWithContent(
              ContentState.createFromText(cardsData[index].higherLevelDesc as string, "/n")
            )
          );
        }
      }
      setActiveCard(index)
    };
  }

  const addCard = () => {
    const newCards: SpellType[] = [...cardsData, {...blankCard}];

    setEditorState(EditorState.createEmpty());
    setHigherLevelEditorState(EditorState.createEmpty());

    setCardsData(newCards);
    setActiveCard(newCards.length - 1);
  }

  const updateCard = (newData: SpellType, overwrite: boolean = false) => {
    const newCards = [...cardsData];
    newCards[activeCard] = newData;
    setCardsData(newCards);
    if(overwrite) {
      setEditorState(EditorState.createWithContent(ContentState.createFromText(newData.desc, "/n")));
      if(newData.higherLevelDesc !== undefined) {
        setHigherLevelEditorState(
          EditorState.createWithContent(
            ContentState.createFromText(newData.higherLevelDesc as string, "/n")
          )
        );
      }
    }
  }

  return (      
    <div className="container mx-auto p-4">
      <FontSnippet />
      <ThemeChooser />
      { (activeCard === -1) ? 
        <AllCards 
          cardsData={cardsData}
          selectFunction={selectFunction}
          addCard={addCard} /> :
        <OneCard 
          card={cardsData[activeCard]}
          editorState={editorState}
          setEditorState={setEditorState}
          setHigherLevelEditorState={setHigherLevelEditorState}
          higherLevelEditorState={higherLevelEditorState}
          selectFunction={selectFunction} 
          updateCard={updateCard} 
          allSrdSpells={allSrdSpells} />
      }
    </div>
  )
}

export default App;
