const width = 600
const height = 600

let level = 1
let score = 0
let gaming = false

let grid
let snake
let food = []

let count = 0

function setup() {
  createCanvas(width, height);

  level = 1
  score = 0
  grid = new Grid(20, width, height);
  snake = new Snake(10, 10)

  makeFood(level, grid.width_in_squares, grid.height_in_squares)
  frameRate(10)

  grid.show()
  noLoop()
}

function draw() {
  background(0);
  stroke(255);

  // update where the snakes body is
  snake.update()

  // oob check
  if (grid.is_out_of_bounds(snake.head.x, snake.head.y)) {
    gameOver()
    return;
  }

  // insert game elements into the grid
  grid.clear_snake_from_grid()
  for (let f of food) {
    f.add_to_grid(grid)
  }
  snake.add_to_grid(grid)

  // draw the frame
  grid.show()

  // fail on butt eating
  if (snake.check_for_self_collision()) {
    gameOver()
    return;
  }

  // check for food being eaten
  let new_food = food
  for (let f of food) {
    if (!snake.check_for_eats_food(f)) {
      continue
    }
    snake.grow()
    new_food = new_food.filter(fobj => fobj !== f)
    score += 10
    let scoreString = `Score: ${score}`
    document.getElementById('score').innerHTML = scoreString;
    break;
  }
  food = new_food

  // level up!
  if (food.length == 0) {
    level++
    let levelString = `Level: ${level}`
    document.getElementById('level').innerHTML = levelString;
    makeFood(level, grid.width_in_squares, grid.height_in_squares)
  }
}

function keyPressed() {
  if (!gaming) {
    loop()
    gaming = true
  }
  if (key == 'a' || key == 'h' || keyCode == LEFT_ARROW) {
    snake.velocity = { x: -1, y: 0 }
  } else if (key == 'w' || key == 'k' || keyCode == UP_ARROW) {
    snake.velocity = { x: 0, y: -1 }
  } else if (key == 's' || key == 'j' || keyCode == DOWN_ARROW) {
    snake.velocity = { x: 0, y: 1 }
  } else if (key == 'd' || key == 'l' || keyCode == RIGHT_ARROW) {
    snake.velocity = { x: 1, y: 0 }
  } else if (key == ' ') {
    gaming = false
    setup()
    noLoop()
    return
  }
}

function makeFood(level, max_x, max_y) {
  food = []
  for (let i = 0; i < level; i++) {
    food.push(new Food(max_x, max_y))
  }
}

function gameOver() {
  gaming = false
  noLoop()
  background(0);
  fill(255)
  stroke(0)
  textSize(40)
  textAlign(CENTER);
  text(`Game over: Reached Level ${level}`, width / 2, height / 2)
  textSize(20)
  text("Space to restart", width / 2, 3 * height / 4)
}
