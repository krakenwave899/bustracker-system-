const mongoose = require('mongoose');

const stopSchema = new mongoose.Schema({
  stopName:  { type: String, required: true },
  lat:       { type: Number, required: true },
  lng:       { type: Number, required: true },
  routeId:   { type: mongoose.Schema.Types.ObjectId, ref: 'Route' },
  stopOrder: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Stop', stopSchema);