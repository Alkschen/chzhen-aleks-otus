<template>
  <header>
    <div class="container">
      <h1><router-link to="/">Survey Service</router-link></h1>
      <nav>
        <ul>
          <li><router-link to="/surveys">Опросы</router-link></li>
          <li><router-link to="/about">О нас</router-link></li>
          <li v-if="user && user.role === 'admin'"><router-link  :to="{ name: 'adminPanel' }">Панель администратора</router-link></li>
        </ul>
      </nav>
      <p></p>
      <div v-if="user" class="user-info">
        Пользователь:&nbsp;&nbsp;
        <router-link :to="{ name: 'profile', params: { username: user.username } }">{{ user.username }}</router-link>&nbsp;&nbsp;
        <button @click="logout" class="logout-btn">Выход</button>
      </div>

      <!-- <div v-else class="user-info">
        <span>
          Вы не вошли в систему. <router-link to="/register">Зарегистрироваться</router-link> или
          <router-link to="/login">Войти</router-link>
        </span>
      </div> -->

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
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
header {
  background: #999;
  padding: 20px;
  text-align: center;
}

nav ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-around;
}
nav ul li {
  display: inline;
}
nav ul li a {
  color: #fff;
  text-decoration: none;
  padding: 5px 10px;
}

.logout-btn {
  text-decoration: none;
  cursor: pointer;
  color: white;
  padding: 5px 10px;
  border: none;
  background-color: #4CAF50;
  border-radius: 5px;
}

.logout-btn:hover {
  background-color: #45a049;
  color: white;
}
</style>
