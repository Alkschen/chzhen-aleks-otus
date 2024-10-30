<template>
  <div class="admin-panel">
    <h1>Панель администратора</h1>
    <div class="stats">
        <h2>Пользователи</h2>
        <p>{{ usersCount }}</p>
        <router-link to="/users"><button class="btn">Список пользователей</button></router-link>
        <h2>Опросы</h2>
        <p>{{ surveysCount }}</p>
        <router-link to="/surveys"><button class="btn">Список опросов</button></router-link>
    </div>
  </div>
</template>

<script>
// НЕОБХОДИМО Добавить API для получения количества пользователей и опросов
export default {
  name: 'AdminPanel',
  data() {
    return {
      usersCount: 0, 
      surveysCount: 0 
    };
  },
  created() {
    this.fetchCounts();
  },
  methods: {
    fetchCounts() {
      // Добавить API для получения количества пользователей и опросов
      // this.userCount = response.usersCount; 
      // this.surveyCount = response.surveysCount;
    }
  }
};
</script>

<style scoped>
.admin-panel {
  padding: 20px;
}
.stats {
  margin-bottom: 20px;
}
.links {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.btn {
  padding: 10px 15px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  background-color: #4CAF50;
  color: white;
  border-radius: 5px;
}
.btn:hover {
  background-color: #45a049;
}
</style>