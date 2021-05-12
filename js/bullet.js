let hasBullet = false;

const bullet = function() {
    console.log('bullet classed');
    window.setTimeout(provideBullet, 5000);

    function provideBullet() {
        bulletDiv.style.display = 'block';
        console.log('bullet is there');
        hasBullet = true;
        window.addEventListener('keypress', bulletShotEvent);
    }

    const bulletShotEvent = function(event) {
        if (event.key === " ") {
            if (!hasBullet) return;
            bulletDiv.style.display = 'none';
            firingAnimation();
            hasBullet = false;
            window.removeEventListener('keypress', bulletShotEvent);
            window.setTimeout(provideBullet, 5000);
        }
    }

    function bulletCollision(y, index) {
        for (let enemy of enemies) {
            if (enemy.y <= y && index === enemy.lane && y - enemy.y <= carHeight) {
                enemy.y -= 1100;
                console.log('collision');
                return true;
            }
        }
        return false;
    }

    function firingAnimation() {
        let bulletTopPosition = carTopPosition;
        const bulletImg = new Image();
        let bulletIndex = lanePosition;
        const bulletPosition = carHorPosition[bulletIndex];
        bulletImg.src = './images/bullet.png'
        bulletImg.onload = () => {
            const fire = () => {
                ctx.drawImage(bulletImg, bulletPosition + 35, bulletTopPosition, 35, 55);
                bulletTopPosition -= laneSpeed * 2;
                if (bulletTopPosition < 0) return;
                if (bulletCollision(bulletTopPosition, bulletIndex)) return;
                requestAnimationFrame(fire);
            }
            fire();
        }

    }
}