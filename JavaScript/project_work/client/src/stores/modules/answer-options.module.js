import AnswerOptionsService from "@/services/answer-options.service";

export const answerOptions = {
  namespaced: true,

  state: {
    optionsList: [],
    option: null,
    error: null,
  },

  mutations: {
    SET_OPTIONS_LIST(state, optionsList) {
      state.optionsList = optionsList;
    },
    SET_OPTION(state, option) {
      state.option = option;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    CLEAR_OPTION(state) {
      state.option = null;
    },
  },

  actions: {
    async fetchOptionsList({ commit }) {
      try {
        const response = await AnswerOptionsService.getAllOptionsList();
        commit('SET_OPTIONS_LIST', response.data);
      } catch (error) {
        commit('SET_ERROR', error);
      }
    },

    async fetchOptionById({ commit }, id) {
      try {
        const response = await AnswerOptionsService.getOneOptionsListById(id);
        commit('SET_OPTION', response.data);
      } catch (error) {
        commit('SET_ERROR', error);
      }
    },

    async createOptionsList({ commit, dispatch }, data) {
      try {
        await AnswerOptionsService.createOptionsList(data);
        commit('CLEAR_OPTION');
        await dispatch('fetchOptionsList');
      } catch (error) {
        commit('SET_ERROR', error);
      }
    },

    async createOption({ commit, dispatch }, { optionsListId, data }) {
      try {
        await AnswerOptionsService.createOption(optionsListId, data);
        await dispatch('fetchOptionsList');
      } catch (error) {
        commit('SET_ERROR', error);
      }
    },

    async updateOptionsList({ commit, dispatch }, { id, data }) {
      try {
        await AnswerOptionsService.updateOptionsList(id, data);
        await dispatch('fetchOptionsList');
      } catch (error) {
        commit('SET_ERROR', error);
      }
    },

    async deleteOptionsList({ commit, dispatch }, id) {
      try {
        await AnswerOptionsService.deleteOptionsList(id);
        await dispatch('fetchOptionsList');
      } catch (error) {
        commit('SET_ERROR', error);
      }
    },
  },

  getters: {
    optionsList: state => state.optionsList,
    option: state => state.selectedOption,
    error: state => state.error,
  },
};
