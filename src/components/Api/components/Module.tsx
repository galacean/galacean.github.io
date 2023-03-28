import { PkgChildDetail } from '../util/apiUtil';
import Item from './Item';
import Source from './Source';
import Comment from './Comment';
import { styled } from "@oasis-engine/editor-design-system";
import { StyledKind, StyledKindIcon } from './KindModule';

const StyledTitle = styled("h2", {
  paddingTop: "$2",
  fontSize: "$4"
});

export default function Module(props: PkgChildDetail) {
  return (
    <>
      <StyledTitle title={props.name}>
        <StyledKind
          id={props.name}
          type={props.kindString.toLowerCase().replaceAll(' ', '-')}
          css={{paddingRight: "$1"}}
        >
          <StyledKindIcon>{props.name}</StyledKindIcon>
        </StyledKind>
        {props.sources?.map((source) => {
          return <Source key={source.fileName} {...source} />;
        })}
      </StyledTitle>
      {props.comment && <Comment {...props.comment} size="md" />}
      {props.children && props.children.map((child) => {
        return child.name.startsWith("_") ? null : <Item key={child.id} {...child} />
      })}
    </>
  );
}
