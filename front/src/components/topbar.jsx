import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useAuth } from "../hooks/AuthProvider";

const Topbar = () => {
  const auth = useAuth();
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/albums">Albums</Nav.Link>
          <Nav.Link href="/artists">Artistes</Nav.Link>
          <Nav.Link href="/tracks">Morceaux</Nav.Link>
          <Nav.Link onClick={() => auth.logOut()}>Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Topbar;
