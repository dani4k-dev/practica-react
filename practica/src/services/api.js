import axios from 'axios';

const API_URL = 'http://localhost:8000/api/direcciones';

export const getDirecciones = () => axios.get(API_URL).then(res => res.data);

export const createDireccion = (direccion) =>
  axios.post(API_URL, direccion).then(res => res.data);

export const updateDireccion = (id, direccion) =>
  axios.put(`${API_URL}/${id}`, direccion).then(res => res.data);

export const deleteDireccion = (id) =>
  axios.delete(`${API_URL}/${id}`).then(res => res.data);
