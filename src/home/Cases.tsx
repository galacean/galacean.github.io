import { Flex, styled } from "@galacean/editor-ui";
import { FormattedMessage } from 'react-intl';

const StyledCases = styled("div", {
  padding: "$8 0",
  "& h2": {
    color: "$slate12",
    textAlign: "center",
    padding: "0 0 $8",
    fontSize: "2rem"
  }
});

const StyledCase = styled("div", {
});

const StyledVideo = styled("video", {
  borderRadius: "$3"
})

const StyledCaseName = styled("div", {
  textAlign: "center",
  marginBottom: "$4",
  fontWeight: 300
});

export default function Cases() {
  const videos = [
    {
      name: "app.home.case.starball",
      src: 'https://gw.alipayobjects.com/mdn/rms_d27172/afts/file/A*RyNURrY3jjwAAAAAAAAAAAAAARQnAQ',
      poster: 'https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*wzMFR5Bygu8AAAAAAAAAAAAAARQnAQ'
    },
    {
      name: "app.home.case.ringtoss",
      src: 'https://gw.alipayobjects.com/v/huamei_2uqjce/afts/video/HeRcSILaik8AAAAAAAAAAAAAK4eUAQBr',
      poster: 'https://mdn.alipayobjects.com/huamei_2uqjce/afts/img/A*0tt0QZEmwC4AAAAAAAAAAAAADsF_AQ/fmt.webp'
    },
    {
      name: "app.home.case.assets",
      src: 'https://gw.alipayobjects.com/v/huamei_2uqjce/afts/video/P6G9RLKp-SwAAAAAAAAAAAAAK4eUAQBr',
      poster: 'https://mdn.alipayobjects.com/huamei_2uqjce/afts/img/A*OEjuS5nghp8AAAAAAAAAAAAADsF_AQ/fmt.webp'
    },
    {
      name: "app.home.case.avatar",
      src: 'https://gw.alipayobjects.com/v/huamei_2uqjce/afts/video/OWZiT6bIW60AAAAAAAAAAAAAK4eUAQBr',
      poster: 'https://mdn.alipayobjects.com/huamei_2uqjce/afts/img/A*4FWCQK-V7dMAAAAAAAAAAAAADsF_AQ/fmt.webp'
    }
  ];

  return (
    <StyledCases>
      <h2>
        <FormattedMessage id="app.home.cases" />
      </h2>
      <Flex align="both" gap="lg">
        {videos.map(({ name, src, poster }) => {
          return <StyledCase key={src}>
            <StyledCaseName>
              <FormattedMessage id={name} />
            </StyledCaseName>
            <StyledVideo width="250" height="540" playsInline autoPlay muted loop poster={poster}>
              <source src={src} type="video/mp4" />
            </StyledVideo>
          </StyledCase>
          })
        }
      </Flex>
    </StyledCases>
  );
}