const TradeList = ({ trades }) => {
    const hasTrades = trades.length > 0 && trades.some((group) => group.length > 0);

    return (
        <div>
            {hasTrades ? (
                <table className='table-container'>
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
                        {trades.map((tradeGroup, groupIndex) => (
                            tradeGroup.map((trade, index) => (
                                <tr key={`${groupIndex}-${index}`}>
                                    <td data-label="Name">{trade.name}</td>
                                    <td data-label="Symbol">{trade.symbol}</td>
                                    <td data-label="Unrealized Profit">{trade.unrealizedProfit}</td>
                                    <td data-label="Entry Price">{trade.entryPrice}</td>
                                    <td data-label="Mark Price">{trade.markPrice}</td>
                                    <td data-label="Leverage">{trade.leverage}</td>
                                </tr>
                            ))
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="no-trades-message">No hay trades activos</div>
            )}
        </div>
    );
};

export default TradeList;
