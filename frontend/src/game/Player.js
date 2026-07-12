export class Player {
  constructor(startX, startY) {
    this.x = startX
    this.y = startY
    this.width = 30
    this.height = 40
    this.vx = 0
    this.vy = 0
    this.speed = 5
    this.jumpPower = -14
    this.gravity = 0.7
    this.onGround = false
    this.invincible = false
    this.invincibleTimer = 0
    this.facing = 'right'
  }

  update(platforms, canvasWidth) {
    // Гравитация
    this.vy += this.gravity

    // Движение
    this.x += this.vx
    this.y += this.vy

    // Границы экрана
    if (this.x < 0) this.x = 0
    if (this.x + this.width > canvasWidth) this.x = canvasWidth - this.width

    // Платформы
    this.onGround = false
    for (const platform of platforms) {
      if (this.collidesWith(platform)) {
        // Приземление сверху
        if (this.vy > 0 && this.y + this.height - this.vy <= platform.y + 5) {
          this.y = platform.y - this.height
          this.vy = 0
          this.onGround = true
        }
      }
    }

    // Таймер неуязвимости
    if (this.invincible) {
      this.invincibleTimer--
      if (this.invincibleTimer <= 0) {
        this.invincible = false
      }
    }

    // Направление
    if (this.vx > 0) this.facing = 'right'
    if (this.vx < 0) this.facing = 'left'
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

    // Мигание при неуязвимости
    if (this.invincible && Math.floor(this.invincibleTimer / 5) % 2 === 0) {
      return
    }

    // Тело
    ctx.fillStyle = '#e74c3c'
    ctx.fillRect(screenX, this.y, this.width, this.height)

    // Глаза
    ctx.fillStyle = '#fff'
    const eyeX = this.facing === 'right' ? screenX + 18 : screenX + 6
    ctx.fillRect(eyeX, this.y + 8, 6, 6)
    ctx.fillStyle = '#000'
    ctx.fillRect(eyeX + 2, this.y + 10, 2, 2)
  }
}