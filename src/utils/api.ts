import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8002/api",
});

export default axiosClient;
