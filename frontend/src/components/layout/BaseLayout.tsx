import React, { ReactNode } from 'react';
import NavbarLayout from './NavbarLayout';
import FooterLayout from './FooterLayout';
import { Container } from 'react-bootstrap';

interface BaseLayoutProps {
  children: ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarLayout />
      <Container as="main" className="d-flex flex-grow-1 justify-content-center">
        {children}
      </Container>
      <FooterLayout />
    </div>
  );
};

export default BaseLayout;