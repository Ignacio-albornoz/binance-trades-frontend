import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Item from '../components/item/item';  // Importamos el componente "Item"
import TradeList from '../components/tradeList/index';  // Importamos el componente "TradeList"
import TradeButtons from '../components/historyButton/index';  // Importamos el componente "TradeButtons"
import ListOfTraderCard from '../components/listOfTraderCard/index';  // Importamos el componente "ListOfTraderCard"

//hooks
import useExcelGenerator from '../hooks/useExcelGenerator';

import './styles.css';

const useTrades = () => {
  const [trades, setTrades] = useState([]);
  const [loadingTrades, setLoadingTrades] = useState(true);

  const fetchTrades = async () => {
    setLoadingTrades(true);
    try {
      const response = await axios.get('http://92.113.32.86:3000/api/orders');
      setTrades(response.data);
      console.log('Trades:', response.data);
    } catch (error) {
      console.error('Error fetching trades:', error);
    } finally {
      setLoadingTrades(false);
    }
  };

  useEffect(() => {
    fetchTrades();
    const intervalId = setInterval(fetchTrades, 60000);
    return () => clearInterval(intervalId);
  }, []);

  return { trades, loadingTrades, fetchTrades };
};

const useAccountsBalance = () => {
  const [accountsBalance, setAccountsBalance] = useState([]);
  const [loadingBalance, setLoadingBalance] = useState(true);

  const fetchAccountsBalance = async () => {
    setLoadingBalance(true);
    try {
      const response = await axios.get('http://localhost:3000/mock/accounts/balance');
      setAccountsBalance(response.data);
      console.log('Accounts Balance:', response.data);
    } catch (error) {
      console.error('Error fetching accounts balance:', error);
    } finally {
      setLoadingBalance(false);
    }
  };

  useEffect(() => {
    fetchAccountsBalance();
  }, []);

  return { accountsBalance, loadingBalance };
};

const AccountsInfo = () => {
  const { trades, loadingTrades, fetchTrades } = useTrades();
  const { accountsBalance, loadingBalance } = useAccountsBalance();
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (!loadingTrades && !loadingBalance) {
      setNotification('Datos actualizados con éxito');
    }
  }, [loadingTrades, loadingBalance]);

  return (
    <div>
        <h1 className='trades-title'>Futures Trades</h1>
        {notification && <div className="popup-notification">{notification}</div>}
        <TradeButtons onGenerateExcel={useExcelGenerator} onReload={fetchTrades}/>
        <TradeList trades={trades} />
        <div>
            <h1 style={{ textAlign: 'center', color: 'white', padding: '20px' }}>Lista de Traders</h1>
            <ListOfTraderCard traders={accountsBalance} />
        </div>
    </div>
  );
};

export default AccountsInfo;
