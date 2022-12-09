import { PkgChild } from '../util/apiUtil';
import { StyledKind, StyledKindIcon } from './KindModule';

export default function Kind(props: PkgChild & { setSelectedItem: Function, name: string, kind: string }) {
  const kind = props.kind.toLowerCase().replaceAll(' ', '-');
  const { name } = props;
  return (
    <StyledKind type={kind}>
      <StyledKindIcon
        style={{ cursor: 'pointer' }}
        onClick={() => props.setSelectedItem(props.id, name, kind)}
        id={name}
      >
        {name}
      </StyledKindIcon>
    </StyledKind>
  );
}
