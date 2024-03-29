class Snake {
  constructor(x, y) {
    this.head = { x, y }
    this.len = 1
    this.body = [this.head]
    this.velocity = { x: 1, y: 0 }
  }

  update() {
    let new_head = {
      x: this.head.x + this.velocity.x,
      y: this.head.y + this.velocity.y,
    }

    console.log("before")
    console.log(this)
    this.body.unshift(new_head)
    this.head = new_head
    console.log("after")
    console.log(this)

    if (this.len < this.body.length) {
      this.body.pop()
    }
  }

  check_for_self_collision() {
    let tail = this.body.slice(1)

    for (let t of tail) {
      if (this.head.x == t.x && this.head.y == t.y) {
        return true;
      }
    }
    return false;
  }
  check_for_eats_food(food) {
    return this.head.x == food.x && this.head.y == food.y
  }

  grow() {
    console.log("grow")
    this.len++
  }

  add_to_grid(grid) {
    for (var part of this.body) {
      grid.grid[part.x][part.y] = Square.SnakeBody
    }
    grid.grid[this.head.x][this.head.y] = Square.SnakeHead
  }
}
