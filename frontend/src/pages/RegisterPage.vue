<template>
  <q-page class="register-page flex flex-center">
    <q-card class="register-card">
      <q-card-section class="text-center q-pb-none">
        <div class="text-h4 text-weight-bold game-title">🛡️ НОВЫЙ ГЕРОЙ</div>
        <div class="text-subtitle1 q-mb-md game-subtitle">Создай своего персонажа</div>
      </q-card-section>

      <q-card-section class="q-px-md q-pt-sm q-pb-none">
        <q-form @submit="onSubmit">
          <q-input
            v-model="username"
            label="Имя героя"
            dark
            outlined
            color="amber"
            bg-color="grey-10"
            class="q-mb-md"
            :rules="[v => !!v || 'Выбери имя']"
          />

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
            :rules="[v => v.length >= 6 || 'Минимум 6 символов']"
          />

          <q-btn
            label="🎯 НАЧАТЬ ПРИКЛЮЧЕНИЕ"
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
          label="Уже есть герой? Войти"
          to="/login"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const username = ref('')
const email = ref('')
const password = ref('')
const loading = ref(false)

async function onSubmit() {
  loading.value = true
  try {
    await auth.register(username.value, email.value, password.value)
  } catch {
    alert('Ошибка регистрации. Возможно, email уже занят.')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.register-page {
  background: linear-gradient(135deg, #1a0f14 0%, #1a1018 50%, #120a10 100%);
  min-height: 100vh;
}

.register-card {
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