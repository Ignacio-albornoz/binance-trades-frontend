const useTrades = () => {
  const [trades, setTrades] = useState([]);
  const [loadingTrades, setLoadingTrades] = useState(true);

  const fetchTrades = async () => {
    setLoadingTrades(true);
    try {
      const response = await axios.get('http://localhost:3000/api/orders');
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

  return { trades, loadingTrades };
};