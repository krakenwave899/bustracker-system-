require('dotenv').config();
const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

// Real college bus routes from your PDF
const routes = {
  'Route 01': [
    { name: 'Ambattur Estate',    lat: 13.1143, lng: 80.1548 },
    { name: 'Poonamallee',        lat: 13.0490, lng: 80.1157 },
    { name: 'Tambaram Bypass',    lat: 12.9249, lng: 80.1000 },
    { name: 'College',            lat: 12.8231, lng: 80.0444 },
  ],
  'Route 02': [
    { name: 'Chengalpettu BS',    lat: 12.6921, lng: 79.9765 },
    { name: 'Mahindra City',      lat: 12.7443, lng: 80.0134 },
    { name: 'Singaperumal Koil',  lat: 12.7682, lng: 80.0221 },
    { name: 'Potheri BS',         lat: 12.8231, lng: 80.0444 },
    { name: 'College',            lat: 12.8231, lng: 80.0444 },
  ],
  'Route 39': [
    { name: 'Guindy RS',          lat: 13.0067, lng: 80.2206 },
    { name: 'Gurunanak College',  lat: 12.9916, lng: 80.2173 },
    { name: 'Taramani Church',    lat: 12.9716, lng: 80.2394 },
    { name: 'Sholinganallur',     lat: 12.9010, lng: 80.2279 },
    { name: 'College',            lat: 12.8231, lng: 80.0444 },
  ],
};

const routeNames = Object.keys(routes);

function interpolate(start, end, steps) {
  const points = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    points.push({
      lat: start.lat + (end.lat - start.lat) * t,
      lng: start.lng + (end.lng - start.lng) * t,
    });
  }
  return points;
}

async function sendLocation(busId, lat, lng, speed) {
  try {
    await axios.post(`${BASE_URL}/api/location/update`, {
      busId, lat, lng, speed
    });
    console.log(`Bus ${busId.slice(-4)} → ${lat.toFixed(4)}, ${lng.toFixed(4)} @ ${speed}km/h`);
  } catch (err) {
    console.error('Error:', err.message);
  }
}

async function moveBus(busId, busNumber, routeIndex) {
  const routeName = routeNames[routeIndex % routeNames.length];
  const stops = routes[routeName];
  let stopIndex = 0;

  console.log(`\n${busNumber} assigned to ${routeName}`);

  while (true) {
    const current = stops[stopIndex];
    const next    = stops[(stopIndex + 1) % stops.length];

    console.log(`${busNumber}: ${current.name} → ${next.name}`);

    const path = interpolate(current, next, 25);

    for (const point of path) {
      const speed = Math.floor(Math.random() * 20) + 20;
      await sendLocation(busId, point.lat, point.lng, speed);
      await new Promise(r => setTimeout(r, 2000));
    }

    stopIndex = (stopIndex + 1) % stops.length;
  }
}

async function startSimulation() {
  console.log('Connecting to backend...');
  try {
    const res = await axios.get(`${BASE_URL}/api/buses`);
    const buses = res.data;

    if (buses.length === 0) {
      console.log('No buses found! Run seed.js first.');
      process.exit(1);
    }

    console.log(`Starting simulation for ${buses.length} buses on real Chennai routes!\n`);

    buses.forEach((bus, index) => {
      setTimeout(() => {
        moveBus(bus._id, bus.busNumber, index);
      }, index * 4000);
    });

  } catch (err) {
    console.error('Cannot connect to backend. Make sure server.js is running!');
    process.exit(1);
  }
}

startSimulation();