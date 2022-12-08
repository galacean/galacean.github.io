import React from 'react';
import {
  QrcodeOutlined,
  ChromeOutlined
} from '@ant-design/icons';
import QRCode from 'qrcode.react';
import { StyledAction, StyledActions } from './CodeActions';
import { styled } from '../../ui/design-system';
import { Tooltip } from '../../ui/Tooltip';
import { FormattedMessage } from 'react-intl';
import { Flex } from '../../ui/Flex';

const StyledDemoActions = styled(StyledActions, {
  right: "initial",
  left: 0
});

export default function DemoActions(props: any) {
  return (
    <StyledDemoActions gap="lg" align="both">
      <StyledAction>
        <Tooltip side="bottom" content={<Flex align="both">
          <QRCode value={props.url} />
        </Flex>}>
          <QrcodeOutlined />
        </Tooltip>
      </StyledAction>
      <StyledAction>
        <Tooltip side="bottom" content={<FormattedMessage id="app.home.openbrowser" />}>
          <ChromeOutlined onClick={() => { window.open(props.url) }} />
        </Tooltip>
      </StyledAction>
    </StyledDemoActions>
  );
}
