import axios from "axios";

const api = axios.create({
  baseURL: "https://ch-entregas-api.onrender.com",
});

export default api;