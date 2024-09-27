<template>
  <header>
    <div class="container">
      <h1><router-link to="/">AppCode</router-link></h1>
      <nav>
        <ul>
          <li><router-link to="/problems">Задачи</router-link></li>
          <li><router-link to="/discussions">Обсуждения</router-link></li>
          <li><router-link to="/about">О проекте</router-link></li>
          <!-- <li><router-link to="/login">Войти</router-link></li> -->
          <li v-if="user && user.role === 'admin'">
            <router-link to="/users">Пользователи</router-link>
          </li>
          <!-- <li><router-link to="/register">Register</router-link></li> -->
        </ul>
      </nav>

      <div v-if="user" class="user-info">
        Добро пожаловать,
        <strong>
          <router-link to="/profile">{{ user.username }}</router-link>
        </strong>
        <button @click="logout" class="logout-btn">Выход</button>
      </div>

      <div v-else class="user-info">
        <span>
          Вы не вошли в систему. <router-link to="/register">Зарегистрироваться</router-link> или
          <router-link to="/login">Войти</router-link>
        </span>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  computed: {
    user() {
      // console.log(this.$store.getters['auth/user'])
      return this.$store.getters['auth/user']
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped></style>
