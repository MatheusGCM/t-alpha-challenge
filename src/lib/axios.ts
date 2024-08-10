import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://interview.t-alpha.com.br/api',
})

api.interceptors.request.use(
  (config) => {
    const storedToken = localStorage.getItem('@t-alpha:token')

    if (storedToken) {
      config.headers.Authorization = `Bearer ${storedToken}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)
