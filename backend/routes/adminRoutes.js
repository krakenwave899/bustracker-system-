const express = require('express');
const router = express.Router();
const Bus = require('../models/bus');
const Route = require('../models/route');
const Stop = require('../models/stop');

// GET /api/admin/dashboard
// Returns all buses with their route and status info
router.get('/dashboard', async (req, res) => {
  try {
    const buses = await Bus.find().populate('routeId');
    const totalBuses = buses.length;
    const activeBuses = buses.filter(b => b.status === 'active').length;
    const idleBuses = buses.filter(b => b.status === 'idle').length;
    const breakdownBuses = buses.filter(b => b.status === 'breakdown').length;

    res.json({
      stats: {
        totalBuses,
        activeBuses,
        idleBuses,
        breakdownBuses
      },
      buses
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/admin/buses
// Returns all buses with full details
router.get('/buses', async (req, res) => {
  try {
    const buses = await Bus.find().populate('routeId');
    res.json(buses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/admin/buses/:id/status
// Update bus status (active, idle, breakdown)
router.patch('/buses/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    if (!['active', 'idle', 'breakdown'].includes(status))
      return res.status(400).json({ error: 'Invalid status' });

    const bus = await Bus.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!bus) return res.status(404).json({ error: 'Bus not found' });
    res.json({ message: 'Status updated', bus });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/admin/stats
// Quick summary stats
router.get('/stats', async (req, res) => {
  try {
    const [totalBuses, totalRoutes, totalStops] = await Promise.all([
      Bus.countDocuments(),
      Route.countDocuments(),
      Stop.countDocuments()
    ]);

    const busesByStatus = await Bus.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    res.json({
      totalBuses,
      totalRoutes,
      totalStops,
      busesByStatus
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
