import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

function NavbarLayout() {

  const location = useLocation();

  const routes = [
      {path:"/", name:"Home"},
      {path:"/organizaciones", name:"Organizaciones"},
  ];

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to={"/"}>Floorplan Management System </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {routes.map((route) => (
            <Nav.Link as={Link} to={route.path} key={route.path} className={`text-light mx-2 ${location.pathname === route.path ? 'active bg-white text-dark' : ''}`}>
              {route.name}
            </Nav.Link>
          ))}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarLayout;