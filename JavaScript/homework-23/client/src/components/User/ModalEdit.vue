<template>
  <div class="modal" v-if="show">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2>Редактирование сведений о пользователе</h2>
      <form @submit.prevent="editUser">
        <label for="username">Имя пользователя </label>
        <input type="text" id="username" v-model="localUser.username" required />
        <p></p>
        <label for="email">Email </label>
        <input type="email" id="email" v-model="localUser.email" required />
        <p></p>
        <label for="role">Роль </label>
        <select id="role" v-model="localUser.role.rolename" required>
          <option value="admin">Администратор</option>
          <option value="user">Пользователь</option>
        </select>
        <p></p>
        <button type="submit">Сохранить изменения</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalEdit',
  props: {
    show: {
      required: true
    },
    user: {
      required: true
    }
  },
  data() {
    return {
      localUser: { ...this.user }
    }
  },

  methods: {
    closeModal() {
      this.$emit('closeModal')
    },
    editUser() {
      const newUser = {
        username: this.localUser.username,
        email: this.localUser.email,
        role: this.localUser.role.rolename
      }
      console.log('editUserModule newUser: ', newUser)
      this.$emit('editUser', newUser)
    }
  },
  watch: {
    user: {
      handler(newUser) {
        this.localUser = { ...newUser }
      },
      deep: true
    }
  }
}
</script>

<style scoped>
/* CSS стили для модального окна */
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
