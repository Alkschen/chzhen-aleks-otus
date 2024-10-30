import SurveysService from '@/services/surveys.service'

export const surveys = {
  namespaced: true,
  state: {
    surveys: [],
    survey: null,
    error: null
  },
  mutations: {
    SET_SURVEYS(state, payload) {
      state.surveys = payload
    },
    SET_SURVEY(state, payload) {
      state.survey = payload
    },
    CLEAR_SURVEY(state) {
      state.survey = null
    },
    SET_ERROR(state, payload) {
      state.error = payload
    }
  },
  actions: {
    async fetchSurveys({ commit }) {
      try {
        const response = await SurveysService.getSurveysList();
        commit('SET_SURVEYS', response.data);
      } catch (error) {
        commit('SET_ERROR', error);
      }
    },
  
    async fetchSurveyById({ commit }, id) {
      try {
        const response = await SurveysService.getSurveyById(id);
        commit('SET_SURVEY', response.data);
      } catch (error) {
        commit('SET_ERROR', error);
      }
    },
  
    async createSurvey({ commit, dispatch }, data) {
      try {
        await SurveysService.createSurvey(data);
        commit('CLEAR_SURVEY');
        await dispatch('fetchSurveys');
      } catch (error) {
        commit('SET_ERROR', error);
      }
    },
  
    async updateSurvey({ commit, dispatch }, { id, data }) {
      try {
        await SurveysService.updateSurvey(id, data);
        await dispatch('fetchSurveys');
      } catch (error) {
        commit('SET_ERROR', error);
      }
    },
  
    async deleteSurvey({ commit, dispatch }, id) {
      try {
        await SurveysService.deleteSurvey(id);
        await dispatch('fetchSurveys');
      } catch (error) {
        commit('SET_ERROR', error);
      }
    },
  },
  
  getters: {
    surveys: state => state.surveys,
    survey: state => state.survey,
    error: state => state.error
  }
}