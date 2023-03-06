import React from 'react';
import { FormattedMessage } from 'react-intl';
import { styled } from  "@oasis-engine/editor-design-system";
import { Flex } from '@oasis-engine/editor-components';

const StyledPartnerContainer = styled(Flex, {
  padding: "$10 0",
  borderTop: "1px solid $slate5",
  "& h2": {
    color: "$slate12",
    fontSize: "3rem",
    textAlign: "center"
  },
});

const StyledPartners = styled("div", {
  display: "grid",
  columnGap: "$2",
  gridAutoFlow: "column",
  gridTemplateRows: "repeat(2, 1fr)",
  '@media (max-width: 768px)': {
    gridTemplateRows: "repeat(8, 1fr)",
  }
});

const StyledPartner = styled(Flex, {
  width: "8rem",
  height: "4rem",
  backgroundColor: "$white",
  borderRadius: "$1",
  marginTop: "$2"
});

export default function Partners() {
  const partners = [
    {
      logo: 'https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*cQdHQYgR6LcAAAAAAAAAAAAAARQnAQ',
      width: 70
    },
    {
      logo: 'https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*N1xwQ48lSOAAAAAAAAAAAAAAARQnAQ',
      width: 70
    },
    {
      logo: 'https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*mHrjQYHiaCMAAAAAAAAAAAAAARQnAQ',
      width: 70
    },
    {
      logo: 'https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*auuzSpvpRCIAAAAAAAAAAAAAARQnAQ',
      width: 100
    },
    {
      logo: 'https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*jNFlSaUPVnkAAAAAAAAAAAAAARQnAQ',
      width: 100
    },
    {
      logo: 'https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*UThWSrJLu2AAAAAAAAAAAAAAARQnAQ',
      width: 90
    },
    {
      logo: 'https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*5gDeQp42ZI8AAAAAAAAAAAAAARQnAQ',
      width: 120
    },
    {
      logo: 'https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*0xfCSrjH0D8AAAAAAAAAAAAAARQnAQ',
      width: 100
    },
    {
      logo: 'https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*jpHSQ7R81S8AAAAAAAAAAAAAARQnAQ',
      width: 60
    },
    {
      logo: 'https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*A0MaTbw5gXwAAAAAAAAAAAAAARQnAQ',
      width: 70
    },
    {
      logo: 'https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*6mvLTasKph4AAAAAAAAAAAAAARQnAQ',
      width: 70
    },
    {
      logo: 'https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*KR0dSII_IwUAAAAAAAAAAAAAARQnAQ',
      width: 80
    },
    {
      logo: 'https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*MoQzQKsBd-kAAAAAAAAAAAAAARQnAQ',
      width: 100
    },
    {
      logo: 'https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*c-BbTpN-564AAAAAAAAAAAAAARQnAQ',
      width: 100
    },
    {
      logo: 'https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*50n0TK8BL1YAAAAAAAAAAAAAARQnAQ',
      width: 130
    },
    {
      logo: 'https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*SlVpSLS239IAAAAAAAAAAAAAARQnAQ',
      width: 70
    },
  ];

  return (
    <StyledPartnerContainer dir="column" align="both">
      <h2>
        <FormattedMessage id="app.home.partners" />
      </h2>
      <StyledPartners>
        {partners.map((partner) => {
          return <StyledPartner key={partner.logo} align="both">
            <img src={partner.logo} width={partner.width} />
          </StyledPartner>
        })}
      </StyledPartners>
    </StyledPartnerContainer>
  );
}