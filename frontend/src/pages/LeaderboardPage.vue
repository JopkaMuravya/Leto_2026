<template>
  <q-page class="leaderboard-page q-pa-md">
    <div class="text-h3 text-weight-bold game-title text-center q-mb-lg">🏆 ЗАЛ СЛАВЫ</div>

    <div v-if="loading" class="flex flex-center q-mt-xl">
      <q-spinner-dots color="amber" size="4em" />
    </div>

    <div v-else-if="error" class="text-center text-negative q-mt-xl">
      <q-icon name="error" size="3em" />
      <div class="text-h6 q-mt-md">Не удалось загрузить рейтинг</div>
    </div>

    <div v-else-if="leaderboard.length === 0" class="text-center q-mt-xl">
      <q-icon name="leaderboard" size="4em" color="grey-6" />
      <div class="text-h6 text-grey-5 q-mt-md">Рейтинг пока пуст</div>
      <div class="text-grey-6">Стань первым героем в Зале Славы!</div>
    </div>

    <div v-else class="leaderboard-table q-mt-md">
      <div class="table-header row items-center q-pa-md">
        <div class="col-1 text-center">#</div>
        <div class="col-5">Герой</div>
        <div class="col-3 text-center">💰 Очки</div>
        <div class="col-3 text-center">🏆 Побед</div>
      </div>

      <div
        v-for="(player, index) in leaderboard"
        :key="player.username"
        :class="['table-row row items-center q-pa-md', getRowClass(index)]"
      >
        <div class="col-1 text-center">
          <span v-if="index === 0" class="medal">🥇</span>
          <span v-else-if="index === 1" class="medal">🥈</span>
          <span v-else-if="index === 2" class="medal">🥉</span>
          <span v-else class="rank-number">{{ index + 1 }}</span>
        </div>
        <div class="col-5">
          <span :class="['player-name', index < 3 ? 'top-player' : '']">
            {{ player.username }}
          </span>
        </div>
        <div class="col-3 text-center score-value">{{ player.total_score }}</div>
        <div class="col-3 text-center">{{ player.levels_won }}</div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { resultsApi } from '../api/results.js'

const leaderboard = ref([])
const loading = ref(true)
const error = ref(false)

onMounted(async () => {
  try {
    const response = await resultsApi.getLeaderboard()
    leaderboard.value = response.data.results || response.data
  } catch {
    error.value = true
  } finally {
    loading.value = false
  }
})

function getRowClass(index) {
  if (index === 0) return 'row-gold'
  if (index === 1) return 'row-silver'
  if (index === 2) return 'row-bronze'
  return ''
}
</script>

<style scoped>
.leaderboard-page {
  background: linear-gradient(135deg, #1a0f14 0%, #1a1018 50%, #120a10 100%);
  min-height: 100vh;
}

.game-title {
  color: #ffd700;
  text-shadow: 0 0 15px rgba(255, 215, 0, 0.5), 2px 2px 0 #000;
  font-family: 'Georgia', serif;
}

.leaderboard-table {
  max-width: 800px;
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.5);
  border: 2px solid #3a2530;
  border-radius: 12px;
  overflow: hidden;
}

.table-header {
  background: rgba(255, 215, 0, 0.08);
  border-bottom: 2px solid #ffd700;
  color: #ffd700;
  font-weight: bold;
  font-family: 'Georgia', serif;
  font-size: 1.1em;
}

.table-row {
  border-bottom: 1px solid #2a1520;
  transition: all 0.2s;
  color: #ccc;
}

.table-row:last-child {
  border-bottom: none;
}

.table-row:hover {
  background: rgba(255, 215, 0, 0.03);
}

.row-gold {
  background: rgba(255, 215, 0, 0.08);
}

.row-silver {
  background: rgba(192, 192, 192, 0.05);
}

.row-bronze {
  background: rgba(205, 127, 50, 0.05);
}

.medal {
  font-size: 1.5em;
}

.rank-number {
  color: #666;
  font-size: 0.9em;
}

.player-name {
  font-size: 1em;
}

.top-player {
  color: #ffd700;
  font-weight: bold;
}

.score-value {
  color: #ffd700;
  font-weight: bold;
}
</style>