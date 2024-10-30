<template>
  <div>
    <div class="container">
      <div class="auth-form">
        <h2>Войти</h2>
        <form @submit.prevent="Login">
          <label for="username">Имя пользователя</label>
          <input type="username" id="username" v-model="username" required />

          <label for="password">Пароль</label>
          <input type="password" id="password" v-model="password" required />

          <button type="submit">Войти</button>
        </form>
        <p>Нет аккаунта? <a href="/register">Регистрация</a></p>
      </div>
      <!-- <div v-if="errorMessages">
        <p class="error-message">{{ errorMessages }}</p>
      </div> -->
    </div>
  </div>
</template>

<script>
// Добавить валидатор
// import { required } from '@vuelidate/validators'

export default {
  name: 'UserLogin',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  computed: {
    errorMessages() {
      return this.$store.getters['auth/errorMessage']
    }
  },
  methods: {
    async Login() {
      try {
        // const response = await this.$store.dispatch('auth/login', {
        await this.$store.dispatch('auth/login', {
          username: this.username,
          password: this.password
        })
        // console.log(response)
        this.$router.push('/profile')
      } catch (error) {
        // console.log('Авторизация не удалась:', error)
        alert('Ошибка входа: ' + error)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
