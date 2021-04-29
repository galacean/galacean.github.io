import React from 'react';
import { graphql } from "gatsby";
import Menu from '../components/Menu';
import WrapperLayout from '../components/layout';
import { Layout, Breadcrumb } from 'antd';
const { Sider, Content } = Layout;

function Type (props) {
  if (props.type === 'reference') {
    return <a href={props.name}>{props.name}</a>
  }
  else {
    return <span>
      {props.type}
    </span>
  }
}

function Signature (props) {
  const {typeParameter, parameters, comment} = props;

  return <div>
      {comment && comment.shortText && <i>{props.comment.shortText}</i>}
      {typeParameter && <div>
        <h5>Type parameters:</h5>
        <ul>
          <li> {typeParameter[0].name}:<Type {...typeParameter[0].type}/></li>
        </ul>
      </div>
      }
      {parameters && <div>
        <h5>Parameters:</h5>
        <ul>
          <li> {parameters[0].name}: <i> {parameters[0].comment?.text}</i></li>
        </ul>
      </div>
      }
      {comment && comment.returns && <div> Returns:{comment.returns} </div>
      }
  </div>
}

function ItemComponent (props) {
  const source = props.sources && props.sources[0];
  return <div style={{border: '1px solid #f0f0f0', margin: '20px 0', padding: '20px'}} key={props.id}>
    <h4>{props.name}</h4>
    <i>{props.kindString}</i>
    <ul>
      {props.type && props.type.type && <li>type: <Type {...props.type}/></li>}
      {props.defaultValue &&<li>defaultValue: {props.defaultValue}</li>}
      {props.comment && props.comment.shortText && <li>comment: {props.comment.shortText}</li>}
    </ul>
    {props.signatures && props.signatures.map((signature) => {
      return <Signature key={signature.id} {...signature} />
    })}
      {source && <small>Defined In: <a href={source.fileName}>{source.fileName}:{source.line}</a></small>}
  </div>
};

function ClassComponent (props) {
  // console.log('class component', props)
  return <div>
    <h3>{props.name}</h3>
    {props.comment && props.comment.shortText && <p>{props.comment.shortText}</p>}
    {props.children && props.children.map((item) => {
      return <ItemComponent key={item.id} {...item}/>
    })}
  </div>

}

export default function APIDoc(props) {
  // console.log('props', props );
  const { node, paths } = props.pageContext;
  const classes = node.children;
  console.log('API Doc', props.pageContext)
  
  const path = paths.split('/');
  const classComponent = classes ? classes.map((item) => {
    // if(item.name !== 'Entity') {return null;}
    if (item.children){
      return <ClassComponent key={item.id} {...item} />
    }
    else {
      return <ItemComponent key={item.id} {...item} />
    }
  }): <ClassComponent key={node.id} {...node} />;


  return (
    <>
      <WrapperLayout {...props}>
        <Layout>
          <Sider><Menu {...node}/></Sider>
          <Content className="api" style={{padding: '20px', backgroundColor: '#fff'}}>
            <Breadcrumb>
              <Breadcrumb.Item>API</Breadcrumb.Item>
              {path[0] &&<Breadcrumb.Item>
                <a href="">{path[0]}</a>
              </Breadcrumb.Item>}
              {path[1] &&<Breadcrumb.Item>
                <a href="">{path[1]}</a>
              </Breadcrumb.Item>}
            </Breadcrumb>
            <hr/>
            <h1>{node.name}</h1>
            {classComponent }
          </Content>
        </Layout>
      </WrapperLayout>
    </>
  );
}

export const query = graphql`
  query {
    typedoc(typedocId: { eq: "default" }) {
      internal {
        content
      }
    }
  }
`;
