export class Finish {
  constructor(config) {
    this.x = config.x
    this.y = config.y
    this.width = config.width || 50
    this.height = config.height || 50
    this.animTimer = 0
  }

  update() {
    this.animTimer++
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
    const pulse = Math.sin(this.animTimer * 0.05) * 3

    // Флаг
    ctx.fillStyle = '#8b4513'
    ctx.fillRect(screenX + 4, this.y + 5, 4, this.height - 10)

    // Полотно
    ctx.fillStyle = '#ffd700'
    ctx.beginPath()
    ctx.moveTo(screenX + 8, this.y + 5)
    ctx.lineTo(screenX + 35 + pulse, this.y + 18)
    ctx.lineTo(screenX + 8, this.y + 30)
    ctx.fill()

    // Звезда
    ctx.fillStyle = '#fff'
    ctx.font = '14px Arial'
    ctx.fillText('⭐', screenX + 14 + pulse / 2, this.y + 24)
  }
}