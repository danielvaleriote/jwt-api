import api from "../api/axios";
export default (route, credentials) => api.post(route, credentials);