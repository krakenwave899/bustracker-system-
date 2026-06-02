const express = require('express');
const router = express.Router();
const Bus = require('../models/bus');
const Stop = require('../models/stop');

// Haversine formula — returns distance in km between two lat/lng points
function haversine(lat1, lng1, lat2, lng2) {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// GET /api/eta/:busId/:stopId
// Returns ETA in minutes from bus's current location to a given stop
router.get('/:busId/:stopId', async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.busId);
    if (!bus) return res.status(404).json({ error: 'Bus not found' });

    const stop = await Stop.findById(req.params.stopId);
    if (!stop) return res.status(404).json({ error: 'Stop not found' });

    if (bus.lastLat === undefined || bus.lastLng === undefined)
      return res.status(400).json({ error: 'Bus location not available yet' });

    const AVG_SPEED_KMH = 30; // average city bus speed
    const distanceKm = haversine(bus.lastLat, bus.lastLng, stop.lat, stop.lng);
    const etaMinutes = Math.round((distanceKm / AVG_SPEED_KMH) * 60);

    res.json({
      busNumber: bus.busNumber,
      stopName: stop.stopName,
      distanceKm: distanceKm.toFixed(2),
      etaMinutes,
      busLocation: { lat: bus.lastLat, lng: bus.lastLng },
      stopLocation: { lat: stop.lat, lng: stop.lng },
      lastUpdated: bus.lastUpdated
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
