import React, { useState, useEffect } from "react";
import axios from "axios";
import TradeList from "../components/tradeList/index";
import TradeButtons from "../components/historyButton/index";
import { loginWithGoogle } from "../firebase/auth";
import { getAuth } from "firebase/auth";

import useExcelGenerator from "../hooks/useExcelGenerator";

import "./styles.css";

const useTrades = () => {
  const [trades, setTrades] = useState([]);
  const [loadingTrades, setLoadingTrades] = useState(false);
  const [token, setToken] = useState(null); // Estado para guardar el token JWT
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para determinar si el usuario está autenticado

  // Función para iniciar sesión
  const handleLogin = async () => {
    try {
      const userToken = await loginWithGoogle(); // Login con Google
      setToken(userToken); // Guarda el token en el estado
      setIsLoggedIn(true); // Marca al usuario como autenticado
      console.log("User logged in, token:", userToken);
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  // Función para obtener los trades
  const fetchTrades = async () => {
    if (!token) {
      console.error("No token available. Please log in first.");
      return;
    }

    setLoadingTrades(true);
    try {
      const response = await axios.get("http://92.113.32.86:3001/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`, // Usa el token almacenado
        },
      });
      setTrades(response.data);
      console.log("Trades:", response.data);
    } catch (error) {
      console.error("Error fetching trades:", error);
    } finally {
      setLoadingTrades(false);
    }
  };

  // Función para refrescar el token
  const refreshToken = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const newToken = await user.getIdToken(true); // Refresca el token
        setToken(newToken);
        console.log("Token refreshed:", newToken);
      }
    } catch (error) {
      console.error("Error refreshing token:", error.message);
    }
  };

  // Intervalo para actualizar trades si el usuario está autenticado
  useEffect(() => {
    if (isLoggedIn) {
      fetchTrades(); // Cargar trades al iniciar sesión
      const intervalId = setInterval(fetchTrades, 60000); // Actualiza cada 60 segundos
      return () => clearInterval(intervalId); // Limpia el intervalo al desmontar
    }
  }, [isLoggedIn, token]);

  // Intervalo para refrescar el token cada 55 minutos (antes de que expire)
  useEffect(() => {
    if (isLoggedIn) {
      const refreshInterval = setInterval(refreshToken, 55 * 60 * 1000); // Cada 55 minutos
      return () => clearInterval(refreshInterval); // Limpia el intervalo al desmontar
    }
  }, [isLoggedIn]);

  return { trades, loadingTrades, handleLogin, fetchTrades, isLoggedIn };
};

const AccountsInfo = () => {
  const { trades, loadingTrades, handleLogin, fetchTrades, isLoggedIn } = useTrades();
  const [notification, setNotification] = useState(null);

  // Notifica al usuario cuando los datos son actualizados
  const handleFetchTrades = async () => {
    await fetchTrades();
    setNotification("Datos actualizados con éxito");
  };

  return (
    <div className="app-container">
      <h1 className="trades-title">Futures Trades</h1>
      {notification && <div className="popup-notification">{notification}</div>}

      {!isLoggedIn && (
        <div className="login-container">
          <button className="google-login-button" onClick={handleLogin}>
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google logo"
              className="google-logo"
            />
            Login with Google
          </button>
        </div>
      )}

      {isLoggedIn && (
        <>
          <TradeButtons onGenerateExcel={useExcelGenerator} onReload={handleFetchTrades} />
          {loadingTrades ? <p>Cargando trades...</p> : <TradeList trades={trades} />}
        </>
      )}
    </div>
  );
};

export default AccountsInfo;
