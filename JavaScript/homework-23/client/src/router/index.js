import { createRouter, createWebHistory } from 'vue-router'

// import stores from '../stores'
import HomePage from '../views/HomePage.vue'
import UserLogin from '../views/User/Login.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutPage.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: UserLogin
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/User/Register.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/User/Profile.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/users',
    name: 'users',
    component: () => import('../views/User/Users.vue'),
    meta: { requiresAuth: true }
  }
  // {
  //   path: '/users/:id',
  //   name: 'userEdit',
  //   component: () => import('../views/User/Edit.vue'),
  //   meta: { requiresAuth: true }
  // }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  // const publicPages = ['/', '/login'];
  // const authRequired = !publicPages.includes(to.path);
  // const loggedIn = localStorage.getItem('user');
  // if (authRequired && !loggedIn) {
  //   next('/login');
  // } else {
  //   next();
  // }
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

export default router
