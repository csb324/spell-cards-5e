import { useState } from "react";
import { EditorState, ContentState } from "draft-js";

import { SpellType, SrdType } from "../utils/models";
import { blankCard } from "../utils/constants";
import SpellApiService from "../utils/SpellApiService";
import ThemeChooser from "../components/ThemeChooser";
import FontSnippet from "../components/FontSnippet";
import AllCards from "../components/AllCards";
import OneCard from "../components/OneCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../stores/rootReducer";
import { add } from '../stores/cardsReducer';
import { useAppSelector } from "../stores/hooks";

function App() {
  const [allSrdSpells, setAllSrdSpells] = useState<SrdType[]>([]);

  const activeCard = useAppSelector((state) => state.ui.activeCard);

  if(allSrdSpells.length === 0) {
    SpellApiService.getList().then((list) => {
      setAllSrdSpells(list.results)
    });
  }


  // const selectFunction = (index:number) => {
  //   return () => {
  //     if(index > 0) {
  //       setEditorState(EditorState.createWithContent(ContentState.createFromText(cardsData[index].desc, "/n")));
        
  //       if(cardsData[index].higherLevelDesc !== undefined) {
  //         setHigherLevelEditorState(
  //           EditorState.createWithContent(
  //             ContentState.createFromText(cardsData[index].higherLevelDesc as string, "/n")
  //           )
  //         );
  //       }
  //     }
  //     setActiveCard(index)
  //   };
  // }

  // const addCard = () => {
  //   setEditorState(EditorState.createEmpty());
  //   setHigherLevelEditorState(EditorState.createEmpty());

  //   dispatch(add(blankCard));
  //   setActiveCard(cardsData.length - 1);
  // }

  // const updateCard = (newData: SpellType, overwrite: boolean = false) => {
  //   const newCards = [...cardsData];
  //   newCards[activeCard] = newData;
  //   setCardsData(newCards);
  //   if(overwrite) {
  //     setEditorState(EditorState.createWithContent(ContentState.createFromText(newData.desc, "/n")));
  //     if(newData.higherLevelDesc !== undefined) {
  //       setHigherLevelEditorState(
  //         EditorState.createWithContent(
  //           ContentState.createFromText(newData.higherLevelDesc as string, "/n")
  //         )
  //       );
  //     }
  //   }
  // }

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
