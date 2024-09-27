import api from './axios'

const API_URL = import.meta.env.VITE_API_URL

class UserService {
  getUserProfile() {
    return api.get(`${API_URL}/users/profile`)
  }
  getUsersList() {
    return api.get(`${API_URL}/users`)
  }
  getUserById(id) {
    return api.get(`${API_URL}/users/${id}`)
  }
  updateUser(id, data) {
    return api.put(`${API_URL}/users/${id}`, data)
  }
  deleteUser(id) {
    return api.delete(`${API_URL}/users/${id}`)
  }
}

export default new UserService()
