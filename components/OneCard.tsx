import { EditorState } from 'draft-js';
import { SpellType, SrdType } from "../utils/models";
import Card from "./Card";
import EditCard from "./EditCard";


function OneCard({
  card,
  selectFunction,
  updateCard,
  allSrdSpells,
  editorState,
  setEditorState,
  higherLevelEditorState,
  setHigherLevelEditorState
}: {
  card: SpellType,
  selectFunction: Function,
  updateCard: Function,
  allSrdSpells: SrdType[],
  editorState: EditorState,
  setEditorState: Function,
  higherLevelEditorState: EditorState,
  setHigherLevelEditorState: Function
}) {
  return (
    <div className="flex">
      <div className="flex-initial w-full md:w-1/2">
        <button onClick={selectFunction(-1)}>Back</button>

        <EditCard 
          cardData={card}
          save={updateCard}
          allSrdSpells={allSrdSpells}
          editorState={editorState}
          setEditorState={setEditorState}
          higherLevelEditorState={higherLevelEditorState}
          setHigherLevelEditorState={setHigherLevelEditorState} />
      </div>

      <div className="flex-grow w-full md:w-1/2 justify-center flex">
        <Card key={card.name} spell={card} select={() => {}} isActive={ true }/>
      </div>
    </div>
  )
}

export default OneCard;