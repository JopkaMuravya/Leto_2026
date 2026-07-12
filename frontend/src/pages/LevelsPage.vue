<template>
  <q-page class="levels-page q-pa-md">
    <div class="text-h3 text-weight-bold game-title text-center q-mb-lg">🗺️ ВЫБОР УРОВНЯ</div>

    <div v-if="loading" class="flex flex-center q-mt-xl">
      <q-spinner-dots color="amber" size="4em" />
    </div>

    <div v-else-if="error" class="text-center text-negative q-mt-xl">
      <q-icon name="error" size="3em" />
      <div class="text-h6 q-mt-md">Не удалось загрузить уровни</div>
      <q-btn color="amber" text-color="black" label="Попробовать снова" @click="loadLevels" class="q-mt-md" />
    </div>

    <div v-else class="row q-col-gutter-lg q-mt-md">
      <div v-for="level in levels" :key="level.id" class="col-12 col-sm-6 col-md-4">
        <q-card class="level-card">
          <div class="level-number">{{ level.order }}</div>

          <q-card-section>
            <div class="text-h5 text-amber text-weight-bold">{{ level.name }}</div>
            <div class="text-grey-5 q-mt-sm">{{ level.description || 'Описание отсутствует' }}</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="level-info">
              <span>🏆 Очки за прохождение</span>
              <span>⚔️ Победи врагов</span>
              <span>💰 Собери монеты</span>
            </div>
          </q-card-section>

          <q-card-actions align="center" class="q-pb-md">
            <q-btn
              color="amber"
              text-color="black"
              label="⚔️ ИГРАТЬ"
              @click="$router.push(`/game/${level.id}`)"
              class="full-width play-btn"
            />
          </q-card-actions>
        </q-card>
      </div>

      <div v-if="levels.length === 0" class="col-12 text-center q-mt-xl">
        <q-icon name="sports_esports" size="4em" color="grey-6" />
        <div class="text-h6 text-grey-5 q-mt-md">Уровни пока не добавлены</div>
        <div class="text-grey-6">Загляни позже, герой!</div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { levelsApi } from '../api/levels'

const levels = ref([])
const loading = ref(true)
const error = ref(false)

async function loadLevels() {
  loading.value = true
  error.value = false
  try {
    const response = await levelsApi.getAll()
    levels.value = response.data.results || response.data
  } catch {
    error.value = true
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadLevels()
})
</script>

<style scoped>
.levels-page {
  background: linear-gradient(135deg, #1a0f14 0%, #1a1018 50%, #120a10 100%);
  min-height: 100vh;
}

.game-title {
  color: #ffd700;
  text-shadow: 0 0 15px rgba(255, 215, 0, 0.5), 2px 2px 0 #000;
  font-family: 'Georgia', serif;
}

.level-card {
  background: rgba(0, 0, 0, 0.7);
  border: 2px solid #3a2530;
  border-radius: 12px;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}

.level-card:hover {
  border-color: #ffd700;
  box-shadow: 0 0 25px rgba(255, 215, 0, 0.2);
  transform: translateY(-4px);
}

.level-number {
  position: absolute;
  top: -10px;
  right: -10px;
  background: #ffd700;
  color: #000;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2em;
  font-family: 'Georgia', serif;
  box-shadow: 0 2px 10px rgba(255, 215, 0, 0.4);
}

.level-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  color: #999;
  font-size: 0.9em;
}

.play-btn {
  font-weight: bold;
  font-size: 1.1em;
  border: 2px solid #ffd700;
  transition: all 0.3s;
}

.play-btn:hover {
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.6);
}
</style>