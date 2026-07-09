<template>
  <q-page class="home-page flex flex-center column q-pa-md">
    <div class="text-h2 text-weight-bold game-logo q-mb-md">⚔️ ПЛАТФОРМЕР</div>
    <div class="text-h4 game-subtitle q-mb-xl">Приключение героя</div>

    <q-card class="home-card q-mb-xl">
      <q-card-section>
        <div class="text-h6 text-amber q-mb-sm">📜 Сказание</div>
        <p class="text-grey-4">
          Добро пожаловать в мир опасностей и сокровищ! Ты — отважный герой,
          чья цель — пройти все испытания, собрать золотые монеты и победить
          коварных врагов. Только сильнейшие попадут в Зал Славы.
        </p>
      </q-card-section>
    </q-card>

    <q-card class="home-card q-mb-xl">
      <q-card-section>
        <div class="text-h6 text-amber q-mb-sm">🎮 Управление</div>
        <div class="row q-col-gutter-md text-grey-4">
          <div class="col-4 text-center">
            <div class="key-icon">← →</div>
            <div class="q-mt-sm">Движение</div>
          </div>
          <div class="col-4 text-center">
            <div class="key-icon">↑</div>
            <div class="q-mt-sm">Прыжок</div>
          </div>
          <div class="col-4 text-center">
            <div class="key-icon">SPACE</div>
            <div class="q-mt-sm">Прыжок</div>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-btn
      v-if="!auth.isAuthenticated"
      color="amber"
      text-color="black"
      size="lg"
      label="⚔️ ВОЙТИ В ИГРУ"
      to="/login"
      class="home-btn"
    />
    <q-btn
      v-else
      color="amber"
      text-color="black"
      size="lg"
      label="🎯 К УРОВНЯМ"
      to="/levels"
      class="home-btn"
    />
  </q-page>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'
const auth = useAuthStore()
</script>

<style scoped>
.home-page {
  background: linear-gradient(135deg, #1a0f14 0%, #1a1018 50%, #120a10 100%);
  min-height: 100vh;
}

.game-logo {
  color: #ffd700;
  text-shadow: 0 0 20px rgba(255, 215, 0, 0.6), 3px 3px 0 #000;
  font-family: 'Georgia', serif;
  letter-spacing: 4px;
}

.game-subtitle {
  color: #c8a84e;
  font-family: 'Georgia', serif;
  font-style: italic;
  text-shadow: 1px 1px 0 #000;
}

.home-card {
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid #3a2530;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  max-width: 600px;
  width: 100%;
}

.key-icon {
  background: rgba(255, 215, 0, 0.1);
  border: 2px solid #ffd700;
  border-radius: 8px;
  padding: 8px;
  font-size: 1.2em;
  font-weight: bold;
  color: #ffd700;
  font-family: 'Courier New', monospace;
}

.home-btn {
  font-weight: bold;
  font-size: 1.2em;
  border: 2px solid #ffd700;
  padding: 16px 32px;
  transition: all 0.3s;
  letter-spacing: 2px;
}

.home-btn:hover {
  box-shadow: 0 0 25px rgba(255, 215, 0, 0.7);
  transform: scale(1.05);
}
</style>