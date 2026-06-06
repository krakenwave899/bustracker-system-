const BASE_URL = 'http://localhost:5000'

export async function getAllBuses() {
  const res = await fetch(`${BASE_URL}/api/buses`)
  return res.json()
}

export async function getLatestLocation(busId: string) {
  const res = await fetch(`${BASE_URL}/api/location/${busId}`)
  return res.json()
}