import toc from '@jsdevtools/rehype-toc';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import prism from 'react-syntax-highlighter/dist/esm/styles/prism/prism';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import Playground from '../../Playground';
import linkPlugin from '../plugins/link';
import playgroundPlugin from '../plugins/playground';

import moment from 'moment';
import { FormattedMessage } from 'react-intl';
import { tsMenuListRes } from '../../Examples/index';
import { DocData, fetchDocDataById } from '../util/docUtil';
import DocToc from './DocToc';
import Source from './Source';

interface DocDetailProps {
  selectedDocId: string;
}

function DocDetail(props: PropsWithChildren<DocDetailProps>) {
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
    tsMenuListRes.then((list) => {
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
  }, []);

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
    <div className='markdown'>
      <h1>{docData.title}</h1>
      <div className='modifiedTime'>
        <Source src={docData.htmlUrl} />
        <FormattedMessage id='app.content.modifiedTime' />
        {moment(docData.gmtModified).format('YYYY-MM-DD HH:mm:SS')}
      </div>
      <ReactMarkdown
        remarkPlugins={[playgroundPlugin, linkPlugin, remarkGfm, remarkFrontmatter]}
        rehypePlugins={[rehypeSlug, rehypeAutolinkHeadings, toc]}
        components={{
          ol: 'ul',
          //@ts-ignore
          nav: DocToc,
          blockquote({ className, src }: any) {
            if (className === 'playground-in-doc') {
              return <Playground id={getIdByTitle(src) || ''} />;
            }
            return null;
          },
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                style={prism as any}
                children={String(children).replace(/\n$/, '')}
                language={match[1]}
                PreTag='div'
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {docData.content}
      </ReactMarkdown>
    </div>
  );
}

export default DocDetail;
