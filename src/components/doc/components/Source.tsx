import { GithubOutlined } from '@ant-design/icons';

function Source(props: { src: string }) {
  return props.src ? (
    <span>
      <a href={props.src} target='_blank' className='doc-source' rel='noreferrer'>
        <GithubOutlined />
      </a>
    </span>
  ) : null;
}

export default Source;
