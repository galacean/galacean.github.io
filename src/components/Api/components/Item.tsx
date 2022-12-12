import { Element } from 'react-scroll';
import { Kinds } from '../constants';
import type { IItem, IParameter, ISignature, IType } from '../util/apiUtil';
import { PkgChildDetail } from '../util/apiUtil';
import Source from './Source';
import Comment from './Comment';
import { styled } from "@oasis-engine/editor-design-system";
import { StyledKind, StyledKindIcon } from './KindModule';

const StyledDescription = styled("div", {
  margin: "$2 0"
});

const StyledSignature = styled("div", {
  padding: "$2 $4",
  overflowX: "auto",
  fontSize: "$1",
  margin: "0 -$4",
  fontFamily: "Menlo, Monaco, Consolas, courier new, monospace",
  backgroundColor: "$slate3"
});

const StyledPanel = styled("section", {
  padding: "0 $4 0 $4",
  border: "1px solid $slate5",
  borderRadius: "$2",
  "& h2": {
    margin: "0 -$4 0",
    padding: "$2 $4 $2",
    fontSize: "$3"
  },
  "& h3": {
    fontSize: "$2",
    margin: "0",
    color: "$slate"
  },
  "& h4": {
    fontSize: "$1"
  }
});

const StyledElement = styled(Element, {
  padding: "$2 0"
});

const StyledParameter = styled("div", {
  color: "$slate11",
  fontSize: "$1",
  lineHeight: 1.8
});

const StyledParameterList = styled("ul", {
  margin: 0,
  paddingLeft: "$2",
  listStyle: "square"
});

const StyledTag = styled("span", {
  display: "inline-block",
  marginRight: "$1",
  padding: "$1",
  lineHeight: "$1",
  color: "$slate12",
  fontWeight: 400,
  fontSize: "$1",
  textIndent: 0,
  backgroundColor: "$slate5",
  borderRadius: "$1"
});

function Type(props: IType) {

  return (
    <span>
      <i>{props.name}</i>
      {props.type === 'array' && <span>[]</span>}
    </span>
  );
}

function Parameter(props: IParameter) {
  return (
    <li>
      <h4 title={props.name}>
        {props.flags.isOptional && <StyledTag>optional</StyledTag>}
        <strong>{props.name}</strong>
      </h4>
      {props.comment && <p> {props.comment?.text}</p>}
    </li>
  );
}

function GetSignature(props: ISignature) {
  const { type } = props;
  if (!type) return null;

  return (
    <StyledSignature>
      <span>get </span>
      {props.name}(): {type.type === 'typeOperator' ? <TypeOperator {...type} /> : <Type {...type} />}
    </StyledSignature>
  );
}

function TypeOperator(props: IType) {
  return (
    <span>
      <i>{props.operator} </i>
      {props.target &&
        (props.target.type === 'array' ? (
          <span>
            &lt;
            <Type {...props.target?.elementType} />
            []&gt;
          </span>
        ) : (
          <Type {...props.target?.elementType} />
        ))}
    </span>
  );
}

function SetSignature(props: ISignature) {
  return (
    <StyledSignature>
      <span>set </span>
      {props.name}({props.parameters && <Type {...props.parameters[0].type} />}): void
    </StyledSignature>
  );
}

function Property(props: IItem) {
  return (
    <StyledSignature>
      {props.type && (
        <>
          <strong>{props.name}</strong>: {props.type && <Type {...props.type} />}
          {props.defaultValue && <span> = {props.defaultValue}</span>}
        </>
      )}
    </StyledSignature>
  );
}

function ConstructorSignature(props: ISignature) {
  return (
    <StyledSignature>
      <strong>{props.name}</strong>(
      {props.parameters?.map((p, i) => {
        return (
          <span key={p.id}>
            {i !== 0 && ', '}
            {p.name}: <Type {...p.type} />
          </span>
        );
      })}
      )
    </StyledSignature>
  );
}

function Description(props: ISignature) {
  const { parameters, comment, kind } = props;

  return (
    <StyledDescription>
      {kind !== Kinds.SET_SIGNATURE && comment && <Comment {...comment} />}
      {parameters && (
        <StyledParameter>
          <h3>Parameters</h3>
          <StyledParameterList>
            {parameters.map((p) => {
              return <Parameter key={p.id} {...p} />;
            })}
          </StyledParameterList>
        </StyledParameter>
      )}
      {comment && comment.returns && (
        <div>
          <h3>Returns</h3>
          {comment.returns}
        </div>
      )}
    </StyledDescription>
  );
}
function MethodSignature(props: ISignature) {
  return (
    <StyledSignature>
      <strong>{props.name}</strong>
      {props.typeParameter && props.typeParameter[0] && <TypeParameter {...props.typeParameter[0].type} />}(
      {props.parameters?.map((p, i) => {
        return <ParameterElement key={p.id} {...p} index={i} />;
      })}
      ): <ReturnElement {...props} />
    </StyledSignature>
  );
}

function TypeParameter(props: IType) {
  return (
    <span>
      <i>&lt;</i>T extends <Type {...props} />
      <i>&gt;</i>
    </span>
  );
}

function ParameterElement(p: IParameter) {
  let element = null;

  if (p.type?.type === 'reflection') {
    element = <i>T</i>;
  } else if (p.type?.elementType?.type === 'reference') {
    element = (
      <span>
        <i>{p.type.elementType.name}</i>
        {p.type.type === 'array' && <span>[]</span>}
      </span>
    );
  } else {
    element = <Type {...p.type} />;
  }
  return (
    <span>
      {p.index !== 0 && ', '}
      {p.name}: {element}
    </span>
  );
}

function ReturnElement(props: ISignature) {
  if (!props.type) {
    return <span>void</span>;
  }
  return props.typeParameter ? (
    <span>
      <Type name={props.type.name} />
      {props.type.type === 'array' && (
        <span>
          <i>{props.type.elementType && <Type name={props.type.elementType?.name} />}</i>[]
        </span>
      )}
    </span>
  ) : (
    <Type {...props.type} />
  );
}

export default function Item(props: PkgChildDetail) {
  const { kind } = props;
  return (
    <StyledElement name={props.name}>
      <StyledPanel key={props.id}>
        <h2 title={props.name}>
          <StyledKind type={props.kindString.replaceAll(' ', '-').toLowerCase()} css={{paddingRight: "$1"}}>
            <StyledKindIcon id={props.name}>
              {props.name}
            </StyledKindIcon>
          </StyledKind>
          {props.flags?.isReadonly && <StyledTag>ReadOnly</StyledTag>}
          {props.sources && props.sources[0] && <Source key={props.sources[0].fileName} {...props.sources[0]} />}
        </h2>
        {(kind === Kinds.CONSTRUCTOR || kind === Kinds.FUNCTION) &&
          props.signatures?.map((signature: any) => {
            return (
              <div key={signature.id}>
                <ConstructorSignature {...signature} />
                <Description key={signature.id} {...signature} />
              </div>
            );
          })}
        {props.kind === Kinds.METHOD &&
          props.signatures?.map((signature: any) => {
            return (
              <div key={signature.id}>
                <MethodSignature {...signature} />
                <Description {...signature} />
              </div>
            );
          })}
          {props.getSignature && (
            <div>
              <GetSignature {...props.getSignature} />
              <Description {...props.getSignature} />
            </div>
          )}
          {props.setSignature && (
            <div>
              <SetSignature {...props.setSignature} />
            </div>
          )}
        {!props.getSignature && props.comment && <Comment {...props.comment} />}
      </StyledPanel>
    </StyledElement>
  );
}
