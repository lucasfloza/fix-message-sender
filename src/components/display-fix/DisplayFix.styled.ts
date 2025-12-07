import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled.div`
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  padding: 1.5rem;
  background: #ffffff;
  margin-bottom: 2rem;
  box-shadow: 0 15px 35px -25px rgba(15, 23, 42, 0.35);
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const Title = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: #0f172a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const Counter = styled.span`
  font-size: 0.85rem;
  color: #94a3b8;
`;

export const CopyButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  background: #38bdf8;
  color: #0c1321;
  font-weight: 600;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 12px 30px -20px rgba(56, 189, 248, 0.9);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const Content = styled.div`
  min-height: 72px;
  border-radius: 0.85rem;
  border: 1px dashed #cbd5f5;
  padding: 0.75rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  background: #f8fafc;
`;

export const Empty = styled(motion.p)`
  color: #94a3b8;
  font-style: italic;
`;

type TagProps = {
  $isEmpty?: boolean;
};

export const Tag = styled.div<TagProps>`
  display: inline-flex;
  align-items: center;
  border-radius: 0.65rem;
  padding: 0.4rem 0.65rem;
  background: ${({ $isEmpty }: TagProps) => ($isEmpty ? '#fee2e2' : '#e0f2fe')};
  color: #0f172a;
  border: 1px solid transparent;
  position: relative;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease;

  ${({ $isEmpty }: TagProps) =>
    $isEmpty &&
    css`
      border-color: #f87171;
    `}

  &:hover {
    transform: translateY(-1px);
    border-color: #38bdf8;
  }
`;

export const TagKey = styled.span`
  font-weight: 600;
  margin-right: 0.25rem;
`;

export const TagEq = styled.span`
  margin-right: 0.25rem;
  color: #94a3b8;
`;

type TagValueProps = {
  $isEmpty?: boolean;
};

export const TagValue = styled.span<TagValueProps>`
  min-width: 0.5rem;
  outline: none;
  border-bottom: 1px dashed transparent;
  cursor: text;

  &:hover,
  &:focus {
    border-bottom-color: #0ea5e9;
  }

  ${({ $isEmpty }: TagValueProps) =>
    $isEmpty &&
    css`
      color: #b91c1c;
    `}
`;

export const Remove = styled.button`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: none;
  background: #f43f5e;
  color: #ffffff;
  cursor: pointer;
  font-size: 0.6rem;
  line-height: 1;
  margin-left: 0.4rem;
  opacity: 0;
  transform: scale(0.8);
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
`;

export const PreviewText = styled.p`
  margin-top: 0.75rem;
  font-size: 0.9rem;
  color: #64748b;
  line-height: 1.4;
`;

export const TagWrapper = styled(motion.div)`
  display: inline-flex;
  align-items: center;

  &:hover ${Remove} {
    opacity: 1;
    transform: scale(1);
  }
`;
