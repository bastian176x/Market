import React, { useEffect, useState } from "react";
import appFirebase from "../credenciales";
import { getDatabase, ref, onValue } from "firebase/database";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faBellSlash } from '@fortawesome/free-solid-svg-icons';
import './Notification.css'; // Asegúrate de importar la hoja de estilos

const database = getDatabase(appFirebase);

const Notifications = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false); // Estado para controlar la visibilidad

  useEffect(() => {
    if (!userId) return;

    const notificationsRef = ref(database, 'notifications');
    const unsubscribe = onValue(notificationsRef, (snapshot) => {
      const data = snapshot.val();
      const userNotifications = [];
      for (let id in data) {
        if (data[id].userId === userId) {
          userNotifications.push({ id, ...data[id] });
        }
      }
      setNotifications(userNotifications);
      setLoading(false);
    }, (error) => {
      setError(error.message);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userId]);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications); // Alternar visibilidad
  };

  return (
    <div>
      <button onClick={toggleNotifications} className="notification-button">
        <FontAwesomeIcon icon={showNotifications ? faBellSlash : faBell} />
      </button>

      {showNotifications && (
        <div className="notifications">
          {loading ? (
            <p>Loading notifications...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : notifications.length > 0 ? (
            notifications.map(notification => (
              <div key={notification.id} className="notification">
                {notification.message}
              </div>
            ))
          ) : (
            <p>No notifications available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Notifications;