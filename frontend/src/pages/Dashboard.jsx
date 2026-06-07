export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
            width: "200px",
          }}
        >
          <h3>Total de Entregas</h3>
          <h1>152</h1>
        </div>

        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
            width: "200px",
          }}
        >
          <h3>Pendentes</h3>
          <h1>10</h1>
        </div>

        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
            width: "200px",
          }}
        >
          <h3>Em Transporte</h3>
          <h1>24</h1>
        </div>

        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
            width: "200px",
          }}
        >
          <h3>Concluídas</h3>
          <h1>118</h1>
        </div>
      </div>
    </div>
  );
}