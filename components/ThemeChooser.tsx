import React, { useState, useEffect } from "react";
import { CompactPicker, ColorResult } from 'react-color';
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import { setTheme } from "../stores/uiStateReducer";
import { buttonClasses } from "../utils/constants";
import { Theme } from "../utils/models";

function ThemeChooser() {
  const theme = useAppSelector((state) => state.ui.theme);
  const dispatch = useAppDispatch();
  const [color, setColor] = useState('#dddddd');
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

  const colorPicker = colorOpen && (
    <div className="absolute left-0 top-5 z-10">
      <CompactPicker color={color} onChangeComplete={setNewColor} />
    </div>
  )

  return (
    <>
      <style jsx global>{`
          html {
            --color: ${color};
          }
        `}</style>
      <div className="w-full print:hidden mb-2 p-3 pt-1 rounded-sm bg-slate-100">
        <p className="text-sm uppercase tracking-wide">Card Style</p>
        <button onClick={() => setAppTheme('basic')} className={buttonClasses}>basic</button>
        <button onClick={() => setAppTheme('fancy')} className={buttonClasses}>fancy</button>
        <button onClick={() => setAppTheme('modern')} className={buttonClasses}>modern</button>
        <button onClick={() => setAppTheme('fantasy')} className={buttonClasses}>fantasy</button>
        <div className="relative inline-block">
          <button onClick={() => toggleColorOpen()} className={buttonClasses}>
            pick color
            <span className="bg-[var(--color)] rounded-full h-2 w-2 -mr-1 ml-1 inline-block"></span>
          </button>
          { colorPicker }
        </div>
        
      </div>
    </>
  )
}

export default ThemeChooser;