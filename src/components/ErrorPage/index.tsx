import React from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../ui/Button';

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
      <Button
        variant='primary'
        onClick={() => {
          navigate('/');
        }}
      >
        {useIntl().formatMessage({ id: 'app.content.error.button' })}
      </Button>
      />
    </div>
  );
};

export default ErrorPage;
