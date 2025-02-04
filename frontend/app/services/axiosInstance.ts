import axios from "axios";
import { useSignout } from "~/store/authStore";

// const apiUrl = import.meta.env.API_URL;
const apiUrl = "http://localhost:3000/api/v1";

export const axiosInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      const signOut = useSignout();
      signOut();
      window.location.href = "/signin";
    }
    return Promise.reject(error);
  }
);
