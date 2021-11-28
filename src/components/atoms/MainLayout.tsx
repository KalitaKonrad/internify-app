import React from 'react';
import Footer from '@components/atoms/Footer';
import { Header } from '@components/atoms/Header';

export const MainLayout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
