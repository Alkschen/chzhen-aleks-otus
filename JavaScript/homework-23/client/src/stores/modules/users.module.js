import userService from '@/services/user.service'

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
        const user = await userService.getUserProfile()
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
        const users = await userService.getUsersList()
        // console.log('UsersModule.getUsersList: ', users)
        commit('SET_USERS', users)
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
        const response = await userService.getUserById(id)
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
        const user = await userService.updateUser(id, userData)
        commit('SET_USER', user)
        // return user
      } catch (error) {
        if (error.response.status === 401) {
          console.log('Ошибка авторизации: ', error.response.data)
        }
        throw error
      }
      // const user = await userService.updateUser(id, data)
      // commit('SET_USER', user)
    },
    async deleteUser({ commit }, id) {
      try {
        await userService.deleteUser(id)
        commit('SET_USERS', null)
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
