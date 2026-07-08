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
      },
      {
        path: 'game/:id',
        name: 'game',
        component: () => import('../pages/GamePage.vue'),
      },
      {
        path: 'results',
        name: 'results',
        component: () => import('../pages/ResultsPage.vue'),
      },
      {
        path: 'leaderboard',
        name: 'leaderboard',
        component: () => import('../pages/LeaderboardPage.vue'),
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

export default router