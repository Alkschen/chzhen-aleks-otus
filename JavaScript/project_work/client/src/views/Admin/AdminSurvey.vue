<template>
  <div class="survey-details">
    <h1>Опрос: {{ survey.title }}</h1>
    <p><strong>Автор:</strong> {{ survey.author }}</p>
    <div class="questions">
      <h2>Вопросы:</h2>
      <ul>
        <li v-for="(question, index) in survey.questions" :key="index">
          {{ index + 1 }}. {{ question.text }}
        </li>
      </ul>
    </div>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      surveyId: this.$route.params.id
    };
  },
  computed: {
    ...mapState('surveys', ['survey', 'error']),
  },
  methods: {
    ...mapActions('surveys', ['fetchSurveyById']),
    async fetchSurvey() {
      await this.fetchSurveyById(this.surveyId);
    }
  },
  created() {
    this.fetchSurvey();
  }
}
</script>

<style scoped>
.survey-details {
  padding: 20px;
}
.error {
  color: red;
}
.questions {
  margin-top: 20px;
}
</style>