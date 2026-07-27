import axios from "axios";

const api = axios.create({
  baseURL: "https://route53-clone-api-ywhf.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
