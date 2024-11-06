import React from 'react';
import './styles.css';

const URL_EXCEL = 'https://docs.google.com/spreadsheets/d/1rIbAzxMusyS5tTIuU6qTQ0fdyt6vz_JDcZX1foJPN30/edit?gid=648864529#gid=648864529'

const TradeButtons = ({ onGenerateExcel, excelUrl, onReload }) => {
    return (
        <div className="button-container">
            <div className="left-buttons">
                <button className="trade-button" onClick={onGenerateExcel}>
                    Generar Excel
                </button>
                <a href={URL_EXCEL} target="_blank" rel="noopener noreferrer">
                    <button className="trade-button">Abrir Excel</button>
                </a>
            </div>
            <button className="trade-button reload-button" onClick={onReload}>
                Recargar
            </button>
        </div>
    );
};

export default TradeButtons;