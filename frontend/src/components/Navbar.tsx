import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const { logout, isAuthenticated, currentUser } = useAuth();
  let navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  return (
    <Navbar expand="md" bg="primary" data-bs-theme="dark" className="">
      <Container>
        <Navbar.Brand href="/"> News Aggregator</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            {isAuthenticated && (
              <>
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/bookmarks">Bookmarks</Nav.Link>
                <NavDropdown
                  title={currentUser ? currentUser.firstName : ''}
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item href="#">Profile</NavDropdown.Item>
                  <NavDropdown.Item href="#">Settings</NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
            {!isAuthenticated && (
              <>
                <Nav.Link href="/register">Sign Up</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
