import { Player } from './Player.js'
import { Enemy } from './Enemy.js'
import { Coin } from './Coin.js'
import { Platform } from './Platform.js'
import { Finish } from './Finish.js'

export class Game {
  constructor(canvas, levelData, onEnd, onScoreUpdate, onLivesUpdate) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.levelData = levelData
    this.onEnd = onEnd
    this.onScoreUpdate = onScoreUpdate
    this.onLivesUpdate = onLivesUpdate

    this.canvasWidth = canvas.width
    this.canvasHeight = canvas.height
    this.worldWidth = levelData.width || 3200

    this.player = new Player(levelData.playerStart.x, levelData.playerStart.y)
    this.platforms = levelData.platforms.map(p => new Platform(p))
    this.enemies = levelData.enemies.map(e => new Enemy(e))
    this.coins = levelData.coins.map(c => new Coin(c))
    this.finish = new Finish(levelData.finish)

    this.lives = 3
    this.score = 0
    this.state = 'playing'
    this.keys = {}
    this.animFrameId = null
    this.startTime = Date.now()

    this.bindInput()
  }

  bindInput() {
    this.handleKeyDown = (e) => {
      this.keys[e.key] = true
      if (e.key === ' ' || e.key === 'ArrowUp') {
        e.preventDefault()
      }
    }
    this.handleKeyUp = (e) => {
      this.keys[e.key] = false
    }
    window.addEventListener('keydown', this.handleKeyDown)
    window.addEventListener('keyup', this.handleKeyUp)
  }

  unbindInput() {
    window.removeEventListener('keydown', this.handleKeyDown)
    window.removeEventListener('keyup', this.handleKeyUp)
  }

  start() {
    this.state = 'playing'
    this.startTime = Date.now()
    this.loop()
  }

  loop() {
    if (this.state !== 'playing') {
      const time = Math.round((Date.now() - this.startTime) / 1000)
      this.onEnd({
        score: this.score,
        won: this.state === 'won',
        livesLeft: this.lives,
        time: time,
      })
      return
    }

    this.update()
    this.draw()
    this.animFrameId = requestAnimationFrame(() => this.loop())
  }

  update() {
    // Управление
    this.player.vx = 0
    if (this.keys['ArrowLeft'] || this.keys['a']) this.player.vx = -this.player.speed
    if (this.keys['ArrowRight'] || this.keys['d']) this.player.vx = this.player.speed
    if (this.keys['ArrowUp'] || this.keys[' '] || this.keys['w']) this.player.jump()

    this.player.update(this.platforms, this.worldWidth)
    this.enemies.forEach(e => e.update())
    this.coins.forEach(c => c.update())
    this.finish.update()

    // Монеты
    for (const coin of this.coins) {
      if (!coin.collected && this.player.collidesWith(coin)) {
        coin.collected = true
        this.score += coin.value
        this.onScoreUpdate(this.score)
      }
    }

    // Враги
    for (const enemy of this.enemies) {
      if (this.player.collidesWith(enemy) && this.player.takeDamage()) {
        this.lives--
        this.onLivesUpdate(this.lives)
        if (this.lives <= 0) {
          this.state = 'lost'
        }
      }
    }

    // Финиш
    if (this.player.collidesWith(this.finish)) {
      this.state = 'won'
    }

    // Падение
    if (this.player.y > this.canvasHeight + 50) {
      this.lives = 0
      this.onLivesUpdate(0)
      this.state = 'lost'
    }
  }

  draw() {
    const ctx = this.ctx
    const cameraX = Math.max(0, this.player.x - this.canvasWidth / 3)

    // Фон
    const gradient = ctx.createLinearGradient(0, 0, 0, this.canvasHeight)
    gradient.addColorStop(0, '#1a0a2e')
    gradient.addColorStop(0.5, '#2d1b3d')
    gradient.addColorStop(1, '#1a0a1e')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight)

    // Дальний фон (горы)
    ctx.fillStyle = '#1a1025'
    for (let i = 0; i < 5; i++) {
      const mx = (i * 300 - cameraX * 0.3) % 1500
      ctx.beginPath()
      ctx.moveTo(mx, this.canvasHeight)
      ctx.lineTo(mx + 100, this.canvasHeight - 100)
      ctx.lineTo(mx + 200, this.canvasHeight)
      ctx.fill()
    }

    // Звёзды
    ctx.fillStyle = '#fff'
    for (let i = 0; i < 30; i++) {
      const sx = (i * 137 + 50) % this.canvasWidth
      const sy = (i * 89 + 20) % (this.canvasHeight / 2)
      ctx.fillRect(sx, sy, 2, 2)
    }

    // Объекты
    this.platforms.forEach(p => p.draw(ctx, cameraX))
    this.coins.forEach(c => c.draw(ctx, cameraX))
    this.enemies.forEach(e => e.draw(ctx, cameraX))
    this.finish.draw(ctx, cameraX)
    this.player.draw(ctx, cameraX)
  }

  destroy() {
    cancelAnimationFrame(this.animFrameId)
    this.unbindInput()
  }
}