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
    this.animTimer = 0
  }

  update() {
    this.animTimer++

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
    const cx = screenX + this.width / 2
    const cy = this.y + this.height / 2

    if (this.type === 'walker') {
      this.drawWalker(ctx, cx, cy)
    }

    if (this.type === 'flyer') {
      this.drawFlyer(ctx, cx, cy)
    }
  }

  drawWalker(ctx, cx, cy) {
    // Тень
    ctx.fillStyle = 'rgba(0,0,0,0.3)'
    ctx.beginPath()
    ctx.ellipse(cx, cy + 13, 10, 3, 0, 0, Math.PI * 2)
    ctx.fill()

    // Ноги
    const legBob = Math.sin(this.animTimer * 0.15) * 3
    ctx.fillStyle = '#3e2723'
    ctx.fillRect(cx - 9, cy + 2, 6, 12 + legBob)
    ctx.fillRect(cx + 3, cy + 2, 6, 12 - legBob)

    // Тело (скелет)
    ctx.fillStyle = '#5d4037'
    ctx.fillRect(cx - 7, cy - 8, 14, 12)

    // Рёбра
    ctx.fillStyle = '#4e342e'
    for (let i = 0; i < 3; i++) {
      ctx.fillRect(cx - 5 + i * 3, cy - 6 + i * 3, 4, 2)
    }

    // Руки
    const armSwing = Math.sin(this.animTimer * 0.15) * 4
    ctx.fillStyle = '#3e2723'
    ctx.fillRect(cx - 14, cy - 4 + armSwing, 8, 4)
    ctx.fillRect(cx + 6, cy - 4 - armSwing, 8, 4)

    // Голова (череп)
    ctx.fillStyle = '#efebe9'
    ctx.beginPath()
    ctx.arc(cx, cy - 12, 8, 0, Math.PI * 2)
    ctx.fill()

    // Глаза (красное свечение)
    ctx.fillStyle = '#ff1744'
    ctx.shadowColor = '#ff1744'
    ctx.shadowBlur = 6
    ctx.beginPath()
    ctx.arc(cx - 3, cy - 13, 2, 0, Math.PI * 2)
    ctx.fill()
    ctx.beginPath()
    ctx.arc(cx + 3, cy - 13, 2, 0, Math.PI * 2)
    ctx.fill()
    ctx.shadowBlur = 0

    // Рога
    ctx.fillStyle = '#4e342e'
    ctx.beginPath()
    ctx.moveTo(cx - 5, cy - 19)
    ctx.lineTo(cx - 8, cy - 28)
    ctx.lineTo(cx - 2, cy - 18)
    ctx.fill()
    ctx.beginPath()
    ctx.moveTo(cx + 5, cy - 19)
    ctx.lineTo(cx + 8, cy - 28)
    ctx.lineTo(cx + 2, cy - 18)
    ctx.fill()
  }

  drawFlyer(ctx, cx, cy) {
    const wingFlap = Math.sin(this.animTimer * 0.1) * 8

    // Крылья
    ctx.fillStyle = '#311b92'
    ctx.beginPath()
    ctx.moveTo(cx, cy - 5)
    ctx.lineTo(cx - 20, cy - 10 + wingFlap)
    ctx.lineTo(cx - 20, cy + 5 + wingFlap)
    ctx.lineTo(cx, cy + 5)
    ctx.fill()

    ctx.beginPath()
    ctx.moveTo(cx, cy - 5)
    ctx.lineTo(cx + 20, cy - 10 - wingFlap)
    ctx.lineTo(cx + 20, cy + 5 - wingFlap)
    ctx.lineTo(cx, cy + 5)
    ctx.fill()

    // Тело
    ctx.fillStyle = '#4527a0'
    ctx.beginPath()
    ctx.arc(cx, cy, 9, 0, Math.PI * 2)
    ctx.fill()

    // Глаз
    ctx.fillStyle = '#ffea00'
    ctx.shadowColor = '#ffea00'
    ctx.shadowBlur = 8
    ctx.beginPath()
    ctx.arc(cx, cy - 2, 4, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#000'
    ctx.shadowBlur = 0
    ctx.beginPath()
    ctx.arc(cx, cy - 2, 2, 0, Math.PI * 2)
    ctx.fill()

    // Хвост
    ctx.fillStyle = '#7e57c2'
    ctx.beginPath()
    ctx.moveTo(cx, cy + 8)
    ctx.lineTo(cx - 5, cy + 18)
    ctx.lineTo(cx + 5, cy + 18)
    ctx.fill()
  }
}