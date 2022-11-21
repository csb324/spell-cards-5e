import { ChangeEvent, ChangeEventHandler, useState } from "react";
import { ContentState, EditorState } from 'draft-js';
import { SpellType, SrdType } from "../utils/models";
import SpellDescriptionField from "./SpellDescriptionField";
import SpellNameField from "./SpellNameField";

type ValidStringKeys = 
  'name' | 'schoolOfMagic' | 'higherLevelDesc' | 'range' | 'castingTime' | 'duration';

type ValidRichKeys = 'desc' | 'higherLevelDesc';

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
  allSrdSpells,
  editorState,
  setEditorState,
  higherLevelEditorState,
  setHigherLevelEditorState
}: {
  cardData: SpellType,
  save: Function,
  allSrdSpells: SrdType[],
  editorState: EditorState,
  setEditorState: Function,
  higherLevelEditorState: EditorState,
  setHigherLevelEditorState: Function
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

  const setRichText = (k: ValidRichKeys) => {
    return (newDesc: ContentState) => {
      const newData = {...cardData};
      newData[k] = newDesc.getPlainText('/n');
      save(newData);
    }
  }

  return (
    <div className="edit">
      <SpellNameField 
        initialValue={cardData.name} 
        setName={ setName }
        setAll={ save } 
        allSrdSpells={allSrdSpells}
      />
      
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
        spellDesc={cardData.desc} 
        updateSpellDesc={setRichText('desc')}
        editorState={editorState}
        setEditorState={setEditorState}
      />

      <SpellDescriptionField
        title="At higher levels?"
        spellDesc={cardData.higherLevelDesc || ''} 
        updateSpellDesc={setRichText('higherLevelDesc')}
        editorState={higherLevelEditorState}
        setEditorState={setHigherLevelEditorState}
      />
    </div>
  )
}

export default EditCard;