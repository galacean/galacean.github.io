import React from 'react';
import { IComment, ITag } from './interface';

function Tag (props: ITag) {
  return <p>
    <span className={`tsd-comment-tag tsd-comment-tag-${props.tag}`}>{props.tag}</span>{props.text}
  </p>
}
export default function Comment(props: IComment) {
  return <blockquote className="tsd-comment">
    {props.shortText && <p>{props.shortText}</p>}
    {props.tags && props.tags.map((tag, i) => {
      return <Tag key={i} {...tag}/>
    })}
  </blockquote>;
}
