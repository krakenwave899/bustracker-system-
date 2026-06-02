const express = require('express');
const router = express.Router();
const Stop = require('../models/stop');

// GET all stops
router.get('/', async (req, res) => {
  try {
    const stops = await Stop.find().populate('routeId');
    res.json(stops);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET a single stop by ID
router.get('/:id', async (req, res) => {
  try {
    const stop = await Stop.findById(req.params.id).populate('routeId');
    if (!stop) return res.status(404).json({ error: 'Stop not found' });
    res.json(stop);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all stops for a specific route (ordered by stopOrder)
router.get('/route/:routeId', async (req, res) => {
  try {
    const stops = await Stop.find({ routeId: req.params.routeId }).sort({ stopOrder: 1 });
    res.json(stops);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create a new stop
router.post('/', async (req, res) => {
  try {
    const stop = new Stop(req.body);
    await stop.save();
    res.status(201).json(stop);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update a stop
router.put('/:id', async (req, res) => {
  try {
    const stop = await Stop.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!stop) return res.status(404).json({ error: 'Stop not found' });
    res.json(stop);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a stop
router.delete('/:id', async (req, res) => {
  try {
    const stop = await Stop.findByIdAndDelete(req.params.id);
    if (!stop) return res.status(404).json({ error: 'Stop not found' });
    res.json({ message: 'Stop deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
