import React from 'react';
import Item from './Item';
import type { IModule } from './Interface';
import Source from './Source';
import Comment from './Comment';
import Kind from './Kind';

export default function Module(props: IModule) {
  // console.log('module', props)
  return <div>
    <h1 className="tsd-module-name" title={props.name}>
      <a href={`#${props.name}`}><Kind {...props} /></a>
      {props.sources?.map(source => {
        return <Source key={source.fileName} {...source} />
      })}
    </h1>
    {props.comment && <Comment {...props.comment}/>}
    {props.extendedTypes && <p>Hierarchy: {props.extendedTypes.map((extendedType) => {
      return <a key={extendedType.id}>{extendedType.name}</a>;
    })}</p>}
    {props.children ? props.children.map((child) => {
      if (!child.name.startsWith('_')) {
        return <Item key={child.id} {...child} />
      }
      return null;
    }) : <Item key={props.id} {...props} />}
  </div>
}