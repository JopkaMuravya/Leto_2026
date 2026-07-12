<template>
  <q-page class="game-page">
    <div class="hud">
      <span class="hud-item">❤️ {{ lives }}</span>
      <span class="hud-item">💰 {{ score }}</span>
    </div>

    <canvas ref="canvasRef" width="900" height="600" class="game-canvas"></canvas>

    <q-dialog v-model="showDialog" persistent>
      <q-card class="result-card">
        <q-card-section class="text-center">
          <div class="text-h3 q-mb-md">{{ result?.won ? '🎉 ПОБЕДА!' : '💀 ПОРАЖЕНИЕ' }}</div>
          <div class="text-h5 text-grey-4 q-mb-sm">Очки: {{ result?.score }}</div>
          <div class="text-h5 text-grey-4 q-mb-sm">Время: {{ result?.time }} сек</div>
          <div class="text-h5 text-grey-4 q-mb-lg">Жизней: {{ result?.livesLeft }}</div>
        </q-card-section>
        <q-card-actions align="center" class="q-pb-md">
          <q-btn color="amber" text-color="black" label="🔄 ПОВТОРИТЬ" @click="restartGame" class="q-mr-md" />
          <q-btn color="grey-7" label="🗺️ К УРОВНЯМ" @click="$router.push('/levels')" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { Game } from '../game/Game.js'
import { levelsApi } from '../api/levels.js'
import { resultsApi } from '../api/results.js'

const route = useRoute()
const canvasRef = ref(null)
const score = ref(0)
const lives = ref(3)
const showDialog = ref(false)
const result = ref(null)
let game = null
let levelData = null

onMounted(async () => {
  try {
    const response = await levelsApi.getById(route.params.id)
    levelData = response.data.data
    startNewGame()
  } catch (error) {
    console.error('Failed to load level:', error)
  }
})

onUnmounted(() => {
  game?.destroy()
})

function startNewGame() {
  game?.destroy()
  score.value = 0
  lives.value = 3

  game = new Game(
    canvasRef.value,
    levelData,
    onGameEnd,
    (s) => { score.value = s },
    (l) => { lives.value = l }
  )
  game.start()
}

async function onGameEnd(gameResult) {
  result.value = gameResult
  showDialog.value = true

  try {
    await resultsApi.save({
      level: route.params.id,
      score: gameResult.score,
      time: gameResult.time,
      won: gameResult.won,
      lives_left: gameResult.livesLeft,
    })
  } catch (error) {
    console.error('Failed to save result:', error)
  }
}

function restartGame() {
  showDialog.value = false
  startNewGame()
}
</script>

<style scoped>
.game-page {
  background: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  overflow: hidden;
}

.hud {
  display: flex;
  gap: 40px;
  padding: 10px;
  z-index: 10;
}

.hud-item {
  color: #ffd700;
  font-size: 1.5em;
  font-weight: bold;
  font-family: 'Georgia', serif;
  text-shadow: 0 0 8px rgba(255, 215, 0, 0.5);
}

.game-canvas {
  border: 2px solid #3a2530;
  border-radius: 4px;
}

.result-card {
  background: rgba(15, 5, 8, 0.95);
  border: 2px solid #ffd700;
  border-radius: 16px;
  box-shadow: 0 0 30px rgba(255, 215, 0, 0.3);
  min-width: 350px;
}
</style>