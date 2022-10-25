import React from 'react';
import { toHtml } from 'hast-util-to-html';
import { Affix } from 'antd';
import "./DocToc.less"

const DocToc: React.FC = (props: any) => {
  return (
    <Affix className='toc-affix' offsetTop={16}>
      <div
        dangerouslySetInnerHTML={{
          __html: toHtml(props.node),
        }}
      />
    </Affix>
  );
};
export default DocToc;
