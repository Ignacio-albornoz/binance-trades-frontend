import React from 'react';
import './styles.css';

const Item = ({ name, symbol, unrealizedProfit, entryPrice, markPrice, leverage }) => {
    return (
        <tr>
            <td>{name}</td>
            <td>{symbol}</td>
            <td className={unrealizedProfit > 0 ? 'positivePnl' : 'negativePnl'}>${Number(unrealizedProfit).toFixed(2)}</td>
            <td>{Number(entryPrice).toFixed(3)}</td>
            <td>{Number(markPrice).toFixed(3)}</td>
            <td>{leverage}x</td>
        </tr>
    );
};

export default Item;
