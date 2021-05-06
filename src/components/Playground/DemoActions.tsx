import React from 'react';
import {
  QrcodeOutlined 

} from '@ant-design/icons';
import { Tooltip } from 'antd';
import QRCode from 'qrcode.react';

export default function DemoActions (props: any) {
  // const [copy, setCopy] = useState('Copy');

  return (
    <div className="code-box-actions code-box-actions-demo">
      <div className="code-box-qrcode">
        <Tooltip title={<QRCode value={props.url} />}>
          <QrcodeOutlined />
        </Tooltip>
      </div>
    </div>
  );
}
