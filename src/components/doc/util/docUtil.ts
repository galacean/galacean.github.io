import config from '../../../siteconfig.json';
import { getEnv } from '../../../utils';

const { serverConfig } = config;
const serverAddress = serverConfig[getEnv() as keyof typeof serverConfig];

export interface DocData {
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
   */
  type: string;
  /**
   * [文件语言]
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
  id: string;
  /**
   * [创建时间]
   */
  gmtCreate: string;
  /**
   * [修改时间]
   */
  gmtModified: string;
}
export interface MenuData {
  /**
   * 英文标签名
   */
  name: string;
  /**
   * 中文标签名
   */
  cn_name: string;
  /**
   * 父标签ID
   */
  parent_id: string;
  /**
   * 权重
   */
  weight: number;
  /**
   * 主键
   */
  id: string;
  /**
   * 创建时间
   */
  gmtCreate: string;
  /**
   * 修改时间
   */
  gmtModified: string;
  /**
   * 下层目录/分组
   */
  children: MenuData[];
  /**
   * 文章详情
   */
  files: DocData[];
}

export interface FileData {
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
   * (enum: cn, en, *)
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
export interface FileDataRes {
  /**
   * [符合查询条件的总记录数]
   */
  total: number;
  list: FileData[];

  /**
   * [页码, 下标从0开始]
   */
  pageNo: number;
  pageSize: number;
}
export function getDocIdByMenuKey(menuKey: string): string | undefined {
  if (!menuKey || menuKey === 'undefined') {
    return undefined;
  }
  return menuKey.split('-').pop();
}
export async function fetchDocDataById(id: string): Promise<DocData | null> {
  const docId = getDocIdByMenuKey(id);
  if (!docId) {
    return new Promise((resolve) => resolve(null));
  }
  const searchQuery = new URLSearchParams({
    id: docId,
  });
  return await fetch(`${serverAddress}/api2/doc/detail?${searchQuery}`, {
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res?.success) {
        return res.data;
      } else {
        throw new Error('');
      }
    });
}

export async function fetchDocDetailByTitle(title: string): Promise<DocData> {
  const searchQuery = new URLSearchParams({
    title,
  });
  return await fetch(`${serverAddress}/api2/doc/detail?${searchQuery}`, {
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res?.success) {
        return res.data;
      } else {
        throw new Error('');
      }
    });
}

/**
 *
 * @param type Use 'ts' for example list and 'markdown' for markdown list
 * @returns The menu item list and their children.
 */
export async function fetchMenuList(
  type?: 'ts' | 'markdown',
  version: string = 'latest'
): Promise<MenuData[]> {
  return await fetch(`${serverAddress}/api2/doc/label/all/?tag=${type}&version=${version}`, {
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res?.success) {
        return res.data;
      } else {
        throw new Error('');
      }
    });
}
export async function fetchAllPlaygroundFiles(): Promise<FileData> {
  return await fetch(`${serverAddress}/api2/doc/dir/playground?pageSize=1000`, {
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res?.success) {
        return res.data.list;
      } else {
        throw new Error('');
      }
    });
}
