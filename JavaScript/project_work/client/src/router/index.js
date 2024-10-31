import { createRouter, createWebHistory } from 'vue-router'

import store from '../stores'

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
      meta: { requiresAuth: true, role: 'admin' }
    },
    {
      path: '/admin/users',
      name: 'adminUsers',
      component: () => import('../views/Users/AdminUsers.vue'),
      meta: { requiresAuth: true, role: 'admin' }
    },
    {
      path: '/admin/surveys',
      name: 'adminSurveys',
      component: () => import('../views/Surveys/AdminSurveys.vue'),
      meta: { requiresAuth: true, role: 'admin' }
    },
    {
      path: '/admin/surveys/add',
      name: 'addSurvey',
      component: () => import('../views/Surveys/AddSurvey.vue'),
      meta: { requiresAuth: true, role: 'admin' }
    }
  ],
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = store.getters['auth/user'] !== null;
  const user = store.getters['auth/user'];

  if (requiresAuth && !isAuthenticated) {
    next({ name: 'login' }); // Перенаправление на страницу логина
  } else if (to.meta.role && to.meta.role !== user.role) {
    next({ name: 'home' }); // Перенаправление на домашнюю страницу, если роль не соответствует
  } else {
    next(); 
  }
});
