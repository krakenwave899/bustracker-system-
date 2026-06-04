import React, { useState } from 'react';
import MapView from './components/MapView';
import Sidebar from './components/Sidebar';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [selectedBus, setSelectedBus] = useState(null);
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Admin Button */}
      <button
        onClick={() => setShowAdmin(true)}
        style={{
          position: 'fixed', top: '16px', right: '16px',
          zIndex: 999, backgroundColor: '#3b82f6',
          color: '#fff', border: 'none', borderRadius: '8px',
          padding: '10px 18px', cursor: 'pointer',
          fontSize: '14px', fontWeight: '600',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
        }}
      >
        ⚙️ Admin
      </button>

      <Sidebar
        selectedBus={selectedBus}
        onBusSelect={setSelectedBus}
      />

      <div style={{ flex: 1 }}>
        <MapView
          selectedBus={selectedBus}
          onBusSelect={setSelectedBus}
        />
      </div>

      {/* Admin Dashboard Modal */}
      {showAdmin && (
        <AdminDashboard onClose={() => setShowAdmin(false)} />
      )}
    </div>
  );
}

export default App;
