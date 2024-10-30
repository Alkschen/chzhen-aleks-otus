import ResponsesService from "@/services/responses.service";

export const responses = {
  namespaced: true,

  state: {
    responsesList: [],
    response: null,
    error: null,
  },

  mutations: {
    SET_RESPONSES_LIST(state, responsesList) {
      state.responsesList = responsesList;
    },
    SET_RESPONSE(state, response) {
      state.response = response;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    CLEAR_RESPONSE(state) {
      state.response = null;
    },
  },

  actions: {
    async createResponse({ commit }, data) {
      try {
        await ResponsesService.createResponse(data);
        commit('CLEAR_RESPONSE');
        // Вы можете вызывать соответствующее действие для обновления списка ответов, если это необходимо.
      } catch (error) {
        commit('SET_ERROR', error);
      }
    },

    async fetchResponsesByUserId({ commit }, userId) {
      try {
        const response = await ResponsesService.getResponsesByUserId(userId);
        commit('SET_RESPONSES_LIST', response.data);
      } catch (error) {
        commit('SET_ERROR', error);
      }
    },

    async fetchResponsesBySurveyId({ commit }, surveyId) {
      try {
        const response = await ResponsesService.getResponsesBySurveyId(surveyId);
        commit('SET_RESPONSES_LIST', response.data);
      } catch (error) {
        commit('SET_ERROR', error);
      }
    },

    async deleteResponse({ commit, dispatch }, responseId) {
      try {
        await ResponsesService.deleteResponse(responseId);
        // Добавить обновление списка ответов
        dispatch('fetchResponsesByUserId', /* userId или surveyId */);
      } catch (error) {
        commit('SET_ERROR', error);
      }
    },

    async fetchAnswersByResponseId({ commit }, responseId) {
      try {
        const response = await ResponsesService.getAnswersByResponseId(responseId);
        commit('SET_RESPONSE', response.data);
      } catch (error) {
        commit('SET_ERROR', error);
      }
    },

    async createAnswer({ commit }, { responseId, data }) {
      try {
        await ResponsesService.createAnswer(responseId, data);
        // Добавить обновление списка ответов
      } catch (error) {
        commit('SET_ERROR', error);
      }
    },
  },

  getters: {
    responsesList: (state) => state.responsesList,
    response: (state) => state.response,
    error: (state) => state.error,
  },
};