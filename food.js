class Food {
  constructor(max_x, max_y) {
    this.x = int(random(0, max_x))
    this.y = int(random(0, max_y))
  }

  add_to_grid(grid) {
    grid.grid[this.x][this.y] = Square.Food
  }
}
