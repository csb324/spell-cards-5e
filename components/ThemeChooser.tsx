import React, { useState, useEffect } from "react";
import { ChromePicker, ColorResult } from 'react-color';
import isDarkColor from 'is-dark-color';
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import { setTheme } from "../stores/uiStateReducer";
import { buttonClasses } from "../utils/constants";
import { Theme } from "../utils/models";

function ThemeChooser() {
  const theme = useAppSelector((state) => state.ui.theme);
  const dispatch = useAppDispatch();
  const [color, setColor] = useState('#dddddd');
  const [contrastColor, setContrastColor] = useState('#000000');
  const [colorOpen, setColorOpen] = useState(false);

  useEffect(() => {
    document.body.dataset.theme = theme
  }, [theme]);

  const setNewColor = function(pickedColor: ColorResult) {
    setColor(pickedColor.hex);
    if(isDarkColor(pickedColor.hex)) {
      setContrastColor('#ffffff')
    } else {
      setContrastColor('#000000');
    }
  }

  const setAppTheme = (newTheme: Theme) => {
    dispatch(setTheme(newTheme));
  }

  const toggleColorOpen = function() {
    setColorOpen(!colorOpen);
  }

  const colorPicker = colorOpen && (
    <div className="absolute left-0 top-5 z-40 font-sans">
      <ChromePicker disableAlpha={true} color={color} onChangeComplete={setNewColor} />
    </div>
  )

  return (
    <>
      <style jsx global>{`
          html {
            --color: ${color};
            --contrastColor: ${contrastColor};
          }
        `}</style>
      <div className="w-full print:hidden mb-2 p-3 pt-1 rounded-sm bg-slate-100">
        <p className="text-sm uppercase tracking-wide">Card Style</p>
        <button onClick={() => setAppTheme('basic')} className={buttonClasses}>basic</button>
        <button onClick={() => setAppTheme('fancy')} className={buttonClasses}>fancy</button>
        <button onClick={() => setAppTheme('modern')} className={buttonClasses}>modern</button>
        <button onClick={() => setAppTheme('fantasy')} className={buttonClasses}>fantasy</button>
        <button onClick={() => setAppTheme('bgs')} className={buttonClasses}>stripe</button>
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