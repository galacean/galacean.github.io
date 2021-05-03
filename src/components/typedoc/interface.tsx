interface IOverwrite {
  id: number;
  name: string;
  type: string;
}

export interface ISource {
  fileName: string;
  line: number;
  character: number;
}

export interface ITag {
  tag: string;
  text: string;
}

export interface IComment {
  shortText?: string;
  text?: string;
  returns?: string;
  tags?: ITag[];
}

interface IExtendedType {
  type: string;
  id: number;
  name: string;
}

interface IFlag {
  isOptional?: boolean;
  isReadonly?: boolean;
}

export interface IParameter {
  name: string;
  id: number;
  kind: number;
  kindString: string;
  comment: IComment;
  flags: IFlag;
  type: IType;
  index?: number;
}

interface ITarget {
  elementType: IType;
  type: string;
}

export interface IType {
  name: string;
  id?: number;
  type?: string;
  operator?: string;
  target?: ITarget;
  elementType?: IType;
}

export interface ISignature {
  name: string;
  id: number;
  kind: number;
  kindString: string;
  overwrites: IOverwrite[];
  flags: IFlag;
  type: IType;
  parameters?: IParameter[];
  typeParameter?: IParameter[];
  comment?: IComment;
}

export interface IItem {
  name: string;
  id: number;
  kind: number;
  kindString: string;
  comment?: IComment;
  inheritedFrom?: any;
  getSignature?: any;
  setSignature?: any;
  signatures?: ISignature[];
  overwrites?: IOverwrite[];
  sources?: ISource[];
  type?: IType;
  defaultValue?: any;
  flags?: IFlag;
  link?: string;
}


export interface IModule {
  name: string;
  id: number;
  kind: number;
  kindString: string;
  children: IItem[];
  groups: any[];
  comment?: IComment;
  sources?: ISource[];
  extendedTypes?: IExtendedType[];
}

export interface IPackage {
  name: string;
  id: number;
  kind: number;
  kindString: string;
  children: IModule[];
  groups: any[];
  sources?: ISource[];
}