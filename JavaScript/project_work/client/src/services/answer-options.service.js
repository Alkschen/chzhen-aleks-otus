import api from './axios'

const API_URL = import.meta.env.VITE_API_URL

class AnswerOptionsService {
  createOptionsList(data) {
    return api.post(`${API_URL}/answer-options`, data)
  }

  createOption(optionsListId, data) {
    return api.post(`${API_URL}/answer-options/${optionsListId}`, data)
  }

  getAllOptionsList() {
    return api.get(`${API_URL}/answer-options`)
  }

  getOneOptionsListById(id) {
    return api.get(`${API_URL}/answer-options/${id}`)
  }

  updateOptionsList(id, data) {
    return api.put(`${API_URL}/answer-options/${id}`, data)
  }

  deleteOptionsList(id) {
    return api.delete(`${API_URL}/answer-options/${id}`)
  }
}

export default new AnswerOptionsService()