import { SpellType } from '../utils/models';

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
    return (
      <div className={`w-[240px] h-[336px] border ${ isActive ? 'border-blue-600' : ''}`}>
        <button onClick={() => select()}>select me</button>
        <h1>{name}</h1>
        <p>{level}</p>
        { verbal ? <p>V</p> : ''}
        { somatic ? <p>S</p> : ''}
        { material ? <p>M</p> : ''}
      </div>
    );
  }
  
  export default Card;
  