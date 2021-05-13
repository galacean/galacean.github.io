import React from 'react';

export default function Case (props) {
  const { isMobile, location } = props;
  const videos = [
    'https://gw.alipayobjects.com/mdn/rms_d27172/afts/file/A*RyNURrY3jjwAAAAAAAAAAAAAARQnAQ',
    'https://gw.alipayobjects.com/mdn/rms_d27172/afts/file/A*BwqJTbbwGRMAAAAAAAAAAAAAARQnAQ',
    'https://gw.alipayobjects.com/mdn/rms_d27172/afts/file/A*4l7XRaS4U3gAAAAAAAAAAAAAARQnAQ',
    'https://gw.alipayobjects.com/mdn/rms_d27172/afts/file/A*DH2SRbnkUU0AAAAAAAAAAAAAARQnAQ'
  ];
  return (
    <section className="home-section home-section-cases">
      <h2>案例</h2>
      <div className="home-section-inner">
        {videos.map((src) => {
          return <div className='home-flex home-flex-case' key={src}>
            <video width="250" autoPlay muted loop><source src={src} type="video/mp4"/></video>
          </div>
        })}
      </div>
    </section>
  );
}