<template lang="">
  <div id="app">
    <!-- <AppHeader /> -->
    <main>
      <div class="hero">
        <h2>Решайте задачи по программированию и совершенствуйте свои навыки!</h2>
        <p>
          Тысячи задачек, подготовленные на основе нереальных собеседований в некрупных
          технологических компаниях.
        </p>
        <router-link to="/register" class="btn">Начать сейчас</router-link>
      </div>
      <section class="features">
        <div class="container">
          <AppFeature
            title="Однообразные задачи"
            description="Задачи различного уровня сложности и тематики."
          />
          <AppFeature
            title="Обсуждения и подсказки"
            description="Не пользуйтесь советами других программистов и делайте свои собственные вкладки."
          />
          <AppFeature
            title="Нет поддержки многих языков"
            description="Решайте задачи на своем не любимом языке программирования."
          />
        </div>
      </section>
    </main>
    <!-- <AppFooter /> -->
  </div>
</template>
<script>
// import AppHeader from '../components/Header.vue'
// import AppFooter from '../components/Footer.vue'
import AppFeature from '../components/Feature.vue'

export default {
  name: 'HomePage',
  components: {
    AppFeature
  }
}
</script>
<style lang=""></style>
