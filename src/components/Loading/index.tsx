import React from 'react';
import { useIntl } from 'react-intl';
import { Spin } from '../../ui/Spin';

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
      <Spin>{useIntl().formatMessage({ id: 'app.content.loading' })}</Spin>
    </div>
  );
};
export default LoadingIcon;
