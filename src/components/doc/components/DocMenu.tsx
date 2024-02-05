import React, { PropsWithChildren } from 'react';
import { MenuBar } from '../../../ui/MenuBar';

interface DocMenuProps {
  items: any[];
  selectedDocId: string;
  setSelectedDocId: React.Dispatch<React.SetStateAction<string>>;
  defaultOpenKeys: string;
}

function DocMenu(props: PropsWithChildren<DocMenuProps>) {
  const onClick = (e) => {
    props.setSelectedDocId(e.key);
  };

  if (!props.defaultOpenKeys) {
    return null;
  }

  return (
    <MenuBar
      onClick={onClick}
      defaultSelectedKeys={[props.defaultOpenKeys]}
      items={props.items.filter((item) => item.children?.length)}
      selectedKeys={[props.selectedDocId]}
    />
  );
}

export default DocMenu;
