const express = require('express');
const router = express.Router();
const Bus = require('../models/bus');
const LocationLog = require('../models/LocationLog');

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

// PATCH update bus location (called frequently by the bus GPS)
router.patch('/:id/location', async (req, res) => {
  try {
    const { lat, lng } = req.body;
    if (lat === undefined || lng === undefined)
      return res.status(400).json({ error: 'lat and lng are required' });

    const bus = await Bus.findByIdAndUpdate(
      req.params.id,
      { lastLat: lat, lastLng: lng, lastUpdated: new Date() },
      { new: true }
    );
    if (!bus) return res.status(404).json({ error: 'Bus not found' });

    // Also log the location history
    await LocationLog.create({ busId: bus._id, lat, lng });

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
