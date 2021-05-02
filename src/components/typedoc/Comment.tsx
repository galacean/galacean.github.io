import { SmileTwoTone } from '@ant-design/icons';
import React from 'react';
import { IComment, ITag } from './interface';

function Tag (props: ITag) {
  return <p>
    <span className="tsd-comment-tags">{props.tag}</span> {props.text}
  </p>
}
export default function Comment(props: IComment) {
  return <blockquote className="tsd-comment">
    {props.shortText && <p><SmileTwoTone /> {props.shortText}</p>}
    {props.tags && props.tags.map((tag, i) => {
      console.log('tag', tag)
      return <Tag key={i} {...tag}/>
    })}
  </blockquote>;
}
