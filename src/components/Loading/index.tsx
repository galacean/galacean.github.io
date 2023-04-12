import { Spin } from '@galacean/editor-ui';
import React from 'react';

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
      <Spin size="lg" />
    </div>
  );
};
export default LoadingIcon;
