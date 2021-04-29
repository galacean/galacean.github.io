import React from 'react';
import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

export default class extends React.Component{
  handleClick() {
  }

  render () {
    console.log('menu',this.props)
    return (
      <Menu
        onClick={this.handleClick}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
        {this.props.children ? this.props.children.map((item) => {
          if (item.children) {
            return <Menu.ItemGroup key={item.id} title={item.name}>
              {item.children.map((child) => {
                return <Menu.Item key={child.id}>{child.name}</Menu.Item>
              })}
            </Menu.ItemGroup>
          }
          else {
            return <Menu.Item key={item.id}>{item.name}</Menu.Item>
          }
        }) : <Menu.Item key={this.props.id}>{this.props.name}</Menu.Item>}
      </Menu>
    );
  }
}