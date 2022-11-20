import React from 'react';
import {Editor, EditorState, ContentState} from 'draft-js';
import 'draft-js/dist/Draft.css';

function SpellDescriptionField({
  title,
  editorState,
  updateSpellDesc,
  setEditorState
}: {
  title: string,
  spellDesc: string,
  updateSpellDesc: Function,
  editorState: EditorState,
  setEditorState: Function
}) {

  const onChange = (something: EditorState) => {
    setEditorState(something);
  }

  const onClick = () => {
    updateSpellDesc(editorState.getCurrentContent());
  }

  return (
    <>
      <label className="font-bold" >{title}</label>
      <button className="border border-blue-900 bg-blue-800 text-white px-3" onClick={onClick}>Save</button>

      <div className="border block">
        <Editor editorState={editorState} onChange={onChange} />

      </div>
    </>
  );
}

export default SpellDescriptionField;