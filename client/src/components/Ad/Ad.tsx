import React from 'react';

import './Ad.css';

var atOptions;

const Ad: React.FC = () => {
  atOptions = {
    key: 'c9b14b6db2d52d40cc7593e19ef20efc',
    format: 'iframe',
    height: 50,
    width: 320,
    params: {}
  };
  {
    document.write(
      '<scr' +
        'ipt type="text/javascript" src="http' +
        (window.location.protocol === 'https:' ? 's' : '') +
        '://www.madcpms.com/c9b14b6db2d52d40cc7593e19ef20efc/invoke.js"></scr' +
        'ipt>'
    );
  }
  return <div className="Ad"></div>;
};

export default Ad;
