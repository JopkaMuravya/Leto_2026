<template>
  <q-layout view="hHh Lpr lff">
    <q-header elevated class="bg-primary">
      <q-toolbar>
        <q-btn flat dense round icon="menu" @click="leftDrawer = !leftDrawer" />
        <q-toolbar-title>2D Платформер</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawer" bordered>
      <q-list>
        <q-item-label header>Меню</q-item-label>

        <q-item clickable to="/">
          <q-item-section avatar><q-icon name="home" /></q-item-section>
          <q-item-section>Главная</q-item-section>
        </q-item>

        <q-item clickable to="/login">
          <q-item-section avatar><q-icon name="login" /></q-item-section>
          <q-item-section>Войти</q-item-section>
        </q-item>

        <q-item clickable to="/levels">
          <q-item-section avatar><q-icon name="sports_esports" /></q-item-section>
          <q-item-section>Уровни</q-item-section>
        </q-item>

        <q-item clickable to="/leaderboard">
          <q-item-section avatar><q-icon name="leaderboard" /></q-item-section>
          <q-item-section>Рейтинг</q-item-section>
        </q-item>

        <q-item clickable to="/results">
          <q-item-section avatar><q-icon name="history" /></q-item-section>
          <q-item-section>История</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'

const leftDrawer = ref(false)
</script>