export class Platform {
  constructor(config) {
    this.x = config.x
    this.y = config.y
    this.width = config.width
    this.height = config.height
  }

  draw(ctx, cameraX) {
    const screenX = this.x - cameraX

    // Земля
    ctx.fillStyle = '#4a3728'
    ctx.fillRect(screenX, this.y, this.width, this.height)

    // Трава сверху
    ctx.fillStyle = '#3d5a1e'
    ctx.fillRect(screenX, this.y, this.width, 4)

    // Узор
    ctx.fillStyle = '#5c4433'
    for (let i = 0; i < this.width; i += 20) {
      ctx.fillRect(screenX + i, this.y + 8, 10, 3)
    }
  }
}