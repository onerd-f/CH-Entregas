import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(
        "/auth/login",
        {
          email,
          senha,
        }
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "usuario",
        JSON.stringify(
          response.data.usuario
        )
      );

      navigate("/");
    } catch (error) {
      setErro("E-mail ou senha inválidos");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-xl shadow-md w-full max-w-md"
      >
        <h1 className="text-4xl font-bold text-center mb-2">
          CH Entregas
        </h1>

        <p className="text-center text-slate-500 mb-8">
          Sistema de Gestão de Entregas
        </p>

        <input
          type="email"
          placeholder="E-mail"
          className="w-full border p-3 rounded-lg mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          className="w-full border p-3 rounded-lg mb-4"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        {erro && (
          <p className="text-red-500 mb-4">
            {erro}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}