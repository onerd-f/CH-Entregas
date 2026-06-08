import { BrowserRouter } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <div className="flex bg-slate-100 min-h-screen">
        <Sidebar />

        <main className="flex-1 p-8">
          <Header />
          <AppRoutes />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;