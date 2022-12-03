import { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { Button } from '../../ui/Button';
import { styled } from '../../ui/design-system';
import { Flex } from '../../ui/Flex';
import { AppContext } from '../contextProvider';
import PBRHelmet from './PBRHelmet';
import Spine from './Spine';

const StyledFeature = styled(Flex, {
  maxWidth: "400px",
  margin: "0 $10",
  "& h2": {
    color: "$slate12",
    fontSize: "2rem"
  },
  "& p": {
    color: "$slate11",
    fontSize: "$2",
    lineHeight: 1.8
  }
});

export default function Features() {
  const { lang } = useContext(AppContext);
  return (
    <Flex align="both" gap="lg" css={{borderTop: "1px solid $slate5", padding: "$8 0"}}>
      <StyledFeature dir="column" gap="md" align="v">
        <PBRHelmet />
        <h2>3D</h2>
        <p>
          <FormattedMessage id='app.home.3d.intro' />
        </p>
        <Link to={`/docs/latest/${lang}/mesh-renderer`}>
          <Button variant='outline'>
            <FormattedMessage id='app.home.more' />
          </Button>
        </Link>
      </StyledFeature>
      <StyledFeature dir="column" gap="lg" align="v">
        <Spine />
        <h2>2D</h2>
        <p>
          <FormattedMessage id='app.home.2d.intro' />
        </p>
        <Link to={`/docs/latest/${lang}/mesh-renderer`}>
          <Button variant='outline'>
            <FormattedMessage id='app.home.more' />
          </Button>
        </Link>
      </StyledFeature>
    </Flex>
  );
}
