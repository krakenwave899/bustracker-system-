require('dotenv').config();
const axios = require('axios');
const collegeRoutes = require('./routes');

const BASE_URL = 'http://localhost:5000';
const routeKeys = Object.keys(collegeRoutes);

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
  const routeKey  = routeKeys[routeIndex % routeKeys.length];
  const route     = collegeRoutes[routeKey];
  const stops     = route.stops;
  let stopIndex   = 0;

  console.log(`\n${busNumber} → ${route.name}`);

  while (true) {
    const current = stops[stopIndex];
    const next    = stops[(stopIndex + 1) % stops.length];

    console.log(`${busNumber}: ${current.name} → ${next.name}`);

    const path = interpolate(current, next, 30);

    for (const point of path) {
      const speed = Math.floor(Math.random() * 20) + 20;
      await sendLocation(busId, point.lat, point.lng, speed);
      await new Promise(r => setTimeout(r, 1500));
    }

    stopIndex = (stopIndex + 1) % stops.length;
  }
}

async function startSimulation() {
  try {
    const res   = await axios.get(`${BASE_URL}/api/buses`);
    const buses = res.data;

    if (buses.length === 0) {
      console.log('No buses! Run seed.js first.');
      process.exit(1);
    }

    console.log(`Starting ${buses.length} buses on real Chennai college routes!\n`);

    buses.forEach((bus, index) => {
      setTimeout(() => moveBus(bus._id, bus.busNumber, index), index * 3000);
    });

  } catch (err) {
    console.error('Cannot connect to backend. Start server.js first!');
    process.exit(1);
  }
}

startSimulation();