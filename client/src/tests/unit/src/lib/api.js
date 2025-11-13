import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const getBugs = () => axios.get(`${API_BASE_URL}/bugs`);
export const createBug = (bug) => axios.post(`${API_BASE_URL}/bugs`, bug);
export const updateBug = (id, bug) => axios.put(`${API_BASE_URL}/bugs/${id}`, bug);
export const deleteBug = (id) => axios.delete(`${API_BASE_URL}/bugs/${id}`);