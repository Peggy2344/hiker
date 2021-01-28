import axios from 'axios'

const api = axios.create({
  baseURL: process.env.VUE_APP_API,
  withCredentials: true
})

export default api
