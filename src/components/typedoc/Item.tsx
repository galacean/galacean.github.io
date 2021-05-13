import React from 'react';
import { Row, Col } from 'antd';
import Kind from './Kind';
import type { IItem, ISignature, IType, IParameter } from './interface';
import Source from './Source';
import Comment from './Comment';
import { Kinds } from './enum';
import { Element } from 'react-scroll';

function Type(props: IType) {
  return <span>
    <i>{props.type === 'reference' ? <a href={props.name}>{props.name}</a>: props.name}</i>
    {props.type === 'array' && <span>[]</span>}
  </span>
}

function Parameter(props: IParameter) {
  return <li>
    <h5>
      {props.flags.isOptional && <span className="tsd-flag">optional</span>}
      <strong>{props.name}</strong>
    </h5>
    {props.comment && <p> {props.comment?.text}</p>}
  </li>
}

function GetSignature(props: ISignature) {
  const {type} = props;

  return <div className="tsd-signature">
    <span className="tsd-signature-symbol">get </span>
    {props.name}(): {type.type === "typeOperator" ?
      <TypeOperator {...type} /> :
      <Type {...type}/>
    }
  </div>
}

function TypeOperator (props: IType) {
  return <span>
    <i className="tsd-signature-type">{props.operator} </i>
    {props.target && (props.target.type === 'array' ?
      <span>
      &lt;
      <Type {...props.target?.elementType}/>
      []&gt;
      </span> :
      <Type {...props.target?.elementType}/>
    )}
  </span>
}

function SetSignature(props: ISignature) {
  return <div className="tsd-signature">
    <span className="tsd-signature-symbol">set </span>
    {props.name}({
      props.parameters && <Type {...props.parameters[0].type}/>
    }): void 
  </div>
}

function Property(props: IItem) {
  return <div className="tsd-signature">
    {props.type && <>
      <strong>{props.name}</strong>: {props.type && <Type {...props.type} />}
      {props.defaultValue && <span> = {props.defaultValue}</span>}
    </>}
  </div>
}

function ConstructorSignature(props: ISignature) {
  return <div className="tsd-signature">
    <strong>{props.name}</strong>(
    {props.parameters?.map((p, i) => {
      return <span key={p.id}>
        {i !== 0 && ', '}
        {p.name}: <Type {...p.type} />
      </span>
    })})
  </div>
}

function TypeParameter (props: IType) {
  return <span><i>&lt;</i>T extends <Type {...props}/><i>&gt;</i></span>
}

function ParameterElement (p: IParameter) {
  let element = null;

  if (p.type?.type === 'reflection'){
    element = <i>T</i>;
  }
  else if (p.type?.elementType?.type === 'reference') {
    element = <span><i>{p.type.elementType.name}</i>{p.type.type === 'array' && <span>[]</span>}</span>
  }
  else{
    element = <Type {...p.type} />
  }
  return <span>
    {p.index !== 0 && ', '}
    {p.name}: {element} 
  </span>
} 

function ReturnElement (props: ISignature) {
  if (!props.type) {
    return <span>void</span>
  } 
    return props.typeParameter ? 
      <span>
        <Type name={props.type.name} />
        {props.type.type === 'array' && <span><i>{props.type.elementType && <Type name={props.type.elementType?.name} />}</i>[]</span>}
      </span> : <Type {...props.type}/>
  
}

function MethodSignature(props: ISignature) {
  return <div className="tsd-signature">
    <strong>{props.name}</strong>
    {props.typeParameter && props.typeParameter[0] && <TypeParameter {...props.typeParameter[0].type} />}
    ({props.parameters?.map((p, i) => {
      return <ParameterElement key={p.id} {...p} index={i} />
    })}): <ReturnElement {...props} />
  </div>
}

function Description(props: ISignature) {
  const { parameters, comment, kind } = props;

  return <div className="tsd-description">
    {kind !== Kinds.SET_SIGNATURE &&comment && <Comment {...comment} />}
    {parameters && <div className="tsd-parameters">
      <h4>Parameters</h4>
      <ul className="tsd-parameters-list">
        {parameters.map((p) => {
          return <Parameter key={p.id} {...p} />
        })}
      </ul>
    </div>
    }
    {comment && comment.returns && <div>
      <h4>Returns</h4>
      {comment.returns}
    </div>
    }
  </div>
}

export default function Item(props: IItem) {
  // console.log('Item props', props)
  return <Element name={props.name} className="tsd-panel-anchor">
    <section className="tsd-panel" key={props.id}>
      <h3>
        <Kind {...props} />&nbsp;
        {props.flags?.isReadonly && <span className="tsd-flag">ReadOnly</span>}
        {props.sources?.map((source) => {
          return <Source key={source.fileName} {...source} />
        })}
      </h3>
      {props.type && <Property {...props} />}
      {(props.kind === Kinds.CONSTRUCTOR || props.kind === Kinds.FUNCTION) && props.signatures?.map((signature) =>{
        return <ConstructorSignature key={signature.id} {...signature} />
      })}
      {props.kind === Kinds.METHOD && props.signatures?.map((signature) =>{
        return <div key={signature.id} >
          <MethodSignature {...signature} />
          <Description {...signature} />
        </div>
      })}
      <Row>
        {props.getSignature && <Col span={12}>
          <GetSignature {...props.getSignature[0]} />
          <Description {...props.getSignature[0]} />
        </Col>}
        {props.setSignature && <Col span={12}> 
          <SetSignature {...props.setSignature[0]} />
        </Col>}
      </Row>
      {!props.getSignature && props.comment && <Comment {...props.comment} />}
      {props.kind !== Kinds.METHOD && props.signatures?.map((signature) => {
        return <Description key={signature.id} {...signature} />
      })}
    </section>
  </Element>
};