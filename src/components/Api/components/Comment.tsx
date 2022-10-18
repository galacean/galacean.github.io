function Tag(props: any) {
  return (
    <p>
      <span className={`tsd-comment-tag tsd-comment-tag-${props.tag}`}>{props.tag}</span>
      {props.text}
    </p>
  );
}
export default function Comment(props: any) {
  return (
    <blockquote className='tsd-comment'>
      <p>{props?.summary?.[0]?.text}</p>
      {props.tags &&
        props.tags.map((tag: any) => {
          return <Tag key={tag.tag} {...tag} />;
        })}
    </blockquote>
  );
}
