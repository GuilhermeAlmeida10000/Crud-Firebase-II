import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api', // URL Principal da API
});

export const getClients = () => api.get('/isLogged');
export const deleteClient = (id) => api.delete(`/clientes/${id}`);
export const createClient = (data) => api.post('/clientes', data);
export const updateClient = (id, data) => api.put(`/clientes/${id}`, data);

export default api;