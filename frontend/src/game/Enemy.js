export class Enemy {
  constructor(config) {
    this.type = config.type
    this.x = config.x
    this.y = config.y
    this.startX = config.x
    this.startY = config.y
    this.width = 30
    this.height = 30
    this.range = config.range || 100
    this.speed = config.speed || 2
    this.direction = 1
  }

  update() {
    if (this.type === 'walker') {
      this.x += this.speed * this.direction
      if (this.x > this.startX + this.range || this.x < this.startX - this.range) {
        this.direction *= -1
      }
    }

    if (this.type === 'flyer') {
      this.y += this.speed * this.direction
      if (this.y > this.startY + this.range || this.y < this.startY - this.range) {
        this.direction *= -1
      }
    }
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

    if (this.type === 'walker') {
      ctx.fillStyle = '#8b0000'
      ctx.fillRect(screenX, this.y, this.width, this.height)
      // Шипы
      ctx.fillStyle = '#ff0000'
      for (let i = 0; i < 3; i++) {
        ctx.fillRect(screenX + 5 + i * 8, this.y - 6, 4, 6)
      }
    }

    if (this.type === 'flyer') {
      ctx.fillStyle = '#4a0080'
      ctx.fillRect(screenX, this.y, this.width, this.height)
      // Крылья
      ctx.fillStyle = '#7b2ff7'
      ctx.fillRect(screenX - 8, this.y + 5, 8, 10)
      ctx.fillRect(screenX + this.width, this.y + 5, 8, 10)
    }
  }
}