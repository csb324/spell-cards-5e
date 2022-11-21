import { SpellType } from "../utils/models";
import Card from "./Card";

function AllCards({
  cardsData,
  selectFunction,
  addCard
}: {
  cardsData: SpellType[],
  selectFunction: Function,
  addCard: Function
}) {
  const cards = cardsData.map((c, index) => (
    <Card key={c.name} spell={c} select={selectFunction(index)} isActive={ false }/>
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