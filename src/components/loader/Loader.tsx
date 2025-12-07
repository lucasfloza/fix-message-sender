import React from 'react';
import type { LoaderProps } from '../../types/components/loader';
import * as S from './Loader.styled';

const Loader: React.FC<LoaderProps> = ({
  size = 'medium',
  fullScreen = false,
}) => {
  if (fullScreen) {
    return (
      <S.Fullscreen>
        <S.Spinner $size={size} />
      </S.Fullscreen>
    );
  }

  return <S.Spinner $size={size} />;
};

export default Loader;
