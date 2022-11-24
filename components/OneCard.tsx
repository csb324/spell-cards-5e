import { useAppDispatch, useAppSelector } from '../stores/hooks';
import Card from "./Card";
import EditCard from "./EditCard";
import { finishEditing } from '../stores/thunks';

function OneCard() {  
  const dispatch = useAppDispatch();
  const card = useAppSelector((state) => state.ui.activeCardData);

  const goBack = () => {
    dispatch(finishEditing);
  }

  return (
    <div className="flex">
      <div className="flex-initial w-full md:w-1/2">
        <button onClick={goBack}>Back</button>
        <EditCard />
      </div>

      <div className="flex-grow w-full md:w-1/2 justify-center flex">
        <Card key={card.name} spell={card} select={() => {}} isActive={ true }/>
      </div>
    </div>
  )
}

export default OneCard;