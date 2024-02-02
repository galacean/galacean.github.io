import config from '../../siteconfig.json';
import { getEnv } from '../../utils';

import { PkgChildDetail } from '../Api/util/apiUtil';

const { serverConfig } = config;
const serverAddress = serverConfig[getEnv() as keyof typeof serverConfig];
interface APISearchOptions {
  key: string;
  version: string;
  pageNo: string;
  pageSize: string;
}
interface DocSearchOptions {
  content: string;
  title: string;
  version: string;
  pageNo: string;
  pageSize: string;
  type: string;
  lang?: string;
}

export interface APISearchResponse {
  /**
   * [符合查询条件的总记录数]
   */
  total: number;
  list: (PkgChildDetail & { pkg: string })[];
  /**
   * [页码, 下标从0开始]
   */
  pageNo: number;
  pageSize: number;
}
export interface MatchedDocs {
  /**
   * [文件名]
   */
  filename: string;
  /**
   * [文件路径]
   */
  path: string;
  /**
   * [文件类型]
   * (enum: markdown, ts, raw)
   */
  type: string;
  /**
   * [文件语言]
   * (enum: zh-CN, en, *)
   */
  lang: string;
  /**
   * [排序权重]
   */
  weight: number;
  /**
   * [文件标题]
   */
  title: string;
  /**
   * [文章内容]
   */
  content: string;
  /**
   * [git链接]
   */
  gitUrl: string;
  /**
   * [base64源文件内容]
   */
  plainContent: string;
  /**
   * [标签名]
   */
  labelId: number;
  /**
   * [版本号]
   */
  version: string;
  /**
   * [html 链接]
   */
  htmlUrl: string;
  /**
   * [主键]
   */
  id: number;
  /**
   * [创建时间]
   * [date-time]
   */
  gmtCreate: string;
  /**
   * [修改时间]
   * [date-time]
   */
  gmtModified: string;
}
export interface DocSearchResponse {
  /**
   * [符合查询条件的总记录数]
   */
  total: number;
  list: MatchedDocs[];
  /**
   * [页码, 下标从0开始]
   */
  pageNo: number;
  pageSize: number;
}
export async function searchAPI(
  opts: APISearchOptions
): Promise<APISearchResponse> {
  return await fetch(
    `${serverAddress}/api2/doc/apis/search?` + new URLSearchParams({ ...opts }),
    {
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
    .then((res) => res.json())
    .then((res) => {
      if (res?.success) {
        return res.data;
      } else {
        throw new Error('');
      }
    });
}

export async function searchDoc(
  opts: DocSearchOptions
): Promise<DocSearchResponse> {
  return await fetch(
    `${serverAddress}/api2/doc/search?` + new URLSearchParams({ ...opts }),
    {
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
    .then((res) => res.json())
    .then((res: { data: DocSearchResponse; success: any }) => {
      if (res?.success) {
        return res.data;
      } else {
        throw new Error('');
      }
    });
}
