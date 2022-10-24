import { PkgChild } from '../util/apiUtil';

export default function Kind(props: PkgChild & { setSelectedItem: Function }) {
  return (
    <span className={`tsd-parent-kind-module tsd-kind-${props.kind.toLowerCase().replaceAll(' ', '-')}`}>
      <span
        style={{ cursor: 'pointer' }}
        onClick={() => props.setSelectedItem(props.id)}
        id={props.name}
        className='tsd-kind-icon'
      >
        {props.name}
      </span>
    </span>
  );
}
