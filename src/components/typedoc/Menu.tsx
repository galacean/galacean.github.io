import React from 'react';
import { Affix } from 'antd';
import Kind from './Kind';
import { IModule, IPackage } from './interface';

// const { SubMenu } = Menu;

function Module (props: IModule) {
  return <div>
    <div className="tsd-menu-class"><Kind {...props} link={`#${props.name}`} /></div>
    <ul className="tsd-menu-list tsd-menu-list-items">
      {props.children.map((item) => {
        const className = item.name === props.hash ? 'tsd-menu-current' : '';
        if (!item.name.startsWith('_')) {
          return <li key={item.id} className={className} >
            <Kind {...item} link={`#${item.name}`}/>
          </li>
        }
      })}
    </ul>
  </div>
}

export default function (props: IPackage) {
  return (
    <Affix>
      <nav className="tsd-menu-nav">
        <ul className="tsd-menu-list">
          {props.children.map((item: any) => {
            if (!item.name.startsWith('_')) {
              return <li key={item.id} >
                <Kind {...item} link={`../${item.name}/`}/>
                {item.child && <Module {...item.child} hash={location.hash.replace('#', '')}/>}
              </li>
            }
          })}
        </ul>
      </nav>
    </Affix>
  );
}