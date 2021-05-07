import React from 'react';
import type { ISource } from './interface';
import { GithubOutlined } from '@ant-design/icons';
import siteConfig from '../../../siteconfig.json';

export default function Source(source: ISource) {
  const url = source.fileName.replace('engine/', siteConfig.github);
  return source && <a href={`${url}#L${source.line}`} target="_blank" className="tsc-source"><GithubOutlined /></a>
}