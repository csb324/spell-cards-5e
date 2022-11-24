import { ChangeEvent, ChangeEventHandler } from "react";
import SpellDescriptionField from "./SpellDescriptionField";
import SpellNameField from "./SpellNameField";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import { updateActiveCard } from "../stores/uiStateReducer";

type ValidStringKeys = 'name' 
  | 'schoolOfMagic' 
  | 'higherLevelDesc' 
  | 'range' 
  | 'castingTime' 
  | 'duration';

function FormField({
  title,
  identifier,
  value,
  onChange
}: {
  title: string,
  identifier: string,
  value: string,
  onChange: ChangeEventHandler
}) {
  return (
    <>
      <label className="font-bold" htmlFor={ identifier }>{ title }</label>
      <input value={ value } className="border block mb-3 px-1" type="text" name={identifier} onChange={ onChange } />
    </>
  )
}

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

  return (
    <div className="edit">
      <SpellNameField />

      <FormField 
        title="Range" 
        identifier="range" 
        value={cardData.range} 
        onChange={ setString('range') } 
      />
      <FormField 
        title="Casting Time" 
        value={cardData.castingTime} 
        identifier="castingTime" 
        onChange={ setString('castingTime') } 
      />
      <FormField 
        title="Duration" 
        identifier="duration" 
        value={cardData.duration} 
        onChange={ setString('duration') } 
      />

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