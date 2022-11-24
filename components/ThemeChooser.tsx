import React, { useState, useEffect } from "react";
import { CompactPicker, ColorResult } from 'react-color';
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import { setTheme } from "../stores/uiStateReducer";
import { Theme } from "../utils/models";

function ThemeChooser() {
  // const [theme, setTheme] = useState('fantasy');
  const theme = useAppSelector((state) => state.ui.theme);
  const dispatch = useAppDispatch();
  const [color, setColor] = useState('#ff0099');
  const [colorOpen, setColorOpen] = useState(false);

  useEffect(() => {
    document.body.dataset.theme = theme
  }, [theme]);

  const setNewColor = function(pickedColor: ColorResult) {
    setColor(pickedColor.hex);
  }

  const setAppTheme = (newTheme: Theme) => {
    dispatch(setTheme(newTheme));
  }

  const toggleColorOpen = function() {
    setColorOpen(!colorOpen);
  }

  return (
    <>
      <style jsx global>{`
          html {
            --color: ${color};
          }
        `}</style>
      <div className="w-full print:hidden">
        <button onClick={() => setAppTheme('basic')} className="w-16 bg-slate-400 mr-1">basic</button>
        <button onClick={() => setAppTheme('fancy')} className="w-16 bg-slate-400 mr-1">fancy</button>
        <button onClick={() => setAppTheme('modern')} className="w-16 bg-slate-400 mr-1">modern</button>
        <button onClick={() => setAppTheme('fantasy')} className="w-16 bg-slate-400 mr-1">fantasy</button>
        <button onClick={() => toggleColorOpen()} className="w-24 bg-[var(--color)] mr-1">pick color</button>
        { colorOpen && <CompactPicker color={color} onChangeComplete={setNewColor} />}
        
      </div>
    </>
  )
}

export default ThemeChooser;