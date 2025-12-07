import React from 'react';
import Header from '../header/Header';
import type { LayoutProps } from '../../types/components/layout';
import * as S from './Layout.styled';

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <S.Layout>
      <Header />
      <S.MainContent>{children}</S.MainContent>
      <S.Footer>
        <S.FooterText>
          &copy; 2025 FIX Message Sender. All rights reserved.
        </S.FooterText>
      </S.Footer>
    </S.Layout>
  );
};

export default Layout;
