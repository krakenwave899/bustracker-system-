import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

const api = axios.create({ baseURL: BASE_URL });

export const getAllBuses = () => api.get('/api/buses');
export const getBusById = (id) => api.get(`/api/buses/${id}`);
export const getAllRoutes = () => api.get('/api/routes');
export const getLatestLocation = (busId) => api.get(`/api/location/${busId}`);
export const updateLocation = (data) => api.post('/api/location/update', data);