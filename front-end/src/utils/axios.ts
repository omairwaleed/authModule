import axios from "axios";
const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (originalRequest?.url?.includes("/auth/signin")) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401) {
      if (originalRequest?.url?.includes("/auth/refresh")) {
        console.error("Refresh token expired, redirecting to login");
        window.location.href = "/login";
        return Promise.reject(error);
      }

      if (!originalRequest._retry) {
        originalRequest._retry = true;
        try {
          await axiosClient.post("/auth/refresh");
          console.log("Token refreshed");
          return axiosClient(originalRequest);
        } catch (refreshError) {
          console.error("Refresh failed, redirecting to login");
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
