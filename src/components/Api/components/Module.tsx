import { PkgChildDetail } from '../util/apiUtil';
import Item from './Item';
import Source from './Source';
import Comment from './Comment';

export default function Module(props: PkgChildDetail) {
  return (
    <>
      <h1 className='tsd-module-name' title={props.name}>
        <span
          id={props.name}
          className={`tsd-parent-kind-module tsd-kind-${props.kindString.toLowerCase().replaceAll(' ', '-')}`}
        >
          <span className='tsd-kind-icon'>{props.name}</span>
        </span>
        {props.sources?.map((source) => {
          return <Source key={source.fileName} {...source} />;
        })}
      </h1>
      {props.comment && <Comment {...props.comment} />}
      {props.children && props.children.map((child) => <Item key={child.id} {...child} />)}
    </>
  );
}
