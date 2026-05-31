const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  busNumber:   { type: String, required: true, unique: true },
  driverName:  { type: String, required: true },
  routeId:     { type: mongoose.Schema.Types.ObjectId, ref: 'Route' },
  capacity:    { type: Number, default: 50 },
  status:      { type: String, enum: ['active', 'idle', 'breakdown'], default: 'idle' },
  lastLat:     { type: Number },
  lastLng:     { type: Number },
  lastUpdated: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Bus', busSchema);