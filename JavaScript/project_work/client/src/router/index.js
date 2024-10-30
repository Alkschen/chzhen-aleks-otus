import { createRouter, createWebHistory } from 'vue-router'

// import stores from '../stores'

export const router = createRouter({
  history: createWebHistory(),
  routes:[
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomePage.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutPage.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Users/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Users/Register.vue')
    },
    {
      path: '/user/:username',
      name: 'profile',
      component: () => import('../views/Users/User.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/admin',
      name: 'adminPanel',
      component: () => import('../views/Users/Admin.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/users',
      name: 'usersList',
      component: () => import('../views/Users/Users.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/surveys',
      name: 'surveysList',
      component: () => import('../views/Surveys/Surveys.vue'),
      meta: { requiresAuth: true }
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem('user')) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
