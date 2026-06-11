import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    const dados = localStorage.getItem("usuario");
    return dados ? JSON.parse(dados) : null;
  });

  const logout = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");

    setUsuario(null);

    window.location.href = "#/login";
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        setUsuario,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}