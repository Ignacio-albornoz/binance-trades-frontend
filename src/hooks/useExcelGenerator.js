import { useState } from 'react';
import axios from 'axios';

const useExcelGenerator = () => {
  const [notification, setNotification] = useState(null);
  const NOTIFICATION_TIMEOUT = 10000; // 10 segundos

  const handleGenerateExcel = async () => {
    try {
      const response = await axios.get('http://localhost:3000/mock/update-record');
      if (response.status === 200) {
        setNotification('Excel actualizado exitosamente');
      } else {
        setNotification('Hubo un error al actualizar el Excel');
      }
    } catch (error) {
      setNotification('Hubo un error al actualizar el Excel');
      console.error('Error updating Excel:', error);
    }

    // Limpiar el mensaje después de NOTIFICATION_TIMEOUT
    setTimeout(() => setNotification(null), NOTIFICATION_TIMEOUT);
  };

  return { notification, handleGenerateExcel };
};

export default useExcelGenerator;
