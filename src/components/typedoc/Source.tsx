import React from 'react';
import { ISource } from './interface';
import { GithubOutlined } from '@ant-design/icons';

export default function Source(source: ISource) {
  return source && <a href={source.fileName} className="tsc-source"><GithubOutlined /></a>
}
