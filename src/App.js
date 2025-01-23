import React from "react";
import ReactDOM from "react-dom";
import { AuthProvider } from "./context/AuthContext"; // Ajusta la ruta según la ubicación
import AccountsInfo from './pages/AccountsInfo';  // Importamos el componente "AccountsInfo"

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <AccountsInfo />
      </AuthProvider>,
    </div>
  );
}

export default App;
