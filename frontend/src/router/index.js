import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../pages/IndexPage.vue'),
      },
      {
        path: 'login',
        name: 'login',
        component: () => import('../pages/LoginPage.vue'),
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('../pages/RegisterPage.vue'),
      },
      {
        path: 'levels',
        name: 'levels',
        component: () => import('../pages/LevelsPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'game/:id',
        name: 'game',
        component: () => import('../pages/GamePage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'results',
        name: 'results',
        component: () => import('../pages/ResultsPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'leaderboard',
        name: 'leaderboard',
        component: () => import('../pages/LeaderboardPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: ':catchAll(.*)*',
        component: () => import('../pages/ErrorNotFound.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('accessToken')
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router