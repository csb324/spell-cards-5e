import { combineReducers  } from "@reduxjs/toolkit";
import editorReducer from "./editorReducer";
import cardsReducer from "./cardsReducer";
import uiStateReducer from "./uiStateReducer";

const rootReducer = combineReducers({
  cards: cardsReducer,
  editor: editorReducer,
  ui: uiStateReducer
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;