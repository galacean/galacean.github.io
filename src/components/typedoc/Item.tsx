import React from 'react';
import Kind from './Kind';
import { IItem, ISignature, IType, IParameter } from './interface';
import Source from './Source';
import Comment from './Comment';

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

function Signature(props: IItem) {
  if (props.type) {
    return <div className="tsd-signature">
      <strong>{props.name}</strong>: {props.type && <Type {...props.type} />}
      {props.defaultValue && <span> = {props.defaultValue}</span>}
    </div>
  }
  else if (props.signatures) {
    return <div className="tsd-signature">
      {props.signatures?.map((signature) => {
        return <div key={signature.id}>
          <strong>{signature.name}</strong>(
          {signature.parameters?.map((p, i) => {
            return <span key={p.id}>
              {i !== 0 && ', '}
              {p.name}: <Type {...p.type} />
            </span>
          })})
        </div>
      })}
    </div>
  }
  else {
    return null;
  }
}


function Description(props: ISignature) {
  const { typeParameter, parameters, comment } = props;

  return <div>
    {comment && <Comment {...comment} />}
    {typeParameter && <div>
      <h4>Type parameters</h4>
      <ul className="tsd-type-parameters">
        {typeParameter.map((p) => {
          return <li key={p.id}>
            <h5>
              {p.name}:<Type {...p.type} />
            </h5>
          </li>
        })}
      </ul>
    </div>
    }
    {parameters && <div>
      <h4>Parameters</h4>
      <ul className="tsd-parameters">
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
    <Signature {...props} />
    {props.comment && <Comment {...props.comment}/>}
    {props.signatures?.map((signature) => {
      return <Description key={signature.id} {...signature} />
    })}
  </section>
};