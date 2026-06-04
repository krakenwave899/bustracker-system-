const express = require('express');
const router = express.Router();
const LocationLog = require('../models/LocationLog');
const Bus = require('../models/bus');

router.post('/update', async (req, res) => {
  try {
    const { busId, lat, lng, speed } = req.body;

    const log = new LocationLog({ busId, lat, lng, speed });
    await log.save();

    await Bus.findByIdAndUpdate(busId, {
      lastLat: lat,
      lastLng: lng,
      lastUpdated: new Date()
    });

    const io = req.app.get('io');
    io.emit('busLocationUpdate', { busId, lat, lng, speed, timestamp: new Date() });

    res.json({ message: 'Location updated', log });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:busId', async (req, res) => {
  try {
    const log = await LocationLog.findOne({ busId: req.params.busId })
      .sort({ timestamp: -1 });
    res.json(log);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;