import api from './axios'

const API_URL = import.meta.env.VITE_API_URL

class QuestionsService {
  getQuestionsList(surveyId) {
    return api.get(`${API_URL}/surveys/${surveyId}/questions`)
  }

  getQuestionById(surveyId, id) {
    return api.get(`${API_URL}/surveys/${surveyId}/questions/${id}`)
  }

  createQuestion(surveyId, data) {
    return api.post(`${API_URL}/surveys/${surveyId}/questions`, data)
  }

  updateQuestion(surveyId, id, data) {
    return api.put(`${API_URL}/surveys/${surveyId}/questions/${id}`, data)
  }

  deleteQuestion(surveyId, id) {
    return api.delete(`${API_URL}/surveys/${surveyId}/questions/${id}`)
  }
}

export default new QuestionsService()