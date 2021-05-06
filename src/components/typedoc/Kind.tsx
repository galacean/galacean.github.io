import React from 'react';
import type { IItem } from './interface';
import { Kinds } from './enum';

export default function Kind (props: IItem) {
  const kinds: any = {
    [Kinds.ENUM]: 'enum',
    [Kinds.CLASS]: 'class',
    [Kinds.INTERFACE]: 'interface',
    [Kinds.TYPE_ALIAS]: 'type-alias',
    [Kinds.FUNCTION]: 'function',
    [Kinds.PROPERTY]: 'property',
    [Kinds.CONSTRUCTOR]: 'constructor',
    [Kinds.ACCESSOR]: 'get-signature',
    [Kinds.METHOD]: 'method',
    [Kinds.MODULE]: 'module'
  };

  let kindClassName: string = kinds[props.kind];

  if (props.inheritedFrom) {
    kindClassName += ` tsd-is-inherited`;
  }

  if (props.signatures && props.signatures.filter((signature => signature.typeParameter)).length > 0) {
    kindClassName += ` tsd-has-type-parameter`;
  }

  return (
    <span className={`tsd-parent-kind-module tsd-kind-${kindClassName}`}>
      {props.link ? <a href={props.link} id={props.name} className="tsd-kind-icon">{props.name}</a> : <span id={props.name} className="tsd-kind-icon">{props.name}</span>}
    </span>
  );
}
