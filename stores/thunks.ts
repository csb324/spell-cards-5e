import { EditorState } from "draft-js";
import { blankCard } from "../utils/constants";
import { SrdType, ValidRichTextKeys } from "../utils/models";
import SpellApiService, { PcClass } from "../utils/SpellApiService";
import { add, edit, removeAll } from "./cardsReducer";
import { RootState } from "./rootReducer";
import { AppThunk } from "./store";
import { reset, set, setSpells, updateActiveCard } from "./uiStateReducer";

// this is a thunk
export const finishEditing: AppThunk = (dispatch, getState) => {
  const state: RootState = getState();
  const newCardData = state.ui.activeCardData;
  const newCardIndex = state.ui.activeCard;
  dispatch(edit({ index: newCardIndex, card: newCardData }))
  dispatch(reset())
}

export const createNewCard = (): AppThunk => {
  return (dispatch, getState) => {
    dispatch(add(blankCard));
    dispatch(updateActiveCard(blankCard));
    dispatch(set(getState().cards.list.length - 1))
  }
}

export const setActiveCardCreator = (newIndex: number): AppThunk => {
  return (dispatch, getState) => {
    const state = getState();
    const newActiveCard = state.cards.list[newIndex];
    dispatch(set(newIndex));
    dispatch(updateActiveCard(newActiveCard));
  }
}

export const removeAllCards = (): AppThunk => {
  return (dispatch) => {
    console.log("hey!!!")
    dispatch(removeAll());
    dispatch(set(-1));
  }
}

export const updateRichTextThunkCreator = (propName: ValidRichTextKeys, newState: EditorState): AppThunk => {
  return (dispatch, getState) => {
    const activeCard = getState().ui.activeCardData;
    const newContent = newState.getCurrentContent();
    dispatch(updateActiveCard({ ...activeCard, [propName]: newContent.getPlainText('\n')}))
  }
}

export const acceptSuggestionThunk = (suggestion: SrdType): AppThunk => {
  return async (dispatch) => {
    const newData = await SpellApiService.get(suggestion.index);
    dispatch(updateActiveCard(newData));
  }
}

export const fetchSpells = (): AppThunk => {
  return async function fetchSpellsThunk(dispatch) {
    const spells = await SpellApiService.getList();
    dispatch(setSpells(spells.results));
  }
}


export const getClassSpellsThunk = (c: PcClass, maxLevel?: number): AppThunk => {
  return async (dispatch) => {
    const newData = await SpellApiService.getListByClass(c);

    newData.results.map(async (spell) => {
      const i = spell.index;
      const fullSpell = await SpellApiService.get(i);
      console.log(fullSpell)
      if(maxLevel && fullSpell.level <= maxLevel) {
        dispatch(add(fullSpell));
      }
    });
  }
}
