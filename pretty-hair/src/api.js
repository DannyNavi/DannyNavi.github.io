import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5050/api' });

export const fetchClients = () => API.get('/clients');
export const createClient = (client) => API.post('/clients', client);
export const updateClient = (id, client) => API.put(`/clients/${id}`, client);
export const deleteClient = (id) => API.delete(`/clients/${id}`);
