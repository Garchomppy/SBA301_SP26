import axios from "axios";
import { API_BASE_URL, ORCHID_ENDPOINT } from "../../utils/constants";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getOrchids = () => api.get(ORCHID_ENDPOINT);
export const getOrchidById = (id) => api.get(`${ORCHID_ENDPOINT}/${id}`);
export const createOrchid = (orchid) => api.post(ORCHID_ENDPOINT, orchid);
export const updateOrchid = (id, orchid) => api.put(`${ORCHID_ENDPOINT}/${id}`, orchid);
export const deleteOrchid = (id) => api.delete(`${ORCHID_ENDPOINT}/${id}`);

export default api;
