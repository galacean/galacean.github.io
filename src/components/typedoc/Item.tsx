import React from 'react';
import { Row, Col } from 'antd';
import Kind from './Kind';
import { IItem, ISignature, IType, IParameter } from './interface';
import Source from './Source';
import Comment from './Comment';
import { Kinds } from './enum';

function Type(props: IType) {
  if (props.type === 'reference') {
    return <i><a href={props.name}>{props.name}</a></i>
  }
  else {
    return <i>{props.name}</i>
  }
}

function Parameter(props: IParameter) {
  return <li>
    <h5>
      {props.flags.isOptional && <span className="tsd-flag">optional</span>}
      <strong>{props.name}</strong>: <Type {...props.type} />
    </h5>
    {props.comment && <p> {props.comment?.text}</p>}
  </li>
}

function GetSignature(props: ISignature) {
  const type = props.type;

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
    {props.target?.type === 'array' && 
      <span>
      &lt;
      <Type {...props.target.elementType}/>
      []&gt;
      </span>
    }
  </span>
}

function SetSignature(props: ISignature) {
  console.log(props)
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

function Signature(props: ISignature) {
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


function Description(props: ISignature) {
  const { typeParameter, parameters, comment, kind } = props;

  return <div className="tsd-description">
    {kind !== Kinds.SET_SIGNATURE &&comment && <Comment {...comment} />}
    {typeParameter && <div className="tsd-type-parameters">
      <h4>Type parameters</h4>
      <ul className="tsd-type-parameters-list">
        {typeParameter.map((p) => {
          return <li key={p.id}>
            <h5>
              {p.name}: <Type {...p.type} />
            </h5>
          </li>
        })}
      </ul>
    </div>
    }
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
  return <section className="tsd-panel" key={props.id}>
    <h3>
      <Kind {...props} />
      {props.sources?.map((source) => {
        return <Source key={source.fileName} {...source} />
      })}
    </h3>
    {props.type && <Property {...props} />}
    {props.signatures?.map((signature) =>{
      return <Signature key={signature.id} {...signature} />
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
    {props.signatures?.map((signature) => {
      return <Description key={signature.id} {...signature} />
    })}
  </section>
};