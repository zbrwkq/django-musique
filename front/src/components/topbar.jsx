import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useAuth } from "../hooks/AuthProvider";
import NavLink from "react-bootstrap/esm/NavLink";

const Topbar = () => {
  const auth = useAuth();
  let authButtons;
  if (auth.user) {
    authButtons = 
        <Nav.Link onClick={() => auth.logOut()} href="/login">
          Se déconnecter
        </Nav.Link>;
  } else {
    authButtons = (
      <>
        <Nav.Link href="/login">Se connecter</Nav.Link>
        <Nav.Link href="/register">S'inscrire</Nav.Link>
      </>
    );
  }
  console.log(authButtons);
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          {authButtons}
          <NavLink href="/albums">Albums</NavLink>
          <NavLink href="/artists">Artistes</NavLink>
          <NavLink href="/tracks">Musiques</NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Topbar;
