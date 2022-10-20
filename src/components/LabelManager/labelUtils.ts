import config from '../../siteconfig.json';

const { serverAddress, versions } = config;
export interface LabelDetails {
  /**
   * [标签名]
   */
  name: string;
  /**
   * [父标签ID]
   */
  parent_id: string | null;
  /**
   * [权重]
   */
  weight: number;
  /**
   *[tag，分类用]
   */
  tag: string;
  /**
   * [中文名]
   */
  cn_name: string;
  /**
   * [主键]
   */
  id: string;
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

export const fetchLabelList: (tag: string) => Promise<LabelDetails[]> = async (tag: string) => {
  return await fetch(`http://${serverAddress}/api2/doc/label/list?tag=${tag}`, {
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
};

export const updateLabel: (newLable: {
  id: string;
  name: string;
  weight: number;
  tag: string;
  parent_id?: string | null;
}) => Promise<LabelDetails[]> = async (newLabel) => {
  return await fetch(`http://${serverAddress}/api2/doc/label/update`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newLabel),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res?.success) {
        return res.data;
      } else {
        throw new Error('');
      }
    });
};

export const addLabel: (newLable: {
  name: string;
  weight: number;
  tag: string;
  parent_id?: string | null;
}) => Promise<LabelDetails[]> = async (newLabel) => {
  return await fetch(`http://${serverAddress}/api2/doc/label/create`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newLabel),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res?.success) {
        return res.data;
      } else {
        throw new Error('');
      }
    });
};

export const deleteLabel: (labelInfo: { name: string }) => Promise<LabelDetails[]> = async (labelInfo) => {
  return await fetch(`http://${serverAddress}/api2/doc/label/delete`, {
    method: 'DELETE',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(labelInfo),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res?.success) {
        return res.data;
      } else {
        throw new Error('');
      }
    });
};
