import {
  ChromeOutlined, QrcodeOutlined
} from '@ant-design/icons';
import { Flex, styled, Tooltip } from "@galacean/editor-ui";
import QRCode from 'qrcode.react';
import { FormattedMessage } from 'react-intl';
import { StyledAction, StyledActions } from './CodeActions';

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
