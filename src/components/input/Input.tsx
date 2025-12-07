import React from 'react';
import type { InputProps } from '../../types/components/input';
import * as S from './Input.styled';

const Input: React.FC<InputProps> = ({
  label,
  error,
  className = '',
  ...props
}) => {
  return (
    <S.Wrapper>
      {label && <S.Label>{label}</S.Label>}
      <S.Field className={className} $hasError={Boolean(error)} {...props} />
      {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
    </S.Wrapper>
  );
};

export default Input;
