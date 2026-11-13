import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { api, useAuth } from './api';

function NavBar() {
  const { admin, setAdmin } = useAuth();
  const logout = () => api('/logout', 'POST').then(() => setAdmin(false));

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">Rupak Stephen</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/about">About Me</Nav.Link>
            <Nav.Link as={Link} to="/review">Reviews</Nav.Link>
            <Nav.Link as={Link} to="/blog">Blog</Nav.Link>
          </Nav>
          <Nav>
            {admin ? <Nav.Link onClick={logout}>Log out</Nav.Link> : <Nav.Link as={Link} to="/login">Login</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
