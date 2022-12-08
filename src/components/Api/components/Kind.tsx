import { PkgChild } from '../util/apiUtil';
import { StyledKind, StyledKindIcon } from './KindModule';

export default function Kind(props: PkgChild & { setSelectedItem: Function }) {
  return (
    <StyledKind type={props.kind.toLowerCase().replaceAll(' ', '-')}>
      <StyledKindIcon
        style={{ cursor: 'pointer' }}
        onClick={() => props.setSelectedItem(props.id)}
        id={props.name}
      >
        {props.name}
      </StyledKindIcon>
    </StyledKind>
  );
}
