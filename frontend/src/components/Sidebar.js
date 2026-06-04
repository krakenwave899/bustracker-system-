import React, { useEffect, useState } from 'react';
import { getAllBuses } from '../services/api';
import socket from '../services/socket';

const Sidebar = ({ selectedBus, onBusSelect }) => {
  const [buses, setBuses]     = useState([]);
  const [positions, setPositions] = useState({});

  useEffect(() => {
    getAllBuses().then(res => setBuses(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    socket.on('busLocationUpdate', (data) => {
      setPositions(prev => ({ ...prev, [data.busId]: data }));
    });
    return () => socket.off('busLocationUpdate');
  }, []);

  const getStatus = (bus) => {
    const colors = { active: '#22c55e', idle: '#f59e0b', breakdown: '#ef4444' };
    return colors[bus.status] || '#888';
  };

  return (
    <div style={{
      width: '300px', height: '100vh', overflowY: 'auto',
      background: '#1e1e2e', color: '#fff', padding: '16px',
      boxShadow: '2px 0 8px rgba(0,0,0,0.3)'
    }}>
      <h2 style={{ margin: '0 0 16px', fontSize: '18px', color: '#7dd3fc' }}>
        🚌 Live Bus Tracker
      </h2>

      {buses.map(bus => {
        const pos = positions[bus._id];
        const isSelected = selectedBus?._id === bus._id;
        return (
          <div
            key={bus._id}
            onClick={() => onBusSelect(bus)}
            style={{
              background: isSelected ? '#2d4a7a' : '#2a2a3e',
              border: isSelected ? '1px solid #7dd3fc' : '1px solid #444',
              borderRadius: '10px', padding: '12px',
              marginBottom: '10px', cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 'bold', fontSize: '14px' }}>{bus.busNumber}</span>
              <span style={{
                width: '10px', height: '10px', borderRadius: '50%',
                background: getStatus(bus), display: 'inline-block'
              }}/>
            </div>
            <div style={{ fontSize: '12px', color: '#aaa', marginTop: '4px' }}>
              Driver: {bus.driverName}
            </div>
            {pos && (
              <div style={{ fontSize: '12px', color: '#7dd3fc', marginTop: '4px' }}>
                Speed: {pos.speed || 0} km/h
              </div>
            )}
            {isSelected && pos && (
              <div style={{
                marginTop: '8px', padding: '8px',
                background: '#1a3a5c', borderRadius: '6px', fontSize: '12px'
              }}>
                <div>📍 Lat: {pos.lat?.toFixed(4)}</div>
                <div>📍 Lng: {pos.lng?.toFixed(4)}</div>
              </div>
            )}
          </div>
        );
      })}

      {buses.length === 0 && (
        <p style={{ color: '#888', fontSize: '13px' }}>No buses found. Run seed.js first.</p>
      )}
    </div>
  );
};

export default Sidebar;