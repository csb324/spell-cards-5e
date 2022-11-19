import { useState } from "react";
import Card from '../components/Card';
import { SpellType } from "../utils/models";
import { blankCard } from "../utils/constants";
import SpellApiService from "../utils/SpellApiService";
import EditCard from "../components/EditCard";
import MainStore from "../utils/MainStore";

function App() {
  const [activeCard, setActiveCard] = useState(-1);
  const [cardsData, setCardsData] = useState([SpellApiService.get('')]);
  const [allSrdSpells, setAllSrdSpells] = useState([]);

  if(allSrdSpells.length === 0) {
    SpellApiService.getList().then((list) => {
      setAllSrdSpells(list.results)
    });  
  }

  const selectFunction = (index:number) => {
    return () => {
      setActiveCard(index);
    }
  }

  const addCard = () => {
    const newCards: SpellType[] = [...cardsData, {...blankCard}];
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
      <Card key={c.name} spell={c} select={selectFunction(index)} isActive={ index === activeCard }/>
    ));
    
    return (
      <div className="container mx-auto p-4 flex">
        <button onClick={() => addCard()}>add</button>

        <div className="flex flex-grow">
          { cards }
        </div>
      </div>
    )

  } else {
    const c = cardsData[activeCard];
    return (
      <div className="container mx-auto p-4 flex">
        <div className="flex-initial">
          <button onClick={selectFunction(-1)}>Back</button>
          <EditCard 
            cardData={cardsData[activeCard]}
            save={updateCard} />
        </div>

        <div className="flex-grow">
          <Card key={c.name} spell={c} select={selectFunction(activeCard)} isActive={ true }/>
        </div>
      </div>
    )
  }
}

export default App;