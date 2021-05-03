import React from 'react';
import { Affix } from 'antd';
import Kind from './Kind';
import type { IModule, IPackage } from './interface';

// const { SubMenu } = Menu;
declare global {
  interface Window {location: Location;}
}

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
        
          return null;
        
      })}
    </ul>
  </div>
}

export default function Menu (props: IPackage) {
  return (
    <Affix>
      <nav className="tsd-menu-nav">
        <ul className="tsd-menu-list">
          {props.children.map((item: any) => {
            if (!item.name.startsWith('_')) {
              return <li key={item.id} >
                <Kind {...item} link={`../${item.name}/`}/>
                {item.child && <Module {...item.child} hash={window.location.hash.replace('#', '')}/>}
              </li>
            }
            
              return null;
            
          })}
        </ul>
      </nav>
    </Affix>
  );
}