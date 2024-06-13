import { useState } from "react";
import { useAuth } from "../../hooks/AuthProvider";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";

const Register = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const auth = useAuth();
  const handleSubmitEvent = async (e) => {
    e.preventDefault();
    if (
      input.username !== "" &&
      input.username.length > 6 &&
      input.username.length < 40 &&
      input.password !== "" &&
      input.password.length > 6 &&
      input.password.length < 40
    ) {
      const result = await auth.registerAction(input);
      if (result.success) {
        navigate("/");
      } else {
        alert(
          "Erreur lors de l'inscription \rError message: " + result.message
        );
        return;
      }
    } else {
      alert(
        "Le nom d'utilisateur doit contenir entre 6 et 40 caractères et le mot de passe doit contenir entre 6 et 40 caractères."
      );
    }
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
          <Form.Label for="user-username">
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
          <Form.Label for="user-password">Entrer votre mot de passe</Form.Label>
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
            S'inscrire
          </Button>
          <NavLink to="/login" className="mt-2">
            Se connecter
          </NavLink>
        </div>
      </Form>
    </Container>
  );
};

export default Register;
