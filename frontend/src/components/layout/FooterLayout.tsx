import { Container, Row, Col } from 'react-bootstrap';

const footerStyle = {
    position: 'relative' as const,
    bottom: 0,
    width: '100%',
    backgroundColor: 'dark',
    color: 'white',
    marginTop: '5rem',
    padding: '1rem 0',
    textAlign: 'center' as const,
  };
  
function FooterLayout() {
  return (
    <footer className="bg-dark text-white mt-5 p-4 text-center" style={footerStyle}>
      <Container>
        <Row>
          <Col>&copy; 2024 Floorplan Management System. Todos los derechos reservados.</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default FooterLayout;
