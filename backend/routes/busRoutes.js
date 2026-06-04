const express = require('express');
const router = express.Router();
const Bus = require('../models/bus');
const Stop = require('../models/stop');
const LocationLog = require('../models/LocationLog');

// Haversine formula — returns distance in METERS
function haversineMeters(lat1, lng1, lat2, lng2) {
  const R = 6371000; // Earth's radius in meters
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

// GET all buses
router.get('/', async (req, res) => {
  try {
    const buses = await Bus.find().populate('routeId');
    res.json(buses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET a single bus by ID
router.get('/:id', async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id).populate('routeId');
    if (!bus) return res.status(404).json({ error: 'Bus not found' });
    res.json(bus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create a new bus
router.post('/', async (req, res) => {
  try {
    const bus = new Bus(req.body);
    await bus.save();
    res.status(201).json(bus);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update bus details
router.put('/:id', async (req, res) => {
  try {
    const bus = await Bus.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!bus) return res.status(404).json({ error: 'Bus not found' });
    res.json(bus);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH update bus location + check proximity to stops
router.patch('/:id/location', async (req, res) => {
  try {
    const { lat, lng } = req.body;
    if (lat === undefined || lng === undefined)
      return res.status(400).json({ error: 'lat and lng are required' });

    const bus = await Bus.findByIdAndUpdate(
      req.params.id,
      { lastLat: lat, lastLng: lng, lastUpdated: new Date() },
      { new: true }
    ).populate('routeId');

    if (!bus) return res.status(404).json({ error: 'Bus not found' });

    // Log location history
    await LocationLog.create({ busId: bus._id, lat, lng });

    // Check proximity to stops on this bus's route
    if (bus.routeId) {
      const stops = await Stop.find({ routeId: bus.routeId._id });
      const io = req.app.get('io');
      const THRESHOLD_METERS = 200;

      stops.forEach(stop => {
        const distance = haversineMeters(lat, lng, stop.lat, stop.lng);
        if (distance <= THRESHOLD_METERS) {
          // Emit socket event to all connected clients
          io.emit('busNearStop', {
            busNumber: bus.busNumber,
            stopName: stop.stopName,
            distanceMeters: distance,
            busId: bus._id,
            stopId: stop._id
          });
        }
      });
    }

    res.json({ message: 'Location updated', bus });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a bus
router.delete('/:id', async (req, res) => {
  try {
    const bus = await Bus.findByIdAndDelete(req.params.id);
    if (!bus) return res.status(404).json({ error: 'Bus not found' });
    res.json({ message: 'Bus deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
