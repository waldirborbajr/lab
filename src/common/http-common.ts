import axios, { AxiosInstance } from 'axios'

const apiClient: AxiosInstance = axios.create({
  baseURL: "http://127.0.0.1:9090/api/v1",
  timeout: 1200,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
})

export default apiClient
