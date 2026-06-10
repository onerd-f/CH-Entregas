import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(
    JSON.parse(localStorage.getItem("usuario")) || null
  );

  const login = (email, senha) => {
    const usuarios = [
      {
  email: "admin@chentregas.com",
  senha: "123456",
  nome: "Carlos Henrique",
  perfil: "Administrador",
},
{
  email: "entregador@chentregas.com",
  senha: "123456",
  nome: "José Santos",
  perfil: "Entregador",
},
    ];

    const usuarioEncontrado = usuarios.find(
      (u) => u.email === email && u.senha === senha
    );

    if (usuarioEncontrado) {
      localStorage.setItem(
        "usuario",
        JSON.stringify(usuarioEncontrado)
      );

      setUsuario(usuarioEncontrado);
      return true;
    }

    return false;
  };

  const logout = () => {
    localStorage.removeItem("usuario");
    setUsuario(null);
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        login,
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