const gameBoard = document.querySelector('.game');
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector('.score');
const resetBtn = document.querySelector('.btn');
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;


// ! Mobile control
const arrows = document.querySelectorAll('.box');

// TODO Background and snake colors

const unitSize = 15;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let snake = [
   {
      x: unitSize * 2,
      y: 0
   },
   {
      x: unitSize,
      y: 0
   },
   {
      x: 0,
      y: 0
   }
];

window.addEventListener('keydown', changeDirection);

arrows.forEach(arrow => {
   arrow.addEventListener('click', changeDirection);
});

resetBtn.addEventListener('click', resetGame);

gameStart();

function gameStart() {
   running = true;
   createFood();
   drawFood();
   nextTick();

};
function nextTick() {
   if (running) {
      setTimeout(() => {
         clearBoard();
         drawFood();
         moveSnake();
         drawSnake();
         checkGameOver();
         nextTick();
      }, 100);
   } else {
      displayGameOver();
   }
};
function clearBoard() {
   ctx.fillStyle = "white";
   ctx.fillRect(0, 0, gameWidth, gameHeight);
};
function createFood() {
   function randomFood(min, max) {
      const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
      return randNum;
   }

   foodX = randomFood(0, gameWidth - unitSize)
   foodY = randomFood(0, gameWidth - unitSize)
};
function drawFood() {
   ctx.fillStyle = "red";
   ctx.fillRect(foodX, foodY, unitSize, unitSize)
};
function moveSnake() {
   const head = {
      x: snake[0].x + xVelocity,
      y: snake[0].y + yVelocity
   }

   snake.unshift(head);
   if (snake[0].x == foodX && snake[0].y == foodY) {
      score++;
      scoreText.textContent = score;
      createFood();
   } else {
      snake.pop();
   }
};
function drawSnake() {
   ctx.fillStyle = "lightgreen";
   ctx.strokeStyle = "black";
   snake.forEach(snakePart => {
      ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
      ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
   });
};


function changeDirection(e) {

   const mouseLeft = e.target.classList.contains('left');
   const mouseUp = e.target.classList.contains('up');
   const mouseRight = e.target.classList.contains('right');
   const mouseDown = e.target.classList.contains('down');

   const keyPressed = e.keyCode;
   const left = 37;
   const up = 38;
   const right = 39;
   const down = 40;

   const goingUp = (yVelocity == -unitSize);
   const goingDown = (yVelocity == unitSize);
   const goingRight = (xVelocity == unitSize);
   const goingLeft = (xVelocity == -unitSize);

   switch (true) {
      case ((keyPressed == left || mouseLeft == true) && !goingRight):
         xVelocity = -unitSize;
         yVelocity = 0;
         break;
      case ((keyPressed == up || mouseUp == true) && !goingDown):
         xVelocity = 0;
         yVelocity = -unitSize;
         break;
      case ((keyPressed == right || mouseRight == true) && !goingLeft):
         xVelocity = unitSize;
         yVelocity = 0;
         break;
      case ((keyPressed == down || mouseDown == true) && !goingUp):
         xVelocity = 0;
         yVelocity = unitSize;
         break;
   }

};

function checkGameOver() {
   switch (true) {
      case (snake[0].x < 0):
         running = false;
         break;
      case (snake[0].x >= gameWidth):
         running = false;
         break;
      case (snake[0].y < 0):
         running = false;
         break;
      case (snake[0].y > gameHeight):
         running = false;
         break;
   }

   for (let i = 1; i < snake.length; i++) {
      if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
         running = false;
      }
   }
};
function displayGameOver() {
   ctx.font = '50px Poppins';
   ctx.fillStyle = 'black';
   ctx.textAlign = 'center';
   ctx.fillText('GAME OVER!', gameWidth / 2, gameHeight / 2);
   running = false;
};
function resetGame() {
   score = 0;
   scoreText.textContent = '0';
   xVelocity = unitSize;
   yVelocity = 0;
   snake = [
      {
         x: unitSize * 2,
         y: 0
      },
      {
         x: unitSize,
         y: 0
      },
      {
         x: 0,
         y: 0
      }
   ];
   gameStart();
};
























