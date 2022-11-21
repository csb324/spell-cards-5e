import React, { useState, useEffect } from "react";
import { CompactPicker, ColorResult } from 'react-color';

function ThemeChooser() {
  const [theme, setTheme] = useState('basic');
  const [color, setColor] = useState('#000000');
  const [colorOpen, setColorOpen] = useState(false);

  useEffect(() => {
    document.body.dataset.theme = theme
  }, [theme]);

  const setNewColor = function(pickedColor: ColorResult) {
    setColor(pickedColor.hex);
  }

  const toggleColorOpen = function() {
    console.log("hello");
    console.log(color);
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
        <button onClick={() => setTheme('basic')} className="w-16 bg-slate-400 mr-1">basic</button>
        <button onClick={() => setTheme('fancy')} className="w-16 bg-slate-400 mr-1">fancy</button>
        <button onClick={() => toggleColorOpen()} className="w-16 bg-[var(--color)] mr-1">pick color</button>
        { colorOpen && <CompactPicker color={color} onChangeComplete={setNewColor} />}
        
      </div>
    </>
  )
}

export default ThemeChooser;