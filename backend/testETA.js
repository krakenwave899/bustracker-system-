const { calculateETA } = require('./controllers/etaController');

const result = calculateETA(
  13.0067, 80.2206,
  13.0827, 80.2707,
  30
);

console.log('Distance:', result.distance, 'km');
console.log('ETA:', result.etaMinutes, 'minutes');