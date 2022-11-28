import { AnyAction, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { blankCard } from '../utils/constants';
import { listenerMiddleware } from './localStorageMiddleware';
import rootReducer, { RootState } from './rootReducer';

let savedCards = [
  blankCard
];

const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    cards: {
      list: savedCards
    }
  },
  // why concat? it was breaking thunks
  // https://github.com/reduxjs/redux-thunk/issues/333
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat([listenerMiddleware.middleware])
});
// convert object to string and store in localStorage
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction>;

export default store;