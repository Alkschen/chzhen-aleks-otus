import QuestionsService from '@/services/questions.service'
export const questions = {
  namespaced: true,
  state: {
    questions: [],
    question: null,
    error: null,
  },
  mutations: {
    SET_QUESTIONS(state, questions) {
      state.questions = questions;
    },
    SET_QUESTION(state, question) {
      state.question = question;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    CLEAR_QUESTION(state) {
      state.question = null;
    },
  },
  actions: {
    async fetchQuestions({ commit }, surveyId) {
      try {
        const response = await QuestionsService.getQuestionsList(surveyId);
        commit('SET_QUESTIONS', response.data);
      } catch (error) {
        commit('SET_ERROR', error);
      }
    },
  
    async fetchQuestionById({ commit }, { surveyId, id }) {
      try {
        const response = await QuestionsService.getQuestionById(surveyId, id);
        commit('SET_QUESTION', response.data);
      } catch (error) {
        commit('SET_ERROR', error);
      }
    },
  
    async createQuestion({ commit, dispatch }, { surveyId, data }) {
      try {
        await QuestionsService.createQuestion(surveyId, data);
        commit('CLEAR_QUESTION');
        await dispatch('fetchQuestions', surveyId);
      } catch (error) {
        commit('SET_ERROR', error);
      }
    },
  
    async updateQuestion({ commit, dispatch }, { surveyId, id, data }) {
      try {
        await QuestionsService.updateQuestion(surveyId, id, data);
        await dispatch('fetchQuestions', surveyId);
      } catch (error) {
        commit('SET_ERROR', error);
      }
    },
  
    async deleteQuestion({ commit, dispatch }, { surveyId, id }) {
      try {
        await QuestionsService.deleteQuestion(surveyId, id);
        await dispatch('fetchQuestions', surveyId);
      } catch (error) {
        commit('SET_ERROR', error);
      }
    },
  },
  getters: {
    questions: (state) => state.questions,
    question: (state) => state.question,
    error: (state) => state.error,
  }
}