import React from 'react';
import { Space, Spin } from 'antd';
import { useIntl } from 'react-intl';

const LoadingIcon: React.FC = (props) => {
  return (
    <div
      style={{
        width: '100%',
        height: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Spin size='large' tip={useIntl().formatMessage({ id: 'app.content.loading' })} />
    </div>
  );
};
export default LoadingIcon;
