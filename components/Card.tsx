import { TiEdit } from 'react-icons/ti';
import { GiSandsOfTime, GiCoolSpices, GiCrosshair } from 'react-icons/gi';
import { BiTime } from 'react-icons/bi';

import { SpellType, Theme } from '../utils/models';
import fantasyStyles from '../styles/Card-fantasy.module.css';
import modernStyles from '../styles/Card-modern.module.css';
import standardStyles from '../styles/Card.module.css';

import { useAppSelector } from '../stores/hooks';
import { ReactNode } from 'react';

type LabelKey = 'icon' | 'text';

const themeMap: Record<Theme, Record<string, string>> = {
  'fantasy': fantasyStyles,
  'modern': modernStyles,
  'basic': standardStyles,
  'fancy': standardStyles
}

function Card({
  spell,
  select,
  isActive
}: {
  spell: SpellType,
  select: Function,
  isActive: boolean
}) {
  const theme = useAppSelector((state) => state.ui.theme);
  const { name, level, components } = spell;
  const { verbal, somatic, material, materialDesc } = components;

  let labelKey: LabelKey = 'text';
  if(theme === 'fantasy') {
    labelKey = 'icon';
  }

  const styles = themeMap[theme];

  const replaceNewlines = (string: string) => {
    return string.replace(/\n/g, "<br>");
  }

  const activeButton = !isActive && (
    <button title="select me" className="print:hidden absolute top-0 right-0" onClick={() => select()}>
      <TiEdit/>
    </button>
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
      'icon': <GiCrosshair />
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

  return (
    <div className={`relative mt-1 mb-1 mr-1 print:m-0 ${ isActive ? 'border-blue-600' : ''}`}>
      { activeButton }
      <div className={styles.Card}>
        <h1 className={styles.spellName}>{name || "&nbsp;" }</h1>
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
              { material ? <span>M ({components.materialDesc})</span> : ''}
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
  );
}

export default Card;
