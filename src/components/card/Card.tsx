import React from 'react';
import type { CardProps } from '../../types/components/card';
import * as S from './Card.styled';

const Card: React.FC<CardProps> = ({ children, title, className = '' }) => {
  return (
    <S.Card className={className}>
      {title && <S.CardHeader>{title}</S.CardHeader>}
      <S.CardBody>{children}</S.CardBody>
    </S.Card>
  );
};

export default Card;
