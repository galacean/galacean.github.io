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
    <i>{props.type === 'reference'  ? (props.id ?
      <a href={props.name}>{props.name}</a> :
      // Link to MDN Doc if it is a native API.
      <a href={`https://developer.mozilla.org/en-US/search?q=${props.name}`} target="_blank">{props.name}</a>
    ) : props.name}</i>
    {props.type === 'array' && <span>[]</span>}
  </span>
}

function Parameter(props: IParameter) {
  return <li>
    <h4 title={props.name}>
      {props.flags.isOptional && <span className="tsd-flag">optional</span>}
      <strong>{props.name}</strong>
    </h4>
    {props.comment && <p> {props.comment?.text}</p>}
  </li>
}

function GetSignature(props: ISignature) {
  const { type } = props;

  return <div className="tsd-signature">
    <span className="tsd-signature-symbol">get </span>
    {props.name}(): {type.type === "typeOperator" ?
      <TypeOperator {...type} /> :
      <Type {...type} />
    }
  </div>
}

function TypeOperator(props: IType) {
  return <span>
    <i className="tsd-signature-type">{props.operator} </i>
    {props.target && (props.target.type === 'array' ?
      <span>
        &lt;
      <Type {...props.target?.elementType} />
      []&gt;
      </span> :
      <Type {...props.target?.elementType} />
    )}
  </span>
}

function SetSignature(props: ISignature) {
  return <div className="tsd-signature">
    <span className="tsd-signature-symbol">set </span>
    {props.name}({
      props.parameters && <Type {...props.parameters[0].type} />
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

function TypeParameter(props: IType) {
  return <span><i>&lt;</i>T extends <Type {...props} /><i>&gt;</i></span>
}

function ParameterElement(p: IParameter) {
  let element = null;

  if (p.type?.type === 'reflection') {
    element = <i>T</i>;
  }
  else if (p.type?.elementType?.type === 'reference') {
    element = <span><i>{p.type.elementType.name}</i>{p.type.type === 'array' && <span>[]</span>}</span>
  }
  else {
    element = <Type {...p.type} />
  }
  return <span>
    {p.index !== 0 && ', '}
    {p.name}: {element}
  </span>
}

function ReturnElement(props: ISignature) {
  if (!props.type) {
    return <span>void</span>
  }
  return props.typeParameter ?
    <span>
      <Type name={props.type.name} />
      {props.type.type === 'array' && <span><i>{props.type.elementType && <Type name={props.type.elementType?.name} />}</i>[]</span>}
    </span> : <Type {...props.type} />

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
    {kind !== Kinds.SET_SIGNATURE && comment && <Comment {...comment} />}
    {parameters && <div className="tsd-parameters">
      <h3>Parameters</h3>
      <ul className="tsd-parameters-list">
        {parameters.map((p) => {
          return <Parameter key={p.id} {...p} />
        })}
      </ul>
    </div>
    }
    {comment && comment.returns && <div>
      <h3>Returns</h3>
      {comment.returns}
    </div>
    }
  </div>
}

export default function Item(props: IItem) {
  const { kind } = props;
  // console.log('Item props', props)
  return <Element name={props.name} className="tsd-panel-anchor">
    <section className="tsd-panel" key={props.id}>
      <h2 title={props.name}>
        <a href={`#${props.name}`}><Kind {...props} /></a>
        &nbsp;
        {props.flags?.isReadonly && <span className="tsd-flag">ReadOnly</span>}
        {props.sources?.map((source) => {
          return <Source key={source.fileName} {...source} />
        })}
      </h2>
      {props.type && <Property {...props} />}
      {(kind === Kinds.CONSTRUCTOR || kind === Kinds.FUNCTION) && props.signatures?.map((signature) => {
        return <div key={signature.id}>
          <ConstructorSignature {...signature} />
          <Description key={signature.id} {...signature} />
        </div>
      })}
      {props.kind === Kinds.METHOD && props.signatures?.map((signature) => {
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
    </section>
  </Element>
};