import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="spinner">
      <span></span>
      <span></span>
      <span></span>
      <style jsx>{`
        .spinner {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 50vh;
        }

        .spinner span {
          display: inline-block;
          height: 4px;
          width: 0px;
          border-radius: 50%;
          border: 3px solid var(--primary);
          animation: spinning 0.6s linear infinite;
          transform-origin: center;
        }

        .spinner span:nth-child(1) {
          animation-delay: 0;
        }

        .spinner span:nth-child(2) {
          animation-delay: 0.05s;
          margin-left: 10px;
          margin-right: 10px;
        }

        .spinner span:nth-child(3) {
          animation-delay: 0.1s;
        }

        @keyframes spinning {
          0% {
            transform: rotate(0deg) translateY(0px);
          }
          25% {
            transform: rotate(90deg) translateY(2px);
          }
          50% {
            transform: rotate(180deg) translateY(4px);
          }
          75% {
            transform: rotate(270deg) translateY(2px);
          }
          100% {
            transform: rotate(360deg) translateY(0px);
          }
        }
      `}</style>
    </div>
  );
};

export default Spinner;
