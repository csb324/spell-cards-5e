import { useEffect, useState } from "react";
import Head from "next/head";

import { SrdType } from "../utils/models";
import SpellApiService from "../utils/SpellApiService";
import ThemeChooser from "../components/ThemeChooser";
import FontSnippet from "../components/FontSnippet";
import AllCards from "../components/AllCards";
import OneCard from "../components/OneCard";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import { initCards } from "../stores/cardsReducer";

function App() {
  const [allSrdSpells, setAllSrdSpells] = useState<SrdType[]>([]);
  const dispatch = useAppDispatch();

  const activeCard = useAppSelector((state) => state.ui.activeCard);

  useEffect(() => {
    if(typeof window !== 'undefined') {
      dispatch(initCards(JSON.parse(localStorage.getItem("cards") || "[]")))
    } 
  });

  if(allSrdSpells.length === 0) {
    SpellApiService.getList().then((list) => {
      setAllSrdSpells(list.results)
    });
  }

  return (      
    <div className="container mx-auto p-4 flex flex-col flex-grow">
      <Head>
        <title>5E SPELL CARD PRINTABLE GENERATOR</title>
        <meta property="og:title" content="5E SPELL CARD PRINTABLE GENERATOR" key="title" />

      </Head>
      
      <FontSnippet />
      <h1 className="print:hidden uppercase text-center tracking-wider text-4xl mb-6">5e Spell Card Printable Generator</h1>
      <ThemeChooser />
      { (activeCard === -1) ? 
        <AllCards/> :
        <OneCard/>
      }

      <h2 className="text-lg mt-12 print:hidden font-mono">Brought to you by:</h2>
      <ul className="text-sm print:hidden list-disc ml-5">
        <li>
          <a className="text-blue-600 hover:text-blue-900" href="https://clarabdevelopment.com">Clara B Development</a> (i.e. me, Clara)
        </li>
        <li>
          With help from the <a className="text-blue-600 hover:text-blue-900" href="https://www.dnd5eapi.co/">DnD 5e API</a>
        </li>
        <li>
          And icons from <a className="text-blue-600 hover:text-blue-900" href="https://game-icons.net/">game-icons.net</a>
        </li>
        <li>
          Code available on <a className="text-blue-600 hover:text-blue-900" href="https://github.com/csb324/spell-cards-5e">github</a>
        </li>

        <li>
          <span className="text-xs">
            <a className="text-blue-600 hover:text-blue-900" rel="me" href="https://mstdn.party/@clarabellum">I'm also on mastodon</a> and <a className="text-blue-600 hover:text-blue-900" rel="me" href="https://twitter.com/clarabellum">twitter</a>
          </span>

        </li>

      </ul>
    </div>
  )
}

export default App;
