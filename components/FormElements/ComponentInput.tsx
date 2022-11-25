import { ChangeEvent, ChangeEventHandler } from "react";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { updateActiveCard } from "../../stores/uiStateReducer";
import FormField from "./FormField";

function ComponentInput() {
  const cardData = useAppSelector((state) => state.ui.activeCardData);
  const dispatch = useAppDispatch();
  const componentValue = cardData.components;

  const descChange = (event: ChangeEvent<HTMLInputElement>)  => {
    let newData = { 
      ...cardData,
      components: {
        ...cardData.components,
        materialDesc: event.target.value
      }
     };
    dispatch(updateActiveCard(newData));
  }

  const componentChange = (fieldName: 'material' | 'somatic' | 'verbal'): ChangeEventHandler => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      const newData = { ...cardData,
        components: {
          ...cardData.components,
          [fieldName]: event.target.checked
        } 
      };
      dispatch(updateActiveCard(newData));
    }
  }

  return(
    <>
      <label className="font-bold text-sm" htmlFor='components-group'>Components</label>
      <div>
        <input 
          onChange={componentChange('verbal')} 
          type="checkbox" 
          name="components" 
          value="verbal" 
          id="verbal" 
          checked={componentValue.verbal}
        ></input>
        <label className="ml-2" htmlFor="verbal">Verbal</label>
        <input 
          onChange={componentChange('somatic')} 
          type="checkbox" 
          name="components" 
          value="somatic" 
          id="somatic" 
          checked={componentValue.somatic}
          className="ml-2"
          ></input>
        <label className="ml-2" htmlFor="somatic">Somatic</label>
        <input 
          onChange={componentChange('material')} 
          type="checkbox" 
          name="components" 
          value="material" 
          id="material" 
          checked={componentValue.material}
          className="ml-2"

          ></input>
        <label className="ml-2" htmlFor="material">Material</label>
      </div>
      { componentValue.material && 
        <FormField title="Materials" 
          value={componentValue.materialDesc || ''} 
          identifier="castingTime" 
          onChange={ descChange } /> }
    </>
  )
}

export default ComponentInput;