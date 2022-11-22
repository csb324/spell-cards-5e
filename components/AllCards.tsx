import { useDispatch, useSelector } from "react-redux";
import { add } from "../stores/cardsReducer";
import { set } from "../stores/uiStateReducer";
import { RootState } from "../stores/rootReducer";
import { blankCard } from "../utils/constants";

import Card from "./Card";

function AllCards() {
  const cardsData = useSelector((state: RootState) => state.cards.list);
  const dispatch = useDispatch();

  const addCard = () => {
    dispatch(add(blankCard));
  }
  
  const cards = cardsData.map((c, index) => (
    <Card key={c.name} spell={c} select={() => { dispatch(set(index)) }} isActive={ false }/>
  ));

  return(
    <>
      <button className="print:hidden px-3 bg-blue-700 text-white" onClick={() => addCard()}>add</button>
      <div className="flex-wrap flex justify-between">
        { cards }
      </div>
    </>
  )
}

export default AllCards;