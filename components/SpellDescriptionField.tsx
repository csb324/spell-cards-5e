import React, { useEffect, useState } from 'react';
import { ContentState, Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';

import { useAppDispatch } from '../stores/hooks';
import { updateRichTextThunkCreator } from '../stores/thunks';
import { ValidRichTextKeys } from '../utils/models';

function SpellDescriptionField({
  title,
  currentStatus,
  propName
}: {
  title: string,
  currentStatus: string,
  propName: ValidRichTextKeys
}) {
  const dispatch = useAppDispatch();

  const [editorState, setEditorState] = useState(() => {
    if(currentStatus && currentStatus.length > 0) {
      return EditorState.createWithContent(ContentState.createFromText(currentStatus, '\n'));
    }
    return EditorState.createEmpty();
  });
  const [iEdited, setIEdited] = useState(false);

  useEffect(() => {
    if(!iEdited) {
      setEditorState(EditorState.createWithContent(ContentState.createFromText(currentStatus, '\n')));
    }
  }, [currentStatus]);

  const onChange = (newValue: EditorState) => {
    dispatch(updateRichTextThunkCreator(propName, newValue))
    setEditorState(newValue);
  }

  return (
    <>
      <label className="font-bold" >{title}</label>
      <div className="border block">
        <Editor onFocus={() => setIEdited(true)} onBlur={() => setIEdited(false)} editorState={editorState} onChange={onChange} />
      </div>
    </>
  );
}

export default SpellDescriptionField;