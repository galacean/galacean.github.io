import React from 'react';
import Item from './Item';
import type { IModule } from './Interface';
import Source from './Source';
import Comment from './Comment';
import Kind from './Kind';

export default function Module(props: IModule) {
  // console.log('module', props)
  return <div>
    <h2 className="tsd-module-name">
      <Kind {...props} />
      {props.sources?.map(source => {
        return <Source key={source.fileName} {...source} />
      })}
    </h2>
    {props.comment && <Comment {...props.comment}/>}
    {props.extendedTypes && <p>Hierarchy: {props.extendedTypes.map((extendedType) => {
      return <a key={extendedType.id}>{extendedType.name}</a>;
    })}</p>}
    {props.children && props.children.map((child) => {
      if (!child.name.startsWith('_')) {
        return <Item key={child.id} {...child} />
      }
      
        return null;
      
    })}
  </div>
}