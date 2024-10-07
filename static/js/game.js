const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreboard = document.getElementById('scoreboard');
const gameOverText = document.getElementById('gameOver');
const winMessage = document.getElementById('winMessage');
const restartBtn = document.getElementById('restartBtn');
const pauseBtn = document.getElementById('pauseBtn');

let basket = { x: canvas.width / 2 - 30, width: 60, height: 20 };
let objects = [];
let score = 0;
let misses = 0;
let isGameOver = false;
let isPaused = false; 
const winningScore = 50;

let stars = []; 
function createStars() {
    stars = []; 
    for (let i = 0; i < 50; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height
        });
    }
}

function drawBackground() {
    ctx.fillStyle = '#001f3f'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, 2, 0, Math.PI * 2);
        ctx.fill();
    });
    ctx.fillStyle = '#FFFFE0'; 
    ctx.beginPath();
    ctx.arc(350, 50, 30, 0, Math.PI * 2);
    ctx.fill();
}

function drawBasket() {
    ctx.fillStyle = '#007bff'; 
    ctx.fillRect(basket.x, canvas.height - basket.height, basket.width, basket.height);
}

function drawObjects() {
    objects.forEach(obj => {
        ctx.fillStyle = '#ff5722'; 
        if (obj.shape === 'triangle') {
            ctx.beginPath();
            ctx.moveTo(obj.x, obj.y);
            ctx.lineTo(obj.x + 10, obj.y + 20);
            ctx.lineTo(obj.x - 10, obj.y + 20);
            ctx.closePath();
            ctx.fill();
        } else if (obj.shape === 'circle') {
            ctx.beginPath();
            ctx.arc(obj.x, obj.y, 10, 0, Math.PI * 2);
            ctx.fill();
        } else if (obj.shape === 'hexagon') {
            ctx.beginPath();
            const radius = 10;
            for (let i = 0; i < 6; i++) {
                ctx.lineTo(obj.x + radius * Math.cos(i * Math.PI / 3), obj.y + radius * Math.sin(i * Math.PI / 3));
            }
            ctx.closePath();
            ctx.fill();
        }
    });
}

function updateObjects() {
    objects.forEach((obj, index) => {
        obj.y += 2; 
        if (obj.y > canvas.height) {
            misses++;
            objects.splice(index, 1);
            if (misses >= 3) {
                gameOver();
            }
        } else if (
            obj.y + 20 >= canvas.height - basket.height &&
            obj.x + 10 >= basket.x &&
            obj.x - 10 <= basket.x + basket.width
        ) {
            score++;
            scoreboard.innerText = `Score: ${score}`;
            objects.splice(index, 1);
            
            if (score >= winningScore) {
                winGame(); 
            }
        }
    });
}

function spawnObject() {
    if (!isGameOver && !isPaused) { 
        const x = Math.random() * (canvas.width - 20);
        const shapes = ['triangle', 'circle', 'hexagon'];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        objects.push({ x, y: 0, shape });
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    drawBasket();
    drawObjects();
    updateObjects();

    if (!isGameOver && !isPaused) {
        requestAnimationFrame(gameLoop);
    }
}

function gameOver() {
    isGameOver = true;
    gameOverText.style.display = 'block';
    winMessage.style.display = 'none'; 
    pauseBtn.style.display = 'none'; 
}

function winGame() {
    isGameOver = true;
    winMessage.style.display = 'block';
    gameOverText.style.display = 'none';
    pauseBtn.style.display = 'none'; 
}

function restartGame() {
    score = 0;
    misses = 0;
    isGameOver = false;
    isPaused = false; 
    objects = [];
    scoreboard.innerText = `Score: ${score}`;
    gameOverText.style.display = 'none';
    winMessage.style.display = 'none';
    pauseBtn.style.display = 'block'; 
    createStars(); 
    gameLoop();
}

function togglePause() {
    isPaused = !isPaused; 
    pauseBtn.innerText = isPaused ? 'Resume' : 'Pause'; 
    if (!isPaused) {
        gameLoop(); 
    }
}

document.addEventListener('mousemove', (e) => {
    if (!isGameOver && !isPaused) {
        basket.x = e.clientX - canvas.offsetLeft - basket.width / 2;
    }
});

setInterval(spawnObject, 1000); 
restartBtn.addEventListener('click', restartGame);
pauseBtn.addEventListener('click', togglePause); 
createStars(); 
gameLoop();

