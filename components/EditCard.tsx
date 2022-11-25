import { ChangeEvent, ChangeEventHandler } from "react";
import SpellDescriptionField from "./SpellDescriptionField";
import SpellNameField from "./SpellNameField";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import { updateActiveCard } from "../stores/uiStateReducer";
import { buttonClasses, SIZE_MAXIMUM, SIZE_MINIMUM } from "../utils/constants";
import FormField from "./FormField";
import ComponentInput from "./ComponentInput";

type ValidStringKeys = 'name' 
  | 'schoolOfMagic' 
  | 'higherLevelDesc' 
  | 'range' 
  | 'castingTime' 
  | 'duration';

function EditCard() {
  const dispatch = useAppDispatch();
  const cardData = useAppSelector((state) => state.ui.activeCardData);

  const setString = (key: ValidStringKeys): ChangeEventHandler => {
    const setFunction: ChangeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const newData = { ...cardData};
      newData[key] = event.target.value;
      dispatch(updateActiveCard(newData));
    }
    return setFunction;
  }

  const incrementSize = () => {
    if(cardData.descSize >= SIZE_MAXIMUM) {
      return;
    }
    const newData = {...cardData}
    newData.descSize++;
    dispatch(updateActiveCard(newData))
  }

  const decrementSize = () => {
    if(cardData.descSize <= SIZE_MINIMUM) {
      return;
    }

    const newData = {...cardData}
    newData.descSize--;
    dispatch(updateActiveCard(newData))
  }


  return (
    <div className="edit font-sans">
      <SpellNameField />

      <FormField 
        title="Casting Time" 
        value={cardData.castingTime} 
        identifier="castingTime" 
        onChange={ setString('castingTime') } 
      />

      <FormField 
        title="Range" 
        identifier="range" 
        value={cardData.range} 
        onChange={ setString('range') } 
      />

      <ComponentInput />

      <FormField 
        title="Duration" 
        identifier="duration" 
        value={cardData.duration} 
        onChange={ setString('duration') } 
      />

      <div>
        <button title="Decrease text size" onClick={decrementSize} className={buttonClasses}>-</button>
        <button title="Increase text size" onClick={incrementSize} className={buttonClasses}>+</button>
      </div>

      <SpellDescriptionField
        title="Spell Description"
        currentStatus={cardData.desc}
        propName="desc"
      />

      <SpellDescriptionField
        title="At higher levels?"
        currentStatus={cardData.higherLevelDesc || ''}
        propName="higherLevelDesc"
      />

    </div>
  )
}

export default EditCard;