import axios from "axios";
import * as SecureStore from "expo-secure-store";

const ip_address = process.env.EXPO_PUBLIC_IP_ADDRESS;
const api = axios.create({
  baseURL: `http://10.20.25.202:5000/api`,
});
api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("userToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default api;
