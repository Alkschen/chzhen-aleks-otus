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
            <button class="delete-btn" @click="deleteUser(user.id)">Удалить</button>
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
import { mapActions, mapState } from 'vuex'
import ModalEdit from '@/components/User/ModalEdit.vue'

export default {
  name: 'AdminUsers',
  components: { ModalEdit },
  data() {
    return {
      showModal: false, // Состояние модального окна
      selectedUser: {
        username: '',
        email: '',
        role: ''
      }
    }
  },
  computed: {
    ...mapState('users', ['users'])
  },
  created() {
    // Загрузка списка пользователей
    this.getUsersList()
  },
  methods: {
    ...mapActions('users', ['getUsersList', 'updateUser', 'deleteUser']),

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
  }
}
</script>

<style scoped></style>
