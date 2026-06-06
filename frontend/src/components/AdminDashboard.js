import React, { useState, useEffect } from 'react';

const STATUS_COLORS = {
  active: '#22c55e',
  idle: '#f59e0b',
  breakdown: '#ef4444'
};

function AdminDashboard({ onClose }) {
  const [stats, setStats] = useState(null);
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [statsRes, busesRes] = await Promise.all([
        fetch('http://localhost:5000/api/admin/stats'),
        fetch('http://localhost:5000/api/admin/buses')
      ]);
      const statsData = await statsRes.json();
      const busesData = await busesRes.json();
      setStats(statsData);
      setBuses(busesData);
    } catch (err) {
      console.error('Failed to fetch admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // Auto refresh every 10 seconds
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  const updateStatus = async (busId, newStatus) => {
    try {
      await fetch(`http://localhost:5000/api/admin/buses/${busId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      fetchData(); // Refresh after update
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  if (loading) return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        <p style={{ color: '#fff', textAlign: 'center' }}>Loading...</p>
      </div>
    </div>
  );

  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.title}>🚌 Admin Dashboard</h2>
          <button onClick={onClose} style={styles.closeBtn}>✕ Close</button>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div style={styles.statsRow}>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>{stats.totalBuses}</div>
              <div style={styles.statLabel}>Total Buses</div>
            </div>
            <div style={styles.statCard}>
              <div style={{ ...styles.statNumber, color: '#22c55e' }}>
                {stats.busesByStatus.find(s => s._id === 'active')?.count || 0}
              </div>
              <div style={styles.statLabel}>Active</div>
            </div>
            <div style={styles.statCard}>
              <div style={{ ...styles.statNumber, color: '#f59e0b' }}>
                {stats.busesByStatus.find(s => s._id === 'idle')?.count || 0}
              </div>
              <div style={styles.statLabel}>Idle</div>
            </div>
            <div style={styles.statCard}>
              <div style={{ ...styles.statNumber, color: '#ef4444' }}>
                {stats.busesByStatus.find(s => s._id === 'breakdown')?.count || 0}
              </div>
              <div style={styles.statLabel}>Breakdown</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>{stats.totalRoutes}</div>
              <div style={styles.statLabel}>Routes</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>{stats.totalStops}</div>
              <div style={styles.statLabel}>Stops</div>
            </div>
          </div>
        )}

        {/* Buses Table */}
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={styles.th}>Bus No.</th>
                <th style={styles.th}>Driver</th>
                <th style={styles.th}>Route</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Last Updated</th>
                <th style={styles.th}>Change Status</th>
              </tr>
            </thead>
            <tbody>
              {buses.map((bus) => (
                <tr key={bus._id} style={styles.tableRow}>
                  <td style={styles.td}>{bus.busNumber}</td>
                  <td style={styles.td}>{bus.driverName}</td>
                  <td style={styles.td}>
                    {bus.routeId ? bus.routeId.routeName : 'N/A'}
                  </td>
                  <td style={styles.td}>
                    <span style={{
                      ...styles.statusBadge,
                      backgroundColor: STATUS_COLORS[bus.status]
                    }}>
                      {bus.status}
                    </span>
                  </td>
                  <td style={styles.td}>
                    {bus.lastUpdated
                      ? new Date(bus.lastUpdated).toLocaleTimeString()
                      : 'N/A'}
                  </td>
                  <td style={styles.td}>
                    <select
                      value={bus.status}
                      onChange={(e) => updateStatus(bus._id, e.target.value)}
                      style={styles.select}
                    >
                      <option value="active">Active</option>
                      <option value="idle">Idle</option>
                      <option value="breakdown">Breakdown</option>
                    </select>
                  </td>
                </tr>
              ))}
              {buses.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ ...styles.td, textAlign: 'center', color: '#888' }}>
                    No buses found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.85)',
    zIndex: 1000, display: 'flex',
    alignItems: 'center', justifyContent: 'center'
  },
  container: {
    backgroundColor: '#1e1e2e', borderRadius: '12px',
    padding: '24px', width: '90%', maxWidth: '1000px',
    maxHeight: '90vh', overflowY: 'auto'
  },
  header: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: '20px'
  },
  title: { color: '#fff', margin: 0, fontSize: '22px' },
  closeBtn: {
    background: '#ef4444', color: '#fff', border: 'none',
    borderRadius: '8px', padding: '8px 16px',
    cursor: 'pointer', fontSize: '14px'
  },
  statsRow: {
    display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap'
  },
  statCard: {
    backgroundColor: '#2a2a3e', borderRadius: '10px',
    padding: '16px 24px', textAlign: 'center', flex: '1', minWidth: '100px'
  },
  statNumber: { fontSize: '28px', fontWeight: 'bold', color: '#fff' },
  statLabel: { fontSize: '12px', color: '#888', marginTop: '4px' },
  tableWrapper: { overflowX: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse' },
  tableHeader: { backgroundColor: '#2a2a3e' },
  th: {
    color: '#aaa', padding: '12px 16px',
    textAlign: 'left', fontSize: '13px', fontWeight: '600'
  },
  tableRow: { borderBottom: '1px solid #2a2a3e' },
  td: { color: '#fff', padding: '12px 16px', fontSize: '14px' },
  statusBadge: {
    padding: '4px 10px', borderRadius: '20px',
    fontSize: '12px', fontWeight: '600', color: '#fff'
  },
  select: {
    backgroundColor: '#2a2a3e', color: '#fff',
    border: '1px solid #444', borderRadius: '6px',
    padding: '4px 8px', cursor: 'pointer'
  }
};

export default AdminDashboard;
