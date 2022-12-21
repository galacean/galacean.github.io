import toc from '@jsdevtools/rehype-toc';
import { PropsWithChildren, useContext, useEffect, useRef, useState } from 'react';
import MermaidBlock from './MermaidBlock';
import ReactMarkdown from 'react-markdown';
import Prism from 'prismjs';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import Playground from '../../Playground';
import linkPlugin from '../plugins/link';
import playgroundPlugin from '../plugins/playground';
import rehypeRaw from 'rehype-raw';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';
import { Link, useParams } from 'react-router-dom';
import { AppContext } from '../../contextProvider';
import customeToc from '../plugins/customeToc';
import { DocData, fetchDocDataById, fetchMenuList } from '../util/docUtil';
import DocToc from './DocToc';
import Source from './Source';
import { styled } from "@oasis-engine/editor-design-system";
import { Flex } from '@oasis-engine/editor-components';

interface DocDetailProps {
  selectedDocId: string;
  setSelectedDocId: React.Dispatch<React.SetStateAction<string>>;
  menuKeyTitleMapRef: React.MutableRefObject<Map<string, string>>;
}

const StyledMarkdown = styled("div", {
  position: "relative",
  minHeight: "500px",
  marginLeft: "-1px",
  overflow: "hidden",
  background: "$slate1",
  fontSize: "$2",
  lineHeight: 2,
  "& a": {
    color: "$blue10",
    "&:hover": {
      borderBottom: "2px solid $blueA9"
    }
  },
  "& p": {
    padding: "$2 0"
  },
  "& ul": {
    padding: 0,
    "> li": {
      margin: "$1 0 $1 $4",
      listStyleType: "circle",
      "&:empty": {
        display: "none"
      },
      "& > p": {
        margin: "0.2em 0"
      }
    }
  },
  "& ol": {
    padding: 0,
    listStyleType: "decimal",
    "& > li": {
      marginLeft: "$4",
    },
  },
  "& img": {
    maxWidth: "calc(100% - 32px)"
  },
  "& h1": {
    margin: "20px 0",
    color: "$slate12",
    fontWeight: 500,
    fontSize: "30px",
    lineHeight: "38px",
    "&.subtitle": {
      marginLeft: "12px"
    },
  },
  "& h2": {
    fontSize: "24px",
    lineHeight: 3
  },
  "& h3": {
    fontSize: "18px",
    lineHeight: 3,
  },

  "& h4": {
    fontSize: "16px",
    lineHeight: 3
  },
  "& h5": {
    fontSize: "14px",
    lineHeight: 3
  },
  "& h6": {
    fontSize: "12px",
    lineHeight: 3
  },
  "& hr": {
    height: "1px",
    margin: "16px 0",
    border: 0
  },
  "& code": {
    margin: "0 1px",
    padding: "0.2em 0.4em",
    fontSize: "0.9em",
    background: "$slate2",
    border: "1px solid $slate4",
    borderRadius: "$2",
    fontStyle: "italic",
  },
  "& pre": {
    margin: "$2 0",
    overflow: "auto",
    fontFamily: "'Lucida Console', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
    borderRadius: "$2",
    "& code": {
      fontStyle: "normal",
      margin: 0,
      padding: "$3 $4",
      overflow: "auto",
      color: "$slate11",
      lineHeight: 2,
      background: "$slate3",
      border: "none"
    }
  },
  "& strong": {
    fontWeight: 500
  },
  "& b": {
    fontWeight: 500
  },
  "& table": {
    width: "100%",
    margin: "$4 0 $8",
    emptyCells: "show",
    border: "1px solid $slate6",
    borderCollapse: "collapse",
    borderSpacing: 0,
    "& th": {
      fontWeight: 500,
      whiteSpace: "nowrap",
      padding: "$1 $2",
      textAlign: "left",
      border: "1px solid $slate6"
    },
    "& td": {
      padding: "$1 $2",
      textAlign: "left",
      color: "$slate11",
      border: "1px solid $slate6"
    },
    "& blockquote": {
      margin: "$1 0",
      paddingLeft: "$2",
      color: "$slate10",
      borderLeft: "4px solid $slate4",
      "& p": {
        margin: 0
      }
    }
  }
});

const StyledModifiedTime = styled(Flex, {
  margin: "$4 0",
  textDecoration: "ButtonFace",
  fontSize: "$1",
  textAlign: "right",
  color: "$slate10",
  borderBottom: "1px solid $slate4",
  padding: "0 0 $1 $1"
});

const StyledReactMarkdown = styled("div", {
  maxWidth: "1400px",
  margin: "$8 auto $16 auto",
  padding: "0 200px 0 $16",
  '@media (max-width: 768px)': {
    margin: 0,
    padding: "0 $4"
  }
});

function DocDetail(props: PropsWithChildren<DocDetailProps>) {
  const { lang, version } = useContext(AppContext);
  const { docTitle } = useParams();
  const [docData, setDocData] = useState<DocData | null>(null);
  const idTitleMapRef = useRef<Map<string, string>>(new Map());

  const getIdByTitle = (title: string) => {
    for (const [key, value] of idTitleMapRef.current.entries()) {
      if (value === title) {
        return key;
      }
    }
    return null;
  };

  useEffect(() => {
    for (let [key, value] of props.menuKeyTitleMapRef.current.entries()) {
      if (value === docTitle) {
        props.setSelectedDocId(key);
        break;
      }
    }
  }, [docTitle]);

  useEffect(() => {
    fetchMenuList('ts', version).then((list) => {
      list
        .sort((a, b) => a.weight - b.weight)
        .forEach((data) => {
          const { id, files } = data;
          // create items
          if (files?.length > 0) {
            files
              .sort((a, b) => a.weight - b.weight)
              .filter((a) => a.type === 'ts')
              .forEach((file) => {
                idTitleMapRef.current.set(id + '-' + file.id, file.filename);
              });
          }
        });
    });
  }, [version]);

  useEffect(() => {
    if (!!props.selectedDocId) {
      fetchDocDataById(props.selectedDocId).then((res) => {
        setDocData(res);
      });
    }
  }, [props.selectedDocId]);

  if (!docData) {
    return null;
  }


  return (
    <StyledMarkdown>
      <StyledReactMarkdown>
        <h1>{docData.title}</h1>
        <StyledModifiedTime gap="sm">
          <Source src={docData.htmlUrl} />
          <FormattedMessage id='app.content.modifiedTime' />
          {moment(docData.gmtModified).format('YYYY-MM-DD HH:mm:SS')}
        </StyledModifiedTime>
        <ReactMarkdown
          remarkPlugins={[playgroundPlugin, linkPlugin, remarkGfm, remarkFrontmatter]}
          // temporarily remove <a /> in toc
          // rehypePlugins={[rehypeSlug, rehypeAutolinkHeadings, toc]}
          rehypePlugins={[toc, customeToc, rehypeRaw]}
          skipHtml={false}
          components={{
            a(param) {
              const linkHref = param.href;
              if (linkHref?.length == 0 && !param.children) {
                return <span></span>;
              }
              const title = param.children[0];

              // for links within the SPA: need to use <Link /> to properly handle routing.
              if (typeof linkHref === 'string' && linkHref.startsWith('/#/docs/')) {
                return (
                  <Link
                    to={`/docs/${version}/${lang === 'en' ? 'en' : 'cn'}/${linkHref.replace('/#/docs/', '')}`}
                  >
                    {title}
                  </Link>
                );
              } else if (typeof linkHref === 'string' && linkHref.startsWith('/#/examples/')) {
                return <Link to={linkHref.replace('/#/examples/', `/examples/${version}/`)}>{title}</Link>;
              } else if (typeof linkHref === 'string' && linkHref.startsWith('/#/api/')) {
                return <Link to={linkHref.replace('/#/api/', `/api/${version}/`)}>{title}</Link>;
              }
              // for links to other websites: use <a />
              return (
                <a href={linkHref as string} target='_blank'>
                  {title}
                </a>
              );
            },
            //@ts-ignore
            nav: DocToc,
            blockquote({ className, src }: any) {
              if (className === 'playground-in-doc') {
                return <Playground id={getIdByTitle(src) || ''} title={docTitle} embed={true} />;
              }
              return null;
            },
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              if (!inline && match) {
                if (className?.indexOf('mermaid') !== -1) {
                  return <MermaidBlock>{children[0]}</MermaidBlock>;
                }
                return <code dangerouslySetInnerHTML={{
                  __html: Prism.highlight(children[0] as string || '', Prism.languages.javascript, 'javascript'),
                }}
                />
              }
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {docData.content}
        </ReactMarkdown>
      </StyledReactMarkdown>
    </StyledMarkdown>
  );
}

export default DocDetail;
