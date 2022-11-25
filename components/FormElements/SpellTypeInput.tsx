import { ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { updateActiveCard } from "../../stores/uiStateReducer";
import { SchoolOfMagic } from "../../utils/constants";

function SpellTypeInput() {
  const cardData = useAppSelector((state) => state.ui.activeCardData);
  const dispatch = useAppDispatch();


  const levelChange = (event: ChangeEvent<HTMLSelectElement>)  => {
    let newData = { 
      ...cardData,
      level: parseInt(event.target.value)
     };
    dispatch(updateActiveCard(newData));
  }

  const schoolChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newData = { ...cardData,
      schoolOfMagic: event.target.value as SchoolOfMagic
    };
    dispatch(updateActiveCard(newData));
  }

  const schoolOptions = () => {
    const schools = [];
    for (const school in SchoolOfMagic) {
      schools.push(school);
    }
    return schools.map((school) => {
      return <option key={school} value={school}>{school}</option>
    });
  }


  const levelOptions = () => {
    const levels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    return levels.map((level) => {
      return <option key={level} value={level}>{level}</option>
    });
  }

  return (
    <>
      <label className="font-bold text-sm">Spell Type</label>
      <div>
        <label htmlFor="spellLevel">Level</label>

        <select className="mr-3 ml-2" id="spellLevel" value={cardData.level.toString()} onChange={ levelChange }>
          {levelOptions()}
        </select>

        <select value={cardData.schoolOfMagic} onChange={ schoolChange }>
          <option>School of magic</option>
          {schoolOptions()}
        </select>
      </div>
    </>
  )
}

export default SpellTypeInput;