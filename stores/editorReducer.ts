import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EditorState } from "draft-js";

interface DraftEditorState {
  descriptionEditor: EditorState,
  higherLevelEditor: EditorState
}

const initialState = { 
  // descriptionEditor: EditorState.createEmpty(), 
  // higherLevelEditor: EditorState.createEmpty() 
} as DraftEditorState;

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    updateDescription: (state, action: PayloadAction<EditorState>) => {
      // state.descriptionEditor = action.payload;
    },
    updateHigherLevel: (state, action: PayloadAction<EditorState>) => {
      // state.higherLevelEditor = action.payload;
    }
  }
})

export const { updateDescription, updateHigherLevel } = editorSlice.actions;
export default editorSlice.reducer;