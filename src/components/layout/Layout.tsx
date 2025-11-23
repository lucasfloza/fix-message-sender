import React from 'react';
import Header from '../header/Header';
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
        <p>&copy; 2025 FIX Message Sender. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
