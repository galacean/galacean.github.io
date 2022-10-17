import Prism from 'prismjs';
import { useEffect, useState } from 'react';
import { fetchDocDetailById } from '../doc/util/docUtil';
import CodeActions from './CodeActions';
import DemoActions from './DemoActions';
import './index.less';
// import siteConfig from '../../../siteconfig.json';

interface IPlayground {
  id: string;
}

export default function Playground(props: IPlayground) {
  const [code, setCode] = useState('');
  const [src, setSrc] = useState('');

  const name = src.replace('.ts', '');
  const url = `/#/example/${props.id}`;

  const fetchCode = async () => {
    const res = await fetchDocDetailById(props.id);

    const code = Prism.highlight(res, Prism.languages.javascript, 'javascript');
    setCode(code);
    setSrc(res);
  };

  useEffect(() => {
    fetchCode();
  }, [props.id]);

  return (
    <div className='code-box'>
      <div className='code-box-demo'>
        <iframe src={url} width='100%' height='100%' frameBorder='0' />
      </div>
      <div className='code-box-source'>
        <pre>
          <code
            dangerouslySetInnerHTML={{
              __html: code,
            }}
          />
        </pre>
      </div>
      {src && (
        <CodeActions
          sourceCode={src}
          engineName={'oasis-engine'}
          name={name}
          url={url}
          version={'0.0.1'}
          packages={[]}
        />
      )}
      {url && <DemoActions url={window.location.protocol + window.location.hostname + url} />}
    </div>
  );
}
