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

export interface IComment {
  shortText?: string;
  text?: string;
  returns?: string;
}

interface IExtendedType {
  type: string;
  id: number;
  name: string;
}

interface IFlag {
  isOptional: boolean;
}

export interface IParameter {
  name: string;
  id: number;
  kind: number;
  kindString: string;
  comment: IComment;
  flags: IFlag;
  type: IType;
}

export interface IType {
  id: number;
  type: string;
  name: string;
}

export interface ISignature {
  name: string;
  id: number;
  kind: number;
  kindString: string;
  overwrites: IOverwrite[];
  type: IType;
  parameters?: IParameter[];
  typeParameter?: IParameter[];
  comment?: IComment;
  flags: IFlag;
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