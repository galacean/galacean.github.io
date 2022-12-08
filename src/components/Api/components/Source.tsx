import { GithubOutlined } from '@ant-design/icons';
import { styled } from "@oasis-engine/editor-design-system";

interface ISource {
  fileName: string;
  line: number;
  character: number;
  url: string;
}

const StyledLink = styled("a", {
  color: "$slate11",
  fontSize: "$2"
});

export default function Source(props: ISource) {
  return (
    <StyledLink href={`${props.url}`} target='_blank'rel='noreferrer'>
      <GithubOutlined />
    </StyledLink>
  );
}
