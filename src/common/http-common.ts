import axios, { AxiosInstance } from 'axios'

const apiClient: AxiosInstance = axios.create({
  baseURL: "http://127.0.0.1:9090/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
})

export default apiClient
