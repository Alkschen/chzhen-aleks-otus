// import axios from 'axios'
import api from './axios'

const API_URL = import.meta.env.VITE_API_URL
// const API_URL = 'http://localhost:3000'

class AuthService {
  async login(user) {
    try {
      const response = await api.post(`${API_URL}/login`, {
        username: user.username,
        password: user.password
      })
      console.log('AuthService.login Response: ', response.data)
      return response.data
    } catch (error) {
      console.log('Ошибка AuthService.login: ', error.response.data)
      throw new Error(error.response ? error.response.data.message : 'Непонятная ошибка')
      // return error.response.data
    }
  }

  async register(userData) {
    try {
      const response = await api.post(`${API_URL}/register`, {
        username: userData.username,
        email: userData.email,
        password: userData.password
      })
      return response.data
    } catch (error) {
      // throw error;
      return error.response.data
    }
  }
}

export default new AuthService()
