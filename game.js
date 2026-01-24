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
const POWERUP_SPAWN_CHANCE = 0.3;
const POWERUP_LIFETIME = 600;
const POWERUP_SIZE = 12;
const POWERUP_DURATION = 300;

// Visual effect constants
const STAR_LAYERS = 4;
const STARS_PER_LAYER = [80, 60, 40, 20];
const STAR_SPEEDS = [0.1, 0.25, 0.5, 0.8];
const GLOW_INTENSITY = 15;
const SCREEN_SHAKE_DECAY = 0.9;
const TRAIL_SPAWN_RATE = 2;

// Color palette - Neon cyberpunk theme
const COLORS = {
    shipPrimary: '#00ffff',
    shipSecondary: '#0088ff',
    shipEngine: '#ff4400',
    shipEngineCore: '#ffff00',
    bullet: '#ff00ff',
    bulletCore: '#ffffff',
    asteroidStroke: '#ff6600',
    asteroidFill: '#331100',
    asteroidGlow: '#ff4400',
    explosion: ['#ff0000', '#ff4400', '#ff8800', '#ffcc00', '#ffffff'],
    stars: ['#ffffff', '#aaccff', '#ffccaa', '#aaffcc'],
    background: '#0a0015',
    nebula1: '#1a0033',
    nebula2: '#001133'
};

// Power-up types
const POWERUP_TYPES = {
    SHIELD: { name: 'Shield', color: '#00ffff', symbol: 'S' },
    RAPID_FIRE: { name: 'Rapid Fire', color: '#ff00ff', symbol: 'R' },
    TRIPLE_SHOT: { name: 'Triple Shot', color: '#ffff00', symbol: 'T' },
    SPEED_BOOST: { name: 'Speed Boost', color: '#00ff00', symbol: 'V' },
    EXTRA_LIFE: { name: 'Extra Life', color: '#ff0000', symbol: '+' }
};

// Inventory item types
const ITEM_TYPES = {
    REPAIR_KIT: { name: 'Repair Kit', color: '#ff6b6b', symbol: '♥', description: 'Restore 1 life', rarity: 0.15 },
    BOMB: { name: 'Bomb', color: '#ff8c00', symbol: '✸', description: 'Destroy all asteroids', rarity: 0.10 },
    FREEZE: { name: 'Freeze', color: '#87ceeb', symbol: '❄', description: 'Freeze asteroids for 5s', rarity: 0.20 },
    MAGNET: { name: 'Magnet', color: '#da70d6', symbol: '⊛', description: 'Attract items for 10s', rarity: 0.25 },
    SCORE_BOOST: { name: 'Score x2', color: '#ffd700', symbol: '★', description: 'Double points for 15s', rarity: 0.30 }
};

const MAX_INVENTORY_SLOTS = 5;
const ITEM_SPAWN_CHANCE = 0.25;
const ITEM_SIZE = 10;
const ITEM_LIFETIME = 480;

// ============== STARFIELD CLASS ==============
class StarField {
    constructor() {
        this.layers = [];
        for (let i = 0; i < STAR_LAYERS; i++) {
            const stars = [];
            for (let j = 0; j < STARS_PER_LAYER[i]; j++) {
                stars.push({
                    x: Math.random() * CANVAS_WIDTH,
                    y: Math.random() * CANVAS_HEIGHT,
                    size: (i + 1) * 0.5 + Math.random() * 0.5,
                    brightness: 0.3 + Math.random() * 0.7,
                    twinklePhase: Math.random() * Math.PI * 2,
                    twinkleSpeed: 0.02 + Math.random() * 0.03,
                    color: COLORS.stars[Math.floor(Math.random() * COLORS.stars.length)]
                });
            }
            this.layers.push({ stars, speed: STAR_SPEEDS[i] });
        }
        
        // Nebula clouds for atmosphere
        this.nebulae = [];
        for (let i = 0; i < 5; i++) {
            this.nebulae.push({
                x: Math.random() * CANVAS_WIDTH,
                y: Math.random() * CANVAS_HEIGHT,
                radius: 100 + Math.random() * 200,
                color: Math.random() > 0.5 ? COLORS.nebula1 : COLORS.nebula2,
                phase: Math.random() * Math.PI * 2
            });
        }
    }

    update(shipVx = 0, shipVy = 0) {
        // Move stars based on parallax and ship movement
        this.layers.forEach((layer, layerIndex) => {
            layer.stars.forEach(star => {
                // Parallax movement based on ship velocity
                star.x -= shipVx * layer.speed * 0.5;
                star.y -= shipVy * layer.speed * 0.5;
                
                // Constant drift
                star.y += layer.speed * 0.3;
                
                // Twinkle
                star.twinklePhase += star.twinkleSpeed;
                
                // Wrap around
                if (star.x < 0) star.x += CANVAS_WIDTH;
                if (star.x > CANVAS_WIDTH) star.x -= CANVAS_WIDTH;
                if (star.y < 0) star.y += CANVAS_HEIGHT;
                if (star.y > CANVAS_HEIGHT) star.y -= CANVAS_HEIGHT;
            });
        });
        
        // Animate nebulae
        this.nebulae.forEach(nebula => {
            nebula.phase += 0.005;
        });
    }

    draw(ctx) {
        // Draw nebula clouds first
        this.nebulae.forEach(nebula => {
            const pulseFactor = 0.8 + Math.sin(nebula.phase) * 0.2;
            const gradient = ctx.createRadialGradient(
                nebula.x, nebula.y, 0,
                nebula.x, nebula.y, nebula.radius * pulseFactor
            );
            gradient.addColorStop(0, nebula.color + '30');
            gradient.addColorStop(0.5, nebula.color + '15');
            gradient.addColorStop(1, 'transparent');
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(nebula.x, nebula.y, nebula.radius * pulseFactor, 0, Math.PI * 2);
            ctx.fill();
        });
        
        // Draw star layers (back to front)
        this.layers.forEach((layer, layerIndex) => {
            layer.stars.forEach(star => {
                const twinkle = 0.5 + Math.sin(star.twinklePhase) * 0.5;
                const alpha = star.brightness * twinkle;
                
                ctx.save();
                
                // Glow effect for brighter/closer stars
                if (layerIndex >= 2) {
                    ctx.shadowColor = star.color;
                    ctx.shadowBlur = star.size * 3;
                }
                
                ctx.fillStyle = star.color;
                ctx.globalAlpha = alpha;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();
                
                // Add cross flare for brightest stars
                if (layerIndex === 3 && star.brightness > 0.8) {
                    ctx.strokeStyle = star.color;
                    ctx.lineWidth = 0.5;
                    ctx.globalAlpha = alpha * 0.5;
                    ctx.beginPath();
                    ctx.moveTo(star.x - star.size * 3, star.y);
                    ctx.lineTo(star.x + star.size * 3, star.y);
                    ctx.moveTo(star.x, star.y - star.size * 3);
                    ctx.lineTo(star.x, star.y + star.size * 3);
                    ctx.stroke();
                }
                
                ctx.restore();
            });
        });
    }
}

// ============== TRAIL PARTICLE CLASS ==============
class TrailParticle {
    constructor(x, y, color, size, lifetime, vx = 0, vy = 0) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = size;
        this.lifetime = lifetime;
        this.maxLifetime = lifetime;
        this.vx = vx + (Math.random() - 0.5) * 0.5;
        this.vy = vy + (Math.random() - 0.5) * 0.5;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.lifetime--;
        this.size *= 0.95;
    }

    draw(ctx) {
        const alpha = this.lifetime / this.maxLifetime;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = this.size * 2;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

// ============== EXPLOSION PARTICLE CLASS ==============
class ExplosionParticle {
    constructor(x, y, color, isCore = false) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.isCore = isCore;
        
        const angle = Math.random() * Math.PI * 2;
        const speed = isCore ? Math.random() * 2 + 1 : Math.random() * 5 + 2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        
        this.lifetime = isCore ? 40 : 25 + Math.random() * 15;
        this.maxLifetime = this.lifetime;
        this.size = isCore ? 2 + Math.random() * 3 : 1 + Math.random() * 3;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.3;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.98;
        this.vy *= 0.98;
        this.lifetime--;
        this.rotation += this.rotSpeed;
    }

    draw(ctx) {
        const alpha = this.lifetime / this.maxLifetime;
        const size = this.size * (0.5 + alpha * 0.5);
        
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        // Glow effect
        ctx.shadowColor = this.color;
        ctx.shadowBlur = size * 4;
        ctx.fillStyle = this.color;
        
        if (this.isCore) {
            // Core particles are circular
            ctx.beginPath();
            ctx.arc(0, 0, size, 0, Math.PI * 2);
            ctx.fill();
        } else {
            // Debris particles are angular
            ctx.beginPath();
            ctx.moveTo(-size, -size * 0.5);
            ctx.lineTo(size, 0);
            ctx.lineTo(-size, size * 0.5);
            ctx.closePath();
            ctx.fill();
        }
        
        ctx.restore();
    }
}

// ============== SCREEN SHAKE CLASS ==============
class ScreenShake {
    constructor() {
        this.intensity = 0;
        this.offsetX = 0;
        this.offsetY = 0;
        this.angle = 0;
    }

    trigger(intensity) {
        this.intensity = Math.max(this.intensity, intensity);
    }

    update() {
        if (this.intensity > 0.1) {
            this.angle = Math.random() * Math.PI * 2;
            this.offsetX = Math.cos(this.angle) * this.intensity;
            this.offsetY = Math.sin(this.angle) * this.intensity;
            this.intensity *= SCREEN_SHAKE_DECAY;
        } else {
            this.intensity = 0;
            this.offsetX = 0;
            this.offsetY = 0;
        }
    }

    apply(ctx) {
        ctx.translate(this.offsetX, this.offsetY);
    }
}

// ============== GAME CLASS ==============
class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.keys = {};
        this.state = 'start';
        this.score = 0;
        this.lives = 3;
        this.level = 1;

        this.ship = null;
        this.asteroids = [];
        this.bullets = [];
        this.particles = [];
        this.trailParticles = [];
        this.explosionParticles = [];
        this.powerUps = [];
        this.items = [];
        this.inventory = [];

        // Visual systems
        this.starField = new StarField();
        this.screenShake = new ScreenShake();
        
        // Global visual effects
        this.flashAlpha = 0;
        this.flashColor = '#ffffff';

        // Active item effects
        this.magnetActive = false;
        this.magnetTimer = 0;
        this.scoreMultiplier = 1;
        this.scoreMultiplierTimer = 0;
        this.freezeActive = false;
        this.freezeTimer = 0;

        // Animation timers
        this.time = 0;
        this.titlePulse = 0;

        this.setupEventListeners();
        this.gameLoop();
    }

    setupEventListeners() {
        window.addEventListener('keydown', (e) => {
            this.keys[e.key] = true;

            if (e.key === 'Enter') {
                if (this.state === 'start' || this.state === 'gameover') {
                    this.startGame();
                }
            }

            if (e.key === ' ' && this.state === 'playing' && this.ship) {
                e.preventDefault();
                this.ship.shoot();
            }

            if (this.state === 'playing' && e.key >= '1' && e.key <= '5') {
                const slotIndex = parseInt(e.key) - 1;
                this.useInventoryItem(slotIndex);
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
        this.trailParticles = [];
        this.explosionParticles = [];
        this.powerUps = [];
        this.items = [];
        this.inventory = [];
        this.magnetActive = false;
        this.magnetTimer = 0;
        this.scoreMultiplier = 1;
        this.scoreMultiplierTimer = 0;
        this.freezeActive = false;
        this.freezeTimer = 0;

        this.spawnAsteroids(4);
        this.updateUI();
        this.updateInventoryUI();
        
        // Flash effect on start
        this.triggerFlash('#00ffff', 0.3);
    }

    triggerFlash(color, alpha) {
        this.flashColor = color;
        this.flashAlpha = alpha;
    }

    spawnAsteroids(count) {
        for (let i = 0; i < count; i++) {
            let x, y;
            do {
                x = Math.random() * CANVAS_WIDTH;
                y = Math.random() * CANVAS_HEIGHT;
            } while (this.ship && Math.hypot(x - this.ship.x, y - this.ship.y) < 150);

            this.asteroids.push(new Asteroid(x, y, 3, this));
        }
    }

    nextLevel() {
        this.level++;
        this.spawnAsteroids(3 + this.level);
        this.updateUI();
        this.triggerFlash('#00ff00', 0.2);
    }

    updateUI() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('lives').textContent = this.lives;
        document.getElementById('level').textContent = this.level;
    }

    gameOver() {
        this.state = 'gameover';
        this.triggerFlash('#ff0000', 0.5);
    }

    loseLife() {
        this.lives--;
        this.updateUI();
        this.screenShake.trigger(20);
        this.triggerFlash('#ff0000', 0.3);

        if (this.lives <= 0) {
            this.gameOver();
        } else {
            this.ship = new Ship(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, this);
        }
    }

    addScore(points) {
        this.score += points * this.scoreMultiplier;
        this.updateUI();
    }

    spawnPowerUp(x, y) {
        if (Math.random() < POWERUP_SPAWN_CHANCE) {
            const types = Object.keys(POWERUP_TYPES);
            const randomType = types[Math.floor(Math.random() * types.length)];
            this.powerUps.push(new PowerUp(x, y, randomType, this));
        }
    }

    spawnItem(x, y, asteroidSize) {
        const dropChance = ITEM_SPAWN_CHANCE * (4 - asteroidSize);
        if (Math.random() < dropChance) {
            const types = Object.keys(ITEM_TYPES);
            const totalRarity = types.reduce((sum, t) => sum + ITEM_TYPES[t].rarity, 0);
            let roll = Math.random() * totalRarity;

            let selectedType = types[0];
            for (const type of types) {
                roll -= ITEM_TYPES[type].rarity;
                if (roll <= 0) {
                    selectedType = type;
                    break;
                }
            }

            this.items.push(new Item(x, y, selectedType, this));
        }
    }

    collectItem(item) {
        if (this.inventory.length < MAX_INVENTORY_SLOTS) {
            this.inventory.push(item.type);
            this.updateInventoryUI();
            return true;
        }
        return false;
    }

    useInventoryItem(slotIndex) {
        if (slotIndex < 0 || slotIndex >= this.inventory.length) return;

        const itemType = this.inventory[slotIndex];
        let used = false;

        switch (itemType) {
            case 'REPAIR_KIT':
                this.lives++;
                this.updateUI();
                this.triggerFlash('#ff6b6b', 0.2);
                used = true;
                break;

            case 'BOMB':
                this.asteroids.forEach(asteroid => {
                    this.createExplosion(asteroid.x, asteroid.y, asteroid.size * 8);
                    this.addScore((4 - asteroid.size) * 10);
                });
                this.asteroids = [];
                this.screenShake.trigger(30);
                this.triggerFlash('#ff8c00', 0.5);
                used = true;
                break;

            case 'FREEZE':
                this.freezeActive = true;
                this.freezeTimer = 300;
                this.asteroids.forEach(asteroid => {
                    asteroid.frozenVx = asteroid.vx;
                    asteroid.frozenVy = asteroid.vy;
                    asteroid.frozenRotSpeed = asteroid.rotationSpeed;
                    asteroid.vx = 0;
                    asteroid.vy = 0;
                    asteroid.rotationSpeed = 0;
                });
                this.triggerFlash('#87ceeb', 0.3);
                used = true;
                break;

            case 'MAGNET':
                this.magnetActive = true;
                this.magnetTimer = 600;
                this.triggerFlash('#da70d6', 0.2);
                used = true;
                break;

            case 'SCORE_BOOST':
                this.scoreMultiplier = 2;
                this.scoreMultiplierTimer = 900;
                this.triggerFlash('#ffd700', 0.2);
                used = true;
                break;
        }

        if (used) {
            this.inventory.splice(slotIndex, 1);
            this.updateInventoryUI();
        }
    }

    updateItemEffects() {
        if (this.magnetActive) {
            this.magnetTimer--;
            if (this.magnetTimer <= 0) {
                this.magnetActive = false;
            }
        }

        if (this.scoreMultiplierTimer > 0) {
            this.scoreMultiplierTimer--;
            if (this.scoreMultiplierTimer <= 0) {
                this.scoreMultiplier = 1;
            }
        }

        if (this.freezeActive) {
            this.freezeTimer--;
            if (this.freezeTimer <= 0) {
                this.freezeActive = false;
                this.asteroids.forEach(asteroid => {
                    if (asteroid.frozenVx !== undefined) {
                        asteroid.vx = asteroid.frozenVx;
                        asteroid.vy = asteroid.frozenVy;
                        asteroid.rotationSpeed = asteroid.frozenRotSpeed;
                        delete asteroid.frozenVx;
                        delete asteroid.frozenVy;
                        delete asteroid.frozenRotSpeed;
                    }
                });
            }
        }
    }

    updateInventoryUI() {
        const container = document.getElementById('inventory');
        if (!container) return;

        container.innerHTML = '';
        for (let i = 0; i < MAX_INVENTORY_SLOTS; i++) {
            const slot = document.createElement('div');
            slot.className = 'inventory-slot';

            if (i < this.inventory.length) {
                const itemType = this.inventory[i];
                const itemInfo = ITEM_TYPES[itemType];
                slot.innerHTML = `
                    <span class="item-symbol" style="color: ${itemInfo.color}">${itemInfo.symbol}</span>
                    <span class="slot-key">${i + 1}</span>
                `;
                slot.title = `${itemInfo.name}: ${itemInfo.description} (Press ${i + 1})`;
                slot.style.borderColor = itemInfo.color;
                slot.style.boxShadow = `0 0 10px ${itemInfo.color}40, inset 0 0 10px ${itemInfo.color}20`;
            } else {
                slot.innerHTML = `<span class="slot-key">${i + 1}</span>`;
            }

            container.appendChild(slot);
        }
    }

    createExplosion(x, y, intensity) {
        // Screen shake based on explosion size
        this.screenShake.trigger(intensity * 0.8);
        
        // Core explosion particles (bright)
        for (let i = 0; i < intensity * 0.5; i++) {
            const color = COLORS.explosion[Math.floor(Math.random() * COLORS.explosion.length)];
            this.explosionParticles.push(new ExplosionParticle(x, y, color, true));
        }
        
        // Debris particles
        for (let i = 0; i < intensity; i++) {
            const color = COLORS.explosion[Math.floor(Math.random() * 3)];
            this.explosionParticles.push(new ExplosionParticle(x, y, color, false));
        }
        
        // Shockwave ring effect
        this.particles.push(new ShockwaveParticle(x, y, intensity * 3));
    }

    update() {
        this.time++;
        this.titlePulse += 0.05;
        
        // Update starfield with parallax
        const shipVx = this.ship ? this.ship.vx : 0;
        const shipVy = this.ship ? this.ship.vy : 0;
        this.starField.update(shipVx, shipVy);
        
        // Update screen shake
        this.screenShake.update();
        
        // Fade flash effect
        if (this.flashAlpha > 0) {
            this.flashAlpha *= 0.9;
            if (this.flashAlpha < 0.01) this.flashAlpha = 0;
        }

        if (this.state !== 'playing') return;

        this.updateItemEffects();

        if (this.ship) {
            this.ship.update(this.keys);
        }

        if (!this.freezeActive) {
            this.asteroids.forEach(asteroid => asteroid.update());
        } else {
            // Frozen asteroids still get visual updates
            this.asteroids.forEach(asteroid => asteroid.updateFrozenVisuals());
        }

        this.bullets = this.bullets.filter(bullet => {
            bullet.update();
            return bullet.lifetime > 0;
        });

        this.trailParticles = this.trailParticles.filter(particle => {
            particle.update();
            return particle.lifetime > 0;
        });

        this.explosionParticles = this.explosionParticles.filter(particle => {
            particle.update();
            return particle.lifetime > 0;
        });

        this.particles = this.particles.filter(particle => {
            particle.update();
            return particle.lifetime > 0;
        });

        this.powerUps = this.powerUps.filter(powerUp => {
            powerUp.update();
            return powerUp.lifetime > 0;
        });

        this.items = this.items.filter(item => {
            item.update();
            return item.lifetime > 0;
        });

        this.checkCollisions();

        if (this.asteroids.length === 0) {
            this.nextLevel();
        }
    }

    checkCollisions() {
        // Bullet vs Asteroid
        for (let i = this.bullets.length - 1; i >= 0; i--) {
            for (let j = this.asteroids.length - 1; j >= 0; j--) {
                if (this.circleCollision(
                    this.bullets[i].x, this.bullets[i].y, 4,
                    this.asteroids[j].x, this.asteroids[j].y, this.asteroids[j].radius
                )) {
                    this.bullets.splice(i, 1);

                    const asteroid = this.asteroids[j];
                    this.createExplosion(asteroid.x, asteroid.y, asteroid.size * 6);

                    if (asteroid.size > 1) {
                        for (let k = 0; k < 2; k++) {
                            this.asteroids.push(
                                new Asteroid(asteroid.x, asteroid.y, asteroid.size - 1, this)
                            );
                        }
                    }

                    this.addScore((4 - asteroid.size) * 20);
                    this.spawnPowerUp(asteroid.x, asteroid.y);
                    this.spawnItem(asteroid.x, asteroid.y, asteroid.size);
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
                    if (!this.ship.hasShield) {
                        this.createExplosion(this.ship.x, this.ship.y, 25);
                        this.ship = null;
                        this.loseLife();
                        break;
                    } else {
                        const asteroid = this.asteroids[i];
                        this.createExplosion(asteroid.x, asteroid.y, asteroid.size * 6);

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
                    this.triggerFlash(POWERUP_TYPES[this.powerUps[i].type].color, 0.2);
                    this.powerUps.splice(i, 1);
                }
            }

            // Ship vs Item
            for (let i = this.items.length - 1; i >= 0; i--) {
                if (this.circleCollision(
                    this.ship.x, this.ship.y, SHIP_SIZE,
                    this.items[i].x, this.items[i].y, ITEM_SIZE
                )) {
                    if (this.collectItem(this.items[i])) {
                        this.items.splice(i, 1);
                    }
                }
            }
        }
    }

    circleCollision(x1, y1, r1, x2, y2, r2) {
        const dx = x1 - x2;
        const dy = y1 - y2;
        return Math.sqrt(dx * dx + dy * dy) < r1 + r2;
    }

    draw() {
        const ctx = this.ctx;
        
        ctx.save();
        
        // Apply screen shake
        this.screenShake.apply(ctx);
        
        // Draw gradient background
        const bgGradient = ctx.createRadialGradient(
            CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, 0,
            CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, CANVAS_WIDTH
        );
        bgGradient.addColorStop(0, '#0a0020');
        bgGradient.addColorStop(1, COLORS.background);
        ctx.fillStyle = bgGradient;
        ctx.fillRect(-20, -20, CANVAS_WIDTH + 40, CANVAS_HEIGHT + 40);
        
        // Draw starfield
        this.starField.draw(ctx);

        if (this.state === 'start') {
            this.drawStartScreen(ctx);
            ctx.restore();
            return;
        }

        if (this.state === 'gameover') {
            this.drawGameOverScreen(ctx);
            ctx.restore();
            return;
        }

        // Draw game objects in order (back to front)
        this.trailParticles.forEach(particle => particle.draw(ctx));
        this.explosionParticles.forEach(particle => particle.draw(ctx));
        this.particles.forEach(particle => particle.draw(ctx));
        this.items.forEach(item => item.draw(ctx));
        this.powerUps.forEach(powerUp => powerUp.draw(ctx));
        this.asteroids.forEach(asteroid => asteroid.draw(ctx));
        this.bullets.forEach(bullet => bullet.draw(ctx));
        
        if (this.ship) {
            this.ship.draw(ctx);
            this.ship.drawPowerUpIndicators(ctx);
        }

        this.drawItemEffectIndicators(ctx);
        
        // Draw flash overlay
        if (this.flashAlpha > 0) {
            ctx.fillStyle = this.flashColor;
            ctx.globalAlpha = this.flashAlpha;
            ctx.fillRect(-20, -20, CANVAS_WIDTH + 40, CANVAS_HEIGHT + 40);
            ctx.globalAlpha = 1;
        }
        
        // Vignette effect
        const vignette = ctx.createRadialGradient(
            CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, CANVAS_HEIGHT * 0.4,
            CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, CANVAS_HEIGHT
        );
        vignette.addColorStop(0, 'transparent');
        vignette.addColorStop(1, 'rgba(0, 0, 0, 0.4)');
        ctx.fillStyle = vignette;
        ctx.fillRect(-20, -20, CANVAS_WIDTH + 40, CANVAS_HEIGHT + 40);
        
        ctx.restore();
    }

    drawStartScreen(ctx) {
        // Animated title
        const pulse = Math.sin(this.titlePulse) * 0.2 + 1;
        const glowIntensity = 20 + Math.sin(this.titlePulse * 2) * 10;
        
        ctx.save();
        ctx.shadowColor = COLORS.shipPrimary;
        ctx.shadowBlur = glowIntensity;
        ctx.fillStyle = COLORS.shipPrimary;
        ctx.font = `bold ${48 * pulse}px 'Courier New', monospace`;
        ctx.textAlign = 'center';
        ctx.fillText('ASTEROIDS', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 50);
        ctx.restore();
        
        // Subtitle with different glow
        ctx.save();
        ctx.shadowColor = COLORS.bullet;
        ctx.shadowBlur = 10;
        ctx.fillStyle = COLORS.bullet;
        ctx.font = '20px "Courier New", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('N E O N   E D I T I O N', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 10);
        ctx.restore();
        
        // Blinking start text
        if (Math.floor(this.time / 30) % 2 === 0) {
            ctx.fillStyle = '#ffffff';
            ctx.font = '24px "Courier New", monospace';
            ctx.textAlign = 'center';
            ctx.fillText('Press ENTER to Start', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 50);
        }
        
        // Draw decorative asteroids in background
        ctx.save();
        ctx.strokeStyle = COLORS.asteroidStroke + '40';
        ctx.lineWidth = 2;
        for (let i = 0; i < 5; i++) {
            const x = 100 + i * 150;
            const y = CANVAS_HEIGHT / 2 + Math.sin(this.time * 0.02 + i) * 100;
            const size = 20 + i * 10;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.stroke();
        }
        ctx.restore();
    }

    drawGameOverScreen(ctx) {
        // Game over with red glow
        ctx.save();
        ctx.shadowColor = '#ff0000';
        ctx.shadowBlur = 30;
        ctx.fillStyle = '#ff0000';
        ctx.font = 'bold 48px "Courier New", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 50);
        ctx.restore();
        
        // Score
        ctx.save();
        ctx.shadowColor = COLORS.shipPrimary;
        ctx.shadowBlur = 15;
        ctx.fillStyle = '#ffffff';
        ctx.font = '24px "Courier New", monospace';
        ctx.fillText(`Final Score: ${this.score}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 20);
        ctx.restore();
        
        // Restart prompt
        if (Math.floor(this.time / 30) % 2 === 0) {
            ctx.fillStyle = '#aaaaaa';
            ctx.font = '20px "Courier New", monospace';
            ctx.textAlign = 'center';
            ctx.fillText('Press ENTER to Restart', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 70);
        }
    }

    drawItemEffectIndicators(ctx) {
        const indicators = [];

        if (this.magnetActive) {
            indicators.push({ text: 'MAGNET', color: ITEM_TYPES.MAGNET.color, timer: this.magnetTimer });
        }
        if (this.scoreMultiplier > 1) {
            indicators.push({ text: 'SCORE x2', color: ITEM_TYPES.SCORE_BOOST.color, timer: this.scoreMultiplierTimer });
        }
        if (this.freezeActive) {
            indicators.push({ text: 'FREEZE', color: ITEM_TYPES.FREEZE.color, timer: this.freezeTimer });
        }

        indicators.forEach((indicator, index) => {
            const y = 30 + index * 25;
            const timeLeft = (indicator.timer / 60).toFixed(1);
            
            ctx.save();
            ctx.shadowColor = indicator.color;
            ctx.shadowBlur = 10;
            ctx.fillStyle = indicator.color;
            ctx.font = 'bold 14px "Courier New", monospace';
            ctx.textAlign = 'right';
            ctx.fillText(`${indicator.text}: ${timeLeft}s`, CANVAS_WIDTH - 10, y);
            ctx.restore();
        });
    }

    gameLoop() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.gameLoop());
    }
}

// ============== SHOCKWAVE PARTICLE CLASS ==============
class ShockwaveParticle {
    constructor(x, y, maxRadius) {
        this.x = x;
        this.y = y;
        this.radius = 0;
        this.maxRadius = maxRadius;
        this.lifetime = 20;
        this.maxLifetime = 20;
    }

    update() {
        this.radius += (this.maxRadius - this.radius) * 0.2;
        this.lifetime--;
    }

    draw(ctx) {
        const alpha = this.lifetime / this.maxLifetime;
        ctx.save();
        ctx.strokeStyle = `rgba(255, 200, 100, ${alpha * 0.5})`;
        ctx.lineWidth = 3 * alpha;
        ctx.shadowColor = '#ff8800';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
    }
}

// ============== SHIP CLASS ==============
class Ship {
    constructor(x, y, game) {
        this.x = x;
        this.y = y;
        this.game = game;
        this.angle = -Math.PI / 2;
        this.vx = 0;
        this.vy = 0;
        this.canShoot = true;
        this.shootCooldown = 0;
        this.thrustAmount = 0;
        this.engineFlicker = 0;

        this.hasShield = false;
        this.hasRapidFire = false;
        this.hasTripleShot = false;
        this.hasSpeedBoost = false;
        this.powerUpTimers = { shield: 0, rapidFire: 0, tripleShot: 0, speedBoost: 0 };
        
        // Invulnerability on spawn
        this.invulnerable = true;
        this.invulnerableTimer = 120;
        this.spawnAnimation = 0;
    }

    update(keys) {
        this.updatePowerUps();
        this.engineFlicker = Math.random();
        
        // Spawn animation
        if (this.invulnerable) {
            this.invulnerableTimer--;
            this.spawnAnimation += 0.2;
            if (this.invulnerableTimer <= 0) {
                this.invulnerable = false;
            }
        }

        const speedMultiplier = this.hasSpeedBoost ? 2 : 1;
        const turnSpeedMultiplier = this.hasSpeedBoost ? 1.5 : 1;

        if (keys['ArrowLeft'] || keys['a'] || keys['A']) {
            this.angle -= SHIP_TURN_SPEED * turnSpeedMultiplier;
        }
        if (keys['ArrowRight'] || keys['d'] || keys['D']) {
            this.angle += SHIP_TURN_SPEED * turnSpeedMultiplier;
        }

        // Thrust with trail particles
        const isThrusting = keys['ArrowUp'] || keys['w'] || keys['W'];
        if (isThrusting) {
            this.vx += Math.cos(this.angle) * SHIP_THRUST * speedMultiplier;
            this.vy += Math.sin(this.angle) * SHIP_THRUST * speedMultiplier;
            this.thrustAmount = Math.min(1, this.thrustAmount + 0.1);
            
            // Spawn engine trail particles
            if (this.game.time % TRAIL_SPAWN_RATE === 0) {
                const exhaustX = this.x - Math.cos(this.angle) * SHIP_SIZE;
                const exhaustY = this.y - Math.sin(this.angle) * SHIP_SIZE;
                
                for (let i = 0; i < 3; i++) {
                    const color = Math.random() > 0.3 ? COLORS.shipEngine : COLORS.shipEngineCore;
                    this.game.trailParticles.push(new TrailParticle(
                        exhaustX + (Math.random() - 0.5) * 5,
                        exhaustY + (Math.random() - 0.5) * 5,
                        color,
                        2 + Math.random() * 3,
                        15 + Math.random() * 10,
                        -Math.cos(this.angle) * 2 + (Math.random() - 0.5),
                        -Math.sin(this.angle) * 2 + (Math.random() - 0.5)
                    ));
                }
            }
        } else {
            this.thrustAmount = Math.max(0, this.thrustAmount - 0.05);
        }

        this.vx *= FRICTION;
        this.vy *= FRICTION;
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around
        if (this.x < 0) this.x = CANVAS_WIDTH;
        if (this.x > CANVAS_WIDTH) this.x = 0;
        if (this.y < 0) this.y = CANVAS_HEIGHT;
        if (this.y > CANVAS_HEIGHT) this.y = 0;

        if (this.shootCooldown > 0) this.shootCooldown--;
    }

    shoot() {
        if (this.shootCooldown > 0) return;

        const angles = this.hasTripleShot ? [-0.2, 0, 0.2] : [0];
        
        angles.forEach(angleOffset => {
            const bullet = new Bullet(
                this.x + Math.cos(this.angle + angleOffset) * SHIP_SIZE,
                this.y + Math.sin(this.angle + angleOffset) * SHIP_SIZE,
                this.angle + angleOffset,
                this.game
            );
            this.game.bullets.push(bullet);
        });

        this.shootCooldown = this.hasRapidFire ? 3 : 10;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        
        // Spawn animation
        if (this.invulnerable) {
            const flicker = Math.sin(this.spawnAnimation * 3) > 0;
            if (!flicker) {
                ctx.restore();
                return;
            }
        }

        // Draw shield if active
        if (this.hasShield) {
            const shieldPulse = Math.sin(this.game.time * 0.1) * 3;
            ctx.save();
            ctx.shadowColor = COLORS.shipPrimary;
            ctx.shadowBlur = 20;
            ctx.strokeStyle = COLORS.shipPrimary;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(0, 0, SHIP_SIZE + 8 + shieldPulse, 0, Math.PI * 2);
            ctx.stroke();
            
            // Inner shield glow
            ctx.strokeStyle = COLORS.shipPrimary + '40';
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(0, 0, SHIP_SIZE + 5 + shieldPulse, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
        }

        ctx.rotate(this.angle);

        const S = SHIP_SIZE;
        
        // Draw engine flames when thrusting (two engines on wings)
        if (this.thrustAmount > 0) {
            const flameLength = (12 + this.engineFlicker * 8) * this.thrustAmount;
            const flameWidth = 3 * this.thrustAmount;
            
            // Engine positions (on the wing nacelles)
            const enginePositions = [
                { x: -S * 0.7, y: -S * 0.55 },
                { x: -S * 0.7, y: S * 0.55 }
            ];
            
            enginePositions.forEach(pos => {
                const gradient = ctx.createLinearGradient(pos.x - flameLength, pos.y, pos.x, pos.y);
                gradient.addColorStop(0, 'transparent');
                gradient.addColorStop(0.3, COLORS.shipEngine + '60');
                gradient.addColorStop(0.7, COLORS.shipEngine);
                gradient.addColorStop(1, COLORS.shipEngineCore);
                
                ctx.save();
                ctx.shadowColor = COLORS.shipEngine;
                ctx.shadowBlur = 12;
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.moveTo(pos.x, pos.y - flameWidth);
                ctx.lineTo(pos.x - flameLength, pos.y);
                ctx.lineTo(pos.x, pos.y + flameWidth);
                ctx.closePath();
                ctx.fill();
                ctx.restore();
            });
            
            // Center engine (main thruster)
            const mainFlameLength = (18 + this.engineFlicker * 12) * this.thrustAmount;
            const mainGradient = ctx.createLinearGradient(-S * 0.5 - mainFlameLength, 0, -S * 0.5, 0);
            mainGradient.addColorStop(0, 'transparent');
            mainGradient.addColorStop(0.4, COLORS.shipEngine + '80');
            mainGradient.addColorStop(1, COLORS.shipEngineCore);
            
            ctx.save();
            ctx.shadowColor = COLORS.shipEngine;
            ctx.shadowBlur = 20;
            ctx.fillStyle = mainGradient;
            ctx.beginPath();
            ctx.moveTo(-S * 0.5, -4 * this.thrustAmount);
            ctx.lineTo(-S * 0.5 - mainFlameLength, 0);
            ctx.lineTo(-S * 0.5, 4 * this.thrustAmount);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }

        // === SPACESHIP BODY ===
        ctx.shadowColor = COLORS.shipPrimary;
        ctx.shadowBlur = GLOW_INTENSITY;
        
        // Main fuselage (elongated body)
        ctx.fillStyle = COLORS.shipPrimary + '25';
        ctx.strokeStyle = COLORS.shipPrimary;
        ctx.lineWidth = 2;
        
        ctx.beginPath();
        // Nose cone
        ctx.moveTo(S * 1.2, 0);
        // Top of fuselage
        ctx.lineTo(S * 0.4, -S * 0.15);
        ctx.lineTo(-S * 0.2, -S * 0.18);
        ctx.lineTo(-S * 0.5, -S * 0.12);
        // Back
        ctx.lineTo(-S * 0.5, S * 0.12);
        // Bottom of fuselage
        ctx.lineTo(-S * 0.2, S * 0.18);
        ctx.lineTo(S * 0.4, S * 0.15);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        // === WINGS ===
        ctx.fillStyle = COLORS.shipPrimary + '30';
        
        // Top wing
        ctx.beginPath();
        ctx.moveTo(S * 0.2, -S * 0.15);
        ctx.lineTo(-S * 0.3, -S * 0.2);
        ctx.lineTo(-S * 0.8, -S * 0.7);  // Wing tip
        ctx.lineTo(-S * 0.7, -S * 0.45);
        ctx.lineTo(-S * 0.5, -S * 0.12);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        // Bottom wing
        ctx.beginPath();
        ctx.moveTo(S * 0.2, S * 0.15);
        ctx.lineTo(-S * 0.3, S * 0.2);
        ctx.lineTo(-S * 0.8, S * 0.7);  // Wing tip
        ctx.lineTo(-S * 0.7, S * 0.45);
        ctx.lineTo(-S * 0.5, S * 0.12);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        // === ENGINE NACELLES (on wings) ===
        ctx.fillStyle = COLORS.shipSecondary + '40';
        ctx.strokeStyle = COLORS.shipSecondary;
        ctx.lineWidth = 1.5;
        
        // Top nacelle
        ctx.beginPath();
        ctx.moveTo(-S * 0.4, -S * 0.45);
        ctx.lineTo(-S * 0.7, -S * 0.5);
        ctx.lineTo(-S * 0.75, -S * 0.55);
        ctx.lineTo(-S * 0.7, -S * 0.6);
        ctx.lineTo(-S * 0.4, -S * 0.55);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        // Bottom nacelle
        ctx.beginPath();
        ctx.moveTo(-S * 0.4, S * 0.45);
        ctx.lineTo(-S * 0.7, S * 0.5);
        ctx.lineTo(-S * 0.75, S * 0.55);
        ctx.lineTo(-S * 0.7, S * 0.6);
        ctx.lineTo(-S * 0.4, S * 0.55);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        // === COCKPIT ===
        const cockpitGradient = ctx.createLinearGradient(S * 0.7, -S * 0.1, S * 0.3, S * 0.1);
        cockpitGradient.addColorStop(0, '#4AF5FF');
        cockpitGradient.addColorStop(0.5, '#0088AA');
        cockpitGradient.addColorStop(1, '#003344');
        
        ctx.fillStyle = cockpitGradient;
        ctx.strokeStyle = COLORS.shipPrimary;
        ctx.lineWidth = 1;
        
        ctx.beginPath();
        ctx.moveTo(S * 0.8, 0);
        ctx.quadraticCurveTo(S * 0.6, -S * 0.1, S * 0.3, -S * 0.08);
        ctx.lineTo(S * 0.3, S * 0.08);
        ctx.quadraticCurveTo(S * 0.6, S * 0.1, S * 0.8, 0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        // Cockpit shine
        ctx.strokeStyle = '#FFFFFF50';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(S * 0.75, -S * 0.02);
        ctx.quadraticCurveTo(S * 0.55, -S * 0.06, S * 0.4, -S * 0.05);
        ctx.stroke();
        
        // === PANEL LINES (details) ===
        ctx.strokeStyle = COLORS.shipSecondary;
        ctx.lineWidth = 1;
        
        // Fuselage panel lines
        ctx.beginPath();
        ctx.moveTo(S * 0.2, -S * 0.12);
        ctx.lineTo(S * 0.2, S * 0.12);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(-S * 0.1, -S * 0.15);
        ctx.lineTo(-S * 0.1, S * 0.15);
        ctx.stroke();
        
        // Wing detail lines
        ctx.strokeStyle = COLORS.shipPrimary + '60';
        ctx.beginPath();
        ctx.moveTo(-S * 0.1, -S * 0.2);
        ctx.lineTo(-S * 0.5, -S * 0.45);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(-S * 0.1, S * 0.2);
        ctx.lineTo(-S * 0.5, S * 0.45);
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
        if (this.powerUpTimers.shield > 0) {
            this.powerUpTimers.shield--;
            if (this.powerUpTimers.shield === 0) this.hasShield = false;
        }
        if (this.powerUpTimers.rapidFire > 0) {
            this.powerUpTimers.rapidFire--;
            if (this.powerUpTimers.rapidFire === 0) this.hasRapidFire = false;
        }
        if (this.powerUpTimers.tripleShot > 0) {
            this.powerUpTimers.tripleShot--;
            if (this.powerUpTimers.tripleShot === 0) this.hasTripleShot = false;
        }
        if (this.powerUpTimers.speedBoost > 0) {
            this.powerUpTimers.speedBoost--;
            if (this.powerUpTimers.speedBoost === 0) this.hasSpeedBoost = false;
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
            
            ctx.save();
            ctx.shadowColor = indicator.color;
            ctx.shadowBlur = 10;
            ctx.fillStyle = indicator.color;
            ctx.font = 'bold 14px "Courier New", monospace';
            ctx.textAlign = 'left';
            ctx.fillText(`${indicator.text}: ${timeLeft}s`, 10, y);
            ctx.restore();
        });
    }
}

// ============== ASTEROID CLASS ==============
class Asteroid {
    constructor(x, y, size, game) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.game = game;
        this.radius = size * 15;

        const angle = Math.random() * Math.PI * 2;
        const speed = ASTEROID_SPEED / size + Math.random() * 0.5;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;

        this.rotation = 0;
        this.rotationSpeed = (Math.random() - 0.5) * 0.04;
        this.pulsePhase = Math.random() * Math.PI * 2;

        // Generate jagged vertices
        this.vertices = [];
        const vertexCount = ASTEROID_VERTICES + Math.floor(Math.random() * 3);
        for (let i = 0; i < vertexCount; i++) {
            const vertAngle = (i / vertexCount) * Math.PI * 2;
            const distance = this.radius * (0.6 + Math.random() * 0.4);
            this.vertices.push({
                x: Math.cos(vertAngle) * distance,
                y: Math.sin(vertAngle) * distance
            });
        }
        
        // Color variation
        this.hue = 20 + Math.random() * 20; // Orange-ish
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += this.rotationSpeed;
        this.pulsePhase += 0.05;

        // Wrap
        if (this.x < -this.radius) this.x = CANVAS_WIDTH + this.radius;
        if (this.x > CANVAS_WIDTH + this.radius) this.x = -this.radius;
        if (this.y < -this.radius) this.y = CANVAS_HEIGHT + this.radius;
        if (this.y > CANVAS_HEIGHT + this.radius) this.y = -this.radius;
    }

    updateFrozenVisuals() {
        this.pulsePhase += 0.02;
    }

    draw(ctx) {
        const pulse = 1 + Math.sin(this.pulsePhase) * 0.05;
        const frozen = this.game.freezeActive;
        
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.scale(pulse, pulse);

        // Outer glow
        const glowColor = frozen ? '#87ceeb' : COLORS.asteroidGlow;
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = 15;

        // Fill with gradient
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.radius);
        if (frozen) {
            gradient.addColorStop(0, '#1a3344');
            gradient.addColorStop(1, '#0a1a22');
        } else {
            gradient.addColorStop(0, `hsl(${this.hue}, 70%, 15%)`);
            gradient.addColorStop(1, `hsl(${this.hue}, 80%, 5%)`);
        }
        
        ctx.fillStyle = gradient;
        ctx.strokeStyle = frozen ? '#87ceeb' : COLORS.asteroidStroke;
        ctx.lineWidth = 2;

        ctx.beginPath();
        for (let i = 0; i < this.vertices.length; i++) {
            const v = this.vertices[i];
            if (i === 0) ctx.moveTo(v.x, v.y);
            else ctx.lineTo(v.x, v.y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Inner crack details
        ctx.strokeStyle = frozen ? '#aaddee40' : `hsl(${this.hue}, 60%, 30%)`;
        ctx.lineWidth = 1;
        for (let i = 0; i < 3; i++) {
            const startIdx = Math.floor(Math.random() * this.vertices.length);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(this.vertices[startIdx].x * 0.7, this.vertices[startIdx].y * 0.7);
            ctx.stroke();
        }

        ctx.restore();
    }
}

// ============== BULLET CLASS ==============
class Bullet {
    constructor(x, y, angle, game) {
        this.x = x;
        this.y = y;
        this.game = game;
        this.vx = Math.cos(angle) * BULLET_SPEED;
        this.vy = Math.sin(angle) * BULLET_SPEED;
        this.lifetime = BULLET_LIFETIME;
        this.trailCounter = 0;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.lifetime--;
        this.trailCounter++;

        // Spawn trail particles
        if (this.trailCounter % 2 === 0) {
            this.game.trailParticles.push(new TrailParticle(
                this.x,
                this.y,
                COLORS.bullet,
                2,
                10,
                -this.vx * 0.1,
                -this.vy * 0.1
            ));
        }

        // Wrap
        if (this.x < 0) this.x = CANVAS_WIDTH;
        if (this.x > CANVAS_WIDTH) this.x = 0;
        if (this.y < 0) this.y = CANVAS_HEIGHT;
        if (this.y > CANVAS_HEIGHT) this.y = 0;
    }

    draw(ctx) {
        ctx.save();
        
        // Outer glow
        ctx.shadowColor = COLORS.bullet;
        ctx.shadowBlur = 15;
        ctx.fillStyle = COLORS.bullet;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 4, 0, Math.PI * 2);
        ctx.fill();
        
        // Bright core
        ctx.shadowBlur = 5;
        ctx.fillStyle = COLORS.bulletCore;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    }
}

// ============== POWERUP CLASS ==============
class PowerUp {
    constructor(x, y, type, game) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.game = game;
        this.lifetime = POWERUP_LIFETIME;
        this.pulsePhase = 0;
        this.rotationPhase = 0;

        const angle = Math.random() * Math.PI * 2;
        this.vx = Math.cos(angle) * 0.3;
        this.vy = Math.sin(angle) * 0.3;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.lifetime--;
        this.pulsePhase += 0.1;
        this.rotationPhase += 0.02;

        if (this.x < 0) this.x = CANVAS_WIDTH;
        if (this.x > CANVAS_WIDTH) this.x = 0;
        if (this.y < 0) this.y = CANVAS_HEIGHT;
        if (this.y > CANVAS_HEIGHT) this.y = 0;
    }

    draw(ctx) {
        const powerUpInfo = POWERUP_TYPES[this.type];
        const pulse = Math.sin(this.pulsePhase) * 3 + POWERUP_SIZE;

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotationPhase);

        // Outer ring glow
        ctx.shadowColor = powerUpInfo.color;
        ctx.shadowBlur = 20;
        ctx.strokeStyle = powerUpInfo.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, pulse + 3, 0, Math.PI * 2);
        ctx.stroke();

        // Inner filled circle
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, pulse);
        gradient.addColorStop(0, powerUpInfo.color);
        gradient.addColorStop(1, powerUpInfo.color + '40');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, pulse - 2, 0, Math.PI * 2);
        ctx.fill();

        // Symbol
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#000';
        ctx.font = 'bold 14px "Courier New", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(powerUpInfo.symbol, 0, 1);

        ctx.restore();

        // Warning flicker when expiring
        if (this.lifetime < 120) {
            const flicker = Math.sin(this.lifetime * 0.3) > 0;
            if (flicker) {
                ctx.save();
                ctx.strokeStyle = powerUpInfo.color + '60';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.arc(this.x, this.y, POWERUP_SIZE + 10, 0, Math.PI * 2);
                ctx.stroke();
                ctx.restore();
            }
        }
    }
}

// ============== ITEM CLASS ==============
class Item {
    constructor(x, y, type, game) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.game = game;
        this.lifetime = ITEM_LIFETIME;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.bobPhase = Math.random() * Math.PI * 2;
        this.rotationPhase = 0;

        const angle = Math.random() * Math.PI * 2;
        this.vx = Math.cos(angle) * 0.4;
        this.vy = Math.sin(angle) * 0.4;
    }

    update() {
        if (this.game.ship && this.game.magnetActive) {
            const dx = this.game.ship.x - this.x;
            const dy = this.game.ship.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist > 10) {
                this.vx = (dx / dist) * 3;
                this.vy = (dy / dist) * 3;
            }
        }

        this.x += this.vx;
        this.y += this.vy;
        this.lifetime--;
        this.pulsePhase += 0.08;
        this.bobPhase += 0.1;
        this.rotationPhase += 0.03;

        if (this.x < 0) this.x = CANVAS_WIDTH;
        if (this.x > CANVAS_WIDTH) this.x = 0;
        if (this.y < 0) this.y = CANVAS_HEIGHT;
        if (this.y > CANVAS_HEIGHT) this.y = 0;
    }

    draw(ctx) {
        const itemInfo = ITEM_TYPES[this.type];
        const pulse = Math.sin(this.pulsePhase) * 2 + ITEM_SIZE;
        const bob = Math.sin(this.bobPhase) * 2;

        ctx.save();
        ctx.translate(this.x, this.y + bob);
        ctx.rotate(this.rotationPhase);

        // Outer glow
        ctx.shadowColor = itemInfo.color;
        ctx.shadowBlur = 15;

        // Hexagon shape
        ctx.strokeStyle = itemInfo.color;
        ctx.fillStyle = itemInfo.color + '30';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
            const x = Math.cos(angle) * pulse;
            const y = Math.sin(angle) * pulse;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Symbol
        ctx.shadowBlur = 5;
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(itemInfo.symbol, 0, 0);

        ctx.restore();

        // Expiry warning
        if (this.lifetime < 120) {
            const alpha = (this.lifetime % 20) / 20;
            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.strokeStyle = itemInfo.color;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(this.x, this.y, ITEM_SIZE + 12, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
        }
    }
}

// Initialize game
window.addEventListener('DOMContentLoaded', () => {
    new Game();
});
