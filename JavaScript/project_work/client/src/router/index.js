import { createRouter, createWebHistory } from 'vue-router'

import store from '../stores'

import HomePage from '../views/HomePage.vue'
import AboutPage from '../views/AboutPage.vue'
import LoginPage from '../views/Users/Login.vue'
import Register from '../views/Users/Register.vue'
import UserProfile from '../views/Users/User.vue'
import AdminPanel from '../views/Admin/Admin.vue'
import AdminUsers from '../views/Admin/AdminUsers.vue'
import AdminSurveys from '../views/Admin/AdminSurveys.vue'
import AddSurvey from '@/views/Admin/AddSurvey.vue'
import AdminSurvey from '@/views/Admin/AdminSurvey.vue'
import Surveys from '@/views/Surveys/Surveys.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes:[
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/about',
      name: 'about',
      component: AboutPage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/user/:username',
      name: 'profile',
      component: UserProfile,
      meta: { requiresAuth: true }
    },
    {
      path: '/admin',
      name: 'adminPanel',
      component: AdminPanel,
      meta: { requiresAuth: true, role: 'admin' },
      children: [
        { path: '/admin/users', name: 'adminUsers', component: AdminUsers },
        { path: '/admin/surveys', name: 'adminSurveys', component: AdminSurveys },
        { path: '/admin/surveys/add', name: 'addSurvey', component: AddSurvey },
        // { path: '/admin/surveys/:id', name: 'adminSurveyDetails', component: AdminSurvey },
      ]
    },
    // {
    //   path: '/admin/surveys/add',
    //   name: 'addSurvey',
    //   component: AddSurvey,
    //   meta: { requiresAuth: true, role: 'admin' }
    // },
    // {
    //   path: '/admin/surveys/:id',
    //   name: 'adminSurveyDetails',
    //   component: AdminSurvey,
    //   meta: { requiresAuth: true, role: 'admin' }
    // },
    // {
    //   path: '/surveys',
    //   name: 'surveysList',
    //   component: Surveys,
    //   meta: { requiresAuth: true }
    // },
    // {
    //   path: '/surveys/:id',
    //   name: 'surveyPage',
    //   component: () => import('../views/Surveys/Survey.vue'),
    //   meta: { requiresAuth: true }
    // }
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
