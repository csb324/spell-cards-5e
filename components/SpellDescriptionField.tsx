import React, { useState } from 'react';
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
    const newContent = editorState.getCurrentContent();
    updateSpellDesc(newContent);
  }

  return (
    <>
      <label className="font-bold" >{title}</label>
      <div className="border block">
        <Editor editorState={editorState} onChange={onChange} />
      </div>
    </>
  );
}

export default SpellDescriptionField;