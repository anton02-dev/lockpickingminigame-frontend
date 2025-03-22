let pins = [];
let targetHeights = [];
let timeLeft = 40;
let timerInterval;
let gameActive = true;
let succes = false;

function createSparkles(x, y) {
    for (let i = 0; i < 8; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        sparkle.style.setProperty('--tx', (Math.random() - 0.5) * 100 + 'px');
        sparkle.style.setProperty('--ty', (Math.random() - 0.5) * 100 + 'px');
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 800);
    }
}

function createPin(index) {
    const pin = document.createElement('div');
    pin.className = 'pin';
    pin.style.left = `${index * 70 + 30}px`;
    pin.style.height = '100px';
    
    pin.addEventListener('click', (e) => {
        if (gameActive) {
            adjustPin(pin);
            createSparkles(e.pageX, e.pageY);
        }
    });
    
    return pin;
}

function adjustPin(pin) {
    const heights = ['100px', '80px', '60px', '40px'];
    const currentHeight = pin.style.height;
    const currentIndex = heights.indexOf(currentHeight);
    const nextIndex = (currentIndex + 1) % heights.length;
    pin.style.height = heights[nextIndex];
    pin.classList.remove('correct', 'wrong');
}

function updateTimer() {
    const timerElement = document.getElementById('timer');
    timerElement.textContent = timeLeft;
    
    if (timeLeft <= 10) {
        timerElement.classList.add('danger');
    } else if (timeLeft <= 20) {
        timerElement.classList.add('warning');
    }
    
    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        gameOver();
    }
}

function gameOver() {
    gameActive = false;
    succes = false;
    document.getElementById('message').textContent = 'Time\'s up! Game Over!';
    document.getElementById('message').className = 'fail-message';
}

function initializeGame() {
    const lockArea = document.getElementById('lockArea');
    succes = false;
    lockArea.innerHTML = '';
    pins = [];
    targetHeights = [];
    timeLeft = 60;
    gameActive = true;
    
    document.getElementById('timer').className = 'timer';
    
    for (let i = 0; i < 5; i++) {
        const pin = createPin(i);
        lockArea.appendChild(pin);
        pins.push(pin);
        targetHeights.push(['100px', '80px', '60px', '40px'][Math.floor(Math.random() * 4)]);
    }
    
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimer();
    }, 1000);
    
    document.getElementById('message').textContent = '';
    document.getElementById('message').className = '';
}

function checkLock() {
    if (!gameActive) return;
    
    let allCorrect = true;
    
    pins.forEach((pin, index) => {
        if (pin.style.height === targetHeights[index]) {
            pin.classList.add('correct');
        } else {
            pin.classList.add('wrong');
            allCorrect = false;
        }
    });
    
    if (allCorrect) {
        clearInterval(timerInterval);
        gameActive = false;
        succes = true;
        document.getElementById('message').textContent = 'Success! Lock Picked!';
        document.getElementById('message').className = 'success-message';
        
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                createSparkles(
                    Math.random() * 400 + window.innerWidth/2 - 200,
                    Math.random() * 400 + window.innerHeight/2 - 200
                );
            }, i * 100);
        }
    }
}

function resetGame() {
    initializeGame();
}

initializeGame()