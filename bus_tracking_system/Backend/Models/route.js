const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  routeName:   { type: String, required: true },
  routeNumber: { type: String, required: true, unique: true },
  stops:       [{ type: mongoose.Schema.Types.ObjectId, ref: 'Stop' }],
  startTime:   { type: String },
  endTime:     { type: String },
  isActive:    { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Route', routeSchema);