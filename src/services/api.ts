import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "https://otruyenapi.com/v1/api",
});
// `${process.env.NEXT_PUBLIC_API_URL}`

AxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

AxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.error("🍕 ~ error:", { error });
    return Promise.reject(error);
  }
);

export default AxiosInstance;
