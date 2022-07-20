import axios from "axios";

export default (route, credentials) => axios.post(`${import.meta.env.VITE_API_URL}${route}`, credentials);