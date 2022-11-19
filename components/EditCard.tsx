import { ChangeEvent, ChangeEventHandler } from "react";
import { SpellType, SrdType } from "../utils/models";
import SpellNameField from "./SpellNameField";

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
  save,
  allSrdSpells
}: {
  cardData: SpellType,
  save: Function,
  allSrdSpells: SrdType[]
}) {
  const setString = (key: ValidStringKeys): ChangeEventHandler => {
    const setFunction: ChangeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const newData = { ...cardData};
      newData[key] = event.target.value;
      save(newData);
    }
    return setFunction;
  }

  const setName = (newName: string) => {
    const newData = {...cardData};
    newData.name = newName;
    save(newData);
  }

  return (
    <div className="edit">
      <h1>edit screen</h1>

      <SpellNameField initialValue={cardData.name} setName={ setName } setAll={ save } allSrdSpells={allSrdSpells} />

      <FormField title="Range" identifier="range" value={cardData.range} onChange={ setString('range') } />
      <FormField title="Casting Time" value={cardData.castingTime} identifier="castingTime" onChange={ setString('castingTime') } />
      <FormField title="Duration" identifier="duration" value={cardData.duration} onChange={ setString('duration') } />
 
    </div>

  )
}

export default EditCard;