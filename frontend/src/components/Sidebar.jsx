import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div
      style={{
        width: "250px",
        height: "100vh",
        background: "#0F172A",
        color: "#fff",
        padding: "20px",
      }}
    >
      <h2>CH Entregas</h2>

      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          marginTop: "30px",
        }}
      >
        <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
          Dashboard
        </Link>

        <Link to="/clientes" style={{ color: "#fff", textDecoration: "none" }}>
          Clientes
        </Link>

        <Link
          to="/entregadores"
          style={{ color: "#fff", textDecoration: "none" }}
        >
          Entregadores
        </Link>

        <Link to="/entregas" style={{ color: "#fff", textDecoration: "none" }}>
          Entregas
        </Link>

        <Link
          to="/rastreamento"
          style={{ color: "#fff", textDecoration: "none" }}
        >
          Rastreamento
        </Link>

        <Link
          to="/relatorios"
          style={{ color: "#fff", textDecoration: "none" }}
        >
          Relatórios
        </Link>
      </nav>
    </div>
  );
}