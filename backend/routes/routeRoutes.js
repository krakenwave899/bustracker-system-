const express = require('express');
const router = express.Router();
const Route = require('../models/route');

// GET all routes
router.get('/', async (req, res) => {
  try {
    const routes = await Route.find().populate('stops');
    res.json(routes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET a single route by ID (with all stops populated)
router.get('/:id', async (req, res) => {
  try {
    const route = await Route.findById(req.params.id).populate('stops');
    if (!route) return res.status(404).json({ error: 'Route not found' });
    res.json(route);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create a new route
router.post('/', async (req, res) => {
  try {
    const route = new Route(req.body);
    await route.save();
    res.status(201).json(route);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update a route
router.put('/:id', async (req, res) => {
  try {
    const route = await Route.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!route) return res.status(404).json({ error: 'Route not found' });
    res.json(route);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a route
router.delete('/:id', async (req, res) => {
  try {
    const route = await Route.findByIdAndDelete(req.params.id);
    if (!route) return res.status(404).json({ error: 'Route not found' });
    res.json({ message: 'Route deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
