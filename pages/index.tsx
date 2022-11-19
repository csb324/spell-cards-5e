import { useState } from "react";
import Card from '../components/Card';
import { SpellType } from "../utils/models";
import { blankCard } from "../utils/constants";
import SpellApiService from "../utils/SpellApiService";
import EditCard from "../components/EditCard";

function App() {
  const [activeCard, setActiveCard] = useState(-1);
  const [cardsData, setCardsData] = useState([SpellApiService.get('')]);
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
      <div className="App">
        <button onClick={() => addCard()}>add</button>
        
        { cards }
      </div>
    );
  } else {
    const c = cardsData[activeCard];

    return (
      <div className="App">
        <EditCard 
          cardData={cardsData[activeCard]}
          save={updateCard} />

        <Card key={c.name} spell={c} select={selectFunction(activeCard)} isActive={ true }/>
      </div>
    )
  }
}

export default App;
