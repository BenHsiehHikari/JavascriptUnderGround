class Game {
  constructor({ canvasId }){
    this.grid = { tiles: 20 , size: 30 };
    this.food = new Food();
    this.snake = new Snake();
    this.init(canvasId);
  }

  //選取canvas
  init(canvasId){
    let canvas = document.getElementById(canvasId);
    this.context = canvas.getContext('2d');
    addEventListener('keydown', (e) => { this.userInput(e) } );
    setInterval( () => { this.game() }, 1000 / 8);
  }

  userInput(event){
    const north = { x: +0, y: -1 };
    const east  = { x: +1, y: +0 };
    const south = { x: +0, y: +1 };
    const west  = { x: -1, y: +0 };
    const arrows = { left: 37, up: 38, right: 39, down: 40};
    const bearings = {
      [arrows.left]: west,
      [arrows.up]: north,
      [arrows.right]: east,
      [arrows.down]: south
    }

    let bearing = bearings[event.keyCode];
    this.snake.head(bearing);
  }

  game(){
    this.snake.move();
    let ap = this.food.position;
    let sp = this.snake.position;

    if (this.snake.position.x === this.food.position.x &&
        this.snake.position.y === this.food.position.y) {
      this.levelUp();
    }

    this.draw();
  }

  levelUp(){
    let calories = this.food.calories;
    this.snake.eat(this.food);
    delete this.food;

    this.food = Food.spawn({ max: this.grid.tiles, calories: calories });
  }

  draw() {
    // canvas
    this.context.fillStyle = "#666";
    this.context.fillRect(0, 0, this.grid.tiles * this.grid.size, this.grid.tiles * this.grid.size);

    // snake
    for(var i = 0; i < this.snake.trail.length; i++) {
      this.drawSquare(this.snake.trail[i], "purple");
    }

    // food
    this.drawSquare(this.food.position, "orange");
  }

  drawSquare(object, color){
    this.context.fillStyle = color;
    this.context.fillRect(
      object.x * this.grid.size,
      object.y * this.grid.size,
      this.grid.size - 2,
      this.grid.size - 2);
  }
}
class Snake {
  constructor(options = {}) {
    const defaults = {
      x: 10 , y: 10, max: 20,
      tail: 3,
      velocity: {x: 0, y: 0}
    };
    Object.assign(this, defaults, options);
    this.initialLength = options.tail || defaults.tail;
    this.trail = [];
  }

  get position(){
    return { x: this.x, y: this.y };
  }

  head(bearing){
    this.velocity.x = bearing.x;
    this.velocity.y = bearing.y;
  }

  move(){
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this._wrapWalls();
    this._detectCollision();
    this._updateTrail();
  }

  eat (food){
    this.tail += food.calories;
  }

  die (){
    this.tail = this.initialLength;
  }

  _wrapWalls(){
    if (this.x < 0) { this.x = this.max - 1; }
    if (this.x > this.max - 1) { this.x = 0; }
    if (this.y < 0) { this.y = this.max - 1; }
    if (this.y > this.max - 1) { this.y = 0; }
  }

  _detectCollision(){
    for(var i = 0; i < this.trail.length; i++) {
      if (this.trail[i].x === this.x && this.trail[i].y === this.y) {
        this.die();
      }
    }
  }

  _updateTrail(){
    this.trail.push({ x: this.x, y: this.y });
    while(this.trail.length > this.tail) {
      this.trail.shift();
    }
  }
}

class Food {
  constructor(options = {}) {
    const defaults = { x: 15 , y: 15, calories: 1};
    Object.assign(this, defaults, options);
  }

  get position(){
    return { x: this.x, y: this.y };
  }

  static spawn({ max, calories }){
    let ax = Math.floor(Math.random() * max);
    let ay = Math.floor(Math.random() * max);
    let sprout = new Food({ x: ax, y: ay, calories: calories});
    return sprout;
  }
}


window.addEventListener('load',()=>{
  let game = new Game(
    {
      canvasId: 'App'
    }
  );
});
