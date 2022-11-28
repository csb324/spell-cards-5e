import { GiSandsOfTime, GiCoolSpices, GiTrashCan, GiArrowDunk, GiHighlighter, GiSpikes } from 'react-icons/gi';
import { BiTime } from 'react-icons/bi';

import CSS from 'csstype';

import { SpellType, Theme } from '../utils/models';
import fantasyStyles from '../styles/Card-fantasy.module.css';
import modernStyles from '../styles/Card-modern.module.css';
import bgsStyles from '../styles/Card-bgs.module.css';
import fancyStyles from '../styles/Card-fancy.module.css';
import standardStyles from '../styles/Card.module.css';

import { useAppSelector } from '../stores/hooks';
import { ReactNode } from 'react';

type LabelKey = 'icon' | 'text';

const themeMap: Record<Theme, Record<string, string>> = {
  'fantasy': fantasyStyles,
  'modern': modernStyles,
  'basic': standardStyles,
  'fancy': fancyStyles,
  'bgs': bgsStyles
}

type cardProps = (
  {
    spell: SpellType,
    select: Function,
    remove: Function,
    isActive: false 
  } | {
    spell: SpellType,
    select: Function,
    isActive: true,
    remove: undefined
  }
);

function Card({
  spell,
  select,
  isActive,
  remove = undefined
}: cardProps) {
  const theme = useAppSelector((state) => state.ui.theme);
  const { name, level, components } = spell;
  const { verbal, somatic, material, materialDesc } = components;

  let cardBg = null;

  let labelKey: LabelKey = 'text';
  if(theme === 'fantasy' || theme === 'fancy') {
    labelKey = 'icon';
  }

  if(theme === 'fancy') {
    cardBg = (
      <div className="absolute text-2xl text-[var(--color)] z-0 top-0 left-0 right-0 bottom-0 overflow-hidden">        
        <GiSpikes className="-top-3 -left-3 absolute"/>
        <GiSpikes className="-bottom-3 -left-3 absolute"/>
        <GiSpikes className="-top-3 -right-3 absolute"/>
        <GiSpikes className="-bottom-3 -right-3 absolute"/>
      </div>
    )
  }

  const styles = themeMap[theme];

  const replaceNewlines = (string: string) => {
    return string.replace(/\n/g, "<br>");
  }

  const activeButton = (!isActive && typeof remove !== 'undefined') && (
    <div className='card-overlay z-20 print:hidden text-center pt-10 absolute top-0 right-0 left-0 bottom-0 hover:bg-slate-100 hover:bg-opacity-90 opacity-0 hover:opacity-100'>
      <button title={`Edit ${name}`} className="text-4xl mr-5 text-blue-900" onClick={() => select()}>
        <GiHighlighter/>
      </button>
      <button title={`Delete ${name}`} className="text-5xl text-red-700" onClick={() => remove()}>
        <GiTrashCan/>
      </button>
    </div>
  );

  const higherLevelContainer = spell.higherLevelDesc && (
    <div>
      <p className={styles.atHigherLabel}>At Higher Levels</p>
      <p dangerouslySetInnerHTML={{__html: replaceNewlines(spell.higherLevelDesc)}}></p>
    </div>
  )

  const labels: Record<string, Record<LabelKey, string | ReactNode>> = {
    range: {
      'text': "Range",
      'icon': <GiArrowDunk />
    },
    time: {
      'text': "Casting Time",
      'icon': <BiTime />
    },
    components: {
      text: 'Components',
      'icon': <GiCoolSpices />
    },
    duration: {
      text: 'Duration',
      'icon': <GiSandsOfTime />
    }
  }

  const sizeStyle: CSS.Properties = {
   ['--text-size' as any]: `${spell.descSize}px`
  };

   
  return (
    <div style={sizeStyle} className={`relative mt-2 mb-2 mr-2 print:block print:m-1 print:mb-0 ${ isActive ? 'border-blue-600' : ''}`}>

      { activeButton }

      <div className={styles.Card}>
        { cardBg }
        <div className="relative z-10 h-full flex flex-col">
          <h1 className={styles.spellName}>{name || "New Spell" }</h1>
          <div className={styles.meta}>
            <div className={styles.metaBox}>
              <p className={styles.metaLabel}>{ labels.time[labelKey] }</p>
              <p className={styles.metaInfo}>
                { spell.castingTime }
                { spell.ritual && ' or Ritual'}
              </p>
            </div>
            <div className={styles.metaBox}>
              <p className={styles.metaLabel}>{ labels.range[labelKey] }</p>
              <p className={styles.metaInfo}>{ spell.range }</p>
            </div>
            <div className={styles.metaBox}>
              <p className={styles.metaLabel}>{ labels.components[labelKey] }</p>
              <p className={styles.metaInfo}>
                { verbal ? <span>V</span> : ''}
                { somatic ? <span>S</span> : ''}
                { material ? <span>M <span style={{fontSize: 'var(--text-size)'}}>({materialDesc})</span></span> : ''}
              </p>
            </div>
            <div className={styles.metaBox}>
              <p className={styles.metaLabel}>{ labels.duration[labelKey] }</p>
              <p className={styles.metaInfo}>
                { spell.duration }
                { spell.concentration && ' (C)'}
              </p>
            </div>
          </div>
          <div className={styles.details}>
            <p className={styles.desc} dangerouslySetInnerHTML={{__html: replaceNewlines(spell.desc)}}></p>
            { higherLevelContainer }
          </div>
          <p className={styles.spellType}>Level {level} { spell.schoolOfMagic }</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
