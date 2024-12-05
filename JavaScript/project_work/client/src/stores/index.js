import { createStore } from 'vuex'

import { auth } from './modules/auth.module'
import { users } from './modules/users.module'
import { surveys } from './modules/surveys.module'
import { questions } from './modules/questions.module'
import { answerOptions } from './modules/answer-options.module'
import { responses } from './modules/responses.module'

const store = createStore({
  modules: {
    auth,
    users,
    surveys,
    questions,
    answerOptions,
    responses
  }
})

export default store
