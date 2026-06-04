import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import socket from '../services/socket';
import { getAllBuses } from '../services/api';

// Fix default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl:       require('leaflet/dist/images/marker-icon.png'),
  shadowUrl:     require('leaflet/dist/images/marker-shadow.png'),
});

// Custom bus icon
const busIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/3448/3448339.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40]
});

const MapView = ({ onBusSelect }) => {
  const [buses, setBuses] = useState([]);
  const [busPositions, setBusPositions] = useState({});

  // Load initial bus data
  useEffect(() => {
    getAllBuses().then(res => {
      setBuses(res.data);
      const positions = {};
      res.data.forEach(bus => {
        if (bus.lastLat && bus.lastLng) {
          positions[bus._id] = { lat: bus.lastLat, lng: bus.lastLng };
        }
      });
      setBusPositions(positions);
    }).catch(err => console.error('Error loading buses:', err));
  }, []);

  // Listen for real-time location updates
  useEffect(() => {
    socket.on('busLocationUpdate', (data) => {
      setBusPositions(prev => ({
        ...prev,
        [data.busId]: { lat: data.lat, lng: data.lng, speed: data.speed }
      }));
    });

    return () => socket.off('busLocationUpdate');
  }, []);

  return (
    <MapContainer
      center={[13.0067, 80.2206]}
      zoom={12}
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />

      {buses.map(bus => {
        const pos = busPositions[bus._id];
        if (!pos) return null;
        return (
          <Marker
            key={bus._id}
            position={[pos.lat, pos.lng]}
            icon={busIcon}
            eventHandlers={{ click: () => onBusSelect(bus) }}
          >
            <Popup>
              <strong>{bus.busNumber}</strong><br />
              Driver: {bus.driverName}<br />
              Status: {bus.status}<br />
              Speed: {pos.speed || 0} km/h
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default MapView;