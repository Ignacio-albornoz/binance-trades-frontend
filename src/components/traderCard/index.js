import React from 'react';
import './styles.css';

const TraderCard = ({ trader }) => {
    const { name, futuresUSD, spotUSD, profit, dailyProfit } = trader;

    return (
        <div className="trader-card">
            <div className="trader-container-name">
                <h3 className="trader-name">{name}</h3>
            </div>
            <div className="trader-info">
                <div className="info-item">
                    <span className="info-label">Futuros:</span>
                    <span className="info-value">${futuresUSD.toLocaleString()}</span>
                </div>
                <div className="info-item">
                    <span className="info-label">Spot:</span>
                    <span className="info-value">${spotUSD.toLocaleString()}</span>
                </div>
                <div className="info-item">
                    <span className="info-label">Ganancia diaria:</span>
                    <span className="info-value">${dailyProfit.toLocaleString()}</span>
                </div>
                <div className="info-item">
                    <span className="info-label">Ganancia totales:</span>
                    <span className="info-value">${profit.toLocaleString()}</span>
                </div>
            </div>
            <div className="trader-container-balance">
                <span className="balance-label">Balance total:</span>
                <span className="balance-value">${profit.toLocaleString()}</span>
            </div>
        </div>
    );
};

export default TraderCard;
