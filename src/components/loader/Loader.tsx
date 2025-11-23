import React from 'react';
import './Loader.css';

interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  fullScreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({
  size = 'medium',
  fullScreen = false,
}) => {
  if (fullScreen) {
    return (
      <div className="loader-fullscreen">
        <div className={`spinner spinner-${size}`}></div>
      </div>
    );
  }

  return <div className={`spinner spinner-${size}`}></div>;
};

export default Loader;
