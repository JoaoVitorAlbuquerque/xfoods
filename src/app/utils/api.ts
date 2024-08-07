import axios from "axios";

export const api = axios.create({
  // baseURL: 'http://192.168.15.3:3000',
  baseURL: 'http://10.0.0.129:3000',
});
