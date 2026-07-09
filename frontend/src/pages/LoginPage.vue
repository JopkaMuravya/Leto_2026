<template>
  <q-page class="login-page flex flex-center">
    <q-card class="login-card">
      <q-card-section class="text-center q-pb-none">
        <div class="text-h4 text-weight-bold game-title">🎮 ВХОД</div>
        <div class="text-subtitle1 q-mb-md game-subtitle">Продолжи приключение</div>
      </q-card-section>

      <q-card-section class="q-px-md q-pt-sm q-pb-none">
        <q-form @submit="onSubmit">
          <q-input
            v-model="email"
            label="Email"
            type="email"
            dark
            outlined
            color="amber"
            bg-color="grey-10"
            class="q-mb-md"
            :rules="[v => !!v || 'Введи email']"
          />

          <q-input
            v-model="password"
            label="Пароль"
            type="password"
            dark
            outlined
            color="amber"
            bg-color="grey-10"
            class="q-mb-lg"
            :rules="[v => !!v || 'Введи пароль']"
          />

          <q-btn
            label="⚔️ ВОЙТИ"
            type="submit"
            color="amber"
            text-color="black"
            class="full-width game-btn"
            :loading="loading"
          />
        </q-form>
      </q-card-section>

      <q-card-section class="text-center q-py-sm">
        <q-btn
          flat
          color="amber"
          label="Нет аккаунта? Зарегистрироваться"
          to="/register"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const email = ref('')
const password = ref('')
const loading = ref(false)

async function onSubmit() {
  loading.value = true
  try {
    await auth.login(email.value, password.value)
  } catch {
    alert('Ошибка входа. Проверьте email и пароль.')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-page {
  background: linear-gradient(135deg, #1a0f14 0%, #1a1018 50%, #120a10 100%);
  min-height: 100vh;
}

.login-card {
  background: rgba(0, 0, 0, 0.7);
  border: 2px solid #ffd700;
  border-radius: 16px;
  box-shadow: 0 0 30px rgba(255, 215, 0, 0.3);
  width: 400px;
  max-width: 90vw;
}

.game-title {
  color: #ffd700;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.5), 2px 2px 0 #000;
  font-family: 'Georgia', serif;
  word-wrap: break-word;
}

.game-subtitle {
  color: #aaa;
  font-style: italic;
}

.game-btn {
  font-weight: bold;
  font-size: 1.1em;
  border: 2px solid #ffd700;
  transition: all 0.3s;
  padding: 12px;
}

.game-btn:hover {
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.6);
  transform: scale(1.02);
}
</style>