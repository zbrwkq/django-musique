import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useAuth } from "../hooks/AuthProvider";
import { Container, NavLink } from "react-bootstrap";
import React, { useEffect, useState } from "react";

const Topbar = () => {
  const auth = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(!!auth.token);

  useEffect(() => {
    setIsAuthenticated(!!auth.token);
  }, [auth.token]);

  let authButtons;
  if (isAuthenticated) {
    authButtons = (
      <>
        <Nav.Link href="/profil">Profil</Nav.Link>
        <Nav.Link onClick={() => auth.logOut()} href="/login">
          Se déconnecter
        </Nav.Link>
      </>
    );
  } else {
    authButtons = (
      <>
        <Nav.Link href="/login">Se connecter</Nav.Link>
        <Nav.Link href="/register">S'inscrire</Nav.Link>
      </>
    );
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">TrackBoxd</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link href="/albums">Albums</Nav.Link>
            <Nav.Link href="/artists">Artistes</Nav.Link>
            <Nav.Link href="/tracks">Titres</Nav.Link>
          </Nav>
          <Nav className="ms-auto">{authButtons}</Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Topbar;
