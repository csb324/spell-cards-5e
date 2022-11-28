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
      <>
        { index % 9 === 0 && index > 0 && <div className="pagebreak print:mt-4 print:w-full"></div> }
        <Card key={c.name} spell={c} select={() => { dispatch(selector) }} remove={() => dispatch(remove(index))} isActive={ false }/>
      </>      
    )
  });

  return(
    <>
      <div>
        <button className="print:hidden uppercase font-mono leading-6 px-3 rounded-md text-white bg-green-500 hover:bg-green-600" onClick={() => dispatch(createNewCard())}>add card</button>
        <button className="print:hidden uppercase font-mono leading-6 px-3 ml-2 rounded-md bg-blue-700 hover:bg-blue-800 text-white" onClick={() => print()}>print cards</button>
      </div>
      <div className="flex-wrap flex flex-grow">
        { cards }
      </div>
    </>
  )
}

export default AllCards;