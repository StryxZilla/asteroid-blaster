// Game constants
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const FPS = 60;
const FRICTION = 0.98;
const SHIP_SIZE = 15;
const SHIP_THRUST = 0.15;
const SHIP_TURN_SPEED = 0.08;
const BULLET_SPEED = 7;
const BULLET_LIFETIME = 50;
const ASTEROID_SPEED = 1.5;
const ASTEROID_VERTICES = 10;
const POWERUP_SPAWN_CHANCE = 0.3; // 30% chance on asteroid destruction
const POWERUP_LIFETIME = 600; // 10 seconds at 60 FPS
const POWERUP_SIZE = 12;
const POWERUP_DURATION = 300; // 5 seconds for timed power-ups

// Power-up types
const POWERUP_TYPES = {
    SHIELD: { name: 'Shield', color: '#00ffff', symbol: 'S' },
    RAPID_FIRE: { name: 'Rapid Fire', color: '#ff00ff', symbol: 'R' },
    TRIPLE_SHOT: { name: 'Triple Shot', color: '#ffff00', symbol: 'T' },
    SPEED_BOOST: { name: 'Speed Boost', color: '#00ff00', symbol: 'V' },
    EXTRA_LIFE: { name: 'Extra Life', color: '#ff0000', symbol: '+' }
};

// Game class
class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.keys = {};
        this.state = 'start'; // start, playing, gameover
        this.score = 0;
        this.lives = 3;
        this.level = 1;

        this.ship = null;
        this.asteroids = [];
        this.bullets = [];
        this.particles = [];
        this.powerUps = [];

        this.setupEventListeners();
        this.gameLoop();
    }

    setupEventListeners() {
        window.addEventListener('keydown', (e) => {
            this.keys[e.key] = true;

            // Start/restart game on Enter
            if (e.key === 'Enter') {
                if (this.state === 'start' || this.state === 'gameover') {
                    this.startGame();
                }
            }

            // Shoot on Space
            if (e.key === ' ' && this.state === 'playing' && this.ship) {
                e.preventDefault();
                this.ship.shoot();
            }
        });

        window.addEventListener('keyup', (e) => {
            this.keys[e.key] = false;
        });
    }

    startGame() {
        this.state = 'playing';
        this.score = 0;
        this.lives = 3;
        this.level = 1;
        this.ship = new Ship(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, this);
        this.asteroids = [];
        this.bullets = [];
        this.particles = [];
        this.powerUps = [];
        this.spawnAsteroids(4);
        this.updateUI();
    }

    spawnAsteroids(count) {
        for (let i = 0; i < count; i++) {
            let x, y;
            // Spawn away from ship
            do {
                x = Math.random() * CANVAS_WIDTH;
                y = Math.random() * CANVAS_HEIGHT;
            } while (
                this.ship &&
                Math.hypot(x - this.ship.x, y - this.ship.y) < 150
            );

            this.asteroids.push(new Asteroid(x, y, 3, this));
        }
    }

    nextLevel() {
        this.level++;
        this.spawnAsteroids(3 + this.level);
        this.updateUI();
    }

    updateUI() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('lives').textContent = this.lives;
        document.getElementById('level').textContent = this.level;
    }

    gameOver() {
        this.state = 'gameover';
    }

    loseLife() {
        this.lives--;
        this.updateUI();

        if (this.lives <= 0) {
            this.gameOver();
        } else {
            // Respawn ship
            this.ship = new Ship(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, this);
        }
    }

    addScore(points) {
        this.score += points;
        this.updateUI();
    }

    spawnPowerUp(x, y) {
        if (Math.random() < POWERUP_SPAWN_CHANCE) {
            const types = Object.keys(POWERUP_TYPES);
            const randomType = types[Math.floor(Math.random() * types.length)];
            this.powerUps.push(new PowerUp(x, y, randomType, this));
        }
    }

    update() {
        if (this.state !== 'playing') return;

        // Update ship
        if (this.ship) {
            this.ship.update(this.keys);
        }

        // Update asteroids
        this.asteroids.forEach(asteroid => asteroid.update());

        // Update bullets
        this.bullets = this.bullets.filter(bullet => {
            bullet.update();
            return bullet.lifetime > 0;
        });

        // Update particles
        this.particles = this.particles.filter(particle => {
            particle.update();
            return particle.lifetime > 0;
        });

        // Update power-ups
        this.powerUps = this.powerUps.filter(powerUp => {
            powerUp.update();
            return powerUp.lifetime > 0;
        });

        // Check collisions
        this.checkCollisions();

        // Check if level complete
        if (this.asteroids.length === 0) {
            this.nextLevel();
        }
    }

    checkCollisions() {
        // Bullet vs Asteroid
        for (let i = this.bullets.length - 1; i >= 0; i--) {
            for (let j = this.asteroids.length - 1; j >= 0; j--) {
                if (this.circleCollision(
                    this.bullets[i].x, this.bullets[i].y, 2,
                    this.asteroids[j].x, this.asteroids[j].y, this.asteroids[j].radius
                )) {
                    // Destroy bullet
                    this.bullets.splice(i, 1);

                    // Break up or destroy asteroid
                    const asteroid = this.asteroids[j];
                    this.createExplosion(asteroid.x, asteroid.y, asteroid.size * 5);

                    if (asteroid.size > 1) {
                        // Create smaller asteroids
                        for (let k = 0; k < 2; k++) {
                            this.asteroids.push(
                                new Asteroid(asteroid.x, asteroid.y, asteroid.size - 1, this)
                            );
                        }
                    }

                    // Award points
                    this.addScore((4 - asteroid.size) * 20);

                    // Chance to spawn power-up
                    this.spawnPowerUp(asteroid.x, asteroid.y);

                    // Remove asteroid
                    this.asteroids.splice(j, 1);
                    break;
                }
            }
        }

        // Ship vs Asteroid
        if (this.ship) {
            for (let i = this.asteroids.length - 1; i >= 0; i--) {
                if (this.circleCollision(
                    this.ship.x, this.ship.y, SHIP_SIZE,
                    this.asteroids[i].x, this.asteroids[i].y, this.asteroids[i].radius
                )) {
                    // Check if ship has shield
                    if (!this.ship.hasShield) {
                        this.createExplosion(this.ship.x, this.ship.y, 20);
                        this.ship = null;
                        this.loseLife();
                        break;
                    } else {
                        // Destroy asteroid but ship survives
                        const asteroid = this.asteroids[i];
                        this.createExplosion(asteroid.x, asteroid.y, asteroid.size * 5);

                        if (asteroid.size > 1) {
                            for (let k = 0; k < 2; k++) {
                                this.asteroids.push(
                                    new Asteroid(asteroid.x, asteroid.y, asteroid.size - 1, this)
                                );
                            }
                        }

                        this.asteroids.splice(i, 1);
                    }
                }
            }

            // Ship vs PowerUp
            for (let i = this.powerUps.length - 1; i >= 0; i--) {
                if (this.circleCollision(
                    this.ship.x, this.ship.y, SHIP_SIZE,
                    this.powerUps[i].x, this.powerUps[i].y, POWERUP_SIZE
                )) {
                    this.ship.activatePowerUp(this.powerUps[i].type);
                    this.powerUps.splice(i, 1);
                }
            }
        }
    }

    circleCollision(x1, y1, r1, x2, y2, r2) {
        const dx = x1 - x2;
        const dy = y1 - y2;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < r1 + r2;
    }

    createExplosion(x, y, count) {
        for (let i = 0; i < count; i++) {
            this.particles.push(new Particle(x, y));
        }
    }

    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        if (this.state === 'start') {
            this.drawText('ASTEROIDS', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 50, 48);
            this.drawText('Press ENTER to Start', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 20, 24);
            return;
        }

        if (this.state === 'gameover') {
            this.drawText('GAME OVER', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 50, 48);
            this.drawText(`Final Score: ${this.score}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 20, 24);
            this.drawText('Press ENTER to Restart', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 60, 20);
            return;
        }

        // Draw game objects
        if (this.ship) {
            this.ship.draw(this.ctx);
        }

        this.asteroids.forEach(asteroid => asteroid.draw(this.ctx));
        this.bullets.forEach(bullet => bullet.draw(this.ctx));
        this.particles.forEach(particle => particle.draw(this.ctx));
        this.powerUps.forEach(powerUp => powerUp.draw(this.ctx));

        // Draw active power-up indicators
        if (this.ship) {
            this.ship.drawPowerUpIndicators(this.ctx);
        }
    }

    drawText(text, x, y, size) {
        this.ctx.fillStyle = '#fff';
        this.ctx.font = `${size}px 'Courier New', monospace`;
        this.ctx.textAlign = 'center';
        this.ctx.fillText(text, x, y);
    }

    gameLoop() {
        this.update();
        this.draw();
        setTimeout(() => this.gameLoop(), 1000 / FPS);
    }
}

// Ship class
class Ship {
    constructor(x, y, game) {
        this.x = x;
        this.y = y;
        this.game = game;
        this.angle = 0;
        this.vx = 0;
        this.vy = 0;
        this.canShoot = true;
        this.shootCooldown = 0;

        // Power-up states
        this.hasShield = false;
        this.hasRapidFire = false;
        this.hasTripleShot = false;
        this.hasSpeedBoost = false;
        this.powerUpTimers = {
            shield: 0,
            rapidFire: 0,
            tripleShot: 0,
            speedBoost: 0
        };
    }

    update(keys) {
        // Update power-up timers
        this.updatePowerUps();

        // Apply speed boost multiplier
        const speedMultiplier = this.hasSpeedBoost ? 2 : 1;
        const turnSpeedMultiplier = this.hasSpeedBoost ? 1.5 : 1;

        // Rotation
        if (keys['ArrowLeft'] || keys['a'] || keys['A']) {
            this.angle -= SHIP_TURN_SPEED * turnSpeedMultiplier;
        }
        if (keys['ArrowRight'] || keys['d'] || keys['D']) {
            this.angle += SHIP_TURN_SPEED * turnSpeedMultiplier;
        }

        // Thrust
        if (keys['ArrowUp'] || keys['w'] || keys['W']) {
            this.vx += Math.cos(this.angle) * SHIP_THRUST * speedMultiplier;
            this.vy += Math.sin(this.angle) * SHIP_THRUST * speedMultiplier;
        }

        // Apply friction
        this.vx *= FRICTION;
        this.vy *= FRICTION;

        // Update position
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around screen
        if (this.x < 0) this.x = CANVAS_WIDTH;
        if (this.x > CANVAS_WIDTH) this.x = 0;
        if (this.y < 0) this.y = CANVAS_HEIGHT;
        if (this.y > CANVAS_HEIGHT) this.y = 0;

        // Shoot cooldown
        if (this.shootCooldown > 0) {
            this.shootCooldown--;
        }
    }

    shoot() {
        if (this.shootCooldown > 0) return;

        if (this.hasTripleShot) {
            // Shoot three bullets
            const angles = [-0.2, 0, 0.2]; // Spread pattern
            angles.forEach(angleOffset => {
                const bullet = new Bullet(
                    this.x + Math.cos(this.angle + angleOffset) * SHIP_SIZE,
                    this.y + Math.sin(this.angle + angleOffset) * SHIP_SIZE,
                    this.angle + angleOffset,
                    this.game
                );
                this.game.bullets.push(bullet);
            });
        } else {
            // Single bullet
            const bullet = new Bullet(
                this.x + Math.cos(this.angle) * SHIP_SIZE,
                this.y + Math.sin(this.angle) * SHIP_SIZE,
                this.angle,
                this.game
            );
            this.game.bullets.push(bullet);
        }

        // Rapid fire reduces cooldown
        this.shootCooldown = this.hasRapidFire ? 3 : 10;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);

        // Draw shield if active
        if (this.hasShield) {
            ctx.strokeStyle = '#00ffff';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(0, 0, SHIP_SIZE + 5, 0, Math.PI * 2);
            ctx.stroke();
        }

        ctx.rotate(this.angle);

        // Draw ship triangle
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(SHIP_SIZE, 0);
        ctx.lineTo(-SHIP_SIZE, -SHIP_SIZE / 2);
        ctx.lineTo(-SHIP_SIZE / 2, 0);
        ctx.lineTo(-SHIP_SIZE, SHIP_SIZE / 2);
        ctx.closePath();
        ctx.stroke();

        ctx.restore();
    }

    activatePowerUp(type) {
        switch(type) {
            case 'SHIELD':
                this.hasShield = true;
                this.powerUpTimers.shield = POWERUP_DURATION;
                break;
            case 'RAPID_FIRE':
                this.hasRapidFire = true;
                this.powerUpTimers.rapidFire = POWERUP_DURATION;
                break;
            case 'TRIPLE_SHOT':
                this.hasTripleShot = true;
                this.powerUpTimers.tripleShot = POWERUP_DURATION;
                break;
            case 'SPEED_BOOST':
                this.hasSpeedBoost = true;
                this.powerUpTimers.speedBoost = POWERUP_DURATION;
                break;
            case 'EXTRA_LIFE':
                this.game.lives++;
                this.game.updateUI();
                break;
        }
    }

    updatePowerUps() {
        // Update timers and deactivate expired power-ups
        if (this.powerUpTimers.shield > 0) {
            this.powerUpTimers.shield--;
            if (this.powerUpTimers.shield === 0) {
                this.hasShield = false;
            }
        }

        if (this.powerUpTimers.rapidFire > 0) {
            this.powerUpTimers.rapidFire--;
            if (this.powerUpTimers.rapidFire === 0) {
                this.hasRapidFire = false;
            }
        }

        if (this.powerUpTimers.tripleShot > 0) {
            this.powerUpTimers.tripleShot--;
            if (this.powerUpTimers.tripleShot === 0) {
                this.hasTripleShot = false;
            }
        }

        if (this.powerUpTimers.speedBoost > 0) {
            this.powerUpTimers.speedBoost--;
            if (this.powerUpTimers.speedBoost === 0) {
                this.hasSpeedBoost = false;
            }
        }
    }

    drawPowerUpIndicators(ctx) {
        const indicators = [];
        if (this.hasShield) indicators.push({ text: 'SHIELD', color: '#00ffff', timer: this.powerUpTimers.shield });
        if (this.hasRapidFire) indicators.push({ text: 'RAPID FIRE', color: '#ff00ff', timer: this.powerUpTimers.rapidFire });
        if (this.hasTripleShot) indicators.push({ text: 'TRIPLE SHOT', color: '#ffff00', timer: this.powerUpTimers.tripleShot });
        if (this.hasSpeedBoost) indicators.push({ text: 'SPEED BOOST', color: '#00ff00', timer: this.powerUpTimers.speedBoost });

        indicators.forEach((indicator, index) => {
            const y = 30 + index * 25;
            const timeLeft = (indicator.timer / 60).toFixed(1);
            ctx.fillStyle = indicator.color;
            ctx.font = '14px "Courier New", monospace';
            ctx.textAlign = 'left';
            ctx.fillText(`${indicator.text}: ${timeLeft}s`, 10, y);
        });
    }
}

// Asteroid class
class Asteroid {
    constructor(x, y, size, game) {
        this.x = x;
        this.y = y;
        this.size = size; // 1, 2, or 3
        this.game = game;
        this.radius = size * 15;

        // Random velocity
        const angle = Math.random() * Math.PI * 2;
        const speed = ASTEROID_SPEED / size;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;

        // Random rotation
        this.rotation = 0;
        this.rotationSpeed = (Math.random() - 0.5) * 0.04;

        // Random shape
        this.vertices = [];
        for (let i = 0; i < ASTEROID_VERTICES; i++) {
            const angle = (i / ASTEROID_VERTICES) * Math.PI * 2;
            const distance = this.radius * (0.7 + Math.random() * 0.3);
            this.vertices.push({
                x: Math.cos(angle) * distance,
                y: Math.sin(angle) * distance
            });
        }
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += this.rotationSpeed;

        // Wrap around screen
        if (this.x < -this.radius) this.x = CANVAS_WIDTH + this.radius;
        if (this.x > CANVAS_WIDTH + this.radius) this.x = -this.radius;
        if (this.y < -this.radius) this.y = CANVAS_HEIGHT + this.radius;
        if (this.y > CANVAS_HEIGHT + this.radius) this.y = -this.radius;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.beginPath();

        for (let i = 0; i < this.vertices.length; i++) {
            const v = this.vertices[i];
            if (i === 0) {
                ctx.moveTo(v.x, v.y);
            } else {
                ctx.lineTo(v.x, v.y);
            }
        }

        ctx.closePath();
        ctx.stroke();

        ctx.restore();
    }
}

// Bullet class
class Bullet {
    constructor(x, y, angle, game) {
        this.x = x;
        this.y = y;
        this.game = game;
        this.vx = Math.cos(angle) * BULLET_SPEED;
        this.vy = Math.sin(angle) * BULLET_SPEED;
        this.lifetime = BULLET_LIFETIME;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.lifetime--;

        // Wrap around screen
        if (this.x < 0) this.x = CANVAS_WIDTH;
        if (this.x > CANVAS_WIDTH) this.x = 0;
        if (this.y < 0) this.y = CANVAS_HEIGHT;
        if (this.y > CANVAS_HEIGHT) this.y = 0;
    }

    draw(ctx) {
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Particle class for explosions
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 + 1;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;

        this.lifetime = 30;
        this.maxLifetime = 30;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.lifetime--;
    }

    draw(ctx) {
        const alpha = this.lifetime / this.maxLifetime;
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fill();
    }
}

// PowerUp class
class PowerUp {
    constructor(x, y, type, game) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.game = game;
        this.lifetime = POWERUP_LIFETIME;
        this.pulsePhase = 0;

        // Slow drift
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.3;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.lifetime--;
        this.pulsePhase += 0.1;

        // Wrap around screen
        if (this.x < 0) this.x = CANVAS_WIDTH;
        if (this.x > CANVAS_WIDTH) this.x = 0;
        if (this.y < 0) this.y = CANVAS_HEIGHT;
        if (this.y > CANVAS_HEIGHT) this.y = 0;
    }

    draw(ctx) {
        const powerUpInfo = POWERUP_TYPES[this.type];
        const pulse = Math.sin(this.pulsePhase) * 2 + POWERUP_SIZE;

        ctx.save();
        ctx.translate(this.x, this.y);

        // Draw pulsing circle
        ctx.strokeStyle = powerUpInfo.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, pulse, 0, Math.PI * 2);
        ctx.stroke();

        // Draw inner circle
        ctx.fillStyle = powerUpInfo.color;
        ctx.beginPath();
        ctx.arc(0, 0, POWERUP_SIZE - 2, 0, Math.PI * 2);
        ctx.fill();

        // Draw symbol
        ctx.fillStyle = '#000';
        ctx.font = 'bold 14px "Courier New", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(powerUpInfo.symbol, 0, 1);

        ctx.restore();

        // Draw fading warning when lifetime is low
        if (this.lifetime < 120) {
            const alpha = (this.lifetime % 30) / 30;
            ctx.globalAlpha = alpha;
            ctx.strokeStyle = powerUpInfo.color;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(this.x, this.y, POWERUP_SIZE + 5, 0, Math.PI * 2);
            ctx.stroke();
            ctx.globalAlpha = 1;
        }
    }
}

// Initialize game
window.addEventListener('DOMContentLoaded', () => {
    new Game();
});
