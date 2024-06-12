import { useContext, createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const loginAction = async (data) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/users/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const res = await response.json();
      if (res.user) {
        setUser(res.user);
        setToken(res.token);
        localStorage.setItem("site", res.token);
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
  };
  const registerAction = async (data) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/users/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const res = await response.json();
      if (res.user) {
        setUser(res.user);
        setToken(res.token);
        localStorage.setItem("site", res.token);
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
  };

  return (
    <AuthContext.Provider
      value={{ token, user, loginAction, registerAction, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
