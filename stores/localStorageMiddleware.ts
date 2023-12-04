import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { add, edit, remove, removeAll } from "./cardsReducer";
import { RootState } from "./rootReducer";

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: isAnyOf(add, remove, edit, removeAll),
  effect: (action, listenerApi) =>
    localStorage.setItem(
      'cards',
      JSON.stringify(
        (listenerApi.getState() as RootState).cards.list
      )
    )
});