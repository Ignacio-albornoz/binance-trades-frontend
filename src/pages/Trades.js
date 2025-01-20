import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Item from '../components/item/item';  // Importamos el componente "Item"
import TradeList from '../components/tradeList/index';  // Importamos el componente "TradeList"
import TradeButtons from '../components/historyButton/index';  // Importamos el componente "TradeButtons"
import ListOfTraderCard from '../components/listOfTraderCard/index';  // Importamos el componente "ListOfTraderCard"

import './styles.css';

const traderData = [
  { name: 'Juan Pérez', futuresUSD: 5000, spotUSD: 3000, profit: 1200, dailyProfit: 200 },
  { name: 'Ana López', futuresUSD: 8000, spotUSD: 6000, profit: 1500, dailyProfit: 300 },
  { name: 'Carlos Gómez', futuresUSD: 2000, spotUSD: 1500, profit: 500, dailyProfit: 100 },
]

const Trades = () => {
    const [trades, setTrades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState(null); // Estado para la notificación

    // Función para obtener los trades desde el backend
    const fetchTrades = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:3000/mock/orders'); 
            setTrades(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching trades:', error);
            setLoading(false);
        }
    };

    const handleGenerateExcel = async () => {
        try {
            const response = await axios.get('http://localhost:3000/mock/update-record');
            if (response.status === 200) {
                setNotification('Excel actualizado exitosamente');
            } else {
                setNotification('Hubo un error al actualizar el Excel');
            }
        } catch (error) {
            setNotification('Hubo un error al actualizar el Excel');
            console.error('Error updating Excel:', error);
        }
        // Limpiar el mensaje después de 3 segundos
        setTimeout(() => setNotification(null), 3000);
    };

    useEffect(() => {
        // Llama a fetchTrades inmediatamente cuando el componente se monta
        fetchTrades();

        // Configura el intervalo para llamar a fetchTrades cada 1 minuto
        const intervalId = setInterval(fetchTrades, 60000);

        // Limpia el intervalo cuando el componente se desmonta
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            <h1 className='trades-title'>Futures Trades</h1>
            {notification && <div className="popup-notification">{notification}</div>}
            <TradeButtons onGenerateExcel={handleGenerateExcel} onReload={fetchTrades}/>
            <TradeList trades={trades} />
            <div>
                <h1 style={{ textAlign: 'center', color: 'white', padding: '20px' }}>Lista de Traders</h1>
                <ListOfTraderCard traders={traderData} />
            </div>
        </div>
    );
};

export default Trades;
