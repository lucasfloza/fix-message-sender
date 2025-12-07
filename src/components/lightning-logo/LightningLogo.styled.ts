import styled, { css, keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const logoPop = keyframes`
  0% { transform: scale(0.6) rotate(-8deg); opacity: 0; }
  60% { transform: scale(1.08) rotate(3deg); opacity: 1; }
  100% { transform: scale(1) rotate(0deg); opacity: 1; }
`;

const stormDrift = keyframes`
  from { transform: rotate(0deg) scale(1); }
  to { transform: rotate(360deg) scale(1.05); }
`;

const arcSpin = keyframes`
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg); }
`;

const arcCrackle = keyframes`
  0% { opacity: 0.2; filter: drop-shadow(0 0 3px rgba(59, 130, 246, 0)); }
  50% { opacity: 0.8; filter: drop-shadow(0 0 12px rgba(191, 219, 254, 0.6)); }
  100% { opacity: 0.25; filter: drop-shadow(0 0 4px rgba(59, 130, 246, 0.2)); }
`;

const sparkFall = keyframes`
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) rotate(var(--spark-angle)) translateY(0) scale(0.4);
  }
  20% { opacity: 1; }
  80% { opacity: 0.2; }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) rotate(var(--spark-angle)) translateY(-80px) scale(0.8);
  }
`;

const flashBurst = keyframes`
  0%, 60% { opacity: 0; }
  62% { opacity: 0.85; }
  68% { opacity: 0.15; }
  70% { opacity: 0.65; }
  100% { opacity: 0; }
`;

const glowPulse = keyframes`
  0% { transform: scale(0.75); opacity: 0.5; }
  45% { transform: scale(1.1); opacity: 0.9; }
  100% { transform: scale(0.85); opacity: 0.45; }
`;

const boltFlicker = keyframes`
  0% { filter: drop-shadow(0 0 12px rgba(255, 255, 255, 0.4)); }
  35% { filter: drop-shadow(0 0 28px rgba(251, 191, 36, 0.9)); }
  55% { filter: drop-shadow(0 0 18px rgba(251, 191, 36, 0.6)); }
  65% { filter: drop-shadow(0 0 32px rgba(252, 211, 77, 0.85)); }
  100% { filter: drop-shadow(0 0 14px rgba(255, 255, 255, 0.4)); }
`;

const outlineDash = keyframes`
  0% { stroke-dashoffset: 12; opacity: 0.3; }
  60% { stroke-dashoffset: 0; opacity: 0.9; }
  100% { stroke-dashoffset: 12; opacity: 0.4; }
`;

type ContainerProps = {
  $isHovered: boolean;
  $isPressed: boolean;
  $isCharged: boolean;
};

export const Container = styled(motion.div)<ContainerProps>`
  --intensity: 0.35;
  --glow-scale: 1;
  --glow-opacity: 0.6;
  --flash-strength: 0.6;
  --spark-speed: 2.6s;
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #0f172a, #010314 65%);
  overflow: hidden;
  box-shadow:
    0 25px 55px rgba(2, 6, 23, 0.6),
    0 0 35px rgba(14, 165, 233, calc(0.15 + var(--intensity) * 0.25));
  animation: ${logoPop} 700ms cubic-bezier(0.23, 1, 0.32, 1);
  transform-style: preserve-3d;
  transition:
    box-shadow 300ms ease,
    filter 300ms ease;
  will-change: transform, filter;

  ${({ $isHovered }) =>
    $isHovered &&
    css`
      box-shadow:
        0 35px 65px rgba(2, 6, 23, 0.55),
        0 0 45px rgba(59, 130, 246, 0.35),
        0 0 80px rgba(251, 191, 36, 0.25);
    `}

  ${({ $isCharged }) =>
    $isCharged &&
    css`
      box-shadow:
        0 45px 95px rgba(8, 47, 73, 0.65),
        0 0 80px rgba(248, 250, 252, 0.25),
        0 0 120px rgba(251, 191, 36, 0.35);
    `}

  ${({ $isPressed }) =>
    $isPressed &&
    css`
      filter: brightness(1.1) saturate(1.05);
    `}

  &::after {
    content: '';
    position: absolute;
    inset: 12%;
    border-radius: 50%;
    border: 1px solid rgba(59, 130, 246, 0.15);
    pointer-events: none;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transition: none;
    box-shadow:
      0 25px 55px rgba(2, 6, 23, 0.4),
      0 0 25px rgba(14, 165, 233, 0.2);

    & * {
      animation: none !important;
      transition: none !important;
    }
  }
`;

export const Storm = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(14, 165, 233, 0.12),
    transparent 60%
  );
  mix-blend-mode: screen;
  animation: ${stormDrift} 16s linear infinite;
  filter: blur(1px);
`;

type ArcProps = {
  $size?: 'default' | 'mid' | 'small';
  $duration?: string;
  $delay?: string;
  $borderColor?: string;
};

export const Arc = styled.span<ArcProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: ${({ $size }) =>
    $size === 'mid' ? '80%' : $size === 'small' ? '60%' : '110%'};
  height: ${({ $size }) =>
    $size === 'mid' ? '80%' : $size === 'small' ? '60%' : '110%'};
  border-radius: 50%;
  border: 1px solid
    ${({ $borderColor }) => $borderColor ?? 'rgba(190, 227, 248, 0.25)'};
  transform: translate(-50%, -50%);
  mix-blend-mode: screen;
  animation:
    ${arcSpin} ${({ $duration }) => $duration ?? '12s'} linear infinite,
    ${arcCrackle} ${({ $delay }) => $delay ?? '2.8s'} ease-in-out infinite;
`;

export const Sparks = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  pointer-events: none;
`;

type SparkProps = {
  $angle: string;
  $delay?: string;
};

export const Spark = styled.span<SparkProps>`
  --spark-angle: ${({ $angle }) => $angle};
  position: absolute;
  top: 50%;
  left: 50%;
  width: 4px;
  height: 22px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.9),
    rgba(251, 191, 36, 0)
  );
  border-radius: 999px;
  transform-origin: center top;
  filter: drop-shadow(0 0 6px rgba(248, 250, 252, 0.5));
  mix-blend-mode: screen;
  animation: ${sparkFall} var(--spark-speed, 2.6s) ease-out infinite;
  animation-delay: ${({ $delay }) => $delay ?? '0s'};
`;

export const Flash = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.85),
    rgba(255, 255, 255, 0) 55%
  );
  mix-blend-mode: screen;
  opacity: calc(var(--flash-strength, 0.6) * 0.8);
  animation: ${flashBurst} 4.2s steps(2, end) infinite;
`;

export const Glow = styled.div`
  position: absolute;
  inset: 0;
  width: 170px;
  height: 170px;
  margin: auto;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(251, 191, 36, 0.5),
    rgba(249, 115, 22, 0)
  );
  filter: blur(12px);
  animation: ${glowPulse} 3s ease-in-out infinite;
  opacity: var(--glow-opacity, 0.6);
  transform: scale(var(--glow-scale, 1));
`;

export const Icon = styled.svg`
  width: 90%;
  height: 90%;
  z-index: 2;
`;

export const Bolt = styled(motion.path)`
  animation: ${boltFlicker} 2.8s ease-in-out infinite;
`;

export const BoltOutline = styled.path`
  animation:
    ${boltFlicker} 2.8s ease-in-out infinite,
    ${outlineDash} 2.8s ease-in-out infinite;
  stroke-dasharray: 12;
  stroke-dashoffset: 12;
`;

export const Shockwave = styled(motion.span)`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.35);
  mix-blend-mode: screen;
  pointer-events: none;
`;

export const Cursor = styled(motion.span)`
  position: absolute;
  width: 60px;
  height: 60px;
  margin-left: -30px;
  margin-top: -30px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.35),
    transparent 60%
  );
  filter: blur(4px);
  pointer-events: none;
`;
