import { ChangeEvent, ChangeEventHandler } from "react";
import { SpellType } from "../utils/models";

type ValidStringKeys = 
  'name' | 'desc' | 'schoolOfMagic' | 'higherLevelDesc' | 'range' | 'castingTime' | 'duration';

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

function EditCard({
  cardData,
  save
}: {
  cardData: SpellType,
  save: Function
}) {

  const setString = (key: ValidStringKeys): ChangeEventHandler => {
    const setFunction: ChangeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const newData = { ...cardData};
      newData[key] = event.target.value;
      save(newData);
    }

    return setFunction;
  }

  return (
    <div className="edit">
      <h1>edit screen</h1>

      <FormField title="Spell Name" identifier="name" value={cardData.name} onChange={ setString('name') } />
      <FormField title="Range" identifier="range" value={cardData.range} onChange={ setString('range') } />
      <FormField title="Casting Time" value={cardData.castingTime} identifier="castingTime" onChange={ setString('castingTime') } />
      <FormField title="Duration" identifier="duration" value={cardData.duration} onChange={ setString('duration') } />
 
    </div>

  )
}

export default EditCard;