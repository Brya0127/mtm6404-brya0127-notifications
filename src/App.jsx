import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

import notificationsData from './notifications';

const Notification = ({ id, name, message, onClear }) => {
  const handleClear = (id) => {
    const notification = document.getElementById(`notification-${id}`);
    if (notification) {
      notification.classList.add('fade-out'); // Apply animation
      setTimeout(() => onClear(id), 400); // Remove after animation
    }
  };

  return (
    <div id={`notification-${id}`} className="notification">
      <p><strong>{name}:</strong> {message}</p>
      <button onClick={() => handleClear(id)} className="btn btn-danger">Clear</button>
    </div>
  );
};

// Main App Component
const NotificationApp = () => {
  const [notifications, setNotifications] = useState(notificationsData);

  const clearNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const clearAllNotifications = () => {
    document.querySelectorAll('.notification').forEach((notif) => {
      notif.classList.add('fade-out');
    });
    setTimeout(() => setNotifications([]), 400);
  };

  return (
    <div className="app">
      <h1>Notifications ({notifications.length})</h1>
      {notifications.length === 0 ? (
        <p>No notifications</p>
      ) : (
        notifications.map(notification => (
          <Notification
            key={notification.id}
            {...notification}
            onClear={clearNotification}
          />
        ))
      )}
      {notifications.length > 0 && (
        <button onClick={clearAllNotifications} className="btn btn-warning">
          Clear All
        </button>
      )}
    </div>
  );
};

// function App() {
//   const [notifications, setNotifications] = useState(notificationsData);

 
//   const clearNotification = (id) => {
//     setNotifications(notifications.filter(notification => notification.id !== id));
//   };

//   const clearAllNotifications = () => {
//     setNotifications([]);
//   };

//   return (
//     <div className="app">
//       <h2>Notifications! ({notifications.length})</h2>
//       <button onClick={clearAllNotifications}>Delete all</button>
//       <div className="notifications-list">
//         {notifications.map(notification => (
//           <NotificationItem 
//             key={notification.id} 
//             notification={notification} 
//             onClear={clearNotification} 
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

export default NotificationApp;
