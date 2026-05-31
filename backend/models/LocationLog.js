const mongoose = require('mongoose');

const locationLogSchema = new mongoose.Schema({
  busId:     { type: mongoose.Schema.Types.ObjectId, ref: 'Bus', required: true },
  lat:       { type: Number, required: true },
  lng:       { type: Number, required: true },
  speed:     { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now }
});

locationLogSchema.index({ busId: 1, timestamp: -1 });

module.exports = mongoose.model('LocationLog', locationLogSchema);