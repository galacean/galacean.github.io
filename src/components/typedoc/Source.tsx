import React from 'react';
import { ISource } from './interface';
import { GithubOutlined } from '@ant-design/icons';

export default function Source(source: ISource) {
  const url = source.fileName.replace('engine/', 'https://github.com/oasis-engine/engine/blob/main/');
  return source && <a href={`${url}#L${source.line}`} target="_blank" className="tsc-source"><GithubOutlined /></a>
}
