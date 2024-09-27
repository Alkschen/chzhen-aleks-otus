import { createStore } from 'vuex'
import { auth } from './modules/auth.module'
import { users } from './modules/users.module'

const store = createStore({
  modules: {
    auth,
    users
  }
})

export default store
