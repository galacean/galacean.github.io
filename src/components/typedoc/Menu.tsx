import React from 'react';
import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import Kind from './Kind';

const { SubMenu } = Menu;

export default class extends React.Component{
  render () {
    return (
      <nav>
        <ul className="tsc-menu-list">
          {this.props.children.map((item) => {
            if (!item.name.startsWith('_')) {
              return <li key={item.id} >
                <Kind {...item} />
              </li>
            }
          })}
        </ul>
      </nav>
    );
  }
}