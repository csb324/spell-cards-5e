import { useState } from "react";
import { EditorState, ContentState } from "draft-js";
import Card from '../components/Card';
import { SpellType, SrdType } from "../utils/models";
import { blankCard } from "../utils/constants";
import SpellApiService from "../utils/SpellApiService";
import EditCard from "../components/EditCard";

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

  const updateCard = (newData: SpellType) => {
    const newCards = [...cardsData];
    newCards[activeCard] = newData;
    setCardsData(newCards);
  }

  if(activeCard === -1) {
    const cards = cardsData.map((c, index) => (
      <Card key={c.name} spell={c} select={selectFunction(index)} isActive={ false }/>
    ));
  
    return (
      <div className="container mx-auto p-4">
        <button className="print:hidden px-3 bg-blue-700 text-white" onClick={() => addCard()}>add</button>
        <div className="flex-wrap flex justify-between">
          { cards }
        </div>
      </div>
    )

  } else {
    const c = cardsData[activeCard];
    return (
      <div className="container mx-auto p-4 flex">
        <div className="flex-initial w-full md:w-1/2">
          <button onClick={selectFunction(-1)}>Back</button>

          <EditCard 
            cardData={cardsData[activeCard]}
            save={updateCard}
            allSrdSpells={allSrdSpells}
            editorState={editorState}
            setEditorState={setEditorState}
            higherLevelEditorState={higherLevelEditorState}
            setHigherLevelEditorState={setHigherLevelEditorState} />
        </div>

        <div className="flex-grow w-full md:w-1/2 justify-center flex">
          <Card key={c.name} spell={c} select={selectFunction(activeCard)} isActive={ true }/>
        </div>
      </div>
    )
  }
}

export default App;
