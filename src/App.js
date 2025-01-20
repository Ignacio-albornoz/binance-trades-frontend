import Trades from './pages/Trades';  // Importamos el componente "Trades"
import AccountsInfo from './pages/AccountsInfo';  // Importamos el componente "AccountsInfo"
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AccountsInfo />
      </header>
    </div>
  );
}

export default App;
