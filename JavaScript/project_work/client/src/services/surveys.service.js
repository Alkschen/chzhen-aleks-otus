import api from './axios'

const API_URL = import.meta.env.VITE_API_URL

class SurveysService {
  getSurveysList() {
    return api.get(`${API_URL}/surveys`)
  }

  getSurveyById(id) {
    return api.get(`${API_URL}/surveys/${id}`)
  }

  createSurvey(data) {
    return api.post(`${API_URL}/surveys`, data)
  }

  updateSurvey(id, data) {
    return api.put(`${API_URL}/surveys/${id}`, data)
  }

  deleteSurvey(id) {
    return api.delete(`${API_URL}/surveys/${id}`)
  }
}

export default new SurveysService()