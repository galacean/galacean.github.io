import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Helmet } from 'react-helmet';
import { Affix } from 'antd';
import delegate from 'delegate';
import moment from 'moment';
import EditButton from './EditButton';
import type { IFrontmatterData } from '../../templates/docs';
import AvatarList from './AvatarList';
import RehypeReact from "rehype-react"
import Playground from "../Playground";
import { version } from '../../../siteconfig.json';

const renderAst = new RehypeReact({
  createElement: React.createElement,
  components: { "playground": Playground }
}).Compiler;


interface ArticleProps {
  content: {
    meta: IFrontmatterData;
    toc: string | false;
    content: string;
  };
}

export default class Article extends React.PureComponent<ArticleProps> {
  delegation: any;

  pingTimer: number;

  node: HTMLElement | null | undefined;

  static contextTypes = {
    intl: PropTypes.object.isRequired,
  };

  componentDidMount() {
  }

  componentWillUnmount() {
    clearTimeout(this.pingTimer);
    if (this.delegation) {
      this.delegation.destroy();
    }
  }

  render() {
    const { props } = this;
    const { content } = props;
    const { meta } = content;
    const { title, subtitle, path, modifiedTime, avatarList } = meta;
    const {
      intl: { locale },
    } =
      this.context as
      {
        intl: {
          locale: 'zh-CN' | 'en-US';
        };
      };

    // <div> can not be a descendant of <p>
    if (content.htmlAst.children) {
      content.htmlAst.children.forEach((node) => {
        if (node.tagName === 'p' && node?.children[0] && node.children[0].tagName === 'playground') {
          node.tagName = 'div';
        }
      })
    }

    let toc = content.toc.replace(/<ul>/g, '<ul class="toc">').replace(/\/#/g, '#');
    toc = toc.replace(/\/docs\//g, `/${version}/docs/`).replace(/\/#/g, '#');

    return (
      <>
        <Helmet>
          <title>{`${title} - Oasis Engine`}</title>
          <meta name="description" content={title} />
        </Helmet>
        <article
          className="markdown"
          ref={(node) => {
            this.node = node;
          }}
        >
          <h1>
            {title}
            {!subtitle || locale === 'en-US' ? null : <span className="subtitle">{subtitle}</span>}
            <EditButton title={<FormattedMessage id="app.content.edit-page" />} filename={path} />
          </h1>

          <div className="modifiedTime">
            <AvatarList avatarList={avatarList} />
            <FormattedMessage id="app.content.modifiedTime" />
            {moment(modifiedTime).format('YYYY-MM-DD HH:mm:SS')}
          </div>

          {!content.toc || content.toc.length <= 1 || meta.toc === false ? null : (
            <Affix className="toc-affix" offsetTop={16}>
              <div
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: toc,
                }}
              />
            </Affix>
          )}
          <section
            className="markdown api-container"
          // eslint-disable-next-line react/no-danger
          // dangerouslySetInnerHTML={{ __html: content.content }}
          >
            {renderAst(content.htmlAst)}
          </section>
        </article>
      </>
    );
  }
}
