<!-- <template>
    <main>
      <div class="container">
        <h2>Редактирование сведений о пользователе</h2>
        <form @submit.prevent="editUser">
          <label for="username">Имя пользователя </label>
          <input type="text" id="username" v-model="user.username" required />
          <p></p>
          <label for="email">Email </label>
          <input type="email" id="email" v-model="user.email" required />
          <p></p>
          <label for="role">Роль </label>
          <select id="role" v-model="user.role" required>
            <option value="admin">Администратор</option>
            <option value="user">Пользователь</option>
          </select>
          <p></p>
          <button type="submit">Сохранить изменения</button>
        </form>
      </div>
    </main>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  
  export default {
    name: 'UserEdit',
    data() {
      return {
        user: {
          username: '',
          email: '',
          role: ''
        }
      };
    },
    // Текущий пользователь
    computed: {
      ...mapGetters('users', { fetchedUser: 'user' })
    },
    methods: {
      ...mapActions('users', {
        getUser: 'getUser',
        updateUser: 'updateUser'
      }),
      async editUser() {
        try {
          const userId = this.$route.params.id;
          const userData = { ...this.user };
          // Обновление пользователя
          await this.updateUser({ id: userId, userData: userData });
          alert('Пользователь изменен');
          this.$router.push('/users');
        } catch (error) {
          console.error('Ошибка при изменении пользователя:', error);
        }
      }
    },
    async mounted() {
      try {
        const userId = this.$route.params.id;
        await this.getUser(userId);
        console.log(this.fetchedUser);
        // this.user = this.fetchedUser;
        this.user = { 
            username: this.fetchedUser.username, 
            email: this.fetchedUser.email, 
            role: this.fetchedUser.role.rolename,
        };
      } catch (error) {
        console.error('Ошибка при получении пользователя:', error);
      }
    //   await this.getUserProfile();
    }
  };
  </script>
  
  <style scoped>
  </style> -->

<template>
  <div>
    <button @click="showModal = true">Редактировать пользователя</button>

    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>Редактирование сведений о пользователе</h2>
        <form @submit.prevent="editUser">
          <label for="username">Имя пользователя </label>
          <input type="text" id="username" v-model="user.username" required />
          <p></p>
          <label for="email">Email </label>
          <input type="email" id="email" v-model="user.email" required />
          <p></p>
          <label for="role">Роль </label>
          <select id="role" v-model="user.role" required>
            <option value="admin">Администратор</option>
            <option value="user">Пользователь</option>
          </select>
          <p></p>
          <button type="submit">Сохранить изменения</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'UserEdit',
  data() {
    return {
      showModal: false,
      user: {
        username: '',
        email: '',
        role: ''
      }
    }
  },
  computed: {
    ...mapGetters('users', { fetchedUser: 'user' })
  },
  methods: {
    ...mapActions('users', {
      getUser: 'getUser',
      updateUser: 'updateUser'
    }),
    async editUser() {
      try {
        const userId = this.$route.params.id
        const userData = { ...this.user }
        // Обновление пользователя
        await this.updateUser({ id: userId, userData: userData })
        alert('Пользователь изменен')
        this.closeModal() // Закрытие модального окна
        this.$router.push('/users')
      } catch (error) {
        console.error('Ошибка при изменении пользователя:', error)
      }
    },
    closeModal() {
      this.showModal = false // Закрытие модального окна
    }
  },
  async mounted() {
    try {
      const userId = this.$route.params.id
      await this.getUser(userId)
      this.user = {
        username: this.fetchedUser.username,
        email: this.fetchedUser.email,
        role: this.fetchedUser.role.rolename
      }
    } catch (error) {
      console.error('Ошибка при получении пользователя:', error)
    }
  }
}
</script>

<style scoped>
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}
</style>
