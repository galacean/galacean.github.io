import React from 'react';
import {
  QrcodeOutlined,
  ChromeOutlined 
} from '@ant-design/icons';
import { Tooltip } from 'antd';
import QRCode from 'qrcode.react';

export default function DemoActions (props: any) {
  // const [copy, setCopy] = useState('Copy');

  return (
    <div className="code-box-actions code-box-actions-demo">
      <div className="code-box-action code-box-qrcode">
        <Tooltip title={<QRCode value={props.url} />} color="#fff" placement="bottom">
          <QrcodeOutlined />
        </Tooltip>
      </div>
      <div className="code-box-action">
        <Tooltip title="在浏览器中打开">
          <a href={props.url} target="_blank"><ChromeOutlined /></a>
        </Tooltip>
      </div>
    </div>
  );
}
