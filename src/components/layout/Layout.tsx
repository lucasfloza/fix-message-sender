import React from 'react';
import Header from './Header';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main className="main-content">{children}</main>
      <footer className="footer">
        <p>&copy; 2024 FIX Message Sender. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
