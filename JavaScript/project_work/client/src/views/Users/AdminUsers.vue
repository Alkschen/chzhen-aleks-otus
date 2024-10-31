<template>
  <main>
    <div class="container">
      <h2>Список пользователей</h2>
      <section class="users">
        <ul>
          <li v-for="user in users" :key="user.id">
            <h3>
              Имя пользователя: {{ user.username }} - email:
              {{ user.email }},
              {{ user.role }}
            </h3>
            <button @click="openModalEdit(user)">Изменить</button>
            <button class="delete-btn" @click="removeUser(user.id)">Удалить</button>
          </li>
        </ul>
      </section>
      <br />

      <!-- Компонет модального окна для редактирования пользователя -->
      <ModalEdit
        :show="showModal"
        :user="selectedUser"
        @closeModal="closeModalEdit"
        @editUser="editUser"
      />

    </div>
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ModalEdit from '@/components/User/ModalEdit.vue'

export default {
  name: 'AdminUsers',
  components: { ModalEdit },
  data() {
    return {
      users: [], // Список пользователей
      showModal: false, // Состояние модального окна
      selectedUser: {
        username: '',
        email: '',
        role: ''
      }
    }
  },
  computed: {
    ...mapGetters('users', { users: 'users' })
  },
  mounted() {
    // Загрузка списка пользователей
    this.getUsers()
  },
  methods: {
    ...mapActions('users', ['getUsersList', 'updateUser', 'deleteUser']),

    // Получение списка пользователей
    async getUsers() {
      try {
        const response = await this.getUsersList()
        console.log('Users.getUsersList: ', response)
        this.users = response.data
      } catch (error) {
        console.error('Ошибка загрузки списка пользователей: ', error)
      }
    },

    openModalEdit(user) {
      this.showModal = true
      this.selectedUser = { ...user }
    },

    closeModalEdit() {
      this.showModal = false
    },

    // Изменение пользователя
    async editUser(userData) {
      try {
        const userId = this.selectedUser.id
        await this.updateUser({ id: userId, userData })
        alert('Пользователь изменен')
        this.closeModalEdit() // Закрытие модального окна
        this.getUsers() // Обновление списка пользователей
      } catch (error) {
        console.error('Ошибка при изменении пользователя:', error)
      }
    },

    // Удаление пользователя
    async removeUser(id) {
      try {
        await this.deleteUser(id)
        this.getUsers() // Обновление списка пользователей
      } catch (error) {
        console.error('Ошибка при удалении пользователя:', error)
      }
    }
  }
}
</script>

<style scoped></style>
