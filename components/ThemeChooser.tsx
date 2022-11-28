import React, { useState, useEffect } from "react";
import { SketchPicker, ColorResult } from 'react-color';
import Color from 'colorjs.io';

import { useAppDispatch, useAppSelector } from "../stores/hooks";
import { setTheme } from "../stores/uiStateReducer";
import { buttonClasses } from "../utils/constants";
import { Theme } from "../utils/models";

const CONTRAST_THRESHOLD = 0.65;

function isDarkColor(hex: string):boolean {
  const color = new Color(hex);
  const contrast = color.contrast('white', 'Weber');

  return contrast > CONTRAST_THRESHOLD;
}

function ThemeChooser() {
  const theme = useAppSelector((state) => state.ui.theme);
  const dispatch = useAppDispatch();
  const [color, setColor] = useState('#dddddd');
  const [contrastColor, setContrastColor] = useState('#000000');
  const [accentTextColor, setAccentTextColor] = useState('#000000');
  const [colorOpen, setColorOpen] = useState(false);

  useEffect(() => {
    document.body.dataset.theme = theme
  }, [theme]);

  const setNewColor = function(pickedColor: ColorResult) {
    setColor(pickedColor.hex);
    if(isDarkColor(pickedColor.hex)) {
      setContrastColor('#ffffff')
      setAccentTextColor(pickedColor.hex);
    } else {
      setContrastColor('#000000');
      setAccentTextColor('#000000');
    }
  }

  const setAppTheme = (newTheme: Theme) => {
    dispatch(setTheme(newTheme));
  }

  const toggleColorOpen = function() {
    setColorOpen(!colorOpen);
  }

  const presetColors = [
    '#03256c','#b5bd89','#b66d0d','#559cad','#db5375','#17BEBB','#FAD8D6','#F3C677',
    '#B9CFD4','#32965D','#FCAB64','#542344','#F6511D','#6369D1','#D6FF79','#136F63'
  ];

  const colorPicker = colorOpen && (
    <div className="absolute left-0 top-5 z-40 font-sans">
      <SketchPicker color={color} disableAlpha={true} presetColors={presetColors} onChangeComplete={setNewColor} />
    </div>
  )

  return (
    <>
      <style jsx global>{`
          html {
            --color: ${color};
            --contrastColor: ${contrastColor};
            --accentTextColor: ${accentTextColor};
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