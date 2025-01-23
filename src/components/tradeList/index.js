import React from 'react';
import Item from '../item/item'; // Asegúrate de que Item esté en la ruta correcta
import './styles.css';

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
                            <th className='mark-price-header'>Mark Price</th>
                            <th>Leverage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trades.map((tradeGroup, groupIndex) => (
                            tradeGroup.map((trade, index) => (
                                <Item
                                    key={`${groupIndex}-${index}`}
                                    name={trade.name}
                                    symbol={trade.symbol}
                                    unrealizedProfit={trade.unrealizedProfit}
                                    entryPrice={trade.entryPrice}
                                    markPrice={trade.markPrice}
                                    leverage={trade.leverage}
                                />
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
