<template>
  <q-page class="results-page q-pa-md">
    <div class="text-h3 text-weight-bold game-title text-center q-mb-lg">📜 ИСТОРИЯ ПРИКЛЮЧЕНИЙ</div>

    <div v-if="loading" class="flex flex-center q-mt-xl">
      <q-spinner-dots color="amber" size="4em" />
    </div>

    <div v-else-if="error" class="text-center text-negative q-mt-xl">
      <q-icon name="error" size="3em" />
      <div class="text-h6 q-mt-md">Не удалось загрузить историю</div>
    </div>

    <div v-else-if="results.length === 0" class="text-center q-mt-xl">
      <q-icon name="history" size="4em" color="grey-6" />
      <div class="text-h6 text-grey-5 q-mt-md">Пока нет прохождений</div>
      <div class="text-grey-6">Отправляйся в приключение, герой!</div>
      <q-btn color="amber" text-color="black" label="К уровням" to="/levels" class="q-mt-lg" />
    </div>

    <div v-else class="row q-col-gutter-md q-mt-md">
      <div v-for="item in results" :key="item.id" class="col-12 col-sm-6 col-md-4">
        <q-card :class="['result-card', item.won ? 'card-won' : 'card-lost']">
          <q-card-section>
            <div class="row items-center justify-between">
              <div class="text-h6" :class="item.won ? 'text-amber' : 'text-red-5'">
                {{ item.won ? '🏆' : '💀' }} {{ item.level_name }}
              </div>
              <q-badge :color="item.won ? 'amber' : 'red-5'" text-color="black" class="q-px-md q-py-xs">
                {{ item.won ? 'ПОБЕДА' : 'ПОРАЖЕНИЕ' }}
              </q-badge>
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="result-stats">
              <div class="stat-item">
                <span class="stat-label">💰 Очки</span>
                <span class="stat-value text-amber">{{ item.score }}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">⏱️ Время</span>
                <span class="stat-value">{{ item.time }} сек</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">❤️ Жизней</span>
                <span class="stat-value">{{ item.lives_left }}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">📅 Дата</span>
                <span class="stat-value">{{ formatDate(item.created_at) }}</span>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { resultsApi } from '../api/results.js'

const results = ref([])
const loading = ref(true)
const error = ref(false)

onMounted(async () => {
  try {
    const response = await resultsApi.getMy()
    results.value = response.data.results || response.data
  } catch {
    error.value = true
  } finally {
    loading.value = false
  }
})

function formatDate(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>

<style scoped>
.results-page {
  background: linear-gradient(135deg, #1a0f14 0%, #1a1018 50%, #120a10 100%);
  min-height: 100vh;
}

.game-title {
  color: #ffd700;
  text-shadow: 0 0 15px rgba(255, 215, 0, 0.5), 2px 2px 0 #000;
  font-family: 'Georgia', serif;
}

.result-card {
  background: rgba(0, 0, 0, 0.7);
  border-radius: 12px;
  transition: all 0.3s;
}

.card-won {
  border: 2px solid #ffd700;
}

.card-lost {
  border: 2px solid #4a1520;
}

.result-card:hover {
  transform: translateY(-4px);
}

.card-won:hover {
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.2);
}

.card-lost:hover {
  box-shadow: 0 0 20px rgba(255, 50, 50, 0.15);
}

.result-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  min-width: 70px;
}

.stat-label {
  color: #888;
  font-size: 0.8em;
}

.stat-value {
  color: #ccc;
  font-size: 1em;
  font-weight: bold;
}
</style>