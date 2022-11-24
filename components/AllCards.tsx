import { useDispatch, useSelector } from "react-redux";
import { add } from "../stores/cardsReducer";
import { RootState } from "../stores/rootReducer";
import { createNewCard, setActiveCardCreator } from "../stores/thunks";
import { useAppDispatch, useAppSelector } from "../stores/hooks";

import Card from "./Card";

function AllCards() {
  const cardsData = useAppSelector((state: RootState) => state.cards.list);
  const dispatch = useAppDispatch();

  const cards = cardsData.map((c, index) => {
    const selector = setActiveCardCreator(index);
    return (
      <Card key={c.name} spell={c} select={() => { dispatch(selector) }} isActive={ false }/>
    )
  });

  return(
    <>
      <button className="print:hidden px-3 bg-blue-700 text-white" onClick={() => dispatch(createNewCard())}>add</button>
      <div className="flex-wrap flex justify-between">
        { cards }
      </div>
    </>
  )
}

export default AllCards;