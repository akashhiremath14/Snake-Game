function init() {
    canvas = document.getElementById('board');
    W = canvas.width = 1000;
    H = canvas.height = 1000;
    pen = canvas.getContext('2d');
    cs = 66;
    gameOver = false;
    food = getFood();
    score = 5;
    foodimg = new Image();
    foodimg.src = "assets/apple.png";
    scoreboard = new Image();
    scoreboard.src = "assets/scoreboard.png"
    snakes = new Image();
    snakes.src = "assets/snakes.png"
    snake = {
        init_len: 5,
        color: "brown",
        cells: [],
        direction: "right",
        prevdirection: "right",
        createSnake: function() {
            for (var i = this.init_len; i > 0; i--) {
                this.cells.push({ x: i, y: 0 });
            }
        },
        drawSnake: function() {
            for (var i = 0; i < this.cells.length; i++) {
                pen.fillStyle = this.color;
                pen.fillRect(this.cells[i].x * cs, this.cells[i].y * cs, cs - 2, cs - 2)
            }
        },
        updateSnake: function() {

            var headX = this.cells[0].x;
            var headY = this.cells[0].y;

            if (headX == food.x && headY == food.y) {
                food = getFood();
                score++;
            } else {
                this.cells.pop();
            }
            var nextX, nextY;

            if (this.direction == "right") {

                nextX = headX + 1;
                nextY = headY;

            } else
            if (this.direction == "left") {
                nextX = headX - 1;
                nextY = headY;
            } else
            if (this.direction == "down") {
                nextX = headX;
                nextY = headY + 1;
            } else
            if (this.direction == "up") {
                nextX = headX;
                nextY = headY - 1;
            }
            this.cells.unshift({ x: nextX, y: nextY });

            var lastX = Math.round(W / cs);
            var lastY = Math.round(W / cs);

            if (this.cells[0].y < 0 || this.cells[0].x < 0 || this.cells[0].x > lastX || this.cells[0].y > lastY)
                gameOver = true;
        }
    }
    snake.createSnake();

    function pressed(e) {
        if (e.key == "ArrowRight" || e.key == "d") {
            snake.prevdirection = snake.direction;
            snake.direction = "right";
        } else
        if (e.key == "ArrowLeft" || e.key == "a") {
            snake.prevdirection = snake.direction;
            snake.direction = "left";
        } else
        if (e.key == "ArrowDown" || e.key == "s") {
            snake.prevdirection = snake.direction;
            snake.direction = "down";
        } else
        if (e.key == "ArrowUp" || e.key == "w") {
            snake.prevdirection = snake.direction;
            snake.direction = "up";
        }

    }
    document.addEventListener('keydown', pressed)
}

function getFood() {
    var foodx = Math.round(Math.random() * (W - cs) / cs);
    var foody = Math.round(Math.random() * (H - cs) / cs);

    var food = {
        x: foodx,
        y: foody,
    }
    return food;
}

function update() {
    snake.updateSnake();
}

function draw() {
    pen.clearRect(0, 0, W, H);
    snake.drawSnake();
    pen.drawImage(foodimg, food.x * cs, food.y * cs, cs, cs);
    pen.drawImage(scoreboard, 20, 0, 1.65 * cs, 1.65 * cs);
    pen.drawImage(snakes, 800, 800, 2.5 * cs, 2.5 * cs);
    pen.fillStyle = "black";
    pen.font = "50px Roboto";
    pen.fillText(score, 50, 50);

}

function gameloop() {
    if (gameOver == true) {
        clearInterval(f);
        alert("Game Over");
    }
    draw();
    update();
}

init()
f = setInterval(gameloop, 100);