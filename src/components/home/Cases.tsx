import React from 'react';
import { FormattedMessage } from 'react-intl';
import { styled } from  "@oasis-engine/editor-design-system";
import { Flex } from '@oasis-engine/editor-components';

const StyledCases = styled("div", {
  borderTop: "1px solid $slate5",
  padding: "$8 0",
  "& h2": {
    color: "$slate12",
    textAlign: "center",
    padding: "0 0 $4",
    fontSize: "3rem"
  }
});

export default function Cases() {
  const videos = [
    {
      src: 'https://gw.alipayobjects.com/mdn/rms_d27172/afts/file/A*RyNURrY3jjwAAAAAAAAAAAAAARQnAQ',
      poster: 'https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*wzMFR5Bygu8AAAAAAAAAAAAAARQnAQ'
    },
    {
      src: 'https://gw.alipayobjects.com/mdn/rms_d27172/afts/file/A*BwqJTbbwGRMAAAAAAAAAAAAAARQnAQ',
      poster: 'https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*8zf6QqRj9PIAAAAAAAAAAAAAARQnAQ'
    },
    {
      src: 'https://gw.alipayobjects.com/mdn/rms_d27172/afts/file/A*4l7XRaS4U3gAAAAAAAAAAAAAARQnAQ',
      poster: 'https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*2CDDSqezN7sAAAAAAAAAAAAAARQnAQ'
    },
    {
      src: 'https://gw.alipayobjects.com/mdn/rms_d27172/afts/file/A*DH2SRbnkUU0AAAAAAAAAAAAAARQnAQ',
      poster: 'https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*PjWRQb5PF2oAAAAAAAAAAAAAARQnAQ'
    }
  ];

  return (
    <StyledCases>
      <h2>
        <FormattedMessage id="app.home.cases" />
      </h2>
      <Flex align="both" gap="lg">
        {videos.map(({ src, poster }) => {
          return <video key={src} width="250" height="540" playsInline autoPlay muted loop poster={poster}><source src={src} type="video/mp4" /></video>
        })}
      </Flex>
    </StyledCases>
  );
}