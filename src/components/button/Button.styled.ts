import styled, { css } from 'styled-components';
import type { ButtonSize, ButtonVariant } from '../../types/components/button';

type StyledButtonProps = {
  $variant: ButtonVariant;
  $size: ButtonSize;
  $loading?: boolean;
};

const variantStyles: Record<ButtonVariant, ReturnType<typeof css>> = {
  primary: css`
    background-color: #3b82f6;
    color: #ffffff;

    &:hover:not(:disabled) {
      background-color: #2563eb;
    }
  `,
  secondary: css`
    background-color: #6b7280;
    color: #ffffff;

    &:hover:not(:disabled) {
      background-color: #4b5563;
    }
  `,
  danger: css`
    background-color: #ef4444;
    color: #ffffff;

    &:hover:not(:disabled) {
      background-color: #dc2626;
    }
  `,
};

const sizeStyles: Record<ButtonSize, ReturnType<typeof css>> = {
  small: css`
    padding: 0.25rem 0.75rem;
    font-size: 0.875rem;
  `,
  medium: css`
    padding: 0.5rem 1rem;
    font-size: 1rem;
  `,
  large: css`
    padding: 0.75rem 1.5rem;
    font-size: 1.125rem;
  `,
};

export const Button = styled.button<StyledButtonProps>`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  outline: none;
  opacity: ${({ disabled, $loading }) => (disabled || $loading ? 0.6 : 1)};
  cursor: ${({ disabled, $loading }) =>
    disabled || $loading ? 'not-allowed' : 'pointer'};

  ${({ $variant }) => variantStyles[$variant]};
  ${({ $size }) => sizeStyles[$size]};
`;
