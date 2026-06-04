require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./db');
const Bus = require('./models/bus');
const Route = require('./models/route');
const Stop = require('./models/stop');
const collegeRoutes = require('./routes');

const seed = async () => {
  await connectDB();

  await Bus.deleteMany();
  await Route.deleteMany();
  await Stop.deleteMany();

  console.log('Seeding all 43 college bus routes...');

  const routeKeys = Object.keys(collegeRoutes);

  for (const key of routeKeys) {
    const routeData = collegeRoutes[key];

    // Create stops
    const stops = await Stop.insertMany(
      routeData.stops.map((s, i) => ({
        stopName:  s.name,
        lat:       s.lat,
        lng:       s.lng,
        stopOrder: i + 1,
      }))
    );

    // Create route
    const route = await Route.create({
      routeName:   routeData.name,
      routeNumber: key,
      stops:       stops.map(s => s._id),
      startTime:   routeData.departureTime,
      endTime:     '7:40am',
      isActive:    true
    });

    // Create bus for this route
    await Bus.create({
      busNumber:   `BUS-${key}`,
      driverName:  getDriverName(key),
      routeId:     route._id,
      capacity:    50,
      status:      'active',
      lastLat:     routeData.stops[0].lat,
      lastLng:     routeData.stops[0].lng,
    });

    console.log(`✓ ${key} — ${routeData.name}`);
  }

  console.log(`\nDone! ${routeKeys.length} buses seeded successfully.`);
  process.exit(0);
};

function getDriverName(routeKey) {
  const drivers = {
    Route01: 'Kumar',    Route02: 'Rajan',    Route03: 'Selvam',
    Route04: 'Muthu',    Route4A: 'Senthil',  Route05: 'Arjun',
    Route06: 'Vijay',    Route07: 'Suresh',   Route08: 'Ramesh',
    Route09: 'Ganesh',   Route10: 'Prakash',  Route11: 'Dinesh',
    Route12: 'Manoj',    Route13: 'Karthik',  Route14: 'Balaji',
    Route15: 'Rajesh',   Route17: 'Sathish',  Route19: 'Mohan',
    Route21: 'Venkat',   Route29: 'Anand',    Route35: 'Praveen',
    Route36: 'Siva',     Route39: 'Ashwin',   Route41: 'Deepak',
    Route43: 'Naveen',
  };
  return drivers[routeKey] || 'Driver';
}

seed();