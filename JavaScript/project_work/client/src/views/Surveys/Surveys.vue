<template>
  <h2>Выберите опрос</h2>
  <ul>
    <li v-for="survey in surveys" :key="survey.id">
      <router-link :to="{ name: 'survey', params: { id: survey.id } }">
        <h3>{{ survey.title }}</h3>
      </router-link>
      {{ survey.description }}
    </li>
  </ul>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'SurveysList',
  computed: {
    ...mapState('surveys', ['surveys'])
  },
  methods: {
    ...mapActions('surveys', ['fetchSurveys'])
  },
  created() {
    this.fetchSurveys();
  }
}
</script>

<style scoped>
</style>