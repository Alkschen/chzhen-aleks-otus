import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

api.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('user')
    const token = user ? JSON.parse(user).token : null
    // console.log('Axios: ', token)
    const authToken = token ? `Bearer ${token}` : ''
    config.headers.Authorization = authToken
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default api
