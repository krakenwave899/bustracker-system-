import React, { useState } from 'react';
import MapView from './components/MapView';
import Sidebar from './components/Sidebar';

function App() {
  const [selectedBus, setSelectedBus] = useState(null);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
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
    </div>
  );
}

export default App;