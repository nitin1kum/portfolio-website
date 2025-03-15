const ballDiv = document.querySelector('.ball');
let velocityX = 0, velocityY = 0;
let lastMouseX = 0, lastMouseY = 0;
let lastTimestamp = 0;
let isDragging = false;
let gravity = 0.98, friction = 0.98, restitution = 0.6;
let currentX = 100, currentY = 100;

// Gravity & Motion Loop
function applyPhysics() {
    if (isDragging) return;
    const ballRect = ballDiv.getBoundingClientRect();
    const yBottom = window.innerHeight - ballRect.height;
    const xRight = window.innerWidth - ballRect.width;

    velocityY += gravity;
    velocityX *= friction;

    let newX = currentX + velocityX;
    let newY = currentY + velocityY;

    if (newX < 0) {
        newX = 0;
        velocityX *= -restitution;
    }
    if (newX > xRight) {
        newX = xRight;
        velocityX *= -restitution;
    }
    if (newY > yBottom) {
        newY = yBottom;
        if (velocityY < 3) {
            velocityY = 0;
        }
        else {
            velocityY *= -restitution;
        }
    }
    if (newY < 0) {
        newY = 0;
        velocityY *= -restitution;
    }

    ballDiv.style.transform = `translate(${newX}px, ${newY}px)`;
    currentX = newX;
    currentY = newY;

    requestAnimationFrame(applyPhysics);
}

// Capture Mouse Speed
function updateMouseSpeed(e) {
    let now = performance.now();
    let deltaTime = (now - lastTimestamp) / 50;

    if (deltaTime > 0) {
        velocityX = 0.2 * (e.clientX - lastMouseX) / deltaTime;
        velocityY = 0.2 * (e.clientY - lastMouseY) / deltaTime;
    }
    console.log(e)
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
    lastTimestamp = now;
}

// Dragging Logic
function startDrag(e) {
    e.preventDefault();
    isDragging = true;
    angularVelocity = 0; // Reset rotation when dragging starts

    function onMove(e) {
        e.preventDefault();
        let touch = e.type.includes('mouse') ? e : e.touches[0];
        updateMouseSpeed(touch);

        currentX = Math.min(Math.max(0, touch.clientX), window.innerWidth - ballDiv.getBoundingClientRect().width);
        currentY = Math.min(Math.max(0, touch.clientY), window.innerHeight - ballDiv.getBoundingClientRect().height);
        ballDiv.style.transform = `translate(${currentX}px, ${currentY}px)`;
    }

    function stopDrag(e) {
        isDragging = false;

        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', stopDrag);
        document.removeEventListener('touchmove', onMove, { passive: false });
        document.removeEventListener('touchend', stopDrag, { passive: false });

        applyPhysics();
    }

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchmove', onMove, { passive: false });
    document.addEventListener('touchend', stopDrag, { passive: false });
}

// Attach event listeners
ballDiv.addEventListener('mousedown', startDrag);
ballDiv.addEventListener('touchstart', startDrag, { passive: false });

// Keep Ball Inside Window
window.addEventListener('resize', () => {
    const ballRect = ballDiv.getBoundingClientRect();
    currentX = Math.min(currentX, window.innerWidth - ballRect.width);
    currentY = Math.min(currentY, window.innerHeight - ballRect.height);
    ballDiv.style.transform = `translate(${currentX}px, ${currentY}px)`;
});

// Start Physics
applyPhysics();
