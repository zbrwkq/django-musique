import { useState } from "react";
import { useAuth } from "../../hooks/AuthProvider";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";

const Login = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const auth = useAuth();

  // Gestion de la connexion
  const handleSubmitEvent = async (e) => {
    e.preventDefault();
    if (
      input.username !== "" &&
      input.username.length >= 6 &&
      input.username.length <= 40 &&
      input.password !== "" &&
      input.password.length >= 6 &&
      input.password.length <= 40
    ) {
      console.log(input)
      const result = await auth.loginAction(input);
      if (result.success) {
        navigate("/");
        return;
      } else {
        alert(
          "Une erreur est survenue lors de la connexion a votre compte, veuillez réessayer plus tard"
        );
      }
      return;
    }
    alert("Veuillez saisir des informations correctes");
    return;
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <Container>
      <Form onSubmit={handleSubmitEvent}>
        <Form.Group className="mt-3">
          <Form.Label htmlFor="user-username">
            Entrer votre nom d'utilisateur
          </Form.Label>
          <Form.Control
            type="text"
            id="user-username"
            name="username"
            placeholder="Zbrwkq"
            aria-describedby="user-username"
            aria-invalid="false"
            onChange={handleInput}
            minLength="6"
            maxLength="40"
          ></Form.Control>
          <Form.Text>
            Le nom d'utilisateur doit contenir au moins 6 caractères
          </Form.Text>
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label htmlFor="user-password">
            Entrer votre mot de passe
          </Form.Label>
          <Form.Control
            type="password"
            id="user-password"
            name="password"
            aria-describedby="user-password"
            aria-invalid="false"
            onChange={handleInput}
            minLength="6"
            maxLength="40"
          ></Form.Control>
          <Form.Text>
            Le mot de passe doit contenir au moins 6 caractères
          </Form.Text>
        </Form.Group>
        <div className="mt-3 d-flex flex-column align-items-center">
          <Button type="submit" variant="primary" className="mx-auto">
            Se connecter
          </Button>
          <NavLink to="/register" className="mt-2">
            S'inscrire
          </NavLink>
        </div>
      </Form>
    </Container>
  );
};

export default Login;
