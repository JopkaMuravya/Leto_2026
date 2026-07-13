export class Player {
  constructor(startX, startY) {
    this.x = startX
    this.y = startY
    this.width = 28
    this.height = 38
    this.vx = 0
    this.vy = 0
    this.speed = 5
    this.jumpPower = -14
    this.gravity = 0.7
    this.onGround = false
    this.invincible = false
    this.invincibleTimer = 0
    this.facing = 'right'
    this.walkFrame = 0
    this.walkTimer = 0
  }

  update(platforms, canvasWidth) {
    this.vy += this.gravity
    this.x += this.vx
    this.y += this.vy

    if (this.x < 0) this.x = 0
    if (this.x + this.width > canvasWidth) this.x = canvasWidth - this.width

    this.onGround = false
    for (const platform of platforms) {
      if (this.collidesWith(platform)) {
        if (this.vy > 0 && this.y + this.height - this.vy <= platform.y + 5) {
          this.y = platform.y - this.height
          this.vy = 0
          this.onGround = true
        }
      }
    }

    if (this.invincible) {
      this.invincibleTimer--
      if (this.invincibleTimer <= 0) {
        this.invincible = false
      }
    }

    if (this.vx > 0) this.facing = 'right'
    if (this.vx < 0) this.facing = 'left'

    // Анимация ходьбы
    if (this.vx !== 0 && this.onGround) {
      this.walkTimer++
      if (this.walkTimer > 6) {
        this.walkTimer = 0
        this.walkFrame = (this.walkFrame + 1) % 4
      }
    } else {
      this.walkFrame = 0
    }
  }

  jump() {
    if (this.onGround) {
      this.vy = this.jumpPower
    }
  }

  takeDamage() {
    if (!this.invincible) {
      this.invincible = true
      this.invincibleTimer = 60
      return true
    }
    return false
  }

  collidesWith(obj) {
    return (
      this.x < obj.x + obj.width &&
      this.x + this.width > obj.x &&
      this.y < obj.y + obj.height &&
      this.y + this.height > obj.y
    )
  }

  draw(ctx, cameraX) {
    const screenX = this.x - cameraX

    if (this.invincible && Math.floor(this.invincibleTimer / 5) % 2 === 0) {
      return
    }

    const cx = screenX + this.width / 2
    const dir = this.facing === 'right' ? 1 : -1

    // Тень
    ctx.fillStyle = 'rgba(0,0,0,0.3)'
    ctx.beginPath()
    ctx.ellipse(cx, this.y + this.height - 2, 10, 3, 0, 0, Math.PI * 2)
    ctx.fill()

    // Ноги
    const legOffset = this.walkFrame === 1 || this.walkFrame === 3 ? 3 : this.walkFrame === 2 ? 0 : -3
    ctx.fillStyle = '#2c3e50'
    ctx.fillRect(cx - 7, this.y + 26, 5, 12 + (this.walkFrame % 2 === 0 ? 0 : -legOffset))
    ctx.fillRect(cx + 2, this.y + 26, 5, 12 + (this.walkFrame % 2 === 0 ? 0 : legOffset))

    // Ботинки
    ctx.fillStyle = '#5d3a1a'
    ctx.fillRect(cx - 8, this.y + 34 + (this.walkFrame % 2 === 0 ? 0 : -legOffset), 7, 4)
    ctx.fillRect(cx + 1, this.y + 34 + (this.walkFrame % 2 === 0 ? 0 : legOffset), 7, 4)

    // Тело (туника)
    ctx.fillStyle = '#2980b9'
    ctx.fillRect(cx - 8, this.y + 10, 16, 18)

    // Пояс
    ctx.fillStyle = '#8b4513'
    ctx.fillRect(cx - 8, this.y + 24, 16, 3)

    // Руки
    ctx.fillStyle = '#3498db'
    const armSwing = this.walkFrame % 2 === 0 ? 2 : -2
    ctx.fillRect(cx - 12, this.y + 12 + armSwing, 5, 14)
    ctx.fillRect(cx + 7, this.y + 12 - armSwing, 5, 14)

    // Голова
    ctx.fillStyle = '#fdbcb4'
    ctx.beginPath()
    ctx.arc(cx, this.y + 6, 8, 0, Math.PI * 2)
    ctx.fill()

    // Шлем
    ctx.fillStyle = '#7f8c8d'
    ctx.beginPath()
    ctx.arc(cx, this.y + 4, 9, Math.PI, 0)
    ctx.fill()
    ctx.fillRect(cx - 9, this.y + 1, 18, 4)

    // Глаза
    ctx.fillStyle = '#fff'
    ctx.fillRect(cx + dir * 2 - 3, this.y + 4, 6, 5)
    ctx.fillStyle = '#2c3e50'
    ctx.fillRect(cx + dir * 4 - 1, this.y + 5, 3, 3)

    // Плащ
    ctx.fillStyle = '#1a5276'
    ctx.beginPath()
    ctx.moveTo(cx - 6, this.y + 12)
    ctx.lineTo(cx - 10, this.y + 28)
    ctx.lineTo(cx - 4, this.y + 28)
    ctx.fill()
  }
}