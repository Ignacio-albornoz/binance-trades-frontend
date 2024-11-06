import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';
import Item from '../components/item/item';  // Importamos el componente "Item"
import TradeButtons from '../components/historyButton/index';  // Importamos el componente "TradeButtons"

const Trades = () => {
    const [trades, setTrades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState(null); // Estado para la notificación

    // Función para obtener los trades desde el backend
    const fetchTrades = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:3000/api/orders'); 
            setTrades(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching trades:', error);
            setLoading(false);
        }
    };

    const handleGenerateExcel = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/update-record');
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
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Symbol</th>
                        <th>Unrealized Profit</th>
                        <th>Entry Price</th>
                        <th>Mark Price</th>
                        <th>Leverage</th>
                    </tr>
                </thead>
                <tbody>
                    {trades.map((trades) => (
                        trades.map((trade, index) => (
                            <Item
                                key={index}
                                name={trade.name}
                                symbol={trade.symbol}
                                unrealizedProfit={trade.unrealizedProfit}
                                entryPrice={trade.entryPrice}
                                markPrice={trade.markPrice}
                                leverage={trade.leverage}
                            />
                    ))))}
                </tbody>
            </table>
        </div>
    );
};

export default Trades;
