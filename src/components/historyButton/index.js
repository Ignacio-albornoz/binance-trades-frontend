import React, { useState } from 'react';
import { FaSyncAlt, FaWallet  } from 'react-icons/fa'; // Ejemplo de íconos
import { SiGooglesheets } from "react-icons/si";
import { useAuth } from "../../context/AuthContext"; // Asegúrate de importar el contexto correcto
import axios from 'axios';

import './styles.css';

const URL_EXCEL = 'https://docs.google.com/spreadsheets/d/1rIbAzxMusyS5tTIuU6qTQ0fdyt6vz_JDcZX1foJPN30/edit?gid=648864529#gid=648864529';


const TradeButtons = ({ onReload }) => {
    const [statusMessage, setStatusMessage] = useState('');
    const { token } = useAuth();

    console.log('Token:', token);

    const updateWallet = async () => {
        try {
            const response = await axios.get("http://92.113.32.86:3000/api/update-record", {
                headers: {
                  Authorization: `Bearer ${token}`, // Usa el token almacenado
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
                {/* Botón para actualizar cuentas */}
                <button className="trade-button" onClick={updateWallet}>
                    <span className="button-icon">
                        <FaWallet />
                    </span>
                    <span className="button-text">Actualizar Cuentas</span>
                </button>

                {/* Botón para abrir Excel */}
                <a href={URL_EXCEL} target="_blank" rel="noopener noreferrer">
                    <button className="trade-button">
                        <span className="button-icon">
                            <SiGooglesheets />
                        </span>
                        <span className="button-text">Abrir Excel</span>
                    </button>
                </a>
            </div>

            {/* Botón para recargar */}
            <button className="trade-button reload-button" onClick={onReload}>
                <span className="button-icon">
                    <FaSyncAlt />
                </span>
                <span className="button-text">Recargar</span>
            </button>

            {statusMessage && <div className="popup-notification">{statusMessage}</div>}
        </div>
    );
};

export default TradeButtons;
