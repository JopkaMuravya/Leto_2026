export class Coin {
  constructor(config) {
    this.x = config.x
    this.y = config.y
    this.width = 16
    this.height = 16
    this.value = config.value || 10
    this.collected = false
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
    if (this.collected) return

    const screenX = this.x - cameraX
    const bob = Math.sin(this.animTimer * 0.05) * 2

    // Монета
    ctx.fillStyle = '#ffd700'
    ctx.beginPath()
    ctx.arc(screenX + 8, this.y + 8 + bob, 8, 0, Math.PI * 2)
    ctx.fill()

    // Блики
    ctx.fillStyle = '#fff700'
    ctx.beginPath()
    ctx.arc(screenX + 5, this.y + 5 + bob, 3, 0, Math.PI * 2)
    ctx.fill()

    // Знак $
    ctx.fillStyle = '#b8860b'
    ctx.font = '10px Arial'
    ctx.fillText('$', screenX + 3, this.y + 12 + bob)
  }
}