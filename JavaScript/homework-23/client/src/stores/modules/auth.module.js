import authService from '@/services/auth.service'
import api from '@/services/axios'
import { decodeToken } from '@/services/jwt.service'

export const auth = {
  namespaced: true,
  state: {
    status: null,
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).user : null,
    token: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null,
    error: null
  },

  mutations: {
    authRequest(state) {
      state.status = 'loading'
    },
    authSuccess(state, { token, user }) {
      ;(state.status = 'auth-success'), (state.token = token), (state.user = user)
    },
    authError(state, errorMessage) {
      ;(state.status = 'error'), (state.error = errorMessage)
    },
    regSuccess(state) {
      state.status = 'reg-success'
    },
    logout(state) {
      state.user = null
      state.token = null
    }
  },
  actions: {
    async login({ commit }, user) {
      commit('authRequest')
      try {
        const token = await authService.login(user)
        const currentUser = decodeToken(token)
        // console.log('AuthModule.currentUser: ', currentUser)
        // Заголовок для запросов с токеном
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        // Сохраняем токен в localStorage
        localStorage.setItem('user', JSON.stringify({ token, user: currentUser }))
        commit('authSuccess', { token, user: currentUser })
        console.log('AuthModule.login: ', localStorage.getItem('user'))
      } catch (error) {
        // console.log('Oшибка auth.module: ', error)
        commit('authError', error)
        throw error
      }
    },
    logout({ commit }) {
      // authService.logout();
      localStorage.removeItem('user')
      commit('logout')
      delete api.defaults.headers.common['Authorization']
    },
    async register({ commit }, user) {
      commit('authRequest')
      try {
        const response = await authService.register(user)
        commit('regSuccess')
        return response.data
      } catch (error) {
        commit('authError', error)
        throw error
      }
    }
  },
  getters: {
    authStatus: (state) => state.status,
    user: (state) => state.user,
    errorMessage: (state) => state.error
  }
}
