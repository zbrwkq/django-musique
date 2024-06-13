import { useState } from "react";
import { useAuth } from "../../hooks/AuthProvider";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const auth = useAuth();
  const handleSubmitEvent = async (e) => {
    e.preventDefault();
    if (input.username !== "" && input.password !== "") {
      const result = await auth.registerAction(input);
      if (result.success) {
        navigate("/");
      } else {
        alert('Erreur lors de l\'inscription \rError message: ' + result.message);
        return;
      }
    } else {
      alert("please provide a valid input");
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
    <form onSubmit={handleSubmitEvent}>
      <div className="form_control">
        <label htmlFor="user-username">Username:</label>
        <input
          type="username"
          id="user-username"
          name="username"
          placeholder="Zbrwkq"
          aria-describedby="user-username"
          aria-invalid="false"
          onChange={handleInput}
        />
        <div id="user-username" className="sr-only">
          Please enter a valid username. It must contain at least 6 characters.
        </div>
      </div>
      <div className="form_control">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          aria-describedby="user-password"
          aria-invalid="false"
          onChange={handleInput}
        />
        <div id="user-password" className="sr-only">
          your password should be more than 6 character
        </div>
      </div>
      <button className="btn-submit">Submit</button>
    </form>
  );
};

export default Register;
