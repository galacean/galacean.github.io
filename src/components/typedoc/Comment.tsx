import { SmileTwoTone } from '@ant-design/icons';
import React from 'react';
import { IComment } from './interface';

export default function Comment(props: IComment) {
  return props.shortText ? <blockquote className="tsd-comment"><SmileTwoTone /> {props.shortText}</blockquote> :null;
}
