import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

type SpinnerProps = {
  $size: 'small' | 'medium' | 'large';
};

const sizeMap = {
  small: { size: '1rem', borderWidth: '2px' },
  medium: { size: '2rem', borderWidth: '3px' },
  large: { size: '3rem', borderWidth: '4px' },
};

export const Spinner = styled.div<SpinnerProps>`
  border: ${({ $size }) => sizeMap[$size].borderWidth} solid #f3f4f6;
  border-top: ${({ $size }) => sizeMap[$size].borderWidth} solid #3b82f6;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  width: ${({ $size }) => sizeMap[$size].size};
  height: ${({ $size }) => sizeMap[$size].size};
`;

export const Fullscreen = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 9999;
`;
