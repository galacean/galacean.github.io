import { GithubOutlined } from '@ant-design/icons';

interface ISource {
  fileName: string;
  line: number;
  character: number;
  url: string;
}

export default function Source(props: ISource) {
  return (
    <a href={`${props.url}`} target='_blank' className='tsc-source' rel='noreferrer'>
      <GithubOutlined />
    </a>
  );
}
