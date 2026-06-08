export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-10 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-2">
          CH Entregas
        </h1>

        <p className="text-center text-slate-500 mb-8">
          Sistema de Gerenciamento de Entregas
        </p>

        <div className="mb-4">
          <label className="block mb-2 font-medium">
            E-mail
          </label>

          <input
            type="email"
            className="w-full border rounded-lg p-3"
            placeholder="Digite seu e-mail"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-medium">
            Senha
          </label>

          <input
            type="password"
            className="w-full border rounded-lg p-3"
            placeholder="Digite sua senha"
          />
        </div>

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg">
          Entrar
        </button>
      </div>
    </div>
  );
}