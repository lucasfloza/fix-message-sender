import React from 'react';
import * as S from './Header.styled';

const Header: React.FC = () => {
  return (
    <S.Header>
      <S.HeaderContainer>
        <S.HeaderLogo to="/">FIX Message Sender</S.HeaderLogo>
        <S.HeaderNav>
          <S.NavLink to="/">Home</S.NavLink>
          <S.NavLink to="/messages">Messages</S.NavLink>
          <S.NavLink to="/build">Build FIX</S.NavLink>
          <S.NavLink to="/about">About</S.NavLink>
        </S.HeaderNav>
      </S.HeaderContainer>
    </S.Header>
  );
};

export default Header;
