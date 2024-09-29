<template>
  <div class="container">
    <h2>Информация о пользователе</h2>
    <section class="users">
      <div v-if="user">
        <div class="info">
          <span>Имя пользователя - {{ user.username }}</span>
          <p></p>
          <span>Email - {{ user.email || 'Почта отсутствует' }}</span>
          <p></p>
          <span>Дата создания пользователя - {{ user.created_at || 'No date' }}</span>
        </div>
        <p></p>
        <!-- <router-link :to="{ name: 'user-edit', params: { id: user.user_id } }" class="btn-edit">Изменить сведения</router-link> -->
        <!-- Ссылка на редактирование пользователя  -->
        <!-- <a :href="`/user-edit/${user.user_id}`" class="btn-edit">Изменить сведения</a> -->
      </div>
      <p v-else>Загрузка данных ...</p>
    </section>
    <br />
  </div>
</template>

<script>
export default {
  name: 'UserProfile',
  data() {
    return {
      user: null
    }
  },
  methods: {
    async getUser() {
      try {
        const response = await this.$store.dispatch('users/getUserProfile')
        this.user = response.data
      } catch (error) {
        console.error('Ошибка загрузки пользователя', error)
      }
    }
  },
  created() {
    this.getUser()
  }
}
</script>

<style scoped>
/* Добавьте ваши стили сюда */
</style>
