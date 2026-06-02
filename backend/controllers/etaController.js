function haversineDistance(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

exports.calculateETA = (busLat, busLng, stopLat, stopLng, speedKmh = 30) => {
  const distance = haversineDistance(busLat, busLng, stopLat, stopLng);
  const timeHours = distance / speedKmh;
  const timeMinutes = Math.round(timeHours * 60);
  return {
    distance: distance.toFixed(2),
    etaMinutes: timeMinutes
  };
};