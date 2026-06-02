require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./db');
const Bus = require('./models/bus');
const Route = require('./models/route');
const Stop = require('./models/stop');

const seed = async () => {
  await connectDB();

  await Bus.deleteMany();
  await Route.deleteMany();
  await Stop.deleteMany();

  const stops = await Stop.insertMany([
    { stopName: 'College Main Gate', lat: 13.0827, lng: 80.2707, stopOrder: 1 },
    { stopName: 'Tambaram',          lat: 12.9249, lng: 80.1000, stopOrder: 2 },
    { stopName: 'Chromepet',         lat: 12.9516, lng: 80.1462, stopOrder: 3 },
    { stopName: 'Pallavaram',        lat: 12.9675, lng: 80.1491, stopOrder: 4 },
    { stopName: 'Guindy',            lat: 13.0067, lng: 80.2206, stopOrder: 5 },
  ]);

  const route = await Route.create({
    routeName:   'Tambaram to College',
    routeNumber: 'R1',
    stops:       stops.map(s => s._id),
    startTime:   '07:00 AM',
    endTime:     '09:00 AM',
    isActive:    true
  });

  await Bus.insertMany([
    { busNumber: 'TN01-1234', driverName: 'Kumar',  routeId: route._id, capacity: 50, status: 'active', lastLat: 13.0067, lastLng: 80.2206 },
    { busNumber: 'TN01-5678', driverName: 'Rajan',  routeId: route._id, capacity: 50, status: 'idle',   lastLat: 12.9516, lastLng: 80.1462 },
    { busNumber: 'TN01-9999', driverName: 'Selvam', routeId: route._id, capacity: 40, status: 'active', lastLat: 12.9675, lastLng: 80.1491 },
  ]);

  console.log('Seed data inserted successfully!');
  process.exit(0);
};

seed();