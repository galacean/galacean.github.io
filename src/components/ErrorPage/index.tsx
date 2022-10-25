import { Button, Result } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();
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
      <Result
        status='404'
        title='404'
        subTitle={useIntl().formatMessage({ id: 'app.content.error.subtitle' })}
        extra={
          <Button
            type='primary'
            onClick={() => {
              navigate('/');
            }}
          >
            {useIntl().formatMessage({ id: 'app.content.error.button' })}
          </Button>
        }
      />
    </div>
  );
};

export default ErrorPage;
