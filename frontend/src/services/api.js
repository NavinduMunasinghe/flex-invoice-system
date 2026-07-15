console.log("API Base URL:", "http://localhost:8080/api");

import axios from "axios";

console.log("API Base URL:", "http://localhost:8080/api");

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;