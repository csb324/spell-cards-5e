import { TiEdit } from 'react-icons/ti';
import { SpellType } from '../utils/models';
import styles from '../styles/Card.module.css';

function Card({
  spell,
  select,
  isActive
}: {
  spell: SpellType,
  select: Function,
  isActive: boolean
}) {
  const { name, level, components } = spell;
  const { verbal, somatic, material } = components;

  const activeButton = !isActive && (
    <button title="select me" className="print:hidden absolute top-0 right-0" onClick={() => select()}>
      <TiEdit/>
    </button>
  );

  return (
    <div className={`relative mb-1 mr-1 print:m-0 ${ isActive ? 'border-blue-600' : ''}`}>
      { activeButton }

      <div className={styles.Card}>
        <h1 className={styles.spellName}>{name}</h1>
        <p className={styles.spellType}>Level {level} { spell.schoolOfMagic }</p>
        <div className={styles.meta}>
          <div className={styles.metaBox}>
            <p className={styles.metaLabel}>Casting Time</p>
            <p className={styles.metaInfo}>
              { spell.castingTime }
              { spell.ritual && ' or Ritual'}
            </p>
          </div>
          <div className={styles.metaBox}>
            <p className={styles.metaLabel}>Range</p>
            <p className={styles.metaInfo}>{ spell.range }</p>
          </div>
          <div className={styles.metaBox}>
            <p className={styles.metaLabel}>Components</p>
            <p className={styles.metaInfo}>
              { verbal ? <span>V</span> : ''}
              { somatic ? <span>S</span> : ''}
              { material ? <span>M</span> : ''}
            </p>
          </div>
          <div className={styles.metaBox}>
            <p className={styles.metaLabel}>Duration</p>
            <p className={styles.metaInfo}>
              { spell.duration }
              { spell.concentration && ' (C)'}
            </p>
          </div>
        </div>
        <div className={styles.details}>
          <p dangerouslySetInnerHTML={{__html: spell.desc.replace(/\/n/g, "<br>")}}></p>
          { spell.higherLevelDesc && <p dangerouslySetInnerHTML={{__html: spell.higherLevelDesc.replace("/n", "<br>")}}></p>}
        </div>
      </div>

    </div>
  );
}

export default Card;
