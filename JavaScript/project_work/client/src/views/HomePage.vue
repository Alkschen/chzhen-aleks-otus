<template>
  <div id="app">
    <main>
      <h2 class="centered-text">Добро пожаловать на платформу опросов!</h2>
      <p v-if="user" class="centered-text">
        <router-link to="/surveys">Перейти к опросам</router-link>
      </p>
      <p v-else class="centered-text">
        <router-link to="/register">Зарегистрироваться</router-link> или
        <router-link to="/login">Войти</router-link>
      </p>
      <!-- Содержимое страницы -->
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  computed: {
    user() {
      return this.$store.getters['auth/user']
    }
  }
}
</script>

<style scoped>
.centered-text {
  text-align: center;
  margin-bottom: 20px;
}
</style>
