import axios from 'axios';

export const api = axios.create({
  // baseURL: "http://34.228.223.216:8080"
  baseURL: "http://localhost:8080"
});