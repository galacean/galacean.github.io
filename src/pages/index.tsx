import React from 'react';
import { useEffect } from 'react';
import Media from 'react-media';
// @ts-ignore
import Home from '../components/home';
import type { LayoutProps } from '../components/layout';
import WrapperLayout from '../components/layout';

const IndexPage: React.FC<LayoutProps> = (props) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = "text/javascript";
    document.body.appendChild(script);
    script.text = `
      (function(h,o,t,j,a,r){
          h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
          h._hjSettings={hjid:2329383,hjsv:6};
          a=o.getElementsByTagName('head')[0];
          r=o.createElement('script');r.async=1;
          r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
          a.appendChild(r);
      })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
    `
  });

  return (
    <WrapperLayout {...props}>
      <Media query="(max-width: 599px)">
        {(isMobile) => <Home {...props} isMobile={isMobile} />}
      </Media>
    </WrapperLayout>
  );
};

export default IndexPage;
