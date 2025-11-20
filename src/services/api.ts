import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.15.58:8080",
  timeout: 5000,
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("@token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
