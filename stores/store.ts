import { AnyAction, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { blankCard } from '../utils/constants';
import { listenerMiddleware } from './localStorageMiddleware';
import rootReducer, { RootState } from './rootReducer';


let savedCards = [
  blankCard
];
if(typeof window !== 'undefined') {
  savedCards = localStorage ? JSON.parse(localStorage.getItem("cards") || "[]") : [];
}

const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    cards: {
      list: savedCards
    }
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    listenerMiddleware.middleware
  ]
});
// convert object to string and store in localStorage
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction>;

export default store;