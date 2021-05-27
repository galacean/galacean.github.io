import React from 'react';

export default function Cases () {
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
    <section className="home-section home-section-cases">
      <h2>案例</h2>
      <div className="home-section-inner">
        {videos.map(({src, poster}) => {
          return <div className='home-flex home-flex-case' key={src}>
            <video width="250" height="540" playsInline autoPlay muted loop poster={poster}><source src={src} type="video/mp4"/></video>
          </div>
        })}
      </div>
    </section>
  );
}