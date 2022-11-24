import { combineReducers  } from "@reduxjs/toolkit";
import cardsReducer from "./cardsReducer";
import uiStateReducer from "./uiStateReducer";

const rootReducer = combineReducers({
  cards: cardsReducer,
  ui: uiStateReducer
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;