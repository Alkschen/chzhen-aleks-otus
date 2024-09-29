<template>
  <main>
    <div class="container">
      <h2>Список пользователей</h2>
      <section class="users">
        <ul>
          <li v-for="user in users" :key="user.user_id">
            <h3>
              Имя пользователя: <a :href="`/users/${user.user_id}`">{{ user.username }}</a> - email:
              {{ user.email }},
              {{ user.role.rolename }}
            </h3>
            <button @click="openModalEdit(user)">Изменить</button>
            <button @click="removeUser(user.user_id)">Удалить</button>
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
      <!-- Модальное окно для редактирования пользователя
      <div v-if="showModal" class="modal">
        <div class="modal-content">
          <span class="close" @click="closeModalEdit">&times;</span>
          <h2>Редактирование сведений о пользователе</h2>
          <form @submit.prevent="editUser">
            <label for="username">Имя пользователя </label>
            <input type="text" id="username" v-model="selectedUser.username" required />
            <p></p>
            <label for="email">Email </label>
            <input type="email" id="email" v-model="selectedUser.email" required />
            <p></p>
            <label for="role">Роль </label>
            <select id="role" v-model="selectedUser.role.rolename" required>
              <option value="admin">Администратор</option>
              <option value="user">Пользователь</option>
            </select>
            <p></p>
            <button type="submit">Сохранить изменения</button>
          </form>
        </div>
      </div> -->
    </div>
  </main>
</template>

<script>
import { mapActions } from 'vuex'
import ModalEdit from '@/components/User/ModalEdit.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'UsersList',
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
    ...mapActions('users', {
      getUsersList: 'getUsersList',
      // getUser: 'getUser',
      updateUser: 'updateUser',
      deleteUser: 'deleteUser'
    }),

    // Загрузка списка пользователей
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

    // Обновление пользователя
    async editUser(userData) {
      try {
        const userId = this.selectedUser.user_id
        // console.log('editUser: ', userId, userData)
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
        // alert('Пользователь удален')
        this.getUsers() // Обновление списка пользователей
      } catch (error) {
        console.error('Ошибка при удалении пользователя:', error)
      }
    }
  }
}
</script>

<style scoped></style>
