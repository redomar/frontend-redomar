var canvas;
var canvasContext;
var ballX = 10;
var ballY = 1;
var ballSpeedX = 5;
var ballSpeedY = 5;
var paddle1Y = 250;
var paddle2Y = 250;
var playerScore1 = 0;
var playerScore2 = 0;

var showWinScreen = false;

const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 10;
const SCORE_RATIO = 5;

window.onload = function() {
  this.canvas = this.document.getElementById("gameCanvas");
  this.canvasContext = this.canvas.getContext("2d");

  var fps = 60;
  this.setInterval(function() {
    this.movement();
    this.drawCanvas();
  }, 1000 / fps);

  this.canvas.addEventListener("mouseup", handleMouseClick);

  this.canvas.addEventListener("mousemove", function(evt) {
    var mousePos = followMouse(evt);
    paddle1Y = mousePos.y - PADDLE_HEIGHT / 2;
  });
};

function movement() {
  if (showWinScreen) {
    return;
  }
  chaseAlgorithm();
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballX < PADDLE_WIDTH + 10) {
    if (ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT) {
      ballSpeedX = -ballSpeedX;
      ballSpeedY = deltaChangeY(ballY, paddle1Y);
    }
    if (ballX < 0) {
      playerScore2++;
      resetBall();
    }
  }

  //bugfix, bouncing within paddle
  if (ballX <= 10 && ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT) {
    playerScore1++;
    resetBall();
  }

  if (ballX > this.canvas.width - PADDLE_WIDTH - 10) {
    if (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT) {
      ballSpeedX = -ballSpeedX;
      ballSpeedY = deltaChangeY(ballY, paddle2Y);
    } else if (ballX > this.canvas.width) {
      resetBall();
      playerScore1++;
    }

    //bugfix, bouncing within paddle
    if (
      ballX >= this.canvas.width - 10 &&
      ballY > paddle2Y &&
      ballY < paddle2Y + PADDLE_HEIGHT
    ) {
      resetBall();
      playerScore1++;
    }
  }

  if (ballY <= 5) {
    ballSpeedY = -ballSpeedY;
  }

  if (ballY > this.canvas.height - 8) {
    ballSpeedY = -ballSpeedY;
  }
}

function resetBall() {
  if (playerScore1 - playerScore2 == SCORE_RATIO) {
    showWinScreen = true;
  } else if (playerScore2 - playerScore1 == SCORE_RATIO) {
    showWinScreen = true;
  }
  ballX = this.canvas.width / 2;
  ballY = this.canvas.height / 2;
  ballSpeedX = -ballSpeedX;
}

function drawCanvas() {
  this.drawRect(0, 0, canvas.width, canvas.height, "black");
  if (showWinScreen) {
    this.canvasContext.fillStyle = "white";
    this.canvasContext.fillText(
      "Click to continue",
      this.canvas.width / 2 - 17 / 2,
      150
    );
    if (playerScore1 > playerScore2) {
      this.canvasContext.fillText(
        "Player 1 won best of 5",
        this.canvas.width / 2 - 22 / 2,
        190
      );
    } else if (playerScore2 > playerScore1) {
      this.canvasContext.fillText(
        "Player 2 won best of 5",
        this.canvas.width / 2 - 22 / 2,
        190
      );
    }
    return;
  }

  for (i = 0; i < this.canvas.height; i += 50) {
    this.drawRect(this.canvas.width / 2 - 1, i, 2, 25, "white");
  }

  this.drawRect(0, paddle1Y, PADDLE_WIDTH, PADDLE_HEIGHT, "white"); // left paddle
  this.drawRect(
    canvas.width - PADDLE_WIDTH,
    paddle2Y,
    PADDLE_WIDTH,
    PADDLE_HEIGHT,
    "white"
  );
  this.drawArc(ballX, ballY, 7, 0, Math.PI * 2, true, "red");

  this.canvasContext.fillStyle = "white";
  this.canvasContext.fillText(playerScore1, 100, 100, 1000);
  this.canvasContext.fillText(playerScore2, this.canvas.width - 100, 100, 1000);
}
function deltaChangeY(ballY, paddleY) {
  var deltaY = ballY - (paddleY + PADDLE_HEIGHT / 2);

  deltaY = deltaY * 0.2;
  return deltaY;
}

function chaseAlgorithm() {
  var paddle2YCentre = paddle2Y + PADDLE_HEIGHT / 2;

  if (ballX > this.canvas.width / 2) {
    if (paddle2YCentre < ballY - 35) {
      paddle2Y += 5;
    }
    if (paddle2YCentre > ballY - 35) {
      paddle2Y -= 5;
    }
  }
}

function handleMouseClick(evt) {
  if (showWinScreen) {
    playerScore2 = 0;
    playerScore1 = 0;
    showWinScreen = false;
  }
}

function followMouse(evt) {
  var rect = this.canvas.getBoundingClientRect();
  var root = this.document.documentElement;
  var mouseX = evt.clientX - rect.left - root.scrollLeft;
  var mouseY = evt.clientY - rect.top - root.scrollTop;
  return {
    x: mouseX,
    y: mouseY
  };
}

function drawRect(topX, topY, width, height, color) {
  this.canvasContext.fillStyle = color;
  this.canvasContext.fillRect(topX, topY, width, height);
}

function drawArc(topX, topY, rad, ang, end, wise, color) {
  this.canvasContext.beginPath();
  this.canvasContext.fillStyle = color;
  this.canvasContext.arc(topX, topY, rad, ang, end, wise);
  this.canvasContext.fill();
}
