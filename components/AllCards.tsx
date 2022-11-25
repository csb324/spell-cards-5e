import { remove } from "../stores/cardsReducer";
import { RootState } from "../stores/rootReducer";
import { useAppDispatch, useAppSelector } from "../stores/hooks";


import Card from "./Card";
import { createNewCard, setActiveCardCreator } from "../stores/thunks";

function AllCards() {
  const cardsData = useAppSelector((state: RootState) => state.cards.list);
  const dispatch = useAppDispatch();

  const cards = cardsData.map((c, index) => {
    const selector = setActiveCardCreator(index);
    return (
      <Card key={c.name} spell={c} select={() => { dispatch(selector) }} remove={() => dispatch(remove(index))} isActive={ false }/>
    )
  });

  return(
    <>
      <button className="print:hidden px-3 rounded-md bg-blue-700 text-white" onClick={() => dispatch(createNewCard())}>add</button>
      <div className="flex-wrap flex">
        { cards }
      </div>
    </>
  )
}

export default AllCards;