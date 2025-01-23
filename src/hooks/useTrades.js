import { useState } from "react";
import axios from "axios";

const useTrades = (token) => {
  const [trades, setTrades] = useState([]);
  const [loadingTrades, setLoadingTrades] = useState(false);

  const fetchTrades = async () => {
    if (!token) {
      console.error("No token available. Please log in first.");
      return;
    }

    setLoadingTrades(true);
    try {
      const response = await axios.get("http://localhost:3000/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTrades(response.data);
      console.log("Trades fetched:", response.data);
    } catch (error) {
      console.error("Error fetching trades:", error);
    } finally {
      setLoadingTrades(false);
    }
  };

  return { trades, loadingTrades, fetchTrades };
};

export default useTrades;
