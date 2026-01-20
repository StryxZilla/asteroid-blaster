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
                    this.createExplosion(this.ship.x, this.ship.y, 20);
                    this.ship = null;
                    this.loseLife();
                    break;
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
    }

    update(keys) {
        // Rotation
        if (keys['ArrowLeft'] || keys['a'] || keys['A']) {
            this.angle -= SHIP_TURN_SPEED;
        }
        if (keys['ArrowRight'] || keys['d'] || keys['D']) {
            this.angle += SHIP_TURN_SPEED;
        }

        // Thrust
        if (keys['ArrowUp'] || keys['w'] || keys['W']) {
            this.vx += Math.cos(this.angle) * SHIP_THRUST;
            this.vy += Math.sin(this.angle) * SHIP_THRUST;
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

        const bullet = new Bullet(
            this.x + Math.cos(this.angle) * SHIP_SIZE,
            this.y + Math.sin(this.angle) * SHIP_SIZE,
            this.angle,
            this.game
        );
        this.game.bullets.push(bullet);
        this.shootCooldown = 10;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
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

// Initialize game
window.addEventListener('DOMContentLoaded', () => {
    new Game();
});
