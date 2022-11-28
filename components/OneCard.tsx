import { useAppDispatch, useAppSelector } from '../stores/hooks';
import Card from "./Card";
import EditCard from "./EditCard";
import { finishEditing } from '../stores/thunks';
import { buttonClasses } from '../utils/constants';

function OneCard() {  
  const dispatch = useAppDispatch();
  const card = useAppSelector((state) => state.ui.activeCardData);

  const goBack = () => {
    dispatch(finishEditing);
  }

  return (
    <div className="flex flex-grow">
      <div className="flex-initial w-full md:w-1/2">
        <button className={`${buttonClasses} bg-slate-200 tracking-widest`} onClick={goBack}>Back</button>
        <EditCard />
      </div>

      <div className="flex-grow w-full md:w-1/2 justify-center flex">
        <Card key={card.name} remove={ undefined } spell={card} select={() => {}} isActive={ true }/>
      </div>
    </div>
  )
}

export default OneCard;