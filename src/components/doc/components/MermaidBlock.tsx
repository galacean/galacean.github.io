import React, { useEffect, PropsWithChildren } from 'react';
import mermaid from 'mermaid'

function MermaidBlock(props:PropsWithChildren<any>) {
  useEffect(() => {
    mermaid.contentLoaded();
  }, [])

  return (
    <pre className="mermaid">
      {props.children}
    </pre>
  )
  
}

export default MermaidBlock;
