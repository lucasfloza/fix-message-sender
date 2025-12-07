import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled.div`
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  padding: 1.25rem 1.5rem;
  background: #f8fafc;
  margin-bottom: 1.5rem;
  box-shadow: 0 12px 30px -25px rgba(15, 23, 42, 0.25);
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

export const HeaderLeft = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
`;

export const Title = styled.h3`
  margin: 0;
  font-size: 1.05rem;
  color: #0f172a;
  font-weight: 700;
`;

export const Counter = styled.span`
  color: #64748b;
  font-size: 0.9rem;
`;

export const HeaderActions = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
`;

export const Toggle = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: transparent;
  border: 1px solid #cbd5e1;
  border-radius: 999px;
  padding: 0.35rem 0.8rem;
  font-weight: 600;
  color: #0f172a;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    background: #e2e8f0;
    border-color: #94a3b8;
    transform: translateY(-1px);
  }
`;

type ChevronProps = {
  $open: boolean;
};

export const Chevron = styled.span<ChevronProps>`
  display: inline-block;
  width: 8px;
  height: 8px;
  border: solid #0f172a;
  border-width: 0 2px 2px 0;
  transform: rotate(${({ $open }: ChevronProps) => ($open ? 45 : -135)}deg);
  transition: transform 0.2s ease;
`;

export const Panel = styled(motion.div)`
  overflow: hidden;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1rem;
`;

export const Item = styled.div`
  padding: 0.85rem 1rem;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 0.9rem;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.5rem 1rem;
  align-items: center;
`;

export const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #475569;
  font-size: 0.9rem;
`;

export const Dot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #22c55e;
  display: inline-block;
`;

export const Timestamp = styled.span`
  color: #94a3b8;
  font-size: 0.85rem;
`;

export const Preview = styled.div`
  grid-column: 1 / span 1;
  color: #0f172a;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.95rem;
  line-height: 1.5;
  word-break: break-all;
`;

export const Actions = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  justify-self: end;
`;

type ActionButtonProps = {
  $variant?: 'ghost' | 'solid';
};

export const ActionButton = styled.button<ActionButtonProps>`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.45rem 0.75rem;
  border-radius: 10px;
  border: 1px solid
    ${({ $variant }: ActionButtonProps) =>
      $variant === 'ghost' ? '#cbd5e1' : '#0ea5e9'};
  background: ${({ $variant }: ActionButtonProps) =>
    $variant === 'ghost' ? '#ffffff' : '#0ea5e9'};
  color: ${({ $variant }: ActionButtonProps) =>
    $variant === 'ghost' ? '#0f172a' : '#ffffff'};
  font-weight: 600;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 25px -18px rgba(15, 23, 42, 0.5);
    border-color: ${({ $variant }: ActionButtonProps) =>
      $variant === 'ghost' ? '#94a3b8' : '#0284c7'};
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const Empty = styled.div`
  margin-top: 1rem;
  padding: 0.85rem 1rem;
  border: 1px dashed #cbd5e1;
  border-radius: 0.85rem;
  color: #94a3b8;
  background: #ffffff;
  font-size: 0.95rem;
`;
