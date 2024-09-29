<template>
  <main>
    <div class="container">
      <h2>О проекте</h2>
      <section class="about">
        <p>
          AppCode - это платформа для обучения программированию и решения задач. Наш проект
          направлен на то, чтобы предоставить программистам всех уровней удобный инструмент для
          самосовершенствования и обмена знаниями.
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
          description: 'единственный'
        },
        {
          name: 'Прозвище',
          role: 'Дизайнер',
          description: 'второй'
        },
        {
          name: 'Кличка',
          role: 'Аналитик',
          description: 'третий'
        }
        // Можно добавить других участников команды в этом массиве
      ],
      contact: {
        email: 'info@AppCode.com',
        phone: '+1 234 567 890'
      }
    }
  }
}
</script>

<style scoped>
/* Тут можно добавить стили для компонента */
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
