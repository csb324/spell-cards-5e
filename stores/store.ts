import { AnyAction, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { edit } from './cardsReducer';
import rootReducer, { RootState } from './rootReducer';
import { reset } from './uiStateReducer';

const store = configureStore({reducer: rootReducer});

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction>;

// this is a thunk
export const finishEditing: AppThunk = (dispatch, getState) => {
  const state: RootState = getState();
  const newCardData = state.ui.activeCardData;
  const newCardIndex = state.ui.activeCard;

  dispatch(edit({ index: newCardIndex, card: newCardData }))
  dispatch(reset())
}

export default store;