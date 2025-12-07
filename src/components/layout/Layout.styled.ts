import styled from 'styled-components';

export const Layout = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const MainContent = styled.main`
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
`;

export const Footer = styled.footer`
  background-color: #1f2937;
  color: #d1d5db;
  text-align: center;
  padding: 2rem;
  margin-top: auto;
`;

export const FooterText = styled.p`
  margin: 0;
`;
