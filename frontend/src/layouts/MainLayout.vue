<template>
  <q-layout view="hHh Lpr lff">
    <q-header elevated class="header-dark">
      <q-toolbar>
        <q-btn flat dense round icon="menu" @click="leftDrawer = !leftDrawer" />
        <q-toolbar-title class="header-title">⚔️ ПЛАТФОРМЕР</q-toolbar-title>
        <div v-if="auth.isAuthenticated" class="header-user">
          🎮 {{ auth.user?.username }}
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawer" bordered class="drawer-dark">
      <div class="drawer-header text-center q-py-md">
        <div class="text-h6 text-weight-bold text-amber">МЕНЮ</div>
      </div>

      <q-list>
        <q-item clickable to="/" class="drawer-item">
          <q-item-section avatar><q-icon name="home" color="amber" /></q-item-section>
          <q-item-section class="text-grey-3">Главная</q-item-section>
        </q-item>

        <template v-if="auth.isAuthenticated">
          <q-item clickable to="/levels" class="drawer-item">
            <q-item-section avatar><q-icon name="sports_esports" color="amber" /></q-item-section>
            <q-item-section class="text-grey-3">Уровни</q-item-section>
          </q-item>

          <q-item clickable to="/leaderboard" class="drawer-item">
            <q-item-section avatar><q-icon name="leaderboard" color="amber" /></q-item-section>
            <q-item-section class="text-grey-3">Рейтинг</q-item-section>
          </q-item>

          <q-item clickable to="/results" class="drawer-item">
            <q-item-section avatar><q-icon name="history" color="amber" /></q-item-section>
            <q-item-section class="text-grey-3">История</q-item-section>
          </q-item>

          <q-separator dark class="q-my-sm" />

          <q-item clickable @click="auth.logout()" class="drawer-item">
            <q-item-section avatar><q-icon name="logout" color="red-5" /></q-item-section>
            <q-item-section class="text-grey-3">Выйти</q-item-section>
          </q-item>
        </template>

        <template v-else>
          <q-item clickable to="/login" class="drawer-item">
            <q-item-section avatar><q-icon name="login" color="amber" /></q-item-section>
            <q-item-section class="text-grey-3">Войти</q-item-section>
          </q-item>

          <q-item clickable to="/register" class="drawer-item">
            <q-item-section avatar><q-icon name="person_add" color="amber" /></q-item-section>
            <q-item-section class="text-grey-3">Регистрация</q-item-section>
          </q-item>
        </template>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const leftDrawer = ref(false)
</script>

<style>
.header-dark {
  background: linear-gradient(180deg, #1a0a0e 0%, #12080a 100%);
  border-bottom: 2px solid #ffd700;
}

.header-title {
  font-family: 'Georgia', serif;
  color: #ffd700;
  text-shadow: 0 0 8px rgba(255, 215, 0, 0.4);
  letter-spacing: 2px;
}

.header-user {
  color: #ffd700;
  font-family: 'Georgia', serif;
  font-size: 1em;
  text-shadow: 0 0 6px rgba(255, 215, 0, 0.3);
  letter-spacing: 1px;
}

.drawer-dark {
  background: #0f080a !important;
  color: #ccc;
}

.drawer-dark .q-drawer {
  background: #0f080a;
}

.drawer-header {
  border-bottom: 1px solid #2a1a1e;
}

.drawer-item {
  transition: all 0.2s;
  border-left: 3px solid transparent;
}

.drawer-item:hover {
  background: rgba(255, 215, 0, 0.05);
  border-left: 3px solid #ffd700;
}
</style>