import React from 'react';

import './Footer.css';

const Footer: React.FC = () => {
  const d = new Date();
  return (
    <footer className="text-white bg-dark text-center">
      OneRandomSample {d.getFullYear()} &copy;
      <br />
      Created by <span>Michal Stachnik</span>
    </footer>
  );
};

export default Footer;
