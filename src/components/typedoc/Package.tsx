import React from 'react';
import './Package.less';
import Kind from './Kind';
import { IPackage } from './interface';

export default function (props: IPackage) {
  const maps:any = {}
  const kinds = props.groups.map(group => group.kind);

  kinds.forEach((kind) => {
    maps[kind] = [];
  });

  props.children.forEach(child => {
    maps[child.kind].push(child);
  });

  return (
    <section className="tsd-panel tsd-index-panel">
      {props.groups.map(group => {
        return <section key={group.title} className="tsd-index-section">
          <h3>{group.title}</h3>
          <ul className="tsd-index-list">
            {maps[group.kind].map((child:any) => {
              return <li key={child.id} >
                <Kind {...child} />
              </li>
            })}
          </ul>
        </section>
      })}
    </section>
  );
}
