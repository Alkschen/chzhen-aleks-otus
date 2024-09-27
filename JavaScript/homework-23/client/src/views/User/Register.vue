<template>
  <main>
    <div class="container">
      <div class="auth-form">
        <h2>Регистрация</h2>
        <form @submit.prevent="registerUser">
          <label for="username">Имя пользователя</label>
          <input type="text" id="username" v-model="username" required />

          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" required />

          <label for="password">Пароль</label>
          <input type="password" id="password" v-model="password" required />

          <button type="submit">Регистрация</button>
        </form>
        <p>Уже есть аккаунт? <a href="/login">Войти</a></p>
      </div>
    </div>
  </main>
</template>

<script>
// Добавить валидатор
// import { required } from '@vuelidate/validators'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'UserRegister',
  data() {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  // Можно через геттер
  // computed: {
  //   errorMessages() {
  //     return this.$store.getters['auth/errorMessage']
  // }
  // },
  computed: mapState({
    errorMessages: (state) => state.auth.errorMessages,
    status: (state) => state.auth.status
  }),
  methods: {
    ...mapActions('auth', ['register']),
    async registerUser() {
      if (!this.username || !this.email || !this.password) {
        alert('Пожалуйста, заполните все поля')
        return
      }
      try {
        await this.register({
          username: this.username,
          email: this.email,
          password: this.password
        })
        this.$router.push('/login')
      } catch (error) {
        console.error('Регистрация не удалась:', error)
      }
    }
  }
}
</script>

<style scoped></style>
