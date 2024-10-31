<template>
  <router-link to="/admin/surveys">Вернуться к списку опросов</router-link>
  <h1>Добавить опрос</h1>
  <form @submit.prevent="addSurvey">
    <label for="title">Название опроса</label>
    <input type="text" id="title" v-model="title" required />

    <label for="description">Описание опроса</label>
    <input type="text" id="description" v-model="description" required />

    <button type="submit">Добавить опрос</button>
  </form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      title: '',
      description: ''
    }
  },
  methods: {
    ...mapActions('surveys', ['createSurvey']),
    addSurvey() {
      // Добавить валидацию
      const survey = {
        title: this.title,
        description: this.description
      }
      this.createSurvey(survey)
      this.$router.push('/admin/surveys')
    }
  }
}
</script>

<style scoped></style>