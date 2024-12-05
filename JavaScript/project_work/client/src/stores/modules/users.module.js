import UserService from '@/services/users.service'

export const users = {
  namespaced: true,
  state: {
    users: [],
    user: null
  },
  mutations: {
    SET_USERS(state, users) {
      state.users = users
    },
    SET_USER(state, user) {
      state.user = user
    }
  },
  actions: {
    async getUserProfile({ commit }) {
      try {
        const user = await UserService.getUserProfile()
        // console.log('UsersModule.getUserProfile',user);
        commit('SET_USER', user)
        return user
      } catch (error) {
        if (error.response.status === 401) {
          console.log('Ошибка авторизации: ', error.response.data)
        }
        throw error
      }
    },
    async getUsersList({ commit }) {
      try {
        const response = await UserService.getUsersList()
        // console.log('UsersModule.getUsersList: ', response.data)
        commit('SET_USERS', response.data)
        return users
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.log('Ошибка авторизации: ', error.response.data)
        } else {
          console.error('Ошибка при загрузке списка пользователей:', error)
        }
        throw error
      }
    },
    async getUser({ commit }, id) {
      try {
        const response = await UserService.getUserById(id)
        const user = response.data
        commit('SET_USER', user)
        return user
      } catch (error) {
        if (error.response.status === 401) {
          console.log('Ошибка авторизации: ', error.response.data)
        }
        throw error
      }
    },
    async updateUser({ commit }, { id, userData }) {
      try {
        const user = await UserService.updateUser(id, userData)
        commit('SET_USER', user)
      } catch (error) {
        if (error.response.status === 401) {
          console.log('Ошибка авторизации: ', error.response.data)
        }
        throw error
      }
      // const user = await userService.updateUser(id, data)
      // commit('SET_USER', user)
    },
    async deleteUser({ dispatch }, id) {
      try {
        await UserService.deleteUser(id)
        await dispatch('getUsersList')
      } catch (error) {
        console.log('Ошибка при удалении пользователя: ', error)
        if (error.response.status === 401) {
          console.log('Ошибка авторизации: ', error.response.data)
        }
        throw error
      }
    }
  },
  getters: {
    users: (state) => state.users,
    user: (state) => state.user
  }
}
