import React from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { Button } from '@oasis-engine/editor-components';
import { Flex } from '@oasis-engine/editor-components';

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Flex align="both" dir="column" gap="lg" css={{height: "60vh"}}>
      <h1>404</h1>
      <Button
        onClick={() => {
          navigate('/');
        }}
      >
        {useIntl().formatMessage({ id: 'app.content.error.button' })}
      </Button>
    </Flex>
  );
};

export default ErrorPage;
