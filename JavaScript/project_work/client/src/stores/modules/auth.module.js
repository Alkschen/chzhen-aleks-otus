import AuthService from '@/services/auth.service'
import api from '@/services/axios'
import { decodeToken } from '@/services/jwt'

export const auth = {
  namespaced: true,
  state: {
    status: null,
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).user : null,
    token: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null,
    error: null
  },

  mutations: {
    SET_AUTH(state, { token, user }) {
      (state.status = 'auth-success'), 
      (state.token = token), 
      (state.user = user)
    },
    SET_ERROR(state, errorMessage) {
      (state.status = 'error'), 
      (state.error = errorMessage)
    },
    SET_REG_SUCCESS(state) {
      state.status = 'reg-success'
    },
    LOGOUT(state) {
      state.user = null
      state.token = null
    }
  },

  actions: {
    async register({ commit }, user) {
      try {
        const response = await AuthService.register(user)
        commit('SET_REG_SUCCESS')
        return response.data
      } catch (error) {
        commit('SET_ERROR', error)
        throw error
      }
    },

    async login({ commit }, user) {
      try {
        const token = await AuthService.login(user)
        const currentUser = decodeToken(token)
        console.log('AuthModule.currentUser: ', currentUser)
        // Заголовок для запросов с токеном
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        // Сохраняем токен в localStorage
        localStorage.setItem('user', JSON.stringify({ token, user: currentUser }))
        commit('SET_AUTH', { token, user: currentUser })
        console.log('AuthModule.login: ', localStorage.getItem('user'))
      } catch (error) {
        commit('SET_ERROR', error)
        throw error
      }
    },

    logout({ commit }) {
      // authService.logout();
      localStorage.removeItem('user')
      commit('LOGOUT')
      delete api.defaults.headers.common['Authorization']
    }
  },

  getters: {
    authStatus: (state) => state.status,
    user: (state) => state.user,
    errorMessage: (state) => state.error
  }
}
