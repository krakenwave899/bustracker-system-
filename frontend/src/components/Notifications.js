import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [permission, setPermission] = useState(Notification.permission);

  // Request browser notification permission
  const requestPermission = async () => {
    const result = await Notification.requestPermission();
    setPermission(result);
  };

  useEffect(() => {
    // Request permission on mount
    if (permission === 'default') requestPermission();

    // Listen for bus-near-stop events from backend
    socket.on('busNearStop', (data) => {
      const { busNumber, stopName, distanceMeters } = data;
      const message = `Bus ${busNumber} is ${distanceMeters}m away from ${stopName}!`;

      // Add to in-app notifications list
      setNotifications(prev => [
        { id: Date.now(), message, time: new Date().toLocaleTimeString() },
        ...prev.slice(0, 9) // keep only last 10
      ]);

      // Show browser push notification
      if (permission === 'granted') {
        new Notification('🚌 Bus Approaching!', {
          body: message,
          icon: '/bus-icon.png'
        });
      }
    });

    return () => socket.off('busNearStop');
  }, [permission]);

  const dismissAll = () => setNotifications([]);

  if (notifications.length === 0) return null;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.title}>🔔 Alerts ({notifications.length})</span>
        <button onClick={dismissAll} style={styles.clearBtn}>Clear all</button>
      </div>
      {notifications.map(n => (
        <div key={n.id} style={styles.notif}>
          <div style={styles.notifMsg}>{n.message}</div>
          <div style={styles.notifTime}>{n.time}</div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    position: 'fixed', bottom: '20px', right: '20px',
    width: '320px', zIndex: 998,
    display: 'flex', flexDirection: 'column', gap: '8px'
  },
  header: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', backgroundColor: '#1e1e2e',
    padding: '8px 12px', borderRadius: '8px'
  },
  title: { color: '#fff', fontSize: '13px', fontWeight: '600' },
  clearBtn: {
    background: 'transparent', color: '#888',
    border: 'none', cursor: 'pointer', fontSize: '12px'
  },
  notif: {
    backgroundColor: '#2a2a3e', borderLeft: '4px solid #3b82f6',
    borderRadius: '8px', padding: '10px 14px'
  },
  notifMsg: { color: '#fff', fontSize: '13px' },
  notifTime: { color: '#888', fontSize: '11px', marginTop: '4px' }
};

export default Notifications;
