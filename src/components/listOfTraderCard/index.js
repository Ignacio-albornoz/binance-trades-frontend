import React from 'react';
import TraderCard from '../traderCard/index.js';
import './styles.css';

const ListOfTraderCard = ({ traders }) => {
    return (
        <div className="list-of-trader-card">
            {traders.map((trader, index) => (
                <TraderCard key={index} trader={trader} />
            ))}
        </div>
    );
};

export default ListOfTraderCard;