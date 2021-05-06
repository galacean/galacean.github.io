import React from 'react';
import { Affix } from 'antd';
import Kind from './Kind';
import type { IModule, IPackage } from './interface';
import { Link } from 'react-scroll'

function Module (props: IModule) {
  return <div>
    <div className="tsd-menu-class"><Kind {...props} link={`#${props.name}`} /></div>
    {props.children && <ul className="tsd-menu-list tsd-menu-list-items">
      {props.children.map((item) => {
        if (!item.name.startsWith('_')) {
          return <Link to={item.id} spy={true} smooth={true} duration={250} activeClass="tsd-menu-current" >
            <li key={item.id}>
                <Kind {...item} link={`#${item.name}`}/>
            </li>
          </Link>
        }
        
          return null;
        
      })}
    </ul>}
  </div>
}

export default function Menu (props: IPackage) {
  return (
    <Affix>
      <nav className="tsd-menu-nav">
        {props.children && <ul className="tsd-menu-list">
          {props.children.map((item: any) => {
            if (!item.name.startsWith('_')) {
              return <li key={item.id} >
                <Kind {...item} link={`../${item.name}/`}/>
                {item.child && <Module {...item.child} hash={'#'}/>}
              </li>
            }
            
              return null;
            
          })}
        </ul>}
      </nav>
    </Affix>
  );
}