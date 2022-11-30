import React from 'react';
import {
  QrcodeOutlined,
  ChromeOutlined 
} from '@ant-design/icons';
import QRCode from 'qrcode.react';
import { StyledAction, StyledActions } from './CodeActions';
import { styled } from '../../ui/design-system';
import { Tooltip } from '../../ui/Tooltip';

const StyledDemoActions = styled(StyledActions, {
    right: "initial",
    left: 0,
    borderRight: "1px solid $slate6"
});

export default function DemoActions (props: any) {
  // const [copy, setCopy] = useState('Copy');

  return (
    <StyledDemoActions>
      <StyledAction>
        <Tooltip content={<QRCode value={props.url} />}>
          <QrcodeOutlined />
        </Tooltip>
      </StyledAction>
      <StyledAction>
        <Tooltip content="在浏览器中打开">
          <a href={props.url} target="_blank"><ChromeOutlined /></a>
        </Tooltip>
      </StyledAction>
    </StyledDemoActions>
  );
}
