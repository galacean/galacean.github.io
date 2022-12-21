import { useContext } from "react";
import { useIntl } from "react-intl";
import { Link } from 'react-router-dom';
import { MenuBar } from "../../../ui/MenuBar";
import { AppContext } from "../../contextProvider";

export function NavigationMenuMobile() {
  const formatMessage = useIntl().formatMessage;
  const context = useContext(AppContext);

  const items = [
    {
      label: formatMessage({ id: 'app.header.menu.docs' }),
      children: [
        {
          key: 0,
          label: <Link to={`/docs/${context.version}/${context.lang}`}>{formatMessage({ id: 'app.header.menu.engine.docs' })}</Link>
        },
        {
          key: 1,
          label: <Link to={`/docs/${context.version}/${context.lang}/artist-bake`}>{formatMessage({ id: 'app.header.menu.artist.docs' })}</Link>
        },
        {
          key: 2,
          label: <Link to={`/docs/${context.version}/cn/editor`} >{formatMessage({ id: 'app.header.menu.editor.docs' })}</Link>
        }
      ]
    },
    {
      label: formatMessage({ id: 'app.header.menu.ecosystem' }),
      children: [
        {
          key: 0,
          label: <a target="_blank" href={`https://github.com/oasis-engine/create-oasis-app`} >{formatMessage({ id: 'app.header.menu.ecosystem.createapp' })}</a>
        },
      ]
    },
    {
      label: <Link to={`/api/${context.version}`}>{formatMessage({ id: 'app.header.menu.engine.api' })}</Link>,
    },
    {
      label: <Link to={`/examples/${context.version}`}>{formatMessage({ id: 'app.header.menu.engine.examples' })}</Link>,
    }
  ]

  return <MenuBar items={items} onClick={() => { }}></MenuBar>
}