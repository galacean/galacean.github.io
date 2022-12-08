import Prism from 'prismjs';
import { createRef, useContext, useEffect, useState } from 'react';
import Media from 'react-media';
import siteConfig from '../../siteconfig.json';
import { styled } from  "@oasis-engine/editor-design-system";
import { Flex } from '@oasis-engine/editor-components';
import { fetchEngineDataConfig } from '../../utils';
import { AppContext } from '../contextProvider';
import { fetchDocDataById } from '../doc/util/docUtil';
import CodeActions from './CodeActions';
import DemoActions from './DemoActions';
import './highlight.less';

interface IPlayground {
  id: string;
  title: string | undefined;
  embed?: boolean;
}

export const StyledCodeBox = styled(Flex, {
  position: "relative",
  marginBottom: "20px",
  backgroundColor: "$slate2",
  variants: {
    embed: {
      true: {
        border: "1px solid $slate5",
        borderRadius: "$1",
        minHeight: "300px"
      }
    }
  }
});

const StyledDemo = styled("div", {
  flex: 1,
  paddingTop: "37px",
  '@media (max-width: 768px)': {
    paddingTop: 0,
  }
});

export const StyledSource = styled("div", {
  flex: 1,
  maxHeight: "500px",
  margin: 0,
  paddingTop: "37px",
  overflow: "auto",
  backgroundColor: "$slate2",
  "& pre": {
    margin: 0,
    backgroundColor: "$slate2",
    "& code": {
      fontSize: "13px",
      padding: "$4",
      backgroundColor: "$slate2",
    }
  }
});

export default function Playground(props: IPlayground) {
  const [code, setCode] = useState('');
  const [src, setSrc] = useState('');
  const { lang, version } = useContext(AppContext);
  const [packages, setPackage] = useState<any>(null);

  const url = `/#/example/${props.id}`;
  const iframe = createRef<HTMLIFrameElement>();

  const fetchCode = async (id: string) => {
    const res = await fetchDocDataById(id);

    const code = Prism.highlight(res?.content || '', Prism.languages.javascript, 'javascript');
    setCode(code);
    setSrc(res?.content || '');
  };

  useEffect(() => {
    if (!props.id) return;
    fetchCode(props.id);

    // fix: iframe not reload when url hash changes
    iframe.current?.contentWindow?.location.reload();
  }, [props.id]);

  const fetchDependencies = async () => {
    const configRes = await fetchEngineDataConfig();
    const packages = JSON.parse(configRes.find((config) => config.version === version)?.packages || '');

    setPackage(packages);
  };

  useEffect(() => {
    fetchDependencies();
  }, [version]);

  if (!packages || !props.id) return null;

  return (
    <Media query='(max-width: 768px)'>
      {(isMobile) => (
        <StyledCodeBox wrap="false" embed={props.embed}>
          <StyledDemo>
            <iframe src={url} width='100%' height='100%' frameBorder='0' ref={iframe} />
          </StyledDemo>
          {!isMobile && <StyledSource>
            <pre>
              <code
                dangerouslySetInnerHTML={{
                  __html: code,
                }}
              />
            </pre>
          </StyledSource>
          }
          {!isMobile && src && (
            <CodeActions
              sourceCode={src}
              engineName={siteConfig.name}
              name={props.title || ''}
              url={url}
              version={packages['oasis-engine']}
              packages={packages}
            />
          )}
          {!isMobile && url && <DemoActions url={url} />}
        </StyledCodeBox>
      )}
    </Media>
  );
}
