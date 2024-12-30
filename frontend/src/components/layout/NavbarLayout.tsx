import { useAuth0 } from '@auth0/auth0-react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { LoginButton, LogoutButton } from '../auth/AuthButtons';
import { useAuthContext } from '../auth/AuthContext'; 

function NavbarLayout() {

  const location = useLocation();
  const { user, isAuthenticated } = useAuth0();
  const { userInfo } = useAuthContext(); 

  const routes = [ 
    { path: "/", name: "Home" },
    ...(isAuthenticated && userInfo && userInfo.rol === "Admin" ? [
      { path: "/organizaciones", name: "Organizaciones" },
      { path: "/proyectos", name: "Proyectos" },
      { path: "/usuarios", name: "Usuarios" }
    ] : (
      isAuthenticated && userInfo && userInfo.user.organizacionId ? [
        { path: `/organizaciones/${userInfo.user.organizacionId}/proyectos`, name: "Proyectos" }
      ] : []
    ))
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
          <Nav className="ms-auto d-flex align-items-center">
            { user !== undefined && isAuthenticated && (
              <>
                <span className="text-light mx-2">{user?.name}</span>
                <LogoutButton></LogoutButton> 
              </> )}
          </Nav>
          { !isAuthenticated && (
            <LoginButton></LoginButton>
          )}
      </Container>
    </Navbar>
  );
};

export default NavbarLayout;