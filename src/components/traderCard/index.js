import React from 'react';
import './styles.css';

const TraderCard = ({ trader }) => {

    console.log(trader);

    return (
        <div className="trader-card">
            <div className="trader-container-name">
                <h3 className="trader-name">Dev</h3>
            </div>
            <div className="trader-info">
                <div className="info-item">
                    <span className="info-label">Futuros:</span>
                    <span className="info-value">$100.300</span>
                </div>
                <div className="info-item">
                    <span className="info-label">Spot:</span>
                    <span className="info-value">$100.300</span>
                </div>
                <div className="info-item">
                    <span className="info-label">Ganancia diaria:</span>
                    <span className="info-value">$100.300</span>
                </div>
                <div className="info-item">
                    <span className="info-label">Procentaje de ganancias:</span>
                    <span className="info-value">100%</span>
                </div>
            </div>
            <div className="trader-container-balance">
                <span className="balance-label">Balance total:</span>
                <span className="balance-value">$400.300</span>
            </div>
        </div>
    );
};

export default TraderCard;
