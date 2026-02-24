import axios from "axios";

// Use localhost for local development, production URL for deployment
const API_BASE = import.meta.env.DEV
  ? "http://localhost:21051"
  : "https://cs2team51.cs2410-web01pvm.aston.ac.uk";

const api = axios.create({
  baseURL: API_BASE,
});

export default api;
