import api from './axios'

const API_URL = import.meta.env.VITE_API_URL

class ResponsesService {
  createResponse(data) {
    return api.post(`${API_URL}/responses`, data)
  }

  getResponsesByUserId(userId) {
    return api.get(`${API_URL}/responses/user/${userId}`)
  }

  getResponsesBySurveyId(surveyId) {
    return api.get(`${API_URL}/responses/survey/${surveyId}`)
  }

  deleteResponse(responsesId) {
    return api.delete(`${API_URL}/responses/${responsesId}`)
  }

  getAnswersByResponseId(responsesId) {
    return api.get(`${API_URL}/responses/${responsesId}`)
  }

  createAnswer(responsesId, data) {
    return api.post(`${API_URL}/responses/${responsesId}`, data)
  }
}

export default new ResponsesService()