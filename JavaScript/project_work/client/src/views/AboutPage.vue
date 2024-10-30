<template>
  <main>
    <div class="container">
      <h2>О проекте</h2>
      <section class="about">
        <p>
          Проектная работа "Surveys Service" для OTUS.
        </p>
      </section>

      <section class="team">
        <h3>Действующие лица</h3>
        <div class="team-member" v-for="member in teamMembers" :key="member.name">
          <h4>{{ member.name }}</h4>
          <p>Роль: {{ member.role }}</p>
          <p>Описание: {{ member.description }}</p>
        </div>
      </section>

      <section class="contact">
        <h3>Контакты</h3>
        <p>
          Email: <a :href="'mailto:' + contact.email">{{ contact.email }}</a>
        </p>
        <p>Телефон: {{ contact.phone }}</p>
      </section>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      teamMembers: [
        {
          name: 'Александр',
          role: 'Разработчик',
          description: 'первый'
        },
        {
          name: 'Александр',
          role: 'Дизайнер',
          description: 'второй'
        },
      ],
      contact: {
        email: 'info@surveys-service.com',
        phone: '+1 234 567 890'
      }
    }
  }
}
</script>

<style scoped>
/* .container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}
.about, .team, .contact {
  margin: 20px 0;
}
.team-member {
  margin-bottom: 10px;
} */
</style>
