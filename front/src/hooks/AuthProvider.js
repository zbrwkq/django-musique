import { useContext, createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("access") || "");

  useEffect(() => {
    const storedToken = localStorage.getItem("access");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);
  const loginAction = async (data) => {
    try {
      // Try to get a JWT token
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
      if (res.access) {
        setToken(res.access);
        localStorage.setItem("access", res.access);
        return { success: true };;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
      return { success: false, message: err.message };
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
      if (res.access) {
        setToken(res.token);
        localStorage.setItem("access", res.access);
        return { success: true };
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
      return { success: false, message: err.message };
    }
  };

  const logOut = () => {
    setToken("");
    localStorage.removeItem("access");
  };

  return (
    <AuthContext.Provider
      value={{ token, loginAction, registerAction, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
