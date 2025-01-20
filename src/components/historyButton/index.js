import React, { useState } from 'react';
import './styles.css';

const URL_EXCEL = 'https://docs.google.com/spreadsheets/d/1rIbAzxMusyS5tTIuU6qTQ0fdyt6vz_JDcZX1foJPN30/edit?gid=648864529#gid=648864529';

const TradeButtons = ({ onReload }) => {
    const [statusMessage, setStatusMessage] = useState('');

    const handleGenerateExcel = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/update-record', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (response.ok) {
                setStatusMessage(data.message || 'Excel actualizado exitosamente.');
            } else {
                setStatusMessage(data.message || 'Error al actualizar el Excel.');
            }
        } catch (error) {
            console.error('Error al generar el Excel:', error);
            setStatusMessage('Error al conectar con el servidor.');
        }
    };

    return (
        <div className="button-container">
            <div className="left-buttons">
                <button className="trade-button" onClick={handleGenerateExcel}>
                    Generar Excel
                </button>
                <a href={URL_EXCEL} target="_blank" rel="noopener noreferrer">
                    <button className="trade-button">Abrir Excel</button>
                </a>
            </div>
            <button className="trade-button reload-button" onClick={onReload}>
                Recargar
            </button>
            {statusMessage && <p className="status-message">{statusMessage}</p>}
        </div>
    );
};

export default TradeButtons;
