import { ChangeEvent, ChangeEventHandler, useState } from "react";
import { GiSettingsKnobs  } from "react-icons/gi";

import SpellDescriptionField from "./FormElements/SpellDescriptionField";
import SpellNameField from "./FormElements/SpellNameField";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import { updateActiveCard } from "../stores/uiStateReducer";
import { buttonClasses, SIZE_MAXIMUM, SIZE_MINIMUM } from "../utils/constants";
import FormField from "./FormElements/FormField";
import ComponentInput from "./FormElements/ComponentInput";
import SpellTypeInput from "./FormElements/SpellTypeInput";

type ValidStringKeys = 'name' 
  | 'higherLevelDesc' 
  | 'range' 
  | 'castingTime' 
  | 'duration';

function EditCard() {
  const dispatch = useAppDispatch();
  const cardData = useAppSelector((state) => state.ui.activeCardData);
  const [metaOpen, setMetaOpen] = useState(false);

  const setString = (key: ValidStringKeys): ChangeEventHandler => {
    const setFunction: ChangeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const newData = { ...cardData};
      newData[key] = event.target.value;
      dispatch(updateActiveCard(newData));
    }
    return setFunction;
  }

  const setConcentration = (event: ChangeEvent<HTMLInputElement>) => {
    const newData = {
      ...cardData,
      concentration: event.target.checked
    }
    dispatch(updateActiveCard(newData));
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

      <div className="bg-slate-100 p-2 my-3 rounded-md">
        <button className="w-full text-left hover:text-blue-700" onClick={() => setMetaOpen(!metaOpen)}>
          <h3 className="h3 flex justify-between items-center font-mono">
            Meta Info
            <span className="sr-only">{ metaOpen ? 'less' : 'more'}</span>
            <GiSettingsKnobs />

          </h3>
        </button>
        { metaOpen && (
        <div>
          <SpellTypeInput />

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
          <div className="flex items-center">
            <div>
              <FormField 
                title="Duration" 
                identifier="duration"
                value={cardData.duration} 
                onChange={ setString('duration') } 
              />
            </div>
            <div className="pt-3">
              <input 
                onChange={setConcentration} 
                type="checkbox" 
                name="concentration" 
                value="concentration" 
                id="concentration" 
                checked={cardData.concentration}
                className="ml-2"
                ></input>
              <label className="ml-2" htmlFor="concentration">Concentration</label>
            </div>
          </div>
        </div>
        )}

      </div>


      <div className="border-slate-100 border p-2 my-3 rounded-md">
        <span className="font-mono mr-2">Text size:</span>
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