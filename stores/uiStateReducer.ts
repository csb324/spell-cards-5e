import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { blankCard } from "../utils/constants";
import { SpellType, SrdType, Theme } from "../utils/models";

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    activeCard: -1,
    activeCardData: blankCard,
    srdSpells: [] as SrdType[],
    theme: 'bgs' as Theme
  },
  reducers: {
    set: (state, action: PayloadAction<number>) => {
      state.activeCard = action.payload;
    },
    reset: (state) => {
      state.activeCard = -1;
      state.activeCardData = blankCard;
    },
    updateActiveCard: (state, action: PayloadAction<SpellType>) => {
      state.activeCardData = action.payload;
    },
    setSpells: (state, action: PayloadAction<SrdType[]>) => {
      state.srdSpells = action.payload;
    },
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    }
  }
});

export const { 
  set, 
  reset, 
  updateActiveCard, 
  setSpells,
  setTheme
} = uiSlice.actions;

export default uiSlice.reducer;
