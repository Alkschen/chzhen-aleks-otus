<template>
  <h2>Ответьте на вопросы опроса</h2>
  <h2>{{ survey.title }}</h2>
  <p>{{ survey.description }}</p>
  <ul>
    <li v-for="question in survey.questions" :key="question.id">
      <h3>{{ question.title }}</h3>
      <p>{{ question.description }}</p>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'SurveyPage',
  computed: {
    survey() {
      return this.$store.state.surveys.survey
    }
  },
  created() {
    this.$store.dispatch('surveys/fetchSurvey', this.$route.params.id)
  }
}
</script>

<style scoped></style>