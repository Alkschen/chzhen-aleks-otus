<template>
  <div class="admin-panel">
    <h1>Панель администратора</h1>
    <div class="stats">
      <router-link :to="{ name: 'adminUsers' }">Список пользователей</router-link>&nbsp;&nbsp;
      <router-link :to="{ name: 'adminSurveys' }">Список опросов</router-link>&nbsp;&nbsp;
      <router-link :to="{ name: 'addSurvey' }">Добавить опрос</router-link>&nbsp;&nbsp;
      <!-- <router-link :to="{ name: 'adminSuveysDetails', params: { id: 1 } }">Просмотр опроса</router-link> -->
        <!-- <p>{{ usersCount }}</p> -->
        <!-- <p>{{ surveysCount }}</p> -->
      <router-view></router-view>
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