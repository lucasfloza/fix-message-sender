import React from 'react';
import type { ButtonProps } from '../../types/components/button';
import * as S from './Button.styled';

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled,
  className = '',
  ...props
}) => {
  return (
    <S.Button
      className={className}
      disabled={disabled || loading}
      $variant={variant}
      $size={size}
      $loading={loading}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </S.Button>
  );
};

export default Button;
