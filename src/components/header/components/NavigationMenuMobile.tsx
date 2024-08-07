import { useContext } from "react";
import { useIntl } from "react-intl";
import { Link } from 'react-router-dom';
import { MenuBar } from "../../../ui/MenuBar";
import { AppContext } from "../../contextProvider";

export function NavigationMenuMobile({ isHomePage }: { isHomePage: boolean }) {
  const formatMessage = useIntl().formatMessage;
  const context = useContext(AppContext);

  const items = isHomePage ? [
    {
      label: formatMessage({ id: 'app.header.menu.engine' }),
      children: [
        {
          label: <a rel='noopener noreferrer' href={`/archive-engine/docs/${context.version}/${context.lang}/getting-started-overview`}>{formatMessage({ id: 'app.header.menu.engine.docs' })}</a>
        },
        {
          label: <a rel='noopener noreferrer' href={`/archive-engine/api/${context.version}`}>{formatMessage({ id: 'app.header.menu.engine.api' })}</a>,
        },
        {
          label: <a rel='noopener noreferrer' href={`/archive-engine/examples/${context.version}`}>{formatMessage({ id: 'app.header.menu.engine.examples' })}</a>,
        },
        {
          label: <a target="_blank" href={`https://github.com/galacean/create-galacean-app`} >{formatMessage({ id: 'app.header.menu.ecosystem.createapp' })}</a>
        },
      ]
    },
    {
      label: formatMessage({ id: 'app.header.menu.effects' }),
      children: [
        {
          label: <a rel='noopener noreferrer' href={`/effects/#/user/`}>{formatMessage({ id: 'app.header.menu.effects.doc' })}</a>
        },
        {
          label: <a rel='noopener noreferrer' href={`/effects/#/playground/`}>{formatMessage({ id: 'app.header.menu.effects.examples' })}</a>
        },
        {
          label: <a rel='noopener noreferrer' href={`/effects/#/api/`}>{formatMessage({ id: 'app.header.menu.effects.api' })}</a>
        },
      ]
    },
  ] : [
    {
      children: [
        {
          label: <Link to={`/docs/${context.version}/${context.lang}/getting-started-overview`}>{formatMessage({ id: 'app.header.menu.engine.docs' })}</Link>
        },
        {
          label: <Link to={`/api/${context.version}`}>{formatMessage({ id: 'app.header.menu.engine.api' })}</Link>,
        },
        {
          label: <Link to={`/examples/${context.version}`}>{formatMessage({ id: 'app.header.menu.engine.examples' })}</Link>,
        },
        {
          label: <a target="_blank" href={`https://github.com/galacean/create-galacean-app`} >{formatMessage({ id: 'app.header.menu.ecosystem.createapp' })}</a>
        },
      ]
    }

  ]

  return <MenuBar items={items} onClick={() => { }}></MenuBar>
}