<template>
  <div class="surveys">
    <h2>Список опросов</h2>
    <!-- <button class="btn" @click="addSurvey">Добавить опрос</button> -->
    <ul>
      <li v-for="survey in surveys" :key="survey.id">
        <h3>{{ survey.title }}</h3>
        <p>{{ survey.description }}</p>
        <!-- <button @click="openModalEdit(survey)">Изменить</button> -->
        <!-- <button class="edit-btn" @click="openModalEdit(survey)">Изменить</button> -->
        <button class="delete-btn" @click="deleteSurvey(survey.id)">Удалить</button>
      </li>
    </ul>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'AdminSurveys',
  computed: {
    ...mapState('surveys', ['surveys', 'error'])
  },
  created() {
    this.fetchSurveys();
  },
  methods: {
    ...mapActions('surveys', ['fetchSurveys', 'deleteSurvey']),

    // Добавления нового опроса
    // addSurvey() {
    //   this.$router.push('/admin/surveys/add');
    // },
    // Редактирование опроса
    updateSurvey(survey) {
      this.$router.push(`/admin/surveys/${survey.id}`);
    }
  }
}
</script>

<style scoped>
.surveys {
  padding: 20px;
}
.btn {
  padding: 10px 15px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  background-color: #007BFF;
  color: white;
  border-radius: 5px;
}
.btn:hover {
  background-color: #0056b3;
}

.error {
  color: red;
}
</style>