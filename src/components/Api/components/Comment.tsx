import { styled } from "@oasis-engine/editor-design-system";

const StyledTag = styled("span", {
  display: "inline-block",
  margin: "0 $1",
  padding: "0 $1",
  color: "$slate12",
  fontWeight: "400",
  fontSize: "$1",
  backgroundColor: "$slate5",
  borderRadius: "$2",
  variants: {
    "type": {
      "deprecated": {
        backgroundColor: "rgb(202, 31, 31)",
      },
      "todo": {
        backgroundColor: "rgb(202, 199, 31)"
      },
      "remarks": {
        backgroundColor: "rgb(31, 148, 202)"
      },
      "readonly": {
        backgroundColor: "rgb(202, 134, 31)"
      }
    }
  }
});

const StyledComment = styled("div", {
  padding: "$2 0",
  fontSize: "$2",
  color: "$slate11",
  variants: {
    size: {
      md: {
        padding: "$4 0",
      }
    }
  }
});

function Tag(props: any) {
  return (
    <p>
      <StyledTag type={props.tag}>{props.tag}</StyledTag>
      {props.text}
    </p>
  );
}

export default function Comment(props: any) {
  const text = props?.summary?.[0]?.text;
  return (text || props.tags) ? <StyledComment size={props.size}>
    {text && <p>{text}</p>}
    {props.tags &&
      props.tags.map((tag: any) => {
        return <Tag key={tag.tag} {...tag} />;
      })}
  </StyledComment>
    : null
}
