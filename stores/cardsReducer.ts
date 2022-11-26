import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { blankCard } from "../utils/constants";
import { SpellType } from "../utils/models";

interface CardsState {
  list: SpellType[]
}

type EditPayload = {
  index: number,
  card: SpellType
}

const cardsSlice = createSlice({
  name: 'cards',
  initialState: {
    list: [
      {
        ...blankCard,
        name: 'Your Spell'
      }
    ]
  } as CardsState,
  reducers: {
    add: (state, action: PayloadAction<SpellType>) => {
      state.list.push(action.payload);
    },
    remove: (state, action: PayloadAction<number>) => {
      state.list.splice(action.payload, 1);
    },
    edit: (state, action: PayloadAction<EditPayload>) => {
      state.list[action.payload.index] = action.payload.card;
    },
    initCards: (state, action: PayloadAction<SpellType[]>) => {
      state.list = action.payload;
    }
  }
});

export const { add, remove, edit, initCards } = cardsSlice.actions;
export default cardsSlice.reducer;