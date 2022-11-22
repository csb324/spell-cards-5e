import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { blankCard } from "../utils/constants";
import { SpellType } from "../utils/models";
// import { RootState } from "./rootReducer";

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    activeCard: -1,
    activeCardData: blankCard
  },
  reducers: {
    set: (state, action: PayloadAction<number>) => {
      state.activeCard = action.payload;
    },
    reset: (state) => {
      state.activeCard = -1;
      state.activeCardData = blankCard;
    },
    editCard: (state, action: PayloadAction<SpellType>) => {
      state.activeCardData = action.payload;
    }
  }
});


export const { set, reset, editCard } = uiSlice.actions;
export default uiSlice.reducer;
