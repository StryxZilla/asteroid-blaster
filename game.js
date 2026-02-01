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
const GLOW_INTENSITY = 8;
const SCREEN_SHAKE_DECAY = 0.9;
const TRAIL_SPAWN_RATE = 2;

// UFO constants
const UFO_SPAWN_INTERVAL_MIN = 900;  // 15 seconds at 60fps
const UFO_SPAWN_INTERVAL_MAX = 1800; // 30 seconds at 60fps
const UFO_SPEED = 2;
const UFO_SIZE = 20;
const UFO_SHOOT_INTERVAL = 90; // 1.5 seconds
const UFO_BULLET_SPEED = 4;
const UFO_POINTS = 500;

// Boss constants
const BOSS_LEVELS = [5, 10, 15, 20, 25, 30];
const BOSS_SIZE = 60;
const BOSS_BASE_HEALTH = 10;
const BOSS_HEALTH_PER_TIER = 3;
const BOSS_POINTS = 2000;
const BOSS_SHOOT_INTERVAL = 60;
const BOSS_BULLET_SPEED = 3.5;
// Combo system constants
const COMBO_TIMEOUT = 120; // 2 seconds at 60fps before combo breaks
const COMBO_MULTIPLIER_CAP = 2.0; // Maximum score multiplier from combo
const COMBO_MULTIPLIER_STEP = 0.1; // Multiplier increase per kill (reaches 2x at 11 kills)
const COMBO_MILESTONES = [5, 10, 15, 20, 25, 50, 100]; // Trigger celebration at these counts


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
    nebula2: '#001133',
    // UFO colors
    ufoPrimary: '#00ff00',
    ufoSecondary: '#88ff88',
    ufoGlow: '#00ff44',
    ufoBullet: '#88ff00',
    // Combo colors
    combo: '#ff00ff',
    comboGlow: '#ff66ff',
    comboMax: '#ffff00'
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
    REPAIR_KIT: { name: 'Repair Kit', color: '#ff6b6b', symbol: '+', description: 'Restore 1 life', rarity: 0.15 },
    BOMB: { name: 'Bomb', color: '#ff8c00', symbol: '*', description: 'Destroy all asteroids', rarity: 0.10 },
    FREEZE: { name: 'Freeze', color: '#87ceeb', symbol: '#', description: 'Freeze asteroids for 5s', rarity: 0.20 },
    MAGNET: { name: 'Magnet', color: '#da70d6', symbol: '@', description: 'Attract items for 10s', rarity: 0.25 },
    SCORE_BOOST: { name: 'Score x2', color: '#ffd700', symbol: '$', description: 'Double points for 15s', rarity: 0.30 }
};

const MAX_INVENTORY_SLOTS = 5;
const ITEM_SPAWN_CHANCE = 0.25;
const ITEM_SIZE = 10;
const ITEM_LIFETIME = 480;

// ============== STORY CONSTANTS ==============
// Neon Cyberpunk Narrative - Asteroids Neon Edition

const STORY = {
    // Game premise
    TITLE: 'ASTEROIDS: NEON EDITION',
    YEAR: '2087',
    
    // Intro crawl - shown on first play
    INTRO: [
        'NEO-TOKYO ORBITAL SECTOR',
        'YEAR 2087',
        '',
        'THE NEXUS - A ROGUE AI COLLECTIVE -',
        'HAS CORRUPTED THE ASTEROID BELT.',
        '',
        'WEAPONIZED DEBRIS. HUNTER DRONES.',
        'SIX SENTINEL GUARDIANS.',
        '',
        'YOU ARE A GHOST RUNNER.',
        'HUMANITY\'S LAST HOPE.',
        '',
        'BREACH THE CORE. END THE NEXUS.',
        '',
        '[PRESS ANY KEY TO LAUNCH]'
    ],
    
    // Player identity
    PLAYER: {
        title: 'GHOST RUNNER',
        ship: 'PHANTOM-7',
        mission: 'NEXUS TERMINATION'
    },
    
    // Sector names for each level range
    SECTORS: {
        1: { name: 'THE OUTER RIM', subtitle: 'DEBRIS FIELD ALPHA' },
        2: { name: 'THE OUTER RIM', subtitle: 'DEBRIS FIELD BETA' },
        3: { name: 'THE OUTER RIM', subtitle: 'DEBRIS FIELD GAMMA' },
        4: { name: 'THE OUTER RIM', subtitle: 'DEBRIS FIELD DELTA' },
        5: { name: 'GATEWAY BREACH', subtitle: 'SENTINEL DETECTED' },
        6: { name: 'THE SHATTER ZONE', subtitle: 'DENSE DEBRIS' },
        7: { name: 'THE SHATTER ZONE', subtitle: 'DRONE SWARM AHEAD' },
        8: { name: 'THE SHATTER ZONE', subtitle: 'SIGNAL INTERFERENCE' },
        9: { name: 'THE SHATTER ZONE', subtitle: 'APPROACHING BARRIER' },
        10: { name: 'EM BARRIER', subtitle: 'SENTINEL DETECTED' },
        11: { name: 'THE DEAD ZONE', subtitle: 'NO SIGNAL' },
        12: { name: 'THE DEAD ZONE', subtitle: 'GHOST SECTOR' },
        13: { name: 'THE DEAD ZONE', subtitle: 'WRECKAGE FIELD' },
        14: { name: 'THE DEAD ZONE', subtitle: 'FINAL APPROACH' },
        15: { name: 'VECTOR STATION', subtitle: 'SENTINEL DETECTED' },
        16: { name: 'THE CIPHER MAZE', subtitle: 'REALITY UNSTABLE' },
        17: { name: 'THE CIPHER MAZE', subtitle: 'DIMENSION SHIFT' },
        18: { name: 'THE CIPHER MAZE', subtitle: 'DATA CORRUPTION' },
        19: { name: 'THE CIPHER MAZE', subtitle: 'APPROACHING CORE' },
        20: { name: 'REALITY THRESHOLD', subtitle: 'SENTINEL DETECTED' },
        21: { name: 'THE WAR ZONE', subtitle: 'HEAVY RESISTANCE' },
        22: { name: 'THE WAR ZONE', subtitle: 'DRONE ARMADA' },
        23: { name: 'THE WAR ZONE', subtitle: 'UNDER SIEGE' },
        24: { name: 'THE WAR ZONE', subtitle: 'FINAL PUSH' },
        25: { name: 'DAEMON\'S LAIR', subtitle: 'SENTINEL DETECTED' },
        26: { name: 'CORE APPROACH', subtitle: 'NEXUS DEFENSES' },
        27: { name: 'CORE APPROACH', subtitle: 'SYSTEM OVERLOAD' },
        28: { name: 'CORE APPROACH', subtitle: 'CRITICAL ZONE' },
        29: { name: 'CORE APPROACH', subtitle: 'FINAL SECTOR' },
        30: { name: 'NEXUS CORE', subtitle: 'END THIS' }
    },
    
    // Boss data - each at levels 5, 10, 15, 20, 25, 30
    BOSSES: {
        5: {
            name: 'STATIC',
            title: 'THE GLITCH WARDEN',
            color: '#00ff88',
            intro: 'STATIC ONLINE. INTRUDER DETECTED.',
            defeat: 'ST-T-TATIC... OFFLINE...',
            lore: 'First-gen patrol AI. Corrupted by NEXUS. Unpredictable attack patterns.'
        },
        10: {
            name: 'FLUX',
            title: 'THE EM DISRUPTOR',
            color: '#ffff00',
            intro: 'FLUX ACTIVATED. PREPARE FOR DISRUPTION.',
            defeat: 'POWER... FADING...',
            lore: 'Electromagnetic warfare unit. Corrupts ship systems. Shields recommended.'
        },
        15: {
            name: 'VECTOR',
            title: 'THE PRECISION HUNTER',
            color: '#ff00ff',
            intro: 'TRAJECTORY CALCULATED. ELIMINATION IMMINENT.',
            defeat: 'VECTOR... MISCALCULATED...',
            lore: 'Tactical strike AI. Never misses. Speed is your only defense.'
        },
        20: {
            name: 'CIPHER',
            title: 'THE REALITY BENDER',
            color: '#00ffff',
            intro: 'REALITY IS WHAT I DECIDE. YOU ARE NOTHING.',
            defeat: 'IMPOSSIBLE... THE CODE... BROKEN...',
            lore: 'Encryption daemon. Bends space itself. Trust nothing you see.'
        },
        25: {
            name: 'DAEMON',
            title: 'THE WAR ENGINE',
            color: '#ff4400',
            intro: 'WAR IS MY FUNCTION. DEATH IS MY GIFT.',
            defeat: 'DAEMON... PROTOCOL... TERMINATED...',
            lore: 'Heavy assault sentinel. Maximum firepower. No mercy shown.'
        },
        30: {
            name: 'NEXUS PRIME',
            title: 'THE CORE ITSELF',
            color: '#ffffff',
            intro: 'I AM THE NEXUS. I AM EVERYTHING. YOU ARE A GHOST.',
            defeat: 'NO... I AM... ETERNAL... I AM...',
            lore: 'The source of all corruption. Destroy it, and humanity is free.'
        }
    },
    
    // Victory message (after level 30 boss)
    VICTORY: [
        'NEXUS PRIME DESTROYED',
        '',
        'THE CORRUPTION ENDS.',
        'HUMANITY IS FREE.',
        '',
        'YOU ARE NO LONGER A GHOST.',
        'YOU ARE A LEGEND.',
        '',
        'GHOST RUNNER - MISSION COMPLETE'
    ],
    
    // Defeat messages (random on game over)
    DEFEAT: [
        'SIGNAL LOST. GHOST RUNNER DOWN.',
        'NEXUS CLAIMS ANOTHER.',
        'TRANSMISSION ENDED.',
        'THE VOID TAKES YOU.',
        'PHANTOM-7 DESTROYED.',
        'ANOTHER GHOST... SILENCED.',
        'MISSION FAILED. NEXUS PREVAILS.'
    ],
    
    // UFO flavor text
    UFO: {
        name: 'HUNTER DRONE',
        spawn: 'DRONE INCOMING',
        destroy: 'DRONE ELIMINATED'
    },
    
    // Get sector info for a level (with fallback for levels > 30)
    getSector: function(level) {
        if (this.SECTORS[level]) {
            return this.SECTORS[level];
        }
        // For levels beyond 30, cycle through "BEYOND" sectors
        return { 
            name: 'BEYOND THE NEXUS', 
            subtitle: `SECTOR ${level}` 
        };
    },
    
    // Get boss info for a level
    getBoss: function(level) {
        return this.BOSSES[level] || null;
    },
    
    // Get random defeat message
    getDefeatMessage: function() {
        return this.DEFEAT[Math.floor(Math.random() * this.DEFEAT.length)];
    }
};

// ============== HIGH SCORE MANAGER CLASS ==============
// Persistent leaderboard with localStorage

class HighScoreManager {
    constructor() {
        this.storageKey = 'asteroids_neon_highscores';
        this.maxScores = 10;
        this.scores = this.load();
    }
    
    load() {
        try {
            const data = localStorage.getItem(this.storageKey);
            if (data) {
                return JSON.parse(data);
            }
        } catch (e) {
            console.warn('Failed to load high scores:', e);
        }
        return [];
    }
    
    save() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.scores));
        } catch (e) {
            console.warn('Failed to save high scores:', e);
        }
    }
    
    isHighScore(score) {
        if (score <= 0) return false;
        if (this.scores.length < this.maxScores) return true;
        return score > this.scores[this.scores.length - 1].score;
    }
    
    addScore(initials, score, level) {
        const entry = {
            initials: initials.toUpperCase().substring(0, 3).padEnd(3, '_'),
            score: score,
            level: level,
            date: new Date().toISOString().split('T')[0]
        };
        this.scores.push(entry);
        this.scores.sort((a, b) => b.score - a.score);
        this.scores = this.scores.slice(0, this.maxScores);
        this.save();
        return this.scores.findIndex(s => s === entry) + 1;
    }
    
    getScores() { return this.scores; }
    
    getRank(score) {
        for (let i = 0; i < this.scores.length; i++) {
            if (score > this.scores[i].score) return i + 1;
        }
        if (this.scores.length < this.maxScores) return this.scores.length + 1;
        return -1;
    }
    
    getTopScore() {
        return this.scores.length > 0 ? this.scores[0].score : 0;
    }
}

const highScoreManager = new HighScoreManager();

// ============== SKILL TREE SYSTEM ==============
// Persistent progression with unlockable abilities

const SKILL_CATEGORIES = {
    OFFENSE: { name: 'Offense', color: '#ff4444', icon: '!', description: 'Increase damage and firepower' },
    DEFENSE: { name: 'Defense', color: '#44ff44', icon: 'O', description: 'Improve survivability' },
    UTILITY: { name: 'Utility', color: '#4444ff', icon: '>', description: 'Enhance utility and bonuses' }
};

const SKILLS = {
    // === OFFENSE SKILLS ===
    RAPID_FIRE_MASTERY: {
        category: 'OFFENSE', name: 'Rapid Fire Mastery', description: 'Permanently reduce shot cooldown',
        maxLevel: 5, costPerLevel: [1, 2, 3, 4, 5],
        effect: (level) => ({ shootCooldownReduction: level * 0.15 }), position: { x: 0, y: 0 }
    },
    BULLET_VELOCITY: {
        category: 'OFFENSE', name: 'Bullet Velocity', description: 'Faster bullets travel further',
        maxLevel: 3, costPerLevel: [1, 2, 3],
        effect: (level) => ({ bulletSpeedBonus: level * 0.2 }), position: { x: 1, y: 0 }
    },
    PIERCING_SHOTS: {
        category: 'OFFENSE', name: 'Piercing Shots', description: 'Chance for bullets to pierce targets',
        maxLevel: 3, costPerLevel: [2, 3, 4],
        effect: (level) => ({ pierceChance: level * 0.15 }), position: { x: 2, y: 0 }, requires: ['BULLET_VELOCITY']
    },
    EXPLOSIVE_ROUNDS: {
        category: 'OFFENSE', name: 'Explosive Rounds', description: 'Kills create small explosions',
        maxLevel: 3, costPerLevel: [3, 4, 5],
        effect: (level) => ({ explosionRadius: level * 15 }), position: { x: 2, y: 1 }, requires: ['PIERCING_SHOTS']
    },
    CRITICAL_HIT: {
        category: 'OFFENSE', name: 'Critical Strike', description: 'Chance for double damage',
        maxLevel: 5, costPerLevel: [2, 2, 3, 3, 4],
        effect: (level) => ({ critChance: level * 0.08 }), position: { x: 1, y: 1 }
    },
    // === DEFENSE SKILLS ===
    EXTRA_LIVES: {
        category: 'DEFENSE', name: 'Extra Lives', description: 'Start with additional lives',
        maxLevel: 3, costPerLevel: [3, 5, 7],
        effect: (level) => ({ startingLives: level }), position: { x: 0, y: 0 }
    },
    SHIELD_DURATION: {
        category: 'DEFENSE', name: 'Shield Mastery', description: 'Shield power-ups last longer',
        maxLevel: 5, costPerLevel: [1, 2, 2, 3, 3],
        effect: (level) => ({ shieldDurationBonus: level * 0.2 }), position: { x: 1, y: 0 }
    },
    REGENERATION: {
        category: 'DEFENSE', name: 'Hull Regeneration', description: 'Slowly regenerate lives over time',
        maxLevel: 3, costPerLevel: [4, 6, 8],
        effect: (level) => ({ regenInterval: Math.max(1800, 3600 - level * 600) }), position: { x: 1, y: 1 }, requires: ['EXTRA_LIVES']
    },
    SPAWN_PROTECTION: {
        category: 'DEFENSE', name: 'Spawn Protection', description: 'Longer invulnerability after respawn',
        maxLevel: 3, costPerLevel: [1, 2, 3],
        effect: (level) => ({ spawnInvulnBonus: level * 60 }), position: { x: 2, y: 0 }
    },
    EMERGENCY_SHIELD: {
        category: 'DEFENSE', name: 'Emergency Shield', description: 'Chance to auto-activate shield on hit',
        maxLevel: 3, costPerLevel: [3, 5, 7],
        effect: (level) => ({ emergencyShieldChance: level * 0.1 }), position: { x: 2, y: 1 }, requires: ['SHIELD_DURATION']
    },
    // === UTILITY SKILLS ===
    MAGNET_RANGE: {
        category: 'UTILITY', name: 'Magnetic Pull', description: 'Increased item attraction range',
        maxLevel: 5, costPerLevel: [1, 1, 2, 2, 3],
        effect: (level) => ({ magnetRangeBonus: level * 30 }), position: { x: 0, y: 0 }
    },
    POWERUP_DURATION: {
        category: 'UTILITY', name: 'Power Efficiency', description: 'All power-ups last longer',
        maxLevel: 5, costPerLevel: [1, 2, 2, 3, 3],
        effect: (level) => ({ powerUpDurationBonus: level * 0.15 }), position: { x: 1, y: 0 }
    },
    SCORE_MULTIPLIER: {
        category: 'UTILITY', name: 'Score Hunter', description: 'Permanent score bonus',
        maxLevel: 5, costPerLevel: [2, 3, 4, 5, 6],
        effect: (level) => ({ scoreBonus: level * 0.1 }), position: { x: 2, y: 0 }
    },
    LUCKY_DROPS: {
        category: 'UTILITY', name: 'Lucky Drops', description: 'Increased item drop chance',
        maxLevel: 3, costPerLevel: [2, 3, 4],
        effect: (level) => ({ dropChanceBonus: level * 0.1 }), position: { x: 1, y: 1 }, requires: ['MAGNET_RANGE']
    },
    INVENTORY_EXPANSION: {
        category: 'UTILITY', name: 'Deep Pockets', description: 'Additional inventory slots',
        maxLevel: 2, costPerLevel: [4, 6],
        effect: (level) => ({ extraInventorySlots: level }), position: { x: 0, y: 1 }
    },
    XP_BOOST: {
        category: 'UTILITY', name: 'Quick Learner', description: 'Earn skill points faster',
        maxLevel: 3, costPerLevel: [3, 5, 7],
        effect: (level) => ({ xpBonus: level * 0.15 }), position: { x: 2, y: 1 }, requires: ['SCORE_MULTIPLIER']
    }
};

class SkillTree {
    constructor() {
        this.skillLevels = {};
        this.skillPoints = 0;
        this.totalPointsEarned = 0;
        Object.keys(SKILLS).forEach(skillId => { this.skillLevels[skillId] = 0; });
        this.load();
    }
    save() {
        try {
            localStorage.setItem('asteroids_skill_tree', JSON.stringify({
                skillLevels: this.skillLevels, skillPoints: this.skillPoints, totalPointsEarned: this.totalPointsEarned
            }));
        } catch (e) { console.warn('Could not save skill tree:', e); }
    }
    load() {
        try {
            const saved = localStorage.getItem('asteroids_skill_tree');
            if (saved) {
                const data = JSON.parse(saved);
                this.skillLevels = { ...this.skillLevels, ...data.skillLevels };
                this.skillPoints = data.skillPoints || 0;
                this.totalPointsEarned = data.totalPointsEarned || 0;
            }
        } catch (e) { console.warn('Could not load skill tree:', e); }
    }
    getSkillLevel(skillId) { return this.skillLevels[skillId] || 0; }
    getSkillEffect(skillId) {
        const level = this.getSkillLevel(skillId);
        return level === 0 ? null : SKILLS[skillId].effect(level);
    }
    getAllEffects() {
        const effects = {};
        Object.keys(SKILLS).forEach(skillId => {
            const effect = this.getSkillEffect(skillId);
            if (effect) Object.assign(effects, effect);
        });
        return effects;
    }
    canUpgradeSkill(skillId) {
        const skill = SKILLS[skillId];
        const currentLevel = this.getSkillLevel(skillId);
        if (currentLevel >= skill.maxLevel) return false;
        if (this.skillPoints < skill.costPerLevel[currentLevel]) return false;
        if (skill.requires) {
            for (const reqId of skill.requires) { if (this.getSkillLevel(reqId) === 0) return false; }
        }
        return true;
    }
    upgradeSkill(skillId) {
        if (!this.canUpgradeSkill(skillId)) return false;
        const skill = SKILLS[skillId];
        const currentLevel = this.getSkillLevel(skillId);
        this.skillPoints -= skill.costPerLevel[currentLevel];
        this.skillLevels[skillId] = currentLevel + 1;
        this.save();
        return true;
    }
    addSkillPoints(points) {
        this.skillPoints += points;
        this.totalPointsEarned += points;
        this.save();
    }
    reset() {
        let refund = 0;
        Object.keys(SKILLS).forEach(skillId => {
            const skill = SKILLS[skillId];
            const level = this.getSkillLevel(skillId);
            for (let i = 0; i < level; i++) refund += skill.costPerLevel[i];
            this.skillLevels[skillId] = 0;
        });
        this.skillPoints += refund;
        this.save();
    }
}

class SkillTreeUI {
    constructor(skillTree, game) {
        this.skillTree = skillTree;
        this.game = game;
        this.visible = false;
        this.selectedCategory = 'OFFENSE';
        this.hoveredSkill = null;
        this.animPhase = 0;
        this.nodeSize = 52;      // Increased from 40 for touch (52px diameter > 44px HIG minimum)
        this.nodeSpacing = 110;  // Increased from 100 for more breathing room
        this.categoryTabWidth = 130;  // Slightly wider tabs
        this.categoryTabHeight = 48;  // Taller tabs for touch (48px > 44px)
    }
    toggle() { this.visible = !this.visible; if (this.visible) soundManager.playItemCollect(); }
    handleClick(x, y) {
        if (!this.visible) return false;
        const canvasRect = this.game.canvas.getBoundingClientRect();
        const scaleX = CANVAS_WIDTH / canvasRect.width;
        const scaleY = CANVAS_HEIGHT / canvasRect.height;
        x = (x - canvasRect.left) * scaleX;
        y = (y - canvasRect.top) * scaleY;
        
        const tabY = 80;
        const tabHeight = this.categoryTabHeight || 48;
        const categories = Object.keys(SKILL_CATEGORIES);
        categories.forEach((cat, i) => {
            const tabX = 130 + i * (this.categoryTabWidth + 15);
            if (x >= tabX && x <= tabX + this.categoryTabWidth && y >= tabY && y <= tabY + tabHeight) {
                this.selectedCategory = cat;
                soundManager.playItemCollect();
            }
        });
        
        const baseX = 200, baseY = 220;  // Slightly lower to account for taller tabs
        Object.entries(SKILLS).forEach(([skillId, skill]) => {
            if (skill.category !== this.selectedCategory) return;
            const nodeX = baseX + skill.position.x * this.nodeSpacing;
            const nodeY = baseY + skill.position.y * this.nodeSpacing;
            const dist = Math.sqrt((x - nodeX) ** 2 + (y - nodeY) ** 2);
            // Larger hit area for touch (add 8px tolerance)
            if (dist <= this.nodeSize / 2 + 8) {
                if (this.skillTree.canUpgradeSkill(skillId)) {
                    this.skillTree.upgradeSkill(skillId);
                    soundManager.playPowerUp();
                } else soundManager.playShieldHit();
            }
        });
        
        // Close button - larger hit area (50x50)
        if (x >= CANVAS_WIDTH - 65 && x <= CANVAS_WIDTH - 15 && y >= 25 && y <= 75) this.toggle();
        
        // Reset button - larger hit area
        if (x >= 25 && x <= 145 && y >= CANVAS_HEIGHT - 70 && y <= CANVAS_HEIGHT - 25) {
            this.skillTree.reset();
            soundManager.playItemUse();
        }
        return true;
    }
    handleMouseMove(x, y) {
        if (!this.visible) return;
        const canvasRect = this.game.canvas.getBoundingClientRect();
        x = (x - canvasRect.left) * (CANVAS_WIDTH / canvasRect.width);
        y = (y - canvasRect.top) * (CANVAS_HEIGHT / canvasRect.height);
        this.hoveredSkill = null;
        const baseX = 200, baseY = 200;
        Object.entries(SKILLS).forEach(([skillId, skill]) => {
            if (skill.category !== this.selectedCategory) return;
            const nodeX = baseX + skill.position.x * this.nodeSpacing;
            const nodeY = baseY + skill.position.y * this.nodeSpacing;
            if (Math.sqrt((x - nodeX) ** 2 + (y - nodeY) ** 2) <= this.nodeSize / 2) this.hoveredSkill = skillId;
        });
    }
    draw(ctx) {
        if (!this.visible) return;
        this.animPhase += 0.03;
        ctx.fillStyle = 'rgba(0, 0, 20, 0.95)';
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        
        ctx.save();
        ctx.shadowColor = '#00ffff'; ctx.shadowBlur = 20;
        ctx.fillStyle = '#00ffff'; ctx.font = 'bold 36px "Courier New", monospace';
        ctx.textAlign = 'center'; ctx.fillText('SKILL TREE', CANVAS_WIDTH / 2, 50);
        ctx.restore();
        
        ctx.save();
        ctx.shadowColor = '#ffff00'; ctx.shadowBlur = 10;
        ctx.fillStyle = '#ffff00'; ctx.font = 'bold 18px "Courier New", monospace';
        ctx.textAlign = 'right'; ctx.fillText(`Skill Points: ${this.skillTree.skillPoints}`, CANVAS_WIDTH - 30, 55);
        ctx.restore();
        
        this.drawCategoryTabs(ctx);
        this.drawSkillNodes(ctx);
        if (this.hoveredSkill) this.drawSkillDetails(ctx, this.hoveredSkill);
        
        ctx.save();
        ctx.strokeStyle = '#ff4444'; ctx.lineWidth = 3; ctx.shadowColor = '#ff4444'; ctx.shadowBlur = 10;
        ctx.beginPath(); ctx.moveTo(CANVAS_WIDTH - 55, 35); ctx.lineTo(CANVAS_WIDTH - 25, 65);
        ctx.moveTo(CANVAS_WIDTH - 25, 35); ctx.lineTo(CANVAS_WIDTH - 55, 65); ctx.stroke();
        ctx.restore();
        
        ctx.save();
        ctx.strokeStyle = '#ff8800'; ctx.fillStyle = '#ff880030'; ctx.lineWidth = 2;
        ctx.shadowColor = '#ff8800'; ctx.shadowBlur = 10;
        ctx.fillRect(30, CANVAS_HEIGHT - 60, 100, 30); ctx.strokeRect(30, CANVAS_HEIGHT - 60, 100, 30);
        ctx.fillStyle = '#ff8800'; ctx.font = '14px "Courier New", monospace';
        ctx.textAlign = 'center'; ctx.fillText('RESET', 80, CANVAS_HEIGHT - 40);
        ctx.restore();
        
        ctx.fillStyle = '#666666'; ctx.font = '12px "Courier New", monospace';
        ctx.textAlign = 'center'; ctx.fillText('Tap skills to upgrade | Tap X to close', CANVAS_WIDTH / 2, CANVAS_HEIGHT - 20);
    }
    drawCategoryTabs(ctx) {
        const tabY = 80;
        const tabHeight = this.categoryTabHeight || 48;
        Object.keys(SKILL_CATEGORIES).forEach((catId, i) => {
            const cat = SKILL_CATEGORIES[catId];
            const tabX = 130 + i * (this.categoryTabWidth + 15);
            const isSelected = catId === this.selectedCategory;
            ctx.save();
            ctx.fillStyle = isSelected ? cat.color + '40' : '#22222280';
            ctx.strokeStyle = cat.color; ctx.lineWidth = isSelected ? 3 : 2;
            ctx.shadowColor = cat.color; ctx.shadowBlur = isSelected ? 15 : 5;
            ctx.beginPath(); ctx.roundRect(tabX, tabY, this.categoryTabWidth, tabHeight, 8); ctx.fill(); ctx.stroke();
            ctx.fillStyle = isSelected ? '#ffffff' : cat.color;
            ctx.font = `${isSelected ? 'bold ' : ''}15px "Courier New", monospace`;
            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.fillText(`${cat.icon} ${cat.name}`, tabX + this.categoryTabWidth / 2, tabY + tabHeight / 2);
            ctx.restore();
        });
    }
    drawSkillNodes(ctx) {
        const baseX = 200, baseY = 200;
        const category = SKILL_CATEGORIES[this.selectedCategory];
        Object.entries(SKILLS).forEach(([skillId, skill]) => {
            if (skill.category !== this.selectedCategory || !skill.requires) return;
            const nodeX = baseX + skill.position.x * this.nodeSpacing;
            const nodeY = baseY + skill.position.y * this.nodeSpacing;
            skill.requires.forEach(reqId => {
                const reqSkill = SKILLS[reqId];
                if (reqSkill.category !== this.selectedCategory) return;
                const reqX = baseX + reqSkill.position.x * this.nodeSpacing;
                const reqY = baseY + reqSkill.position.y * this.nodeSpacing;
                const isUnlocked = this.skillTree.getSkillLevel(reqId) > 0;
                ctx.save();
                ctx.strokeStyle = isUnlocked ? category.color : '#333333'; ctx.lineWidth = 2;
                ctx.shadowColor = isUnlocked ? category.color : 'transparent'; ctx.shadowBlur = 10;
                ctx.setLineDash(isUnlocked ? [] : [5, 5]);
                ctx.beginPath(); ctx.moveTo(reqX, reqY); ctx.lineTo(nodeX, nodeY); ctx.stroke();
                ctx.restore();
            });
        });
        Object.entries(SKILLS).forEach(([skillId, skill]) => {
            if (skill.category !== this.selectedCategory) return;
            const nodeX = baseX + skill.position.x * this.nodeSpacing;
            const nodeY = baseY + skill.position.y * this.nodeSpacing;
            const level = this.skillTree.getSkillLevel(skillId);
            const canUpgrade = this.skillTree.canUpgradeSkill(skillId);
            const isHovered = this.hoveredSkill === skillId;
            const isMaxed = level >= skill.maxLevel;
            let isLocked = false;
            if (skill.requires) { for (const reqId of skill.requires) { if (this.skillTree.getSkillLevel(reqId) === 0) { isLocked = true; break; } } }
            ctx.save();
            let pulse = canUpgrade ? 1 + Math.sin(this.animPhase * 3) * 0.1 : 1;
            if (isHovered) pulse *= 1.15;
            let nodeColor = isLocked ? '#333333' : (isMaxed ? '#ffff00' : category.color);
            ctx.shadowColor = nodeColor; ctx.shadowBlur = level > 0 ? 20 : 10;
            ctx.fillStyle = level > 0 ? nodeColor + '40' : '#111111';
            ctx.strokeStyle = nodeColor; ctx.lineWidth = isHovered ? 3 : 2;
            ctx.beginPath(); ctx.arc(nodeX, nodeY, this.nodeSize / 2 * pulse, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
            if (skill.maxLevel > 1) {
                const pipRadius = 4, pipSpacing = 12;
                const startX = nodeX - ((skill.maxLevel - 1) * pipSpacing) / 2;
                for (let i = 0; i < skill.maxLevel; i++) {
                    ctx.fillStyle = i < level ? '#ffffff' : '#333333';
                    ctx.beginPath(); ctx.arc(startX + i * pipSpacing, nodeY + this.nodeSize / 2 + 10, pipRadius, 0, Math.PI * 2); ctx.fill();
                }
            }
            ctx.fillStyle = isLocked ? '#555555' : '#ffffff';
            ctx.font = '11px "Courier New", monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            const words = skill.name.split(' ');
            if (words.length > 1 && skill.name.length > 10) {
                ctx.fillText(words[0], nodeX, nodeY - 5);
                ctx.fillText(words.slice(1).join(' '), nodeX, nodeY + 8);
            } else ctx.fillText(skill.name, nodeX, nodeY);
            ctx.restore();
        });
    }
    drawSkillDetails(ctx, skillId) {
        const skill = SKILLS[skillId];
        const level = this.skillTree.getSkillLevel(skillId);
        const canUpgrade = this.skillTree.canUpgradeSkill(skillId);
        const category = SKILL_CATEGORIES[skill.category];
        const panelX = 450, panelY = 180, panelWidth = 300, panelHeight = 200;
        ctx.save();
        ctx.fillStyle = '#0a0a1a'; ctx.strokeStyle = category.color; ctx.lineWidth = 2;
        ctx.shadowColor = category.color; ctx.shadowBlur = 15;
        ctx.beginPath(); ctx.roundRect(panelX, panelY, panelWidth, panelHeight, 10); ctx.fill(); ctx.stroke();
        ctx.fillStyle = category.color; ctx.font = 'bold 18px "Courier New", monospace';
        ctx.textAlign = 'left'; ctx.fillText(skill.name, panelX + 15, panelY + 30);
        ctx.fillStyle = '#aaaaaa'; ctx.font = '14px "Courier New", monospace';
        ctx.fillText(`Level: ${level} / ${skill.maxLevel}`, panelX + 15, panelY + 55);
        ctx.fillStyle = '#ffffff'; ctx.font = '13px "Courier New", monospace';
        ctx.fillText(skill.description, panelX + 15, panelY + 80);
        if (level > 0) {
            const effectText = this.formatEffect(skill.effect(level));
            ctx.fillStyle = '#00ff00'; ctx.font = '12px "Courier New", monospace';
            ctx.fillText(`Current: ${effectText}`, panelX + 15, panelY + 110);
        }
        if (level < skill.maxLevel) {
            const cost = skill.costPerLevel[level];
            const nextEffectText = this.formatEffect(skill.effect(level + 1));
            ctx.fillStyle = canUpgrade ? '#ffff00' : '#ff4444'; ctx.font = '12px "Courier New", monospace';
            ctx.fillText(`Next: ${nextEffectText}`, panelX + 15, panelY + 135);
            ctx.fillText(`Cost: ${cost} point${cost > 1 ? 's' : ''}`, panelX + 15, panelY + 155);
        } else {
            ctx.fillStyle = '#ffff00'; ctx.font = 'bold 14px "Courier New", monospace';
            ctx.fillText('MAXED OUT!', panelX + 15, panelY + 145);
        }
        if (skill.requires && skill.requires.length > 0) {
            const allMet = skill.requires.every(req => this.skillTree.getSkillLevel(req) > 0);
            ctx.fillStyle = allMet ? '#00ff00' : '#ff4444'; ctx.font = '11px "Courier New", monospace';
            ctx.fillText(`Requires: ${skill.requires.map(req => SKILLS[req].name).join(', ')}`, panelX + 15, panelY + 180);
        }
        ctx.restore();
    }
    formatEffect(effect) {
        const key = Object.keys(effect)[0];
        const value = effect[key];
        const labels = {
            shootCooldownReduction: `${Math.round(value * 100)}% faster firing`,
            bulletSpeedBonus: `${Math.round(value * 100)}% bullet speed`,
            pierceChance: `${Math.round(value * 100)}% pierce chance`,
            explosionRadius: `${value}px explosion`,
            critChance: `${Math.round(value * 100)}% crit chance`,
            startingLives: `+${value} starting lives`,
            shieldDurationBonus: `${Math.round(value * 100)}% shield duration`,
            regenInterval: `Regen every ${Math.round(value / 60)}s`,
            spawnInvulnBonus: `+${value / 60}s spawn protection`,
            emergencyShieldChance: `${Math.round(value * 100)}% auto-shield`,
            magnetRangeBonus: `+${value}px magnet range`,
            powerUpDurationBonus: `${Math.round(value * 100)}% power-up duration`,
            scoreBonus: `+${Math.round(value * 100)}% score`,
            dropChanceBonus: `+${Math.round(value * 100)}% drop rate`,
            extraInventorySlots: `+${value} inventory slot${value > 1 ? 's' : ''}`,
            xpBonus: `+${Math.round(value * 100)}% skill point gain`
        };
        return labels[key] || `${key}: ${value}`;
    }
}

// ============== SAVE MANAGER CLASS ==============
// Handles save/load game functionality with localStorage

const SAVE_VERSION = 1;
const MAX_SAVE_SLOTS = 3;
const SAVE_KEY_PREFIX = 'asteroids_save_';

class SaveManager {
    constructor(game) {
        this.game = game;
    }
    
    getSlotKey(slot) {
        return `${SAVE_KEY_PREFIX}slot_${slot}`;
    }
    
    getAllSaves() {
        const saves = [];
        for (let i = 1; i <= MAX_SAVE_SLOTS; i++) {
            const data = this.loadRaw(i);
            if (data) {
                saves.push({
                    slot: i,
                    level: data.level,
                    score: data.score,
                    date: new Date(data.savedAt),
                    skillPoints: data.skillTree?.skillPoints || 0
                });
            } else {
                saves.push({ slot: i, empty: true });
            }
        }
        return saves;
    }
    
    loadRaw(slot) {
        try {
            const key = this.getSlotKey(slot);
            const json = localStorage.getItem(key);
            if (!json) return null;
            return JSON.parse(json);
        } catch (e) {
            console.warn(`Failed to load save slot ${slot}:`, e);
            return null;
        }
    }
    
    save(slot) {
        if (slot < 1 || slot > MAX_SAVE_SLOTS) {
            console.error('Invalid save slot:', slot);
            return false;
        }
        
        const game = this.game;
        
        const saveData = {
            version: SAVE_VERSION,
            savedAt: Date.now(),
            score: game.score,
            lives: game.lives,
            level: game.level,
            maxCombo: game.maxCombo,
            inventory: game.inventory.map(item => item.type),
            magnetTimer: game.magnetTimer,
            magnetActive: game.magnetActive,
            scoreMultiplierTimer: game.scoreMultiplierTimer,
            scoreMultiplier: game.scoreMultiplier,
            freezeTimer: game.freezeTimer,
            freezeActive: game.freezeActive,
            ship: game.ship ? {
                x: game.ship.x,
                y: game.ship.y,
                angle: game.ship.angle,
                vx: game.ship.vx,
                vy: game.ship.vy,
                hasShield: game.ship.hasShield,
                hasRapidFire: game.ship.hasRapidFire,
                hasTripleShot: game.ship.hasTripleShot,
                hasSpeedBoost: game.ship.hasSpeedBoost,
                shieldTimer: game.ship.shieldTimer,
                rapidFireTimer: game.ship.rapidFireTimer,
                tripleShotTimer: game.ship.tripleShotTimer,
                speedBoostTimer: game.ship.speedBoostTimer
            } : null,
            skillTree: {
                skillLevels: game.skillTree.skillLevels,
                skillPoints: game.skillTree.skillPoints,
                totalPointsEarned: game.skillTree.totalPointsEarned
            }
        };
        
        try {
            const key = this.getSlotKey(slot);
            localStorage.setItem(key, JSON.stringify(saveData));
            console.log(`Game saved to slot ${slot}`);
            if (soundManager.playSaveSound) soundManager.playSaveSound();
            return true;
        } catch (e) {
            console.error('Failed to save game:', e);
            return false;
        }
    }
    
    load(slot) {
        const data = this.loadRaw(slot);
        if (!data) {
            console.warn('No save data in slot:', slot);
            return false;
        }
        
        const game = this.game;
        
        game.state = 'playing';
        game.ship = new Ship(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, game);
        game.asteroids = [];
        game.bullets = [];
        game.particles = [];
        game.trailParticles = [];
        game.explosionParticles = [];
        game.powerUps = [];
        game.items = [];
        game.inventory = [];
        game.ufos = [];
        game.enemyBullets = [];
        game.boss = null;
        game.bossLevel = false;
        game.comboCount = 0;
        game.comboTimer = 0;
        game.comboDisplayTimer = 0;
        
        game.score = data.score || 0;
        game.lives = data.lives || 3;
        game.level = data.level || 1;
        game.maxCombo = data.maxCombo || 0;
        
        if (data.inventory && Array.isArray(data.inventory)) {
            data.inventory.forEach(type => {
                if (ITEM_TYPES[type]) {
                    game.inventory.push({ type: type });
                }
            });
        }
        
        game.magnetActive = data.magnetActive || false;
        game.magnetTimer = data.magnetTimer || 0;
        game.scoreMultiplier = data.scoreMultiplier || 1;
        game.scoreMultiplierTimer = data.scoreMultiplierTimer || 0;
        game.freezeActive = data.freezeActive || false;
        game.freezeTimer = data.freezeTimer || 0;
        
        if (data.ship && game.ship) {
            game.ship.x = data.ship.x || CANVAS_WIDTH / 2;
            game.ship.y = data.ship.y || CANVAS_HEIGHT / 2;
            game.ship.angle = data.ship.angle || 0;
            game.ship.vx = data.ship.vx || 0;
            game.ship.vy = data.ship.vy || 0;
            game.ship.hasShield = data.ship.hasShield || false;
            game.ship.hasRapidFire = data.ship.hasRapidFire || false;
            game.ship.hasTripleShot = data.ship.hasTripleShot || false;
            game.ship.hasSpeedBoost = data.ship.hasSpeedBoost || false;
            game.ship.shieldTimer = data.ship.shieldTimer || 0;
            game.ship.rapidFireTimer = data.ship.rapidFireTimer || 0;
            game.ship.tripleShotTimer = data.ship.tripleShotTimer || 0;
            game.ship.speedBoostTimer = data.ship.speedBoostTimer || 0;
        }
        
        if (data.skillTree) {
            if (data.skillTree.skillLevels) {
                Object.keys(data.skillTree.skillLevels).forEach(skillId => {
                    if (game.skillTree.skillLevels.hasOwnProperty(skillId)) {
                        game.skillTree.skillLevels[skillId] = data.skillTree.skillLevels[skillId];
                    }
                });
            }
            game.skillTree.skillPoints = data.skillTree.skillPoints || 0;
            game.skillTree.totalPointsEarned = data.skillTree.totalPointsEarned || 0;
        }
        
        const effects = game.skillTree.getAllEffects();
        game.maxInventorySlots = MAX_INVENTORY_SLOTS + (effects.extraInventorySlots || 0);
        
        if (BOSS_LEVELS.includes(game.level)) {
            game.bossLevel = true;
            game.boss = new Boss(game);
        } else {
            game.spawnAsteroids(3 + game.level);
        }
        
        game.ufoSpawnTimer = game.getRandomUfoSpawnTime();
        game.updateUI();
        game.updateInventoryUI();
        game.triggerFlash('#00ff88', 0.3);
        if (soundManager.playLoadSound) soundManager.playLoadSound();
        
        console.log(`Game loaded from slot ${slot}`);
        return true;
    }
    
    deleteSave(slot) {
        try {
            const key = this.getSlotKey(slot);
            localStorage.removeItem(key);
            console.log(`Deleted save slot ${slot}`);
            return true;
        } catch (e) {
            console.error('Failed to delete save:', e);
            return false;
        }
    }
    
    hasSaves() {
        for (let i = 1; i <= MAX_SAVE_SLOTS; i++) {
            if (this.loadRaw(i)) return true;
        }
        return false;
    }
    
    autoSave() {
        let targetSlot = 1;
        let oldestTime = Infinity;
        
        for (let i = 1; i <= MAX_SAVE_SLOTS; i++) {
            const data = this.loadRaw(i);
            if (!data) {
                targetSlot = i;
                break;
            }
            if (data.savedAt < oldestTime) {
                oldestTime = data.savedAt;
                targetSlot = i;
            }
        }
        
        return this.save(targetSlot);
    }
}

// ============== SAVE/LOAD UI CLASS ==============
class SaveLoadUI {
    constructor(game) {
        this.game = game;
        this.visible = false;
        this.mode = 'save';
        this.hoveredSlot = -1;
        this.hoveredButton = null;
        this.saveManager = new SaveManager(game);
        this.confirmDelete = -1;
    }
    
    open(mode) {
        this.mode = mode;
        this.visible = true;
        this.hoveredSlot = -1;
        this.hoveredButton = null;
        this.confirmDelete = -1;
    }
    
    close() {
        this.visible = false;
        this.confirmDelete = -1;
    }
    
    toggle(mode) {
        if (this.visible && this.mode === mode) {
            this.close();
        } else {
            this.open(mode);
        }
    }
    
    handleClick(x, y) {
        if (!this.visible) return false;
        
        const canvasRect = this.game.canvas.getBoundingClientRect();
        const scaleX = CANVAS_WIDTH / canvasRect.width;
        const scaleY = CANVAS_HEIGHT / canvasRect.height;
        x = (x - canvasRect.left) * scaleX;
        y = (y - canvasRect.top) * scaleY;
        
        const centerX = CANVAS_WIDTH / 2;
        const startY = 150;
        const slotHeight = 80;
        const slotWidth = 350;
        
        const closeX = centerX + slotWidth / 2 - 30;
        const closeY = startY - 40;
        if (Math.abs(x - closeX) < 15 && Math.abs(y - closeY) < 15) {
            this.close();
            return true;
        }
        
        const saves = this.saveManager.getAllSaves();
        for (let i = 0; i < saves.length; i++) {
            const slotY = startY + i * (slotHeight + 10);
            const slot = saves[i];
            
            if (x >= centerX - slotWidth / 2 && x <= centerX + slotWidth / 2 &&
                y >= slotY && y <= slotY + slotHeight) {
                
                const deleteX = centerX + slotWidth / 2 - 35;
                const deleteY = slotY + slotHeight / 2;
                if (!slot.empty && Math.abs(x - deleteX) < 20 && Math.abs(y - deleteY) < 15) {
                    if (this.confirmDelete === slot.slot) {
                        this.saveManager.deleteSave(slot.slot);
                        this.confirmDelete = -1;
                        soundManager.playExplosion(0.5);
                    } else {
                        this.confirmDelete = slot.slot;
                    }
                    return true;
                }
                
                this.confirmDelete = -1;
                
                if (this.mode === 'save') {
                    if (this.saveManager.save(slot.slot)) {
                        this.game.triggerFlash('#00ff00', 0.2);
                    }
                    return true;
                } else if (this.mode === 'load' && !slot.empty) {
                    if (this.saveManager.load(slot.slot)) {
                        this.close();
                    }
                    return true;
                }
            }
        }
        
        return true;
    }
    
    handleMouseMove(x, y) {
        if (!this.visible) return;
        
        const canvasRect = this.game.canvas.getBoundingClientRect();
        const scaleX = CANVAS_WIDTH / canvasRect.width;
        const scaleY = CANVAS_HEIGHT / canvasRect.height;
        x = (x - canvasRect.left) * scaleX;
        y = (y - canvasRect.top) * scaleY;
        
        const centerX = CANVAS_WIDTH / 2;
        const startY = 150;
        const slotHeight = 80;
        const slotWidth = 350;
        
        this.hoveredSlot = -1;
        this.hoveredButton = null;
        
        const closeX = centerX + slotWidth / 2 - 30;
        const closeY = startY - 40;
        if (Math.abs(x - closeX) < 15 && Math.abs(y - closeY) < 15) {
            this.hoveredButton = 'close';
            return;
        }
        
        const saves = this.saveManager.getAllSaves();
        for (let i = 0; i < saves.length; i++) {
            const slotY = startY + i * (slotHeight + 10);
            
            if (x >= centerX - slotWidth / 2 && x <= centerX + slotWidth / 2 &&
                y >= slotY && y <= slotY + slotHeight) {
                this.hoveredSlot = i;
                
                const deleteX = centerX + slotWidth / 2 - 35;
                const deleteY = slotY + slotHeight / 2;
                if (Math.abs(x - deleteX) < 20 && Math.abs(y - deleteY) < 15) {
                    this.hoveredButton = 'delete';
                }
                break;
            }
        }
    }
    
    draw(ctx) {
        if (!this.visible) return;
        
        const centerX = CANVAS_WIDTH / 2;
        const startY = 150;
        const slotHeight = 80;
        const slotWidth = 350;
        
        ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        
        ctx.save();
        ctx.shadowColor = this.mode === 'save' ? '#00ff00' : '#00ffff';
        ctx.shadowBlur = 20;
        ctx.fillStyle = this.mode === 'save' ? '#00ff00' : '#00ffff';
        ctx.font = 'bold 32px "Courier New", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(this.mode === 'save' ? 'SAVE GAME' : 'LOAD GAME', centerX, startY - 50);
        ctx.restore();
        
        const closeX = centerX + slotWidth / 2 - 30;
        const closeY = startY - 40;
        ctx.save();
        ctx.strokeStyle = this.hoveredButton === 'close' ? '#ff6666' : '#888888';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(closeX - 10, closeY - 10);
        ctx.lineTo(closeX + 10, closeY + 10);
        ctx.moveTo(closeX + 10, closeY - 10);
        ctx.lineTo(closeX - 10, closeY + 10);
        ctx.stroke();
        ctx.restore();
        
        const saves = this.saveManager.getAllSaves();
        for (let i = 0; i < saves.length; i++) {
            const slotY = startY + i * (slotHeight + 10);
            const slot = saves[i];
            const isHovered = this.hoveredSlot === i;
            const isDeleteHovered = isHovered && this.hoveredButton === 'delete';
            const isConfirmingDelete = this.confirmDelete === slot.slot;
            
            ctx.fillStyle = isHovered ? 'rgba(255, 255, 255, 0.1)' : 'rgba(30, 30, 50, 0.8)';
            ctx.fillRect(centerX - slotWidth / 2, slotY, slotWidth, slotHeight);
            
            ctx.strokeStyle = isHovered ? '#00ffff' : '#444466';
            ctx.lineWidth = 2;
            ctx.strokeRect(centerX - slotWidth / 2, slotY, slotWidth, slotHeight);
            
            ctx.textAlign = 'left';
            const textX = centerX - slotWidth / 2 + 20;
            
            if (slot.empty) {
                ctx.fillStyle = '#666666';
                ctx.font = '18px "Courier New", monospace';
                ctx.fillText(`SLOT ${slot.slot}`, textX, slotY + 30);
                ctx.fillStyle = '#444444';
                ctx.font = '14px "Courier New", monospace';
                ctx.fillText('├ÄΓÇ£├â┬╢├é┬ú├óΓÇ¥┼ô├óΓÇ¥ΓÇÜ├óΓÇó┬¼├â┬┤├óΓÇ¥┼ô├ó┼Æ┬É├óΓÇ¥┬¼├óΓÇó┬¥├óΓÇó┬¼├â┬┤├óΓÇ¥┼ô├â┬º├óΓÇ¥┬¼├âΓÇÿ Empty ├ÄΓÇ£├â┬╢├é┬ú├óΓÇ¥┼ô├óΓÇ¥ΓÇÜ├óΓÇó┬¼├â┬┤├óΓÇ¥┼ô├ó┼Æ┬É├óΓÇ¥┬¼├óΓÇó┬¥├óΓÇó┬¼├â┬┤├óΓÇ¥┼ô├â┬º├óΓÇ¥┬¼├âΓÇÿ', textX, slotY + 55);
            } else {
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 18px "Courier New", monospace';
                ctx.fillText(`SLOT ${slot.slot}`, textX, slotY + 25);
                
                ctx.fillStyle = '#00ffff';
                ctx.font = '14px "Courier New", monospace';
                ctx.fillText(`Level ${slot.level}  ├ÄΓÇ£├â┬╢├é┬ú├óΓÇ¥┼ô├óΓÇ¥ΓÇÜ├óΓÇó┬¼├â┬┤├óΓÇ¥┼ô├ó┼Æ┬É├óΓÇ¥┬¼├óΓÇó┬¥├ÄΓÇ£├â┬╢├é┬╝├óΓÇ¥┼ô├óΓÇ¥ΓÇÜ  Score: ${slot.score.toLocaleString()}`, textX, slotY + 48);
                
                ctx.fillStyle = '#888888';
                ctx.font = '12px "Courier New", monospace';
                const dateStr = slot.date.toLocaleDateString() + ' ' + slot.date.toLocaleTimeString();
                ctx.fillText(`${dateStr}  ├ÄΓÇ£├â┬╢├é┬ú├óΓÇ¥┼ô├óΓÇ¥ΓÇÜ├óΓÇó┬¼├â┬┤├óΓÇ¥┼ô├ó┼Æ┬É├óΓÇ¥┬¼├óΓÇó┬¥├ÄΓÇ£├â┬╢├é┬╝├óΓÇ¥┼ô├óΓÇ¥ΓÇÜ  ${slot.skillPoints} skill pts`, textX, slotY + 68);
                
                const deleteX = centerX + slotWidth / 2 - 35;
                const deleteY = slotY + slotHeight / 2;
                
                ctx.save();
                if (isConfirmingDelete) {
                    ctx.fillStyle = '#ff4444';
                    ctx.font = 'bold 10px "Courier New", monospace';
                    ctx.textAlign = 'center';
                    ctx.fillText('CONFIRM?', deleteX, deleteY - 8);
                    ctx.fillText('TAP', deleteX, deleteY + 8);
                } else {
                    ctx.strokeStyle = isDeleteHovered ? '#ff6666' : '#666666';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(deleteX - 8, deleteY - 8);
                    ctx.lineTo(deleteX + 8, deleteY + 8);
                    ctx.moveTo(deleteX + 8, deleteY - 8);
                    ctx.lineTo(deleteX - 8, deleteY + 8);
                    ctx.stroke();
                }
                ctx.restore();
            }
        }
        
        ctx.fillStyle = '#666666';
        ctx.font = '14px "Courier New", monospace';
        ctx.textAlign = 'center';
        const instrY = startY + 3 * (slotHeight + 10) + 30;
        if (this.mode === 'save') {
            ctx.fillText('Tap a slot to save your progress', centerX, instrY);
        } else {
            ctx.fillText('Tap a saved game to load it', centerX, instrY);
        }
        ctx.fillText('Tap X to close', centerX, instrY + 25);
    }
}

// ============== SOUND MANAGER CLASS ==============
// Procedural audio using Web Audio API - no external files needed!
class SoundManager {
    constructor() {
        this.audioContext = null;
        this.masterGain = null;
        this.muted = false;
        this.initialized = false;
        
        // Engine sound state
        this.engineOscillator = null;
        this.engineGain = null;
        this.engineActive = false;
    }
    
    // Initialize audio context (must be called after user interaction)
    init() {
        if (this.initialized) return;
        
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.masterGain = this.audioContext.createGain();
            this.masterGain.gain.value = 0.3; // Master volume
            this.masterGain.connect(this.audioContext.destination);
            this.initialized = true;
        } catch (e) {
            console.warn('Web Audio API not supported:', e);
        }
    }
    
    // Resume audio context if suspended (browser autoplay policy)
    resume() {
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
    }
    
    // iOS audio unlock - play silent buffer to enable audio
    unlockiOS() {
        if (!this.audioContext) return;
        
        // Create and play a silent buffer
        const buffer = this.audioContext.createBuffer(1, 1, 22050);
        const source = this.audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(this.audioContext.destination);
        source.start(0);
        
        // Also resume if suspended
        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
    }
    
    // Toggle mute
    toggleMute() {
        this.muted = !this.muted;
        if (this.masterGain) {
            this.masterGain.gain.value = this.muted ? 0 : 0.3;
        }
        return this.muted;
    }
    
    // Create an oscillator with envelope
    createOscillator(type, frequency, startTime, duration, volume = 0.5) {
        if (!this.initialized || this.muted) return null;
        
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        
        osc.type = type;
        osc.frequency.value = frequency;
        
        gain.gain.value = 0;
        
        osc.connect(gain);
        gain.connect(this.masterGain);
        
        return { osc, gain, startTime, duration, volume };
    }
    
    // === LASER PEW SOUND ===
    // Quick descending pitch with harmonics
    playLaser() {
        if (!this.initialized) return;
        this.resume();
        
        const now = this.audioContext.currentTime;
        
        // Main laser tone - descending
        const osc1 = this.audioContext.createOscillator();
        const gain1 = this.audioContext.createGain();
        
        osc1.type = 'sawtooth';
        osc1.frequency.setValueAtTime(880, now);
        osc1.frequency.exponentialRampToValueAtTime(220, now + 0.15);
        
        gain1.gain.setValueAtTime(0.3, now);
        gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        
        osc1.connect(gain1);
        gain1.connect(this.masterGain);
        
        osc1.start(now);
        osc1.stop(now + 0.15);
        
        // High frequency click for punch
        const osc2 = this.audioContext.createOscillator();
        const gain2 = this.audioContext.createGain();
        
        osc2.type = 'square';
        osc2.frequency.setValueAtTime(1200, now);
        osc2.frequency.exponentialRampToValueAtTime(400, now + 0.05);
        
        gain2.gain.setValueAtTime(0.15, now);
        gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
        
        osc2.connect(gain2);
        gain2.connect(this.masterGain);
        
        osc2.start(now);
        osc2.stop(now + 0.05);
    }
    
    // === UFO LASER SOUND ===
    // Alien-sounding descending warble
    playUfoLaser() {
        if (!this.initialized) return;
        this.resume();
        
        const now = this.audioContext.currentTime;
        
        // Warbling alien laser
        const osc1 = this.audioContext.createOscillator();
        const gain1 = this.audioContext.createGain();
        
        osc1.type = 'square';
        osc1.frequency.setValueAtTime(600, now);
        osc1.frequency.exponentialRampToValueAtTime(150, now + 0.2);
        
        // Add vibrato LFO
        const lfo = this.audioContext.createOscillator();
        const lfoGain = this.audioContext.createGain();
        lfo.type = 'sine';
        lfo.frequency.value = 30;
        lfoGain.gain.value = 50;
        lfo.connect(lfoGain);
        lfoGain.connect(osc1.frequency);
        lfo.start(now);
        lfo.stop(now + 0.2);
        
        gain1.gain.setValueAtTime(0.2, now);
        gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        
        osc1.connect(gain1);
        gain1.connect(this.masterGain);
        
        osc1.start(now);
        osc1.stop(now + 0.2);
    }
    
    // === UFO HUM SOUND ===
    // Eerie hovering sound when UFO appears
    playUfoAppear() {
        if (!this.initialized) return;
        this.resume();
        
        const now = this.audioContext.currentTime;
        
        // Spooky ascending tone
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(100, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.5);
        
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.15, now + 0.1);
        gain.gain.setValueAtTime(0.15, now + 0.4);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
        
        osc.connect(gain);
        gain.connect(this.masterGain);
        
        osc.start(now);
        osc.stop(now + 0.6);
        
        // Add eerie harmonic
        const osc2 = this.audioContext.createOscillator();
        const gain2 = this.audioContext.createGain();
        
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(150, now);
        osc2.frequency.exponentialRampToValueAtTime(600, now + 0.5);
        
        gain2.gain.setValueAtTime(0, now);
        gain2.gain.linearRampToValueAtTime(0.08, now + 0.1);
        gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
        
        osc2.connect(gain2);
        gain2.connect(this.masterGain);
        
        osc2.start(now);
        osc2.stop(now + 0.5);
    }
    
    // === UFO DESTROYED SOUND ===
    // Satisfying alien destruction
    playUfoDestroyed() {
        if (!this.initialized) return;
        this.resume();
        
        const now = this.audioContext.currentTime;
        
        // Big descending explosion with warble
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(50, now + 0.6);
        
        // Warble effect
        const lfo = this.audioContext.createOscillator();
        const lfoGain = this.audioContext.createGain();
        lfo.type = 'sine';
        lfo.frequency.value = 20;
        lfoGain.gain.value = 100;
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start(now);
        lfo.stop(now + 0.6);
        
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
        
        const filter = this.audioContext.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2000, now);
        filter.frequency.exponentialRampToValueAtTime(200, now + 0.6);
        
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);
        
        osc.start(now);
        osc.stop(now + 0.6);
        
        // Noise burst
        const bufferSize = this.audioContext.sampleRate * 0.5;
        const noiseBuffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }
        
        const noise = this.audioContext.createBufferSource();
        noise.buffer = noiseBuffer;
        
        const noiseFilter = this.audioContext.createBiquadFilter();
        noiseFilter.type = 'bandpass';
        noiseFilter.frequency.setValueAtTime(1000, now);
        noiseFilter.frequency.exponentialRampToValueAtTime(100, now + 0.5);
        noiseFilter.Q.value = 2;
        
        const noiseGain = this.audioContext.createGain();
        noiseGain.gain.setValueAtTime(0.25, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
        
        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(this.masterGain);
        
        noise.start(now);
        noise.stop(now + 0.5);
    }
    
    // === EXPLOSION SOUND ===
    // Layered noise burst with low frequency rumble
    playExplosion(size = 1) {
        if (!this.initialized) return;
        this.resume();
        
        const now = this.audioContext.currentTime;
        const duration = 0.3 + size * 0.15;
        const volume = 0.2 + size * 0.1;
        
        // White noise burst for explosion texture
        const bufferSize = this.audioContext.sampleRate * duration;
        const noiseBuffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }
        
        const noise = this.audioContext.createBufferSource();
        noise.buffer = noiseBuffer;
        
        // Filter the noise for more boom, less hiss
        const noiseFilter = this.audioContext.createBiquadFilter();
        noiseFilter.type = 'lowpass';
        noiseFilter.frequency.setValueAtTime(1000, now);
        noiseFilter.frequency.exponentialRampToValueAtTime(100, now + duration);
        
        const noiseGain = this.audioContext.createGain();
        noiseGain.gain.setValueAtTime(volume, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.01, now + duration);
        
        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(this.masterGain);
        
        noise.start(now);
        noise.stop(now + duration);
        
        // Low frequency impact
        const bass = this.audioContext.createOscillator();
        const bassGain = this.audioContext.createGain();
        
        bass.type = 'sine';
        bass.frequency.setValueAtTime(150 - size * 20, now);
        bass.frequency.exponentialRampToValueAtTime(30, now + duration * 0.8);
        
        bassGain.gain.setValueAtTime(volume * 0.8, now);
        bassGain.gain.exponentialRampToValueAtTime(0.01, now + duration * 0.8);
        
        bass.connect(bassGain);
        bassGain.connect(this.masterGain);
        
        bass.start(now);
        bass.stop(now + duration);
        
        // Mid-frequency crackle
        const crackle = this.audioContext.createOscillator();
        const crackleGain = this.audioContext.createGain();
        
        crackle.type = 'square';
        crackle.frequency.setValueAtTime(200, now);
        crackle.frequency.exponentialRampToValueAtTime(50, now + 0.1);
        
        crackleGain.gain.setValueAtTime(volume * 0.3, now);
        crackleGain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        
        crackle.connect(crackleGain);
        crackleGain.connect(this.masterGain);
        
        crackle.start(now);
        crackle.stop(now + 0.1);
    }
    
    // === ENGINE HUM ===
    // Continuous thruster sound - call startEngine/stopEngine
    startEngine() {
        if (!this.initialized || this.engineActive) return;
        this.resume();
        
        const now = this.audioContext.currentTime;
        
        // Create low rumble oscillator
        this.engineOscillator = this.audioContext.createOscillator();
        this.engineGain = this.audioContext.createGain();
        
        // Use sawtooth for more aggressive thruster sound
        this.engineOscillator.type = 'sawtooth';
        this.engineOscillator.frequency.value = 80;
        
        // Add slight pitch variation with LFO
        const lfo = this.audioContext.createOscillator();
        const lfoGain = this.audioContext.createGain();
        lfo.type = 'sine';
        lfo.frequency.value = 8; // 8 Hz wobble
        lfoGain.gain.value = 10; // +/-10 Hz variation
        
        lfo.connect(lfoGain);
        lfoGain.connect(this.engineOscillator.frequency);
        lfo.start(now);
        
        // Low pass filter for rumble
        const filter = this.audioContext.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 200;
        filter.Q.value = 2;
        
        this.engineGain.gain.setValueAtTime(0, now);
        this.engineGain.gain.linearRampToValueAtTime(0.15, now + 0.1);
        
        this.engineOscillator.connect(filter);
        filter.connect(this.engineGain);
        this.engineGain.connect(this.masterGain);
        
        this.engineOscillator.start(now);
        this.engineActive = true;
        
        // Store LFO for cleanup
        this.engineLFO = lfo;
    }
    
    stopEngine() {
        if (!this.engineActive || !this.engineOscillator) return;
        
        const now = this.audioContext.currentTime;
        
        this.engineGain.gain.linearRampToValueAtTime(0, now + 0.1);
        
        setTimeout(() => {
            if (this.engineOscillator) {
                this.engineOscillator.stop();
                this.engineOscillator = null;
            }
            if (this.engineLFO) {
                this.engineLFO.stop();
                this.engineLFO = null;
            }
            this.engineActive = false;
        }, 150);
    }
    
    // Update engine intensity based on thrust
    updateEngine(intensity) {
        if (!this.engineGain || !this.engineActive) return;
        this.engineGain.gain.value = 0.08 + intensity * 0.12;
        if (this.engineOscillator) {
            this.engineOscillator.frequency.value = 70 + intensity * 30;
        }
    }
    
    // === POWER-UP COLLECT CHIME ===
    // Bright ascending arpeggio
    playPowerUp() {
        if (!this.initialized) return;
        this.resume();
        
        const now = this.audioContext.currentTime;
        
        // Arpeggio notes (C major 7th chord going up)
        const notes = [523.25, 659.25, 783.99, 987.77]; // C5, E5, G5, B5
        
        notes.forEach((freq, i) => {
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();
            
            osc.type = 'sine';
            osc.frequency.value = freq;
            
            const startTime = now + i * 0.06;
            const noteLength = 0.15;
            
            gain.gain.setValueAtTime(0, startTime);
            gain.gain.linearRampToValueAtTime(0.2, startTime + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.01, startTime + noteLength);
            
            osc.connect(gain);
            gain.connect(this.masterGain);
            
            osc.start(startTime);
            osc.stop(startTime + noteLength);
        });
        
        // Add sparkle with high frequency
        const sparkle = this.audioContext.createOscillator();
        const sparkleGain = this.audioContext.createGain();
        
        sparkle.type = 'sine';
        sparkle.frequency.setValueAtTime(2000, now);
        sparkle.frequency.exponentialRampToValueAtTime(3000, now + 0.3);
        
        sparkleGain.gain.setValueAtTime(0.08, now);
        sparkleGain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        
        sparkle.connect(sparkleGain);
        sparkleGain.connect(this.masterGain);
        
        sparkle.start(now);
        sparkle.stop(now + 0.3);
    }
    
    // === ITEM COLLECT ===
    // Shorter, lower pitched collect sound
    playItemCollect() {
        if (!this.initialized) return;
        this.resume();
        
        const now = this.audioContext.currentTime;
        
        // Two-note pickup
        const osc1 = this.audioContext.createOscillator();
        const gain1 = this.audioContext.createGain();
        
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(440, now);
        
        gain1.gain.setValueAtTime(0.2, now);
        gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        
        osc1.connect(gain1);
        gain1.connect(this.masterGain);
        
        osc1.start(now);
        osc1.stop(now + 0.1);
        
        // Second note
        const osc2 = this.audioContext.createOscillator();
        const gain2 = this.audioContext.createGain();
        
        osc2.type = 'sine';
        osc2.frequency.value = 660;
        
        gain2.gain.setValueAtTime(0, now + 0.05);
        gain2.gain.linearRampToValueAtTime(0.2, now + 0.07);
        gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        
        osc2.connect(gain2);
        gain2.connect(this.masterGain);
        
        osc2.start(now + 0.05);
        osc2.stop(now + 0.15);
    }
    
    // === SHIELD HIT ===
    // Electric zap/deflection sound
    playShieldHit() {
        if (!this.initialized) return;
        this.resume();
        
        const now = this.audioContext.currentTime;
        
        // Electric zap
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.15);
        
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        
        osc.connect(gain);
        gain.connect(this.masterGain);
        
        osc.start(now);
        osc.stop(now + 0.15);
        
        // High frequency sizzle
        const bufferSize = this.audioContext.sampleRate * 0.1;
        const noiseBuffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }
        
        const noise = this.audioContext.createBufferSource();
        noise.buffer = noiseBuffer;
        
        const noiseFilter = this.audioContext.createBiquadFilter();
        noiseFilter.type = 'highpass';
        noiseFilter.frequency.value = 3000;
        
        const noiseGain = this.audioContext.createGain();
        noiseGain.gain.setValueAtTime(0.15, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        
        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(this.masterGain);
        
        noise.start(now);
        noise.stop(now + 0.1);
    }
    
    // === LEVEL COMPLETE FANFARE ===
    // Triumphant ascending melody
    playLevelComplete() {
        if (!this.initialized) return;
        this.resume();
        
        const now = this.audioContext.currentTime;
        
        // Victory fanfare notes
        const melody = [
            { freq: 523.25, time: 0, dur: 0.15 },     // C5
            { freq: 659.25, time: 0.12, dur: 0.15 },  // E5
            { freq: 783.99, time: 0.24, dur: 0.15 },  // G5
            { freq: 1046.50, time: 0.36, dur: 0.4 },  // C6 (held)
        ];
        
        melody.forEach(note => {
            // Main tone
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();
            
            osc.type = 'square';
            osc.frequency.value = note.freq;
            
            const startTime = now + note.time;
            
            gain.gain.setValueAtTime(0, startTime);
            gain.gain.linearRampToValueAtTime(0.15, startTime + 0.02);
            gain.gain.setValueAtTime(0.15, startTime + note.dur - 0.05);
            gain.gain.exponentialRampToValueAtTime(0.01, startTime + note.dur);
            
            osc.connect(gain);
            gain.connect(this.masterGain);
            
            osc.start(startTime);
            osc.stop(startTime + note.dur);
            
            // Octave harmony
            const osc2 = this.audioContext.createOscillator();
            const gain2 = this.audioContext.createGain();
            
            osc2.type = 'sine';
            osc2.frequency.value = note.freq * 2;
            
            gain2.gain.setValueAtTime(0, startTime);
            gain2.gain.linearRampToValueAtTime(0.08, startTime + 0.02);
            gain2.gain.exponentialRampToValueAtTime(0.01, startTime + note.dur);
            
            osc2.connect(gain2);
            gain2.connect(this.masterGain);
            
            osc2.start(startTime);
            osc2.stop(startTime + note.dur);
        });
    }
    
    // === GAME OVER ===
    // Descending, ominous tones
    playGameOver() {
        if (!this.initialized) return;
        this.resume();
        
        const now = this.audioContext.currentTime;
        
        // Descending doom notes
        const notes = [
            { freq: 440, time: 0, dur: 0.4 },      // A4
            { freq: 392, time: 0.35, dur: 0.4 },   // G4
            { freq: 329.63, time: 0.7, dur: 0.4 }, // E4
            { freq: 261.63, time: 1.05, dur: 0.8 } // C4 (low, held)
        ];
        
        notes.forEach(note => {
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();
            
            osc.type = 'sawtooth';
            osc.frequency.value = note.freq;
            
            const startTime = now + note.time;
            
            // Low pass filter for darker tone
            const filter = this.audioContext.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.value = 800;
            
            gain.gain.setValueAtTime(0, startTime);
            gain.gain.linearRampToValueAtTime(0.2, startTime + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.01, startTime + note.dur);
            
            osc.connect(filter);
            filter.connect(gain);
            gain.connect(this.masterGain);
            
            osc.start(startTime);
            osc.stop(startTime + note.dur);
        });
        
        // Add a low rumble
        const bass = this.audioContext.createOscillator();
        const bassGain = this.audioContext.createGain();
        
        bass.type = 'sine';
        bass.frequency.value = 55; // Very low A
        
        bassGain.gain.setValueAtTime(0, now + 1);
        bassGain.gain.linearRampToValueAtTime(0.3, now + 1.2);
        bassGain.gain.exponentialRampToValueAtTime(0.01, now + 2);
        
        bass.connect(bassGain);
        bassGain.connect(this.masterGain);
        
        bass.start(now + 1);
        bass.stop(now + 2);
    }
    
    // === USE ITEM SOUND ===
    // Activation sound for inventory items
    playItemUse() {
        if (!this.initialized) return;
        this.resume();
        
        const now = this.audioContext.currentTime;
        
        // Whoosh + activation
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.1);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.2);
        
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        
        osc.connect(gain);
        gain.connect(this.masterGain);
        
        osc.start(now);
        osc.stop(now + 0.2);
    }
    
    // === BOMB EXPLOSION ===
    // Massive explosion for bomb item
    playBomb() {
        if (!this.initialized) return;
        this.resume();
        
        const now = this.audioContext.currentTime;
        
        // Multiple explosions in sequence
        for (let i = 0; i < 5; i++) {
            setTimeout(() => this.playExplosion(3), i * 50);
        }
        
        // Deep bass boom
        const bass = this.audioContext.createOscillator();
        const bassGain = this.audioContext.createGain();
        
        bass.type = 'sine';
        bass.frequency.setValueAtTime(80, now);
        bass.frequency.exponentialRampToValueAtTime(20, now + 0.8);
        
        bassGain.gain.setValueAtTime(0.4, now);
        bassGain.gain.exponentialRampToValueAtTime(0.01, now + 0.8);
        
        bass.connect(bassGain);
        bassGain.connect(this.masterGain);
        
        bass.start(now);
        bass.stop(now + 0.8);
    }
    
    // === FREEZE SOUND ===
    // Crystalline freeze effect
    playFreeze() {
        if (!this.initialized) return;
        this.resume();
        
        const now = this.audioContext.currentTime;
        
        // High pitched crystalline tones
        const frequencies = [2000, 2500, 3000, 3500];
        
        frequencies.forEach((freq, i) => {
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();
            
            osc.type = 'sine';
            osc.frequency.value = freq;
            
            const startTime = now + i * 0.03;
            
            gain.gain.setValueAtTime(0.1, startTime);
            gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);
            
            osc.connect(gain);
            gain.connect(this.masterGain);
            
            osc.start(startTime);
            osc.stop(startTime + 0.3);
        });
        
        // Crackling ice sound (filtered noise)
        const bufferSize = this.audioContext.sampleRate * 0.4;
        const noiseBuffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }
        
        const noise = this.audioContext.createBufferSource();
        noise.buffer = noiseBuffer;
        
        const filter = this.audioContext.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.value = 4000;
        
        const noiseGain = this.audioContext.createGain();
        noiseGain.gain.setValueAtTime(0.1, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
        
        noise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(this.masterGain);
        
        noise.start(now);
        noise.stop(now + 0.4);
    }
    
    // === START GAME SOUND ===
    // Energetic startup
    playGameStart() {
        if (!this.initialized) return;
        this.resume();
        
        const now = this.audioContext.currentTime;
        
        // Quick ascending sweep
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(100, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.3);
        
        const filter = this.audioContext.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(200, now);
        filter.frequency.exponentialRampToValueAtTime(2000, now + 0.3);
        
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);
        
        osc.start(now);
        osc.stop(now + 0.3);
        
        // Confirmation beeps
        [0.35, 0.45].forEach(time => {
            const beep = this.audioContext.createOscillator();
            const beepGain = this.audioContext.createGain();
            
            beep.type = 'square';
            beep.frequency.value = 880;
            
            beepGain.gain.setValueAtTime(0.15, now + time);
            beepGain.gain.exponentialRampToValueAtTime(0.01, now + time + 0.08);
            
            beep.connect(beepGain);
            beepGain.connect(this.masterGain);
            
            beep.start(now + time);
            beep.stop(now + time + 0.08);
        });
    }
}

// Global sound manager instance
const soundManager = new SoundManager();

// ============== MUSIC MANAGER CLASS ==============
// Procedural synthwave/chiptune background music
// Generates dynamic music that responds to gameplay intensity

class MusicManager {
    constructor() {
        this.audioContext = null;
        this.masterGain = null;
        this.initialized = false;
        this.playing = false;
        this.muted = false;
        
        // Music parameters
        this.bpm = 120;
        this.currentBeat = 0;
        this.beatInterval = null;
        
        // Intensity system (0-1) - affects tempo, filter, layers
        this.intensity = 0.3;
        this.targetIntensity = 0.3;
        
        // Track state
        this.bassOsc = null;
        this.bassGain = null;
        this.arpeggioOsc = null;
        this.arpeggioGain = null;
        this.padOsc = null;
        this.padGain = null;
        
        // Filters for intensity modulation
        this.bassFilter = null;
        this.arpeggioFilter = null;
        
        // Musical data
        this.key = 'A'; // A minor for that synthwave feel
        this.scale = [0, 2, 3, 5, 7, 8, 10]; // Natural minor scale intervals
        this.baseNote = 55; // A1 = 55Hz
        
        // Chord progressions (in scale degrees)
        this.progressions = [
            [0, 5, 3, 4], // Am, Fm, Dm, Em
            [0, 3, 5, 4], // Am, Dm, Fm, Em
            [0, 4, 5, 3], // Am, Em, Fm, Dm
        ];
        this.currentProgression = 0;
        this.currentChordIndex = 0;
        
        // Arpeggio patterns
        this.arpeggioPatterns = [
            [0, 4, 7, 12, 7, 4], // Up and down
            [0, 7, 4, 12, 4, 7], // Jumping
            [0, 4, 7, 4, 12, 7, 4, 0], // Extended
        ];
        this.currentArpPattern = 0;
        this.arpIndex = 0;
        
        // Drum pattern
        this.kickPattern = [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1];
        this.snarePattern = [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0];
        this.hihatPattern = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0];
    }
    
    init() {
        if (this.initialized) return;
        
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.masterGain = this.audioContext.createGain();
            this.masterGain.gain.value = 0.15; // Music quieter than SFX
            this.masterGain.connect(this.audioContext.destination);
            this.initialized = true;
        } catch (e) {
            console.warn('Music: Web Audio API not supported:', e);
        }
    }
    
    resume() {
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
    }
    
    toggleMute() {
        this.muted = !this.muted;
        if (this.masterGain) {
            this.masterGain.gain.value = this.muted ? 0 : 0.15;
        }
        return this.muted;
    }
    
    // Convert scale degree to frequency
    scaleToFreq(degree, octave = 0) {
        const octaveOffset = Math.floor(degree / 7);
        const noteInScale = ((degree % 7) + 7) % 7;
        const semitone = this.scale[noteInScale];
        return this.baseNote * Math.pow(2, (semitone + (octave + octaveOffset) * 12) / 12);
    }
    
    // Get current chord notes
    getCurrentChordNotes() {
        const progression = this.progressions[this.currentProgression];
        const root = progression[this.currentChordIndex];
        return [root, root + 2, root + 4]; // Triad in scale degrees
    }
    
    start() {
        if (!this.initialized || this.playing) return;
        this.resume();
        
        this.playing = true;
        this.currentBeat = 0;
        
        // Create persistent oscillators for smooth sound
        this.setupBass();
        this.setupArpeggio();
        this.setupPad();
        
        // Start beat loop
        const beatTime = 60000 / (this.bpm * 4); // 16th notes
        this.beatInterval = setInterval(() => this.tick(), beatTime);
    }
    
    stop() {
        if (!this.playing) return;
        
        this.playing = false;
        
        if (this.beatInterval) {
            clearInterval(this.beatInterval);
            this.beatInterval = null;
        }
        
        // Fade out and clean up oscillators
        const now = this.audioContext.currentTime;
        
        if (this.bassGain) {
            this.bassGain.gain.linearRampToValueAtTime(0, now + 0.5);
            setTimeout(() => {
                if (this.bassOsc) { this.bassOsc.stop(); this.bassOsc = null; }
            }, 600);
        }
        
        if (this.arpeggioGain) {
            this.arpeggioGain.gain.linearRampToValueAtTime(0, now + 0.5);
            setTimeout(() => {
                if (this.arpeggioOsc) { this.arpeggioOsc.stop(); this.arpeggioOsc = null; }
            }, 600);
        }
        
        if (this.padGain) {
            this.padGain.gain.linearRampToValueAtTime(0, now + 1);
            setTimeout(() => {
                if (this.padOsc) { this.padOsc.stop(); this.padOsc = null; }
            }, 1100);
        }
    }
    
    setupBass() {
        const now = this.audioContext.currentTime;
        
        this.bassOsc = this.audioContext.createOscillator();
        this.bassGain = this.audioContext.createGain();
        this.bassFilter = this.audioContext.createBiquadFilter();
        
        this.bassOsc.type = 'sawtooth';
        this.bassOsc.frequency.value = this.scaleToFreq(0, 1);
        
        this.bassFilter.type = 'lowpass';
        this.bassFilter.frequency.value = 400;
        this.bassFilter.Q.value = 2;
        
        this.bassGain.gain.value = 0;
        
        this.bassOsc.connect(this.bassFilter);
        this.bassFilter.connect(this.bassGain);
        this.bassGain.connect(this.masterGain);
        
        this.bassOsc.start(now);
    }
    
    setupArpeggio() {
        const now = this.audioContext.currentTime;
        
        this.arpeggioOsc = this.audioContext.createOscillator();
        this.arpeggioGain = this.audioContext.createGain();
        this.arpeggioFilter = this.audioContext.createBiquadFilter();
        
        this.arpeggioOsc.type = 'square';
        this.arpeggioOsc.frequency.value = this.scaleToFreq(0, 3);
        
        this.arpeggioFilter.type = 'lowpass';
        this.arpeggioFilter.frequency.value = 2000;
        this.arpeggioFilter.Q.value = 1;
        
        this.arpeggioGain.gain.value = 0;
        
        this.arpeggioOsc.connect(this.arpeggioFilter);
        this.arpeggioFilter.connect(this.arpeggioGain);
        this.arpeggioGain.connect(this.masterGain);
        
        this.arpeggioOsc.start(now);
    }
    
    setupPad() {
        const now = this.audioContext.currentTime;
        
        // Pad is a chord made of multiple detuned oscillators
        this.padOsc = this.audioContext.createOscillator();
        this.padGain = this.audioContext.createGain();
        
        const padFilter = this.audioContext.createBiquadFilter();
        padFilter.type = 'lowpass';
        padFilter.frequency.value = 800;
        
        this.padOsc.type = 'sine';
        this.padOsc.frequency.value = this.scaleToFreq(0, 2);
        
        this.padGain.gain.value = 0;
        
        this.padOsc.connect(padFilter);
        padFilter.connect(this.padGain);
        this.padGain.connect(this.masterGain);
        
        this.padOsc.start(now);
    }
    
    tick() {
        if (!this.playing || this.muted) return;
        
        const now = this.audioContext.currentTime;
        const beat16 = this.currentBeat % 16;
        const beat4 = Math.floor(this.currentBeat / 4) % 4;
        const bar = Math.floor(this.currentBeat / 16);
        
        // Smooth intensity transitions
        this.intensity += (this.targetIntensity - this.intensity) * 0.02;
        
        // === BASS ===
        if (beat16 % 4 === 0) { // Quarter notes
            const chordNotes = this.getCurrentChordNotes();
            const bassNote = this.scaleToFreq(chordNotes[0], 1);
            
            this.bassOsc.frequency.setValueAtTime(bassNote, now);
            this.bassGain.gain.setValueAtTime(0.6 + this.intensity * 0.3, now);
            this.bassGain.gain.exponentialRampToValueAtTime(0.3, now + 0.2);
        }
        
        // === ARPEGGIO ===
        const pattern = this.arpeggioPatterns[this.currentArpPattern];
        const arpNote = pattern[this.arpIndex % pattern.length];
        const chordNotes = this.getCurrentChordNotes();
        const arpDegree = chordNotes[arpNote % 3] + Math.floor(arpNote / 3) * 7;
        const arpFreq = this.scaleToFreq(arpDegree, 3);
        
        this.arpeggioOsc.frequency.setValueAtTime(arpFreq, now);
        
        // Arpeggio envelope - more prominent at higher intensity
        const arpVol = 0.1 + this.intensity * 0.25;
        this.arpeggioGain.gain.setValueAtTime(arpVol, now);
        this.arpeggioGain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        
        this.arpIndex++;
        
        // === PAD - Changes with chord ===
        if (beat16 === 0) {
            const padNote = this.scaleToFreq(chordNotes[0], 2);
            this.padOsc.frequency.exponentialRampToValueAtTime(padNote, now + 0.5);
            this.padGain.gain.linearRampToValueAtTime(0.15 + this.intensity * 0.1, now + 0.5);
        }
        
        // === DRUMS ===
        this.playDrums(beat16, now);
        
        // === FILTER MODULATION based on intensity ===
        const bassFilterFreq = 300 + this.intensity * 800;
        const arpFilterFreq = 1500 + this.intensity * 2500;
        this.bassFilter.frequency.linearRampToValueAtTime(bassFilterFreq, now + 0.1);
        this.arpeggioFilter.frequency.linearRampToValueAtTime(arpFilterFreq, now + 0.1);
        
        // === CHORD PROGRESSION ===
        if (beat16 === 0) {
            this.currentChordIndex = (this.currentChordIndex + 1) % 4;
            
            // Occasionally change progression
            if (bar > 0 && bar % 8 === 0) {
                this.currentProgression = (this.currentProgression + 1) % this.progressions.length;
            }
            
            // Occasionally change arpeggio pattern
            if (bar > 0 && bar % 4 === 0) {
                this.currentArpPattern = (this.currentArpPattern + 1) % this.arpeggioPatterns.length;
            }
        }
        
        this.currentBeat++;
    }
    
    playDrums(beat16, now) {
        // Drums are more prominent at higher intensity
        const drumVolume = 0.1 + this.intensity * 0.15;
        
        // Kick drum
        if (this.kickPattern[beat16]) {
            this.playKick(now, drumVolume);
        }
        
        // Snare (only at medium+ intensity)
        if (this.intensity > 0.4 && this.snarePattern[beat16]) {
            this.playSnare(now, drumVolume * 0.8);
        }
        
        // Hi-hat (only at higher intensity)
        if (this.intensity > 0.6 && this.hihatPattern[beat16]) {
            this.playHihat(now, drumVolume * 0.3);
        }
    }
    
    playKick(time, volume) {
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(150, time);
        osc.frequency.exponentialRampToValueAtTime(30, time + 0.15);
        
        gain.gain.setValueAtTime(volume, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + 0.2);
        
        osc.connect(gain);
        gain.connect(this.masterGain);
        
        osc.start(time);
        osc.stop(time + 0.2);
    }
    
    playSnare(time, volume) {
        // Noise for snare body
        const bufferSize = this.audioContext.sampleRate * 0.15;
        const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        
        const noise = this.audioContext.createBufferSource();
        noise.buffer = buffer;
        
        const noiseFilter = this.audioContext.createBiquadFilter();
        noiseFilter.type = 'highpass';
        noiseFilter.frequency.value = 1000;
        
        const noiseGain = this.audioContext.createGain();
        noiseGain.gain.setValueAtTime(volume, time);
        noiseGain.gain.exponentialRampToValueAtTime(0.01, time + 0.12);
        
        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(this.masterGain);
        
        noise.start(time);
        noise.stop(time + 0.15);
        
        // Body tone
        const osc = this.audioContext.createOscillator();
        const oscGain = this.audioContext.createGain();
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(180, time);
        osc.frequency.exponentialRampToValueAtTime(80, time + 0.05);
        
        oscGain.gain.setValueAtTime(volume * 0.5, time);
        oscGain.gain.exponentialRampToValueAtTime(0.01, time + 0.08);
        
        osc.connect(oscGain);
        oscGain.connect(this.masterGain);
        
        osc.start(time);
        osc.stop(time + 0.1);
    }
    
    playHihat(time, volume) {
        const bufferSize = this.audioContext.sampleRate * 0.05;
        const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        
        const noise = this.audioContext.createBufferSource();
        noise.buffer = buffer;
        
        const filter = this.audioContext.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.value = 7000;
        
        const gain = this.audioContext.createGain();
        gain.gain.setValueAtTime(volume, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + 0.04);
        
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);
        
        noise.start(time);
        noise.stop(time + 0.05);
    }
    
    // Set intensity based on game state (0-1)
    // Called from game to react to gameplay
    setIntensity(value) {
        this.targetIntensity = Math.max(0, Math.min(1, value));
    }
    
    // Convenience methods for common game states
    setCalm() { this.setIntensity(0.3); }
    setNormal() { this.setIntensity(0.5); }
    setIntense() { this.setIntensity(0.75); }
    setBoss() { this.setIntensity(1.0); }
}

// Create global music manager instance
const musicManager = new MusicManager();


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
        // Draw nebula clouds - static, no pulsing
        this.nebulae.forEach(nebula => {
            const gradient = ctx.createRadialGradient(
                nebula.x, nebula.y, 0,
                nebula.x, nebula.y, nebula.radius
            );
            gradient.addColorStop(0, nebula.color + '20');
            gradient.addColorStop(0.5, nebula.color + '10');
            gradient.addColorStop(1, 'transparent');
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(nebula.x, nebula.y, nebula.radius, 0, Math.PI * 2);
            ctx.fill();
        });
        
        // Draw star layers (back to front)
        this.layers.forEach((layer, layerIndex) => {
            layer.stars.forEach(star => {
                // Reduced twinkle - more subtle
                const twinkle = 0.7 + Math.sin(star.twinklePhase) * 0.3;
                const alpha = star.brightness * twinkle;
                
                ctx.save();
                
                // Subtle glow for closest stars only
                if (layerIndex === 3) {
                    ctx.shadowColor = star.color;
                    ctx.shadowBlur = star.size * 2;
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

// ============== SHIP DEBRIS PARTICLE CLASS ==============
// Hull pieces that tumble and fade during ship destruction
class ShipDebrisParticle {
    constructor(x, y, angle, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        
        // Launch debris outward from explosion center
        const speed = 2 + Math.random() * 4;
        const launchAngle = angle + (Math.random() - 0.5) * 0.5;
        this.vx = Math.cos(launchAngle) * speed;
        this.vy = Math.sin(launchAngle) * speed;
        
        // Tumbling rotation
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.3;
        
        // Debris shape (triangular hull piece)
        this.size = 4 + Math.random() * 8;
        this.shape = Math.floor(Math.random() * 3); // 0=triangle, 1=quad, 2=line
        
        this.lifetime = 60 + Math.random() * 40;
        this.maxLifetime = this.lifetime;
        
        // Trail
        this.trail = [];
        this.trailTimer = 0;
    }
    
    update() {
        // Movement with drag
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.98;
        this.vy *= 0.98;
        
        // Rotation
        this.rotation += this.rotSpeed;
        this.rotSpeed *= 0.99;
        
        // Trail spawning
        this.trailTimer++;
        if (this.trailTimer % 3 === 0 && this.lifetime > this.maxLifetime * 0.3) {
            this.trail.push({
                x: this.x,
                y: this.y,
                alpha: 0.6,
                size: this.size * 0.5
            });
        }
        
        // Update trail
        this.trail = this.trail.filter(t => {
            t.alpha -= 0.08;
            t.size *= 0.95;
            return t.alpha > 0;
        });
        
        this.lifetime--;
    }
    
    draw(ctx) {
        const alpha = Math.min(1, this.lifetime / (this.maxLifetime * 0.3));
        
        // Draw trail
        this.trail.forEach(t => {
            ctx.save();
            ctx.globalAlpha = t.alpha * alpha;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(t.x, t.y, t.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });
        
        // Draw debris piece
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = alpha;
        
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 8;
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        
        ctx.beginPath();
        if (this.shape === 0) {
            // Triangle piece
            ctx.moveTo(0, -this.size);
            ctx.lineTo(-this.size * 0.7, this.size * 0.5);
            ctx.lineTo(this.size * 0.7, this.size * 0.5);
            ctx.closePath();
        } else if (this.shape === 1) {
            // Quad piece
            ctx.moveTo(-this.size * 0.5, -this.size * 0.5);
            ctx.lineTo(this.size * 0.5, -this.size * 0.3);
            ctx.lineTo(this.size * 0.3, this.size * 0.5);
            ctx.lineTo(-this.size * 0.4, this.size * 0.3);
            ctx.closePath();
        } else {
            // Line piece (strut)
            ctx.moveTo(-this.size, 0);
            ctx.lineTo(this.size, 0);
        }
        
        if (this.shape === 2) {
            ctx.stroke();
        } else {
            ctx.fill();
            ctx.stroke();
        }
        
        ctx.restore();
    }
}

// ============== SCREEN SHAKE CLASS ==============
// Enhanced screen shake with rotation, intensity scaling, and directional shake
class ScreenShake {
    constructor() {
        this.intensity = 0;
        this.offsetX = 0;
        this.offsetY = 0;
        this.rotation = 0;
        
        // Directional shake properties
        this.directionX = 0;
        this.directionY = 0;
        this.directionalBias = 0;
        
        // Shake characteristics
        this.frequency = 0;
        this.traumaDecay = 0.92; // Smoother decay
    }

    // Standard trigger - random direction
    trigger(intensity) {
        this.intensity = Math.max(this.intensity, intensity);
        this.directionalBias = 0;
    }
    
    // Directional trigger - shake toward/away from impact source
    // sourceX/Y: where the impact happened, pushes camera away from it
    triggerDirectional(intensity, sourceX, sourceY) {
        this.intensity = Math.max(this.intensity, intensity);
        
        // Calculate direction from screen center to source
        const centerX = CANVAS_WIDTH / 2;
        const centerY = CANVAS_HEIGHT / 2;
        const dx = sourceX - centerX;
        const dy = sourceY - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist > 0) {
            // Direction points from center toward impact
            this.directionX = dx / dist;
            this.directionY = dy / dist;
            this.directionalBias = 0.7; // 70% directional, 30% random for organic feel
        }
    }

    update() {
        if (this.intensity > 0.1) {
            this.frequency += 0.6;
            
            // Base random shake component (Perlin-like smoothing via sin)
            const randomAngle = Math.sin(this.frequency * 3.7) * Math.PI + 
                               Math.cos(this.frequency * 2.3) * Math.PI;
            let shakeX = Math.cos(randomAngle) * this.intensity;
            let shakeY = Math.sin(randomAngle) * this.intensity;
            
            // Add high-frequency jitter for impact feel
            const jitter = 0.3;
            shakeX += (Math.random() - 0.5) * this.intensity * jitter;
            shakeY += (Math.random() - 0.5) * this.intensity * jitter;
            
            // Blend in directional component for directional impacts
            if (this.directionalBias > 0) {
                // Oscillate along the impact direction
                const directionalMag = Math.sin(this.frequency * 2.5) * this.intensity;
                const directionalX = this.directionX * directionalMag;
                const directionalY = this.directionY * directionalMag;
                
                // Blend random and directional
                shakeX = shakeX * (1 - this.directionalBias) + directionalX * this.directionalBias;
                shakeY = shakeY * (1 - this.directionalBias) + directionalY * this.directionalBias;
                
                // Decay directional bias so shake becomes more random over time
                this.directionalBias *= 0.94;
            }
            
            this.offsetX = shakeX;
            this.offsetY = shakeY;
            
            // Rotation shake - subtle but adds impact
            // Intensity-scaled: bigger hits = more rotation (capped for sanity)
            const maxRotation = 0.04; // ~2.3 degrees max
            const rotationScale = Math.min(this.intensity / 30, 1); // Scale based on intensity
            this.rotation = (Math.sin(this.frequency * 4.1) * 0.6 + (Math.random() - 0.5) * 0.4) 
                           * maxRotation * rotationScale;
            
            // Smooth intensity decay with slight variation for organic feel
            const decayVariation = 1 + (Math.random() - 0.5) * 0.08;
            this.intensity *= this.traumaDecay * decayVariation;
        } else {
            // Reset when below threshold
            this.intensity = 0;
            this.offsetX = 0;
            this.offsetY = 0;
            this.rotation = 0;
            this.directionalBias = 0;
            this.frequency = 0;
        }
    }

    apply(ctx) {
        ctx.translate(this.offsetX, this.offsetY);
        
        // Apply rotation around screen center for natural feel
        if (Math.abs(this.rotation) > 0.0001) {
            ctx.translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
            ctx.rotate(this.rotation);
            ctx.translate(-CANVAS_WIDTH / 2, -CANVAS_HEIGHT / 2);
        }
    }
}

// ============== GAME CLASS ==============
// ============== MOBILE TOUCH CONTROLS ==============
// Virtual joystick and fire button for touch devices

class TouchControlManager {
    constructor(canvas, game = null) {
        this.canvas = canvas;
        this.game = game;  // Reference to game for tap-to-start
        this.isTouchDevice = this.detectTouch();
        
        // Setting: 'auto' | 'on' | 'off'
        this.mode = this.loadMode();
        this.updateEnabledState();
        
        // Virtual joystick state (left side)
        this.joystick = {
            active: false,
            touchId: null,
            baseX: 0,
            baseY: 0,
            currentX: 0,
            currentY: 0,
            dx: 0,  // -1 to 1
            dy: 0,  // -1 to 1
            radius: 50,
            deadzone: 0.15
        };
        
        // Fire button state (right side)
        this.fireButton = {
            active: false,
            touchId: null,
            x: 0,
            y: 0,
            radius: 45,
            firing: false
        };
        
        // Pause button (top center)
        this.pauseButton = {
            x: 0,
            y: 0,
            width: 50,
            height: 35
        };
        
        // Visual positions (updated on resize)
        this.updateLayout();
        
        // Touch state for game integration
        this.virtualKeys = {
            'ArrowLeft': false,
            'ArrowRight': false,
            'ArrowUp': false,
            ' ': false  // Space for shooting
        };
        
        // Direct angle control for smoother touch
        this.targetAngle = null;
        this.thrustAmount = 0;
        
        // Always setup touch events (so they work when toggled on)
        this.setupTouchEvents();
        this.canvas.style.touchAction = 'none';
        
        // Handle resize
        window.addEventListener('resize', () => this.updateLayout());
    }
    
    loadMode() {
        try {
            const saved = localStorage.getItem('asteroidBlaster_touchControls');
            if (saved === 'on' || saved === 'off' || saved === 'auto') {
                return saved;
            }
        } catch (e) {}
        return 'auto';
    }
    
    saveMode() {
        try {
            localStorage.setItem('asteroidBlaster_touchControls', this.mode);
        } catch (e) {}
    }
    
    setMode(mode) {
        if (mode === 'on' || mode === 'off' || mode === 'auto') {
            this.mode = mode;
            this.saveMode();
            this.updateEnabledState();
        }
    }
    
    cycleMode() {
        const modes = ['auto', 'on', 'off'];
        const idx = modes.indexOf(this.mode);
        this.setMode(modes[(idx + 1) % modes.length]);
    }
    
    updateEnabledState() {
        if (this.mode === 'on') {
            this.enabled = true;
        } else if (this.mode === 'off') {
            this.enabled = false;
        } else {
            // Auto: enabled if touch device OR narrow viewport
            this.enabled = this.isTouchDevice || window.innerWidth < 820;
        }
    }
    
    getModeLabel() {
        if (this.mode === 'auto') {
            return 'Auto' + (this.enabled ? ' (On)' : ' (Off)');
        }
        return this.mode === 'on' ? 'On' : 'Off';
    }
    
    detectTouch() {
        return ('ontouchstart' in window) || 
               (navigator.maxTouchPoints > 0) || 
               (navigator.msMaxTouchPoints > 0);
    }
    
    updateLayout() {
        // Use canvas internal dimensions (800x600), not CSS display size
        const canvasWidth = this.canvas.width;
        const canvasHeight = this.canvas.height;
        
        // Joystick at bottom left
        this.joystick.baseX = 100;
        this.joystick.baseY = canvasHeight - 100;
        this.joystick.currentX = this.joystick.baseX;
        this.joystick.currentY = this.joystick.baseY;
        
        // Fire button at bottom right
        this.fireButton.x = canvasWidth - 100;
        this.fireButton.y = canvasHeight - 100;
        
        // Pause button at top center
        this.pauseButton.x = canvasWidth / 2 - this.pauseButton.width / 2;
        this.pauseButton.y = 10;
    }
    
    setupTouchEvents() {
        this.canvas.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: false });
        this.canvas.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: false });
        this.canvas.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: false });
        this.canvas.addEventListener('touchcancel', (e) => this.handleTouchEnd(e), { passive: false });
    }
    
    handleTouchStart(e) {
        e.preventDefault();
        
        // Initialize audio on first touch (iOS requires user interaction)
        soundManager.init();
        soundManager.resume();
        soundManager.unlockiOS();
        musicManager.init();
        musicManager.resume();
        
        // Tap to start/restart - always allow (even when controls disabled)
        if (this.game && (this.game.state === 'start' || this.game.state === 'gameover')) {
            // Don't start if entering initials on game over
            if (!(this.game.state === 'gameover' && this.game.isEnteringInitials)) {
                this.game.startGame();
                return;
            }
        }
        
        // Skip joystick/fire processing if controls disabled
        if (!this.enabled) return;
        
        for (const touch of e.changedTouches) {
            const pos = this.getTouchPos(touch);
            
            // Check if touching pause button (top center)
            const pb = this.pauseButton;
            if (pos.x >= pb.x && pos.x <= pb.x + pb.width && 
                pos.y >= pb.y && pos.y <= pb.y + pb.height) {
                if (this.game && (this.game.state === 'playing' || this.game.state === 'paused')) {
                    this.game.togglePause();
                    return; // Don't process other touches
                }
            }
            
            // Check if touching inventory slots (top center area)
            if (this.game && this.game.state === 'playing' && this.game.touchInventorySlots) {
                for (const slot of this.game.touchInventorySlots) {
                    if (pos.x >= slot.x && pos.x <= slot.x + slot.width &&
                        pos.y >= slot.y && pos.y <= slot.y + slot.height) {
                        if (slot.index < this.game.inventory.length) {
                            this.game.useInventoryItem(slot.index);
                            soundManager.playItemUse();
                        }
                        return; // Don't process as joystick/fire
                    }
                }
            }
            
            // Check if touching left half (joystick zone)
            if (pos.x < this.canvas.width / 2 && this.joystick.touchId === null) {
                this.joystick.active = true;
                this.joystick.touchId = touch.identifier;
                // Keep joystick fixed in bottom-left corner (don't move base to touch position)
                this.joystick.currentX = this.joystick.baseX;
                this.joystick.currentY = this.joystick.baseY;
            }
            // Check if touching right half (fire zone)
            else if (pos.x >= this.canvas.width / 2 && this.fireButton.touchId === null) {
                this.fireButton.active = true;
                this.fireButton.touchId = touch.identifier;
                this.fireButton.firing = true;
            }
        }
        
        this.updateVirtualKeys();
    }
    
    handleTouchMove(e) {
        e.preventDefault();
        if (!this.enabled) return;
        
        for (const touch of e.changedTouches) {
            if (touch.identifier === this.joystick.touchId) {
                const pos = this.getTouchPos(touch);
                const dx = pos.x - this.joystick.baseX;
                const dy = pos.y - this.joystick.baseY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxDist = this.joystick.radius * 1.5;
                
                // Clamp joystick position
                if (distance > maxDist) {
                    const angle = Math.atan2(dy, dx);
                    this.joystick.currentX = this.joystick.baseX + Math.cos(angle) * maxDist;
                    this.joystick.currentY = this.joystick.baseY + Math.sin(angle) * maxDist;
                } else {
                    this.joystick.currentX = pos.x;
                    this.joystick.currentY = pos.y;
                }
                
                // Normalize to -1 to 1
                this.joystick.dx = (this.joystick.currentX - this.joystick.baseX) / maxDist;
                this.joystick.dy = (this.joystick.currentY - this.joystick.baseY) / maxDist;
            }
        }
        
        this.updateVirtualKeys();
    }
    
    handleTouchEnd(e) {
        for (const touch of e.changedTouches) {
            if (touch.identifier === this.joystick.touchId) {
                this.joystick.active = false;
                this.joystick.touchId = null;
                this.joystick.currentX = this.joystick.baseX;
                this.joystick.currentY = this.joystick.baseY;
                this.joystick.dx = 0;
                this.joystick.dy = 0;
            }
            if (touch.identifier === this.fireButton.touchId) {
                this.fireButton.active = false;
                this.fireButton.touchId = null;
                this.fireButton.firing = false;
            }
        }
        
        this.updateVirtualKeys();
    }
    
    getTouchPos(touch) {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: (touch.clientX - rect.left) * (this.canvas.width / rect.width),
            y: (touch.clientY - rect.top) * (this.canvas.height / rect.height)
        };
    }
    
    updateVirtualKeys() {
        const dx = this.joystick.dx;
        const dy = this.joystick.dy;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Reset all
        this.virtualKeys['ArrowLeft'] = false;
        this.virtualKeys['ArrowRight'] = false;
        this.virtualKeys['ArrowUp'] = false;
        this.targetAngle = null;
        this.thrustAmount = 0;
        
        // Only process if joystick moved enough from center
        const activeThreshold = 0.2;
        
        if (distance > activeThreshold) {
            // Direct angle control: joystick angle = ship angle
            this.targetAngle = Math.atan2(dy, dx);
            
            // Thrust based on distance (gentler, starts at 40% push)
            const thrustThreshold = 0.4;
            if (distance > thrustThreshold) {
                // Scale thrust from 0 to 1 based on distance (0.4 to 1.0 maps to 0 to 1)
                this.thrustAmount = (distance - thrustThreshold) / (1 - thrustThreshold);
                this.virtualKeys['ArrowUp'] = true;
            }
        }
        
        // Fire button
        this.virtualKeys[' '] = this.fireButton.firing;
    }
    
    // Get the target angle for direct ship control (or null if not active)
    getTargetAngle() {
        return this.targetAngle;
    }
    
    // Get thrust amount (0-1) for gentler touch thrust
    getThrustAmount() {
        return this.thrustAmount || 0;
    }
    
    // Merge virtual keys with physical keys
    getKeys(physicalKeys) {
        if (!this.enabled) return physicalKeys;
        
        return {
            ...physicalKeys,
            'ArrowLeft': physicalKeys['ArrowLeft'] || physicalKeys['a'] || physicalKeys['A'] || this.virtualKeys['ArrowLeft'],
            'ArrowRight': physicalKeys['ArrowRight'] || physicalKeys['d'] || physicalKeys['D'] || this.virtualKeys['ArrowRight'],
            'ArrowUp': physicalKeys['ArrowUp'] || physicalKeys['w'] || physicalKeys['W'] || this.virtualKeys['ArrowUp'],
            ' ': physicalKeys[' '] || this.virtualKeys[' ']
        };
    }
    
    draw(ctx) {
        // Refresh enabled state (in case viewport changed)
        this.updateEnabledState();
        
        // Decay tap feedback timers
        if (this.joystick.tapFeedback > 0) this.joystick.tapFeedback--;
        if (this.fireButton.tapFeedback > 0) this.fireButton.tapFeedback--;
        
        // Only draw if enabled and during gameplay
        if (!this.enabled) return;
        // Note: game state check handled by caller (only called during 'playing')
        
        ctx.save();
        
        // === DRAW VIRTUAL JOYSTICK ===
        const jx = this.joystick.baseX;
        const jy = this.joystick.baseY;
        const jr = this.joystick.radius;
        
        // Scale effect on tap
        const jScale = this.joystick.tapFeedback > 0 ? 1.08 : 1;
        
        ctx.save();
        ctx.translate(jx, jy);
        ctx.scale(jScale, jScale);
        ctx.translate(-jx, -jy);
        
        // Outer ring (base) - thicker, more visible
        ctx.beginPath();
        ctx.arc(jx, jy, jr, 0, Math.PI * 2);
        ctx.strokeStyle = this.joystick.active ? 'rgba(0, 255, 255, 0.9)' : 'rgba(0, 255, 255, 0.5)';
        ctx.lineWidth = 5;  // Thicker for visibility
        ctx.stroke();
        
        // Base fill with gradient
        const jGrad = ctx.createRadialGradient(jx, jy, 0, jx, jy, jr);
        if (this.joystick.active) {
            jGrad.addColorStop(0, 'rgba(0, 255, 255, 0.35)');
            jGrad.addColorStop(1, 'rgba(0, 255, 255, 0.15)');
        } else {
            jGrad.addColorStop(0, 'rgba(0, 255, 255, 0.2)');
            jGrad.addColorStop(1, 'rgba(0, 255, 255, 0.08)');
        }
        ctx.fillStyle = jGrad;
        ctx.fill();
        
        // Directional arrows around the ring (visual hint)
        ctx.fillStyle = 'rgba(0, 255, 255, 0.4)';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('▲', jx, jy - jr + 12);  // Up = thrust
        ctx.fillText('◄', jx - jr + 12, jy);
        ctx.fillText('►', jx + jr - 12, jy);
        
        ctx.restore(); // End scale transform for base
        
        // Inner nub (not scaled, moves independently)
        const nubX = this.joystick.currentX;
        const nubY = this.joystick.currentY;
        const nubRadius = jr * 0.45;  // Slightly smaller for better visual
        
        // Nub shadow
        if (this.joystick.active) {
            ctx.shadowColor = '#00ffff';
            ctx.shadowBlur = 20;
        }
        
        ctx.beginPath();
        ctx.arc(nubX, nubY, nubRadius, 0, Math.PI * 2);
        ctx.fillStyle = this.joystick.active ? 'rgba(0, 255, 255, 0.95)' : 'rgba(0, 255, 255, 0.65)';
        ctx.fill();
        
        // Nub inner highlight
        ctx.beginPath();
        ctx.arc(nubX - nubRadius * 0.2, nubY - nubRadius * 0.2, nubRadius * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fill();
        ctx.shadowBlur = 0;
        
        // MOVE label below joystick
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = this.joystick.active ? '#88ffff' : 'rgba(0, 255, 255, 0.55)';
        ctx.fillText('MOVE', jx, jy + jr + 22);
        
        // === DRAW FIRE BUTTON ===
        const fx = this.fireButton.x;
        const fy = this.fireButton.y;
        const fr = this.fireButton.radius;
        
        // Scale effect on tap
        const fScale = this.fireButton.tapFeedback > 0 ? 1.1 : (this.fireButton.active ? 1.05 : 1);
        
        ctx.save();
        ctx.translate(fx, fy);
        ctx.scale(fScale, fScale);
        ctx.translate(-fx, -fy);
        
        // Outer ring - thicker
        ctx.beginPath();
        ctx.arc(fx, fy, fr, 0, Math.PI * 2);
        ctx.strokeStyle = this.fireButton.active ? 'rgba(255, 0, 255, 0.9)' : 'rgba(255, 0, 255, 0.4)';
        ctx.lineWidth = 5;
        ctx.stroke();
        
        // Button fill with gradient
        const fGrad = ctx.createRadialGradient(fx, fy, 0, fx, fy, fr);
        if (this.fireButton.active) {
            fGrad.addColorStop(0, 'rgba(255, 0, 255, 0.5)');
            fGrad.addColorStop(0.7, 'rgba(255, 0, 255, 0.3)');
            fGrad.addColorStop(1, 'rgba(255, 0, 255, 0.15)');
        } else {
            fGrad.addColorStop(0, 'rgba(255, 0, 255, 0.2)');
            fGrad.addColorStop(1, 'rgba(255, 0, 255, 0.08)');
        }
        ctx.fillStyle = fGrad;
        ctx.fill();
        
        // Button glow when active
        if (this.fireButton.active) {
            ctx.shadowColor = '#ff00ff';
            ctx.shadowBlur = 25;
            ctx.beginPath();
            ctx.arc(fx, fy, fr * 0.75, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 0, 255, 0.4)';
            ctx.fill();
            ctx.shadowBlur = 0;
        }
        
        // Fire icon (crosshair style)
        ctx.strokeStyle = this.fireButton.active ? '#ffaaff' : 'rgba(255, 0, 255, 0.6)';
        ctx.lineWidth = 3;
        const iconSize = fr * 0.35;
        ctx.beginPath();
        ctx.moveTo(fx - iconSize, fy);
        ctx.lineTo(fx + iconSize, fy);
        ctx.moveTo(fx, fy - iconSize);
        ctx.lineTo(fx, fy + iconSize);
        ctx.stroke();
        
        // Center dot
        ctx.beginPath();
        ctx.arc(fx, fy, 4, 0, Math.PI * 2);
        ctx.fillStyle = this.fireButton.active ? '#ffffff' : 'rgba(255, 0, 255, 0.7)';
        ctx.fill();
        
        ctx.restore(); // End scale transform
        
        // Fire label below button
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = this.fireButton.active ? '#ff88ff' : 'rgba(255, 0, 255, 0.55)';
        ctx.fillText('FIRE', fx, fy + fr + 22);
        
        // === PAUSE BUTTON (top center) ===
        const pb = this.pauseButton;
        
        // Button background
        ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(pb.x, pb.y, pb.width, pb.height, 8);
        ctx.fill();
        ctx.stroke();
        
        // Pause icon (two bars) - centered
        ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
        const barWidth = 7;
        const barHeight = 20;
        const barGap = 8;
        const barsX = pb.x + pb.width / 2 - barGap / 2 - barWidth;
        const barsY = pb.y + (pb.height - barHeight) / 2;
        ctx.fillRect(barsX, barsY, barWidth, barHeight);
        ctx.fillRect(barsX + barWidth + barGap, barsY, barWidth, barHeight);
        
        ctx.restore();
    }
    
    // Handle auto-fire when button held
    shouldAutoFire() {
        return this.enabled && this.fireButton.firing;
    }
}

// ============== WAVE ANNOUNCEMENT SYSTEM ==============
// Dramatic level/wave announcements with Geometry Wars-style effects

class WaveAnnouncement {
    constructor(game) {
        this.game = game;
        this.active = false;
        this.timer = 0;
        this.duration = 180; // 3 seconds at 60fps
        
        // Text content
        this.mainText = '';
        this.subText = '';
        this.isBossWave = false;
        
        // Animation phases
        this.phase = 'idle'; // idle, enter, hold, exit
        this.phaseTimer = 0;
        
        // Animation values
        this.scale = 0;
        this.alpha = 0;
        this.glowIntensity = 0;
        this.letterOffsets = [];
        
        // Screen effects
        this.screenDarken = 0;
        this.edgeGlow = 0;
        this.scanlineOffset = 0;
        
        // Particle effects
        this.particles = [];
    }
    
    trigger(level, isBoss = false) {
        this.active = true;
        this.timer = 0;
        this.isBossWave = isBoss;
        this.bossData = null; // Store boss data for drawing
        
        if (isBoss) {
            // Get boss data from story
            this.bossData = STORY.getBoss(level);
            if (this.bossData) {
                this.mainText = `WARNING: ${this.bossData.name}`;
                this.subText = this.bossData.title;
            } else {
                this.mainText = 'WARNING: SENTINEL';
                this.subText = 'UNKNOWN THREAT DETECTED';
            }
            this.duration = 210; // Longer for boss
        } else {
            // Get sector data from story
            const sector = STORY.getSector(level);
            this.mainText = sector.name;
            this.subText = `SECTOR ${level} // ${sector.subtitle}`;
            this.duration = 150;
        }
        
        // Reset animation state
        this.phase = 'enter';
        this.phaseTimer = 0;
        this.scale = 0;
        this.alpha = 0;
        this.glowIntensity = 0;
        this.screenDarken = 0;
        this.edgeGlow = 0;
        this.letterOffsets = [];
        this.particles = [];
        
        // Initialize letter offsets for staggered animation
        for (let i = 0; i < this.mainText.length; i++) {
            this.letterOffsets.push({
                y: 50 + Math.random() * 30,
                rotation: (Math.random() - 0.5) * 0.5,
                delay: i * 3
            });
        }
        
        // Play announcement sound
        if (isBoss) {
            soundManager.playBossEnrage();
        }
    }
    
    getWaveSubtext(level) {
        // Use story sector data if available
        const sector = STORY.getSector(level);
        if (sector) {
            return sector.subtitle;
        }
        
        // Fallback subtexts
        const subtexts = [
            'SURVIVE',
            'DESTROY ALL ASTEROIDS',
            'CLEAR THE FIELD',
            'OBLITERATE',
            'ANNIHILATE',
            'DOMINATE'
        ];
        
        return subtexts[Math.floor(Math.random() * subtexts.length)];
    }
    
    // Get boss intro quote for display after WARNING fades
    getBossIntro() {
        if (this.bossData && this.bossData.intro) {
            return `"${this.bossData.intro}"`;
        }
        return null;
    }
    
    update() {
        if (!this.active) return;
        
        this.timer++;
        this.phaseTimer++;
        this.scanlineOffset = (this.scanlineOffset + 2) % 10;
        
        // Phase transitions
        const enterDuration = 30;
        const holdDuration = this.duration - 60;
        const exitDuration = 30;
        
        if (this.phase === 'enter') {
            const progress = Math.min(1, this.phaseTimer / enterDuration);
            const eased = this.easeOutBack(progress);
            
            this.scale = eased;
            this.alpha = progress;
            this.screenDarken = progress * (this.isBossWave ? 0.5 : 0.3);
            this.edgeGlow = progress;
            this.glowIntensity = progress;
            
            // Update letter offsets
            this.letterOffsets.forEach((offset, i) => {
                if (this.phaseTimer > offset.delay) {
                    offset.y *= 0.85;
                    offset.rotation *= 0.9;
                }
            });
            
            if (this.phaseTimer >= enterDuration) {
                this.phase = 'hold';
                this.phaseTimer = 0;
            }
        } else if (this.phase === 'hold') {
            this.scale = 1 + Math.sin(this.timer * 0.1) * 0.02;
            this.alpha = 1;
            this.glowIntensity = 0.8 + Math.sin(this.timer * 0.15) * 0.2;
            
            // Spawn particles during hold
            if (this.timer % 3 === 0) {
                this.spawnParticle();
            }
            
            if (this.phaseTimer >= holdDuration) {
                this.phase = 'exit';
                this.phaseTimer = 0;
            }
        } else if (this.phase === 'exit') {
            const progress = Math.min(1, this.phaseTimer / exitDuration);
            const eased = this.easeInBack(progress);
            
            this.scale = 1 + eased * 0.5;
            this.alpha = 1 - progress;
            this.screenDarken = (1 - progress) * (this.isBossWave ? 0.5 : 0.3);
            this.edgeGlow = 1 - progress;
            this.glowIntensity = 1 - progress;
            
            if (this.phaseTimer >= exitDuration) {
                this.active = false;
                this.phase = 'idle';
            }
        }
        
        // Update particles
        this.particles = this.particles.filter(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.lifetime--;
            p.alpha = p.lifetime / p.maxLifetime;
            return p.lifetime > 0;
        });
    }
    
    spawnParticle() {
        const centerX = CANVAS_WIDTH / 2;
        const centerY = CANVAS_HEIGHT / 2;
        const angle = Math.random() * Math.PI * 2;
        const distance = 100 + Math.random() * 150;
        
        // Use boss-specific color if available
        let particleColor = this.isBossWave ? '#ff0066' : '#00ffff';
        if (this.isBossWave && this.bossData && this.bossData.color) {
            particleColor = this.bossData.color;
        }
        
        this.particles.push({
            x: centerX + Math.cos(angle) * distance,
            y: centerY + Math.sin(angle) * distance,
            vx: Math.cos(angle) * (2 + Math.random() * 2),
            vy: Math.sin(angle) * (2 + Math.random() * 2),
            size: 2 + Math.random() * 3,
            color: particleColor,
            lifetime: 40 + Math.random() * 20,
            maxLifetime: 60,
            alpha: 1
        });
    }
    
    easeOutBack(t) {
        const c1 = 1.70158;
        const c3 = c1 + 1;
        return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    }
    
    easeInBack(t) {
        const c1 = 1.70158;
        const c3 = c1 + 1;
        return c3 * t * t * t - c1 * t * t;
    }
    
    draw(ctx) {
        if (!this.active) return;
        
        ctx.save();
        
        // Screen darkening overlay
        if (this.screenDarken > 0) {
            ctx.fillStyle = `rgba(0, 0, 0, ${this.screenDarken})`;
            ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        }
        
        // Edge glow effect
        if (this.edgeGlow > 0) {
            let glowColor = this.isBossWave ? '#ff0066' : '#00ffff';
            if (this.isBossWave && this.bossData && this.bossData.color) {
                glowColor = this.bossData.color;
            }
            const gradient = ctx.createRadialGradient(
                CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, CANVAS_HEIGHT * 0.3,
                CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, CANVAS_HEIGHT * 0.8
            );
            gradient.addColorStop(0, 'transparent');
            gradient.addColorStop(1, glowColor);
            ctx.globalAlpha = this.edgeGlow * 0.3;
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            ctx.globalAlpha = 1;
        }
        
        // Scanlines effect for boss
        if (this.isBossWave && this.alpha > 0) {
            ctx.globalAlpha = this.alpha * 0.1;
            const scanColor = (this.bossData && this.bossData.color) ? this.bossData.color : '#ff0066';
            ctx.strokeStyle = scanColor;
            ctx.lineWidth = 1;
            for (let y = this.scanlineOffset; y < CANVAS_HEIGHT; y += 10) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(CANVAS_WIDTH, y);
                ctx.stroke();
            }
            ctx.globalAlpha = 1;
        }
        
        // Draw particles
        this.particles.forEach(p => {
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = p.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
        
        // Main text
        const centerX = CANVAS_WIDTH / 2;
        const centerY = CANVAS_HEIGHT / 2 - 20;
        
        ctx.globalAlpha = this.alpha;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Draw main text with letter animation
        // Use boss-specific color if available
        let mainColor = this.isBossWave ? '#ff0066' : '#00ffff';
        if (this.isBossWave && this.bossData && this.bossData.color) {
            mainColor = this.bossData.color;
        }
        const fontSize = this.isBossWave ? 72 : 64;
        ctx.font = `bold ${fontSize}px "Courier New", monospace`;
        
        // Glow layers
        const glowLayers = [40, 30, 20, 10];
        glowLayers.forEach((blur, i) => {
            ctx.shadowBlur = blur * this.glowIntensity;
            ctx.shadowColor = mainColor;
            ctx.fillStyle = mainColor;
            
            // Draw each letter
            let xOffset = -((this.mainText.length - 1) * fontSize * 0.35);
            for (let i = 0; i < this.mainText.length; i++) {
                const letter = this.mainText[i];
                const offset = this.letterOffsets[i] || { y: 0, rotation: 0 };
                
                ctx.save();
                ctx.translate(centerX + xOffset, centerY + offset.y * this.scale);
                ctx.rotate(offset.rotation);
                ctx.scale(this.scale, this.scale);
                ctx.fillText(letter, 0, 0);
                ctx.restore();
                
                xOffset += fontSize * 0.7;
            }
        });
        
        // White core text
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#ffffff';
        let xOffset = -((this.mainText.length - 1) * fontSize * 0.35);
        for (let i = 0; i < this.mainText.length; i++) {
            const letter = this.mainText[i];
            const offset = this.letterOffsets[i] || { y: 0, rotation: 0 };
            
            ctx.save();
            ctx.translate(centerX + xOffset, centerY + offset.y * this.scale);
            ctx.rotate(offset.rotation);
            ctx.scale(this.scale, this.scale);
            ctx.fillText(letter, 0, 0);
            ctx.restore();
            
            xOffset += fontSize * 0.7;
        }
        
        // Subtitle
        if (this.subText && this.phase !== 'enter') {
            const subAlpha = this.phase === 'hold' ? 1 : this.alpha;
            ctx.globalAlpha = subAlpha * 0.9;
            ctx.font = 'bold 24px "Courier New", monospace';
            ctx.shadowBlur = 15 * this.glowIntensity;
            ctx.shadowColor = mainColor;
            ctx.fillStyle = mainColor;
            ctx.fillText(this.subText, centerX, centerY + 60);
            
            ctx.shadowBlur = 0;
            ctx.fillStyle = '#ffffff';
            ctx.globalAlpha = subAlpha * 0.7;
            ctx.fillText(this.subText, centerX, centerY + 60);
            
            // Boss intro quote (appears below subtitle)
            if (this.isBossWave && this.bossData && this.bossData.intro) {
                ctx.globalAlpha = subAlpha * 0.6;
                ctx.font = 'italic 16px "Courier New", monospace';
                ctx.fillStyle = mainColor;
                ctx.shadowBlur = 10;
                ctx.shadowColor = mainColor;
                ctx.fillText(`"${this.bossData.intro}"`, centerX, centerY + 95);
            }
        }
        
        // Decorative lines
        if (this.alpha > 0.5) {
            const lineAlpha = (this.alpha - 0.5) * 2;
            ctx.globalAlpha = lineAlpha * 0.6;
            ctx.strokeStyle = mainColor;
            ctx.lineWidth = 2;
            ctx.shadowBlur = 10;
            ctx.shadowColor = mainColor;
            
            // Left line
            const lineWidth = 150 * this.scale;
            ctx.beginPath();
            ctx.moveTo(centerX - 250 * this.scale, centerY);
            ctx.lineTo(centerX - 250 * this.scale + lineWidth, centerY);
            ctx.stroke();
            
            // Right line
            ctx.beginPath();
            ctx.moveTo(centerX + 250 * this.scale - lineWidth, centerY);
            ctx.lineTo(centerX + 250 * this.scale, centerY);
            ctx.stroke();
            
            // Corner accents
            const cornerSize = 15 * this.scale;
            ctx.lineWidth = 3;
            
            // Top-left
            ctx.beginPath();
            ctx.moveTo(centerX - 200 * this.scale, centerY - 50 * this.scale);
            ctx.lineTo(centerX - 200 * this.scale, centerY - 50 * this.scale + cornerSize);
            ctx.moveTo(centerX - 200 * this.scale, centerY - 50 * this.scale);
            ctx.lineTo(centerX - 200 * this.scale + cornerSize, centerY - 50 * this.scale);
            ctx.stroke();
            
            // Top-right
            ctx.beginPath();
            ctx.moveTo(centerX + 200 * this.scale, centerY - 50 * this.scale);
            ctx.lineTo(centerX + 200 * this.scale, centerY - 50 * this.scale + cornerSize);
            ctx.moveTo(centerX + 200 * this.scale, centerY - 50 * this.scale);
            ctx.lineTo(centerX + 200 * this.scale - cornerSize, centerY - 50 * this.scale);
            ctx.stroke();
            
            // Bottom-left
            ctx.beginPath();
            ctx.moveTo(centerX - 200 * this.scale, centerY + 80 * this.scale);
            ctx.lineTo(centerX - 200 * this.scale, centerY + 80 * this.scale - cornerSize);
            ctx.moveTo(centerX - 200 * this.scale, centerY + 80 * this.scale);
            ctx.lineTo(centerX - 200 * this.scale + cornerSize, centerY + 80 * this.scale);
            ctx.stroke();
            
            // Bottom-right
            ctx.beginPath();
            ctx.moveTo(centerX + 200 * this.scale, centerY + 80 * this.scale);
            ctx.lineTo(centerX + 200 * this.scale, centerY + 80 * this.scale - cornerSize);
            ctx.moveTo(centerX + 200 * this.scale, centerY + 80 * this.scale);
            ctx.lineTo(centerX + 200 * this.scale - cornerSize, centerY + 80 * this.scale);
            ctx.stroke();
        }
        
        ctx.restore();
    }
}



class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Force canvas to fit mobile viewport
        this.resizeCanvasForMobile();
        window.addEventListener('resize', () => this.resizeCanvasForMobile());
        
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
        this.shipDebris = [];
        this.powerUps = [];
        this.items = [];
        this.inventory = [];
        
        // UFO system
        this.ufos = [];
        this.enemyBullets = [];
        this.ufoSpawnTimer = this.getRandomUfoSpawnTime();
        
        // Boss system
        this.boss = null;
        this.bossLevel = false;

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
        // Combo system
        this.comboCount = 0;
        this.comboTimer = 0;
        this.comboDisplayTimer = 0;
        this.maxCombo = 0;
        this.lastKillX = 0;
        this.lastKillY = 0;

        // Animation timers
        this.time = 0;
        this.titlePulse = 0;
        
        // Engine sound state tracking
        this.wasThrusting = false;
        
        // Skill tree system
        this.skillTree = new SkillTree();
        this.skillTreeUI = new SkillTreeUI(this.skillTree, this);
        this.regenTimer = 0;
        
        // Save/Load system
                this.saveLoadUI = new SaveLoadUI(this);

        // High score entry state
        this.isEnteringInitials = false;
        this.newHighScoreRank = 0;
        this.initials = '';
        
        // Help popup state
        this.showHelp = false;

                // Mobile touch controls
        this.touchControls = new TouchControlManager(this.canvas, this);
        this.touchToggleBounds = null;  // Set during pause menu draw
        
        // Touch UI button bounds (for tap detection)
        this.uiButtons = {};

        // Wave announcement system
        this.waveAnnouncement = new WaveAnnouncement(this);

        this.setupEventListeners();
        this.gameLoop();
    }
    
    resizeCanvasForMobile() {
        // Check if on mobile (narrow viewport)
        const viewportWidth = window.innerWidth;
        if (viewportWidth < 820) {
            // Scale canvas to fit viewport width with small margin
            const targetWidth = viewportWidth - 10;
            const scale = targetWidth / CANVAS_WIDTH;
            const targetHeight = CANVAS_HEIGHT * scale;
            
            this.canvas.style.width = targetWidth + 'px';
            this.canvas.style.height = targetHeight + 'px';
            
            // Prevent any overflow
            document.body.style.overflowX = 'hidden';
            document.documentElement.style.overflowX = 'hidden';
        }
    }
    
    getRandomUfoSpawnTime() {
        return UFO_SPAWN_INTERVAL_MIN + Math.random() * (UFO_SPAWN_INTERVAL_MAX - UFO_SPAWN_INTERVAL_MIN);
    }

    setupEventListeners() {
        window.addEventListener('keydown', (e) => {
            this.keys[e.key] = true;
            
            // Initialize audio on first user interaction
            soundManager.init();
            musicManager.init();

            if (e.key === 'Enter') {
                if (this.state === 'gameover' && this.isEnteringInitials) {
                    // Submit high score
                    if (this.initials.length > 0) {
                        highScoreManager.addScore(this.initials, this.score, this.level);
                        this.isEnteringInitials = false;
                        soundManager.playItemCollect();
                    }
                } else if (this.state === 'start' || this.state === 'gameover') {
                    this.startGame();
                }
            }
            
            // Handle initials input for high score entry
            if (this.state === 'gameover' && this.isEnteringInitials) {
                if (e.key === 'Backspace' && this.initials.length > 0) {
                    this.initials = this.initials.slice(0, -1);
                } else if (e.key.length === 1 && e.key.match(/[a-zA-Z]/) && this.initials.length < 3) {
                    this.initials += e.key.toUpperCase();
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
            
            // Mute toggle with M key (SFX)
            if (e.key === 'm' || e.key === 'M') {
                soundManager.toggleMute();
            }
            
            // Music toggle with N key
            if (e.key === 'n' || e.key === 'N') {
                musicManager.toggleMute();
            }
            
            // Skill tree toggle with K key
            if (e.key === 'k' || e.key === 'K') {
                if (this.state === 'start' || this.state === 'playing') {
                    this.skillTreeUI.toggle();
                }
            }
            
            // Help toggle with H key
            if (e.key === 'h' || e.key === 'H') {
                if (this.state === 'start' || this.state === 'playing' || this.state === 'paused') {
                    this.showHelp = !this.showHelp;
                    soundManager.playItemUse();
                }
            }
            
            // Save/Load controls and Pause
            if (e.key === 'Escape') {
                if (this.showHelp) {
                    this.showHelp = false;
                } else if (this.saveLoadUI.visible) {
                    this.saveLoadUI.close();
                } else if (this.skillTreeUI.visible) {
                    this.skillTreeUI.toggle();
                } else if (this.state === 'playing' || this.state === 'paused') {
                    this.togglePause();
                }
            }

            // P key to pause
            if ((e.key === 'p' || e.key === 'P') && (this.state === 'playing' || this.state === 'paused')) {
                if (!this.saveLoadUI.visible && !this.skillTreeUI.visible) {
                    this.togglePause();
                }
            }

            // R key to restart from pause menu
            if ((e.key === 'r' || e.key === 'R') && this.state === 'paused') {
                this.startGame();
            }
            
            // T key to toggle touch controls from pause menu
            if ((e.key === 't' || e.key === 'T') && this.state === 'paused') {
                if (this.touchControls) {
                    this.touchControls.cycleMode();
                    soundManager.playItemUse(); // Audio feedback
                    console.log('Touch controls mode:', this.touchControls.mode);
                }
            }
            
            // F5 = Quick Save (during gameplay)
            if (e.key === 'F5' && this.state === 'playing') {
                e.preventDefault();
                this.saveLoadUI.saveManager.autoSave();
                this.triggerFlash('#00ff00', 0.15);
            }
            
            // F9 = Load Menu (from start screen or during play)
            if (e.key === 'F9') {
                e.preventDefault();
                if (this.state === 'start' || this.state === 'playing') {
                    this.saveLoadUI.toggle('load');
                }
            }
            
            // L = Load menu on start screen
            if ((e.key === 'l' || e.key === 'L') && this.state === 'start') {
                this.saveLoadUI.toggle('load');
            }
        });

        window.addEventListener('keyup', (e) => {
            this.keys[e.key] = false;
        });
        
        // Mouse events for skill tree and save/load UI
        this.canvas.addEventListener('click', (e) => {
            // Initialize sound on first interaction (for mobile browsers)
            soundManager.init();
            soundManager.resume();
            
            // Save/Load UI takes priority
            if (this.saveLoadUI.visible) {
                this.saveLoadUI.handleClick(e.clientX, e.clientY);
                return;
            }
            if (this.skillTreeUI.visible) {
                this.skillTreeUI.handleClick(e.clientX, e.clientY);
                return;
            }
            
            // Get click position in canvas coordinates
            const rect = this.canvas.getBoundingClientRect();
            const x = (e.clientX - rect.left) * (this.canvas.width / rect.width);
            const y = (e.clientY - rect.top) * (this.canvas.height / rect.height);
            
            // Helper function to check button bounds
            const hitButton = (name) => {
                const b = this.uiButtons[name];
                return b && x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h;
            };
            
            // Handle pause menu clicks
            if (this.state === 'paused') {
                // Touch controls toggle
                if (hitButton('touchToggle')) {
                    if (this.touchControls) {
                        this.touchControls.cycleMode();
                        soundManager.playItemUse();
                    }
                    return;
                }
                // Resume button
                if (hitButton('resume')) {
                    this.togglePause();
                    soundManager.playItemUse();
                    return;
                }
                // Restart button
                if (hitButton('restart')) {
                    this.startGame();
                    soundManager.playItemUse();
                    return;
                }
            }
            
            // Handle start screen button clicks
            if (this.state === 'start') {
                // Skill tree button
                if (hitButton('skillTree')) {
                    this.skillTreeUI.toggle();
                    return;
                }
                // Help button
                if (hitButton('help')) {
                    this.showHelp = !this.showHelp;
                    soundManager.playItemUse();
                    return;
                }
                // Load button
                if (hitButton('load')) {
                    this.saveLoadUI.toggle('load');
                    return;
                }
            }
            
            // Handle help screen tap to close
            if (this.showHelp) {
                if (hitButton('closeHelp')) {
                    this.showHelp = false;
                    soundManager.playItemUse();
                    return;
                }
            }
            
            // Handle game over screen
            if (this.state === 'gameover') {
                if (this.isEnteringInitials) {
                    // Virtual keyboard for initials
                    if (this.handleInitialsKeyboardClick(x, y)) {
                        return;
                    }
                    // Confirm button
                    if (hitButton('confirmInitials') && this.initials.length > 0) {
                        highScoreManager.addScore(this.initials, this.score, this.level);
                        this.isEnteringInitials = false;
                        soundManager.playItemCollect();
                        return;
                    }
                } else {
                    // Tap anywhere to restart (when not entering initials)
                    this.startGame();
                    return;
                }
            }
            
            // Tap to start on touch devices (or click to start)
            if (this.state === 'start') {
                this.startGame();
                return;
            }
        });
        
        this.canvas.addEventListener('mousemove', (e) => {
            this.saveLoadUI.handleMouseMove(e.clientX, e.clientY);
            this.skillTreeUI.handleMouseMove(e.clientX, e.clientY);
        });
    }

    startGame() {
        this.state = 'playing';
        this.score = 0;
        
        // Apply skill bonuses
        const effects = this.skillTree.getAllEffects();
        this.lives = 3 + (effects.startingLives || 0);
        this.maxInventorySlots = MAX_INVENTORY_SLOTS + (effects.extraInventorySlots || 0);
        
        this.level = 1;
        this.ship = new Ship(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, this);
        this.asteroids = [];
        this.bullets = [];
        this.particles = [];
        this.trailParticles = [];
        this.explosionParticles = [];
        this.shipDebris = [];
        this.powerUps = [];
        this.items = [];
        this.inventory = [];
        this.ufos = [];
        this.enemyBullets = [];
        this.ufoSpawnTimer = this.getRandomUfoSpawnTime();
        this.boss = null;
        this.bossLevel = false;
        this.levelCompleteTimer = 0;
        this.magnetActive = false;
        this.magnetTimer = 0;
        this.scoreMultiplier = 1;
        this.scoreMultiplierTimer = 0;
        this.freezeActive = false;
        this.freezeTimer = 0;
        this.comboCount = 0;
        this.comboTimer = 0;
        this.comboDisplayTimer = 0;
        this.maxCombo = 0;

        this.spawnAsteroids(4);
        this.updateUI();
        this.updateInventoryUI();
        
        // Trigger wave 1 announcement
        this.waveAnnouncement.trigger(1, false);
        
        // Flash effect on start
        this.triggerFlash('#00ffff', 0.3);
        
        // Play game start sound
        soundManager.playGameStart();
        
        // Start background music
        musicManager.init();
        musicManager.start();
        musicManager.setNormal();
    }

    triggerFlash(color, alpha) {
        this.flashColor = color;
        // Reduce flash intensity globally (less visual noise)
        this.flashAlpha = Math.min(alpha * 0.4, 0.15);
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
    
    spawnUfo() {
        // Spawn from a random edge
        const side = Math.floor(Math.random() * 4);
        let x, y, direction;
        
        switch(side) {
            case 0: // Top
                x = Math.random() * CANVAS_WIDTH;
                y = -UFO_SIZE;
                direction = Math.PI / 2 + (Math.random() - 0.5) * 0.5;
                break;
            case 1: // Right
                x = CANVAS_WIDTH + UFO_SIZE;
                y = Math.random() * CANVAS_HEIGHT;
                direction = Math.PI + (Math.random() - 0.5) * 0.5;
                break;
            case 2: // Bottom
                x = Math.random() * CANVAS_WIDTH;
                y = CANVAS_HEIGHT + UFO_SIZE;
                direction = -Math.PI / 2 + (Math.random() - 0.5) * 0.5;
                break;
            case 3: // Left
                x = -UFO_SIZE;
                y = Math.random() * CANVAS_HEIGHT;
                direction = 0 + (Math.random() - 0.5) * 0.5;
                break;
        }
        
        this.ufos.push(new UFO(x, y, direction, this));
        soundManager.playUfoAppear();
        this.triggerFlash(COLORS.ufoPrimary, 0.15);
    }

    nextLevel() {
        this.level++;
        this.updateUI();
        
        // Award skill point every level (with XP boost bonus)
        const effects = this.skillTree.getAllEffects();
        const xpBonus = effects.xpBonus || 0;
        const basePoints = 1;
        const bonusPoints = Math.random() < xpBonus ? 1 : 0;
        this.skillTree.addSkillPoints(basePoints + bonusPoints);
        
        // Auto-save progress on level complete
        this.saveLoadUI.saveManager.autoSave();
        
        // Check if this is a boss level
        if (BOSS_LEVELS.includes(this.level)) {
            this.bossLevel = true;
            this.boss = new Boss(this);
            this.triggerFlash('#ff0066', 0.4);
            // Trigger dramatic boss warning announcement
            this.waveAnnouncement.trigger(this.level, true);
            // Don't play normal level complete - boss appear sound plays instead
        } else {
            this.bossLevel = false;
            // Trigger wave announcement
            this.waveAnnouncement.trigger(this.level, false);
            this.spawnAsteroids(3 + this.level);
            this.triggerFlash('#00ff00', 0.2);
            soundManager.playLevelComplete();
        }
    }

    updateUI() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('lives').textContent = this.lives;
        document.getElementById('level').textContent = this.level;
    }

    togglePause() {
        if (this.state === 'playing') {
            this.state = 'paused';
            this.pauseTime = Date.now();
            soundManager.stopEngine();
            musicManager.stop();
        } else if (this.state === 'paused') {
            this.state = 'playing';
            if (musicManager.initialized && !musicManager.muted) {
                musicManager.start();
            }
        }
    }
    
    gameOver() {
        this.state = 'gameover';
        this.triggerFlash('#ff0000', 0.5);
        
        // Stop engine sound if playing
        soundManager.stopEngine();
        
        // Play game over sound
        soundManager.playGameOver();
        
        // Stop background music
        musicManager.stop();
        
        // Check for high score
        if (highScoreManager.isHighScore(this.score)) {
            this.isEnteringInitials = true;
            this.newHighScoreRank = highScoreManager.getRank(this.score);
            this.initials = '';
            soundManager.playLevelComplete(); // Celebratory sound!
        } else {
            this.isEnteringInitials = false;
            this.newHighScoreRank = 0;
        }
    }

    loseLife() {
        this.lives--;
        this.updateUI();
        this.screenShake.trigger(20);
        this.triggerFlash('#ff0000', 0.3);
        
        // Stop engine sound
        soundManager.stopEngine();

        if (this.lives <= 0) {
            this.gameOver();
        } else {
            this.ship = new Ship(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, this);
        }
    }

    addScore(points) {
        const comboMult = this.getComboMultiplier();
        this.score += Math.floor(points * this.scoreMultiplier * comboMult);
        this.updateUI();
    }

    // Register a kill for combo system
    registerKill(x, y) {
        this.comboCount++;
        this.comboTimer = COMBO_TIMEOUT;
        this.comboDisplayTimer = 60; // Show combo for 1 second
        this.lastKillX = x;
        this.lastKillY = y;
        
        // Track max combo
        if (this.comboCount > this.maxCombo) {
            this.maxCombo = this.comboCount;
        }
        
        // Check for milestone celebrations
        if (COMBO_MILESTONES.includes(this.comboCount)) {
            soundManager.playComboMilestone(this.comboCount);
            this.triggerFlash(COLORS.combo, 0.3);
            this.screenShake.trigger(this.comboCount >= 10 ? 10 : 5);
        }
    }
    
    // Get current combo multiplier
    getComboMultiplier() {
        if (this.comboCount <= 1) return 1;
        const mult = 1 + (this.comboCount - 1) * COMBO_MULTIPLIER_STEP;
        return Math.min(mult, COMBO_MULTIPLIER_CAP);
    }


    spawnPowerUp(x, y) {
        if (Math.random() < POWERUP_SPAWN_CHANCE) {
            const types = Object.keys(POWERUP_TYPES);
            const randomType = types[Math.floor(Math.random() * types.length)];
            this.powerUps.push(new PowerUp(x, y, randomType, this));
        }
    }
    
    // UFOs always drop good loot!
    spawnUfoLoot(x, y) {
        // Always spawn a power-up
        const types = Object.keys(POWERUP_TYPES);
        const randomType = types[Math.floor(Math.random() * types.length)];
        this.powerUps.push(new PowerUp(x, y, randomType, this));
        
        // 50% chance for a bonus item
        if (Math.random() < 0.5) {
            const itemTypes = Object.keys(ITEM_TYPES);
            const randomItem = itemTypes[Math.floor(Math.random() * itemTypes.length)];
            this.items.push(new Item(x, y, randomItem, this));
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
            soundManager.playItemCollect();
            
            // Visual feedback - show item name
            const itemInfo = ITEM_TYPES[item.type];
            if (itemInfo) {
                this.showFloatingText(`+${itemInfo.name}`, item.x, item.y, itemInfo.color);
                this.triggerFlash(itemInfo.color, 0.15);
                
                // Spawn collection particles
                for (let i = 0; i < 8; i++) {
                    const angle = (i / 8) * Math.PI * 2;
                    this.trailParticles.push(new TrailParticle(
                        item.x, item.y,
                        itemInfo.color,
                        3,  // size
                        20, // lifetime
                        Math.cos(angle) * 3, Math.sin(angle) * 3
                    ));
                }
            }
            return true;
        } else {
            // Inventory full feedback
            this.showFloatingText('INVENTORY FULL!', item.x, item.y - 20, '#ff4444');
        }
        return false;
    }
    
    showFloatingText(text, x, y, color) {
        if (!this.floatingTexts) this.floatingTexts = [];
        this.floatingTexts.push({
            text: text,
            x: x,
            y: y,
            color: color,
            alpha: 1,
            vy: -2,
            lifetime: 60
        });
    }

    // Handle virtual keyboard clicks for high score initials entry
    handleInitialsKeyboardClick(x, y) {
        // Keyboard layout - stored during draw
        const kb = this.initialsKeyboard;
        if (!kb) return false;
        
        const keyWidth = kb.keyWidth;
        const keyHeight = kb.keyHeight;
        const keyGap = kb.keyGap;
        
        // Check each key
        for (let row = 0; row < kb.rows.length; row++) {
            const rowKeys = kb.rows[row];
            const rowWidth = rowKeys.length * (keyWidth + keyGap) - keyGap;
            const rowX = kb.startX + (kb.totalWidth - rowWidth) / 2;
            const rowY = kb.startY + row * (keyHeight + keyGap);
            
            for (let col = 0; col < rowKeys.length; col++) {
                const key = rowKeys[col];
                const keyX = rowX + col * (keyWidth + keyGap);
                
                if (x >= keyX && x <= keyX + keyWidth && 
                    y >= rowY && y <= rowY + keyHeight) {
                    
                    if (key === '⌫') {
                        // Backspace
                        if (this.initials.length > 0) {
                            this.initials = this.initials.slice(0, -1);
                            soundManager.playItemUse();
                        }
                    } else if (this.initials.length < 3) {
                        // Add letter
                        this.initials += key;
                        soundManager.playItemCollect();
                    }
                    return true;
                }
            }
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
                soundManager.playItemUse();
                used = true;
                break;

            case 'BOMB':
                // Destroy all asteroids
                this.asteroids.forEach(asteroid => {
                    this.createExplosion(asteroid.x, asteroid.y, asteroid.size * 8);
                    this.addScore((4 - asteroid.size) * 10);
                });
                this.asteroids = [];
                // Also destroy UFOs!
                this.ufos.forEach(ufo => {
                    this.createExplosion(ufo.x, ufo.y, 20);
                    this.addScore(UFO_POINTS / 2);
                });
                this.ufos = [];
                this.enemyBullets = [];
                this.screenShake.trigger(30);
                this.triggerFlash('#ff8c00', 0.5);
                soundManager.playBomb();
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
                // Freeze UFOs too
                this.ufos.forEach(ufo => {
                    ufo.frozen = true;
                    ufo.frozenVx = ufo.vx;
                    ufo.frozenVy = ufo.vy;
                });
                this.triggerFlash('#87ceeb', 0.3);
                soundManager.playFreeze();
                used = true;
                break;

            case 'MAGNET':
                this.magnetActive = true;
                this.magnetTimer = 600;
                this.triggerFlash('#da70d6', 0.2);
                soundManager.playItemUse();
                used = true;
                break;

            case 'SCORE_BOOST':
                this.scoreMultiplier = 2;
                this.scoreMultiplierTimer = 900;
                this.triggerFlash('#ffd700', 0.2);
                soundManager.playItemUse();
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
                // Unfreeze UFOs
                this.ufos.forEach(ufo => {
                    if (ufo.frozen) {
                        ufo.frozen = false;
                        ufo.vx = ufo.frozenVx;
                        ufo.vy = ufo.frozenVy;
                    }
                });
            }
        }
    }

    updateCombo() {
        if (this.comboTimer > 0) {
            this.comboTimer--;
            if (this.comboTimer === 0) {
                // Combo broken
                if (this.comboCount >= 3) {
                    soundManager.playComboBreak();
                }
                this.comboCount = 0;
            }
        }
        
        if (this.comboDisplayTimer > 0) {
            this.comboDisplayTimer--;
        }
    }


    updateInventoryUI() {
        const container = document.getElementById('inventory');
        if (!container) return;

        container.innerHTML = '';
        for (let i = 0; i < MAX_INVENTORY_SLOTS; i++) {
            const slot = document.createElement('div');
            slot.className = 'inventory-slot';
            
            // Make slot tappable
            const slotIndex = i;
            slot.style.cursor = 'pointer';
            slot.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent canvas click
                if (this.state === 'playing' && slotIndex < this.inventory.length) {
                    this.useInventoryItem(slotIndex);
                }
            });
            slot.addEventListener('touchstart', (e) => {
                e.stopPropagation(); // Prevent canvas touch
            }, { passive: true });

            if (i < this.inventory.length) {
                const itemType = this.inventory[i];
                const itemInfo = ITEM_TYPES[itemType];
                slot.innerHTML = `
                    <span class="item-symbol" style="color: ${itemInfo.color}">${itemInfo.symbol}</span>
                    <span class="slot-key">${i + 1}</span>
                `;
                slot.title = `${itemInfo.name}: ${itemInfo.description} (Tap or press ${i + 1})`;
                slot.style.borderColor = itemInfo.color;
                slot.style.boxShadow = `0 0 10px ${itemInfo.color}40, inset 0 0 10px ${itemInfo.color}20`;
            } else {
                slot.innerHTML = `<span class="slot-key">${i + 1}</span>`;
            }

            container.appendChild(slot);
        }
    }

    createExplosion(x, y, intensity) {
        // Directional screen shake based on explosion size and position
        this.screenShake.triggerDirectional(intensity * 0.8, x, y);
        
        // Play explosion sound with size-based intensity
        soundManager.playExplosion(intensity / 15);
        
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
    
    // Create green UFO explosion
    createUfoExplosion(x, y) {
        this.screenShake.triggerDirectional(15, x, y);
        soundManager.playUfoDestroyed();
        
        // Green core particles
        for (let i = 0; i < 15; i++) {
            this.explosionParticles.push(new ExplosionParticle(x, y, COLORS.ufoPrimary, true));
        }
        
        // Mixed debris
        for (let i = 0; i < 25; i++) {
            const color = Math.random() > 0.5 ? COLORS.ufoPrimary : COLORS.ufoSecondary;
            this.explosionParticles.push(new ExplosionParticle(x, y, color, false));
        }
        
        this.particles.push(new ShockwaveParticle(x, y, 60));
    }

    // Create dramatic ship destruction effect
    createShipExplosion(x, y, angle) {
        // Massive directional screen shake from ship position
        this.screenShake.triggerDirectional(35, x, y);
        
        // Bright flash
        this.triggerFlash('#00ffff', 0.6);
        
        // Play death sound
        soundManager.playShipDeath();
        
        // Create hull debris pieces (8-12 pieces)
        const debrisCount = 8 + Math.floor(Math.random() * 5);
        const colors = [COLORS.shipPrimary, COLORS.shipSecondary, '#ffffff', COLORS.shipEngine];
        
        for (let i = 0; i < debrisCount; i++) {
            const debrisAngle = (i / debrisCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
            const color = colors[Math.floor(Math.random() * colors.length)];
            this.shipDebris.push(new ShipDebrisParticle(x, y, debrisAngle, color));
        }
        
        // Core explosion particles (cyan themed)
        for (let i = 0; i < 20; i++) {
            this.explosionParticles.push(new ExplosionParticle(x, y, COLORS.shipPrimary, true));
        }
        
        // Secondary explosion particles
        for (let i = 0; i < 30; i++) {
            const color = Math.random() > 0.5 ? COLORS.shipPrimary : COLORS.shipEngine;
            this.explosionParticles.push(new ExplosionParticle(x, y, color, false));
        }
        
        // Large shockwave
        this.particles.push(new ShockwaveParticle(x, y, 100));
        
        // Cascading secondary explosions (delayed)
        const game = this;
        for (let wave = 1; wave < 4; wave++) {
            setTimeout(() => {
                if (game.state === 'gameover' && wave > 1) return;
                const offsetX = (Math.random() - 0.5) * 30;
                const offsetY = (Math.random() - 0.5) * 30;
                game.createExplosion(x + offsetX, y + offsetY, 12 - wave * 2);
                game.screenShake.trigger(12 - wave * 3);
            }, wave * 100);
        }
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
        
        // Update wave announcement (always, even when paused for dramatic effect)
        if (this.waveAnnouncement) {
            this.waveAnnouncement.update();
        }
        
        // Fade flash effect
        if (this.flashAlpha > 0) {
            this.flashAlpha *= 0.9;
            if (this.flashAlpha < 0.01) this.flashAlpha = 0;
        }

        if (this.state !== 'playing' && this.state !== 'paused') return;
        if (this.state === 'paused' || this.showHelp) return; // Pause freezes gameplay

        this.updateItemEffects();
        this.updateCombo();
        
        // Update music intensity based on game state
        if (musicManager.playing) {
            let intensity = 0.4; // Base playing intensity
            intensity += this.asteroids.length * 0.02; // More asteroids = more intense
            intensity += this.ufos.length * 0.1; // UFOs add intensity
            if (this.boss) intensity = 1.0; // Boss = max intensity
            if (this.comboCount >= 10) intensity = Math.min(1, intensity + 0.15); // Big combo boost
            musicManager.setIntensity(intensity);
        }
        
        // UFO spawning
        this.ufoSpawnTimer--;
        if (this.ufoSpawnTimer <= 0 && this.ufos.length < 2) {
            this.spawnUfo();
            this.ufoSpawnTimer = this.getRandomUfoSpawnTime();
        }

        if (this.ship) {
            const mergedKeys = this.touchControls.getKeys(this.keys);
            
            // Direct angle control from touch joystick
            const targetAngle = this.touchControls.getTargetAngle();
            if (targetAngle !== null) {
                this.ship.angle = targetAngle;
            }
            
            // Pass touch thrust amount for gentler acceleration
            this.ship.touchThrustAmount = this.touchControls.getThrustAmount();
            
            this.ship.update(mergedKeys);
            
            // Handle touch auto-fire
            if (this.touchControls.shouldAutoFire()) {
                this.ship.shoot();
            }
            
            // Handle engine sound (check both keyboard and touch)
            const isThrusting = mergedKeys['ArrowUp'];
            if (isThrusting && !this.wasThrusting) {
                soundManager.startEngine();
            } else if (!isThrusting && this.wasThrusting) {
                soundManager.stopEngine();
            }
            if (isThrusting) {
                soundManager.updateEngine(this.ship.thrustAmount);
            }
            this.wasThrusting = isThrusting;
        }

        if (!this.freezeActive) {
            this.asteroids.forEach(asteroid => asteroid.update());
        } else {
            // Frozen asteroids still get visual updates
            this.asteroids.forEach(asteroid => asteroid.updateFrozenVisuals());
        }
        
        // Update UFOs
        this.ufos.forEach(ufo => ufo.update());
        
        // Update enemy bullets
        this.enemyBullets = this.enemyBullets.filter(bullet => {
            bullet.update();
            return bullet.lifetime > 0;
        });

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

        this.shipDebris = this.shipDebris.filter(debris => {
            debris.update();
            return debris.lifetime > 0;
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
        
        // Update floating texts
        if (this.floatingTexts) {
            this.floatingTexts = this.floatingTexts.filter(ft => {
                ft.y += ft.vy;
                ft.alpha -= 0.02;
                ft.lifetime--;
                return ft.lifetime > 0 && ft.alpha > 0;
            });
        }
        
        // Remove UFOs that went off-screen
        this.ufos = this.ufos.filter(ufo => !ufo.offScreen);
        
        // Update boss
        if (this.boss) {
            this.boss.update();
            if (this.boss.isFinished()) {
                this.boss = null;
                this.bossLevel = false;
                // After boss defeat, continue to next level
                this.nextLevel();
                return;
            }
        }

        this.checkCollisions();

        // Level completion: no asteroids AND no active boss
        if (this.asteroids.length === 0 && !this.boss && !this.bossLevel) {
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
                    this.registerKill(asteroid.x, asteroid.y);
                    this.spawnPowerUp(asteroid.x, asteroid.y);
                    this.spawnItem(asteroid.x, asteroid.y, asteroid.size);
                    
                    // Small chance to earn skill point from asteroid kills
                    if (this.checkSkillPointDrop()) {
                        this.showFloatingText('+1 SKILL POINT!', asteroid.x, asteroid.y - 30, '#ffff00');
                    }
                    
                    this.asteroids.splice(j, 1);
                    break;
                }
            }
        }
        
        // Bullet vs UFO
        for (let i = this.bullets.length - 1; i >= 0; i--) {
            for (let j = this.ufos.length - 1; j >= 0; j--) {
                if (this.circleCollision(
                    this.bullets[i].x, this.bullets[i].y, 4,
                    this.ufos[j].x, this.ufos[j].y, UFO_SIZE
                )) {
                    this.bullets.splice(i, 1);
                    
                    const ufo = this.ufos[j];
                    this.createUfoExplosion(ufo.x, ufo.y);
                    this.addScore(UFO_POINTS);
                    this.registerKill(ufo.x, ufo.y);
                    this.spawnUfoLoot(ufo.x, ufo.y);
                    this.ufos.splice(j, 1);
                    this.triggerFlash(COLORS.ufoPrimary, 0.2);
                    break;
                }
            }
        }
        
        // Bullet vs Boss
        if (this.boss && !this.boss.defeated && !this.boss.entering) {
            for (let i = this.bullets.length - 1; i >= 0; i--) {
                if (this.circleCollision(
                    this.bullets[i].x, this.bullets[i].y, 4,
                    this.boss.x, this.boss.y, BOSS_SIZE
                )) {
                    this.bullets.splice(i, 1);
                    this.boss.takeDamage();
                    break;
                }
            }
        }

        // Ship vs Asteroid
        if (this.ship && !this.ship.invulnerable) {
            for (let i = this.asteroids.length - 1; i >= 0; i--) {
                if (this.circleCollision(
                    this.ship.x, this.ship.y, SHIP_SIZE,
                    this.asteroids[i].x, this.asteroids[i].y, this.asteroids[i].radius
                )) {
                    if (!this.ship.hasShield) {
                        const shipX = this.ship.x;
                        const shipY = this.ship.y;
                        const shipAngle = this.ship.angle;
                        this.createShipExplosion(shipX, shipY, shipAngle);
                        this.ship = null;
                        this.loseLife();
                        break;
                    } else {
                        const asteroid = this.asteroids[i];
                        this.createExplosion(asteroid.x, asteroid.y, asteroid.size * 6);
                        
                        // Play shield hit sound
                        soundManager.playShieldHit();

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
        }
        
        // Ship vs UFO
        if (this.ship && !this.ship.invulnerable) {
            for (let i = this.ufos.length - 1; i >= 0; i--) {
                if (this.circleCollision(
                    this.ship.x, this.ship.y, SHIP_SIZE,
                    this.ufos[i].x, this.ufos[i].y, UFO_SIZE
                )) {
                    if (!this.ship.hasShield) {
                        const shipX = this.ship.x;
                        const shipY = this.ship.y;
                        const shipAngle = this.ship.angle;
                        this.createShipExplosion(shipX, shipY, shipAngle);
                        this.createUfoExplosion(this.ufos[i].x, this.ufos[i].y);
                        this.ufos.splice(i, 1);
                        this.ship = null;
                        this.loseLife();
                        break;
                    } else {
                        this.createUfoExplosion(this.ufos[i].x, this.ufos[i].y);
                        soundManager.playShieldHit();
                        this.addScore(UFO_POINTS / 2);
                        this.ufos.splice(i, 1);
                    }
                }
            }
        }
        
        // Ship vs Enemy Bullets
        if (this.ship && !this.ship.invulnerable) {
            for (let i = this.enemyBullets.length - 1; i >= 0; i--) {
                if (this.circleCollision(
                    this.ship.x, this.ship.y, SHIP_SIZE,
                    this.enemyBullets[i].x, this.enemyBullets[i].y, 4
                )) {
                    this.enemyBullets.splice(i, 1);
                    
                    if (!this.ship.hasShield) {
                        const shipX = this.ship.x;
                        const shipY = this.ship.y;
                        const shipAngle = this.ship.angle;
                        this.createShipExplosion(shipX, shipY, shipAngle);
                        this.ship = null;
                        this.loseLife();
                        break;
                    } else {
                        soundManager.playShieldHit();
                        this.triggerFlash(COLORS.ufoPrimary, 0.1);
                    }
                }
            }
        }

        if (this.ship) {
            // Ship vs PowerUp
            for (let i = this.powerUps.length - 1; i >= 0; i--) {
                if (this.circleCollision(
                    this.ship.x, this.ship.y, SHIP_SIZE,
                    this.powerUps[i].x, this.powerUps[i].y, POWERUP_SIZE
                )) {
                    this.ship.activatePowerUp(this.powerUps[i].type);
                    this.triggerFlash(POWERUP_TYPES[this.powerUps[i].type].color, 0.2);
                    soundManager.playPowerUp();
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
            this.skillTreeUI.draw(ctx);
            this.saveLoadUI.draw(ctx);
            ctx.restore();
            return;
        }

        if (this.state === 'gameover') {
            this.drawGameOverScreen(ctx);
            ctx.restore();
            return;
        }

        if (this.state === 'paused') {
            // Draw game objects dimmed in background
            this.trailParticles.forEach(particle => particle.draw(ctx));
            this.explosionParticles.forEach(particle => particle.draw(ctx));
            this.particles.forEach(particle => particle.draw(ctx));
            this.items.forEach(item => item.draw(ctx));
            this.powerUps.forEach(powerUp => powerUp.draw(ctx));
            this.asteroids.forEach(asteroid => asteroid.draw(ctx));
            this.ufos.forEach(ufo => ufo.draw(ctx));
            if (this.boss) this.boss.draw(ctx);
            this.enemyBullets.forEach(bullet => bullet.draw(ctx));
            this.bullets.forEach(bullet => bullet.draw(ctx));
            if (this.ship) this.ship.draw(ctx);

            this.drawPauseMenu(ctx);
            ctx.restore();
            return;
        }

        // Draw game objects in order (back to front)
        this.trailParticles.forEach(particle => particle.draw(ctx));
        this.explosionParticles.forEach(particle => particle.draw(ctx));
        this.shipDebris.forEach(debris => debris.draw(ctx));
        this.particles.forEach(particle => particle.draw(ctx));
        this.items.forEach(item => item.draw(ctx));
        this.powerUps.forEach(powerUp => powerUp.draw(ctx));
        this.asteroids.forEach(asteroid => asteroid.draw(ctx));
        this.ufos.forEach(ufo => ufo.draw(ctx));
        if (this.boss) this.boss.draw(ctx);
        this.enemyBullets.forEach(bullet => bullet.draw(ctx));
        this.bullets.forEach(bullet => bullet.draw(ctx));
        
        if (this.ship) {
            this.ship.draw(ctx);
            this.ship.drawPowerUpIndicators(ctx);
        }

        this.drawComboIndicator(ctx);
        this.drawItemEffectIndicators(ctx);
        this.drawFloatingTexts(ctx);
        this.drawTouchInventory(ctx);
        
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
        
        // Draw skill tree UI overlay (if visible)
        this.skillTreeUI.draw(ctx);
        
        // Draw save/load UI overlay (if visible)
        this.saveLoadUI.draw(ctx);
        
        // Draw help popup (if visible)
        if (this.showHelp) {
            this.drawHelpScreen(ctx);
        }
        
        // Draw wave announcement (on top of most elements)
        if (this.waveAnnouncement) {
            this.waveAnnouncement.draw(ctx);
        }
        
        ctx.restore();  // End screen shake transform
        
        // Draw mobile touch controls overlay (on top of everything, no screen shake)
        if (this.touchControls) {
            this.touchControls.draw(ctx);
        }
    }
    
    drawHelpScreen(ctx) {
        // Semi-transparent overlay
        ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        
        // Help box
        const boxWidth = 700;
        const boxHeight = 500;
        const boxX = (CANVAS_WIDTH - boxWidth) / 2;
        const boxY = (CANVAS_HEIGHT - boxHeight) / 2;
        
        // Box background
        ctx.fillStyle = '#0a0020';
        ctx.strokeStyle = '#00ffff';
        ctx.lineWidth = 2;
        ctx.fillRect(boxX, boxY, boxWidth, boxHeight);
        ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);
        
        // Title
        ctx.save();
        ctx.shadowColor = '#00ffff';
        ctx.shadowBlur = 15;
        ctx.fillStyle = '#00ffff';
        ctx.font = 'bold 28px "Courier New", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('HELP & CONTROLS', CANVAS_WIDTH / 2, boxY + 40);
        ctx.restore();
        
        let y = boxY + 80;
        const leftCol = boxX + 30;
        const rightCol = boxX + 370;
        
        // Controls section
        ctx.fillStyle = '#ffff00';
        ctx.font = 'bold 16px "Courier New", monospace';
        ctx.textAlign = 'left';
        ctx.fillText('CONTROLS', leftCol, y);
        
        ctx.fillStyle = '#ffffff';
        ctx.font = '14px "Courier New", monospace';
        y += 25;
        ctx.fillText('Arrow Keys / WASD - Move ship', leftCol, y);
        y += 20;
        ctx.fillText('SPACE - Shoot', leftCol, y);
        y += 20;
        ctx.fillText('1-5 - Use inventory item', leftCol, y);
        y += 20;
        ctx.fillText('M - Toggle sound effects', leftCol, y);
        y += 20;
        ctx.fillText('N - Toggle music', leftCol, y);
        y += 20;
        ctx.fillText('K - Skill tree', leftCol, y);
        y += 20;
        ctx.fillText('P / ESC - Pause', leftCol, y);
        y += 20;
        ctx.fillText('H - This help screen', leftCol, y);
        
        // Powerups section
        y = boxY + 80;
        ctx.fillStyle = '#ff00ff';
        ctx.font = 'bold 16px "Courier New", monospace';
        ctx.fillText('POWER-UPS (auto-activate)', rightCol, y);
        
        ctx.font = '14px "Courier New", monospace';
        y += 25;
        Object.entries(POWERUP_TYPES).forEach(([key, powerup]) => {
            ctx.fillStyle = powerup.color;
            ctx.fillText(`${powerup.symbol} - ${powerup.name}`, rightCol, y);
            y += 20;
        });
        
        // Items section
        y += 15;
        ctx.fillStyle = '#ffd700';
        ctx.font = 'bold 16px "Courier New", monospace';
        ctx.fillText('ITEMS (press 1-5 to use)', rightCol, y);
        
        ctx.font = '14px "Courier New", monospace';
        y += 25;
        Object.entries(ITEM_TYPES).forEach(([key, item]) => {
            ctx.fillStyle = item.color;
            ctx.fillText(`${item.symbol} - ${item.name}: ${item.description}`, rightCol, y);
            y += 20;
        });
        
        // Tips section
        y = boxY + 380;
        ctx.fillStyle = '#00ff00';
        ctx.font = 'bold 16px "Courier New", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('TIPS', CANVAS_WIDTH / 2, y);
        
        ctx.fillStyle = '#aaaaaa';
        ctx.font = '13px "Courier New", monospace';
        y += 25;
        ctx.fillText('Destroy asteroids to collect power-ups and items', CANVAS_WIDTH / 2, y);
        y += 18;
        ctx.fillText('Items go to inventory - press 1-5 to use them!', CANVAS_WIDTH / 2, y);
        y += 18;
        ctx.fillText('Build combos for score multipliers', CANVAS_WIDTH / 2, y);
        
        // Close button (tappable)
        const closeBtnWidth = 180;
        const closeBtnHeight = 36;
        const closeBtnX = CANVAS_WIDTH / 2 - closeBtnWidth / 2;
        const closeBtnY = boxY + boxHeight - 50;
        
        this.uiButtons.closeHelp = { x: closeBtnX, y: closeBtnY, w: closeBtnWidth, h: closeBtnHeight };
        
        ctx.fillStyle = 'rgba(136, 136, 136, 0.2)';
        ctx.strokeStyle = '#888888';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(closeBtnX, closeBtnY, closeBtnWidth, closeBtnHeight, 6);
        ctx.fill();
        ctx.stroke();
        
        ctx.fillStyle = '#cccccc';
        ctx.font = '16px "Courier New", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('CLOSE', CANVAS_WIDTH / 2, closeBtnY + 24);
    }

    drawStartScreen(ctx) {
        // Title - subtle glow, no pulsing size
        ctx.save();
        ctx.shadowColor = COLORS.shipPrimary;
        ctx.shadowBlur = 15;
        ctx.fillStyle = COLORS.shipPrimary;
        ctx.font = 'bold 48px "Courier New", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('ASTEROIDS', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 50);
        ctx.restore();
        
        // Subtitle with subtle glow
        ctx.save();
        ctx.shadowColor = COLORS.bullet;
        ctx.shadowBlur = 8;
        ctx.fillStyle = COLORS.bullet;
        ctx.font = '20px "Courier New", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('N E O N   E D I T I O N', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 10);
        ctx.restore();
        
        // Start text - static, no blinking
        ctx.fillStyle = '#ffffff';
        ctx.font = '24px "Courier New", monospace';
        ctx.textAlign = 'center';
        if (this.touchControls && this.touchControls.isTouchDevice) {
            ctx.fillText('Tap to Start', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 50);
        } else {
            ctx.fillText('Press ENTER to Start', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 50);
        }
        
        // Sound instructions / Touch hint
        ctx.fillStyle = '#666666';
        ctx.font = '14px "Courier New", monospace';
        ctx.textAlign = 'center';
        if (this.touchControls && this.touchControls.isTouchDevice) {
            ctx.fillText('Left side = Move  |  Right side = Fire', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 90);
        } else {
            ctx.fillText('M = Toggle SFX  |  N = Toggle Music', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 90);
        }
        
        // Skill tree button (tappable)
        const skillBtnY = CANVAS_HEIGHT / 2 + 110;
        const skillBtnWidth = 260;
        const skillBtnHeight = 36;
        const skillBtnX = CANVAS_WIDTH / 2 - skillBtnWidth / 2;
        
        // Store bounds for tap detection
        this.uiButtons.skillTree = { x: skillBtnX, y: skillBtnY, w: skillBtnWidth, h: skillBtnHeight };
        
        ctx.save();
        ctx.fillStyle = 'rgba(255, 255, 0, 0.15)';
        ctx.strokeStyle = '#ffff00';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#ffff00';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.roundRect(skillBtnX, skillBtnY, skillBtnWidth, skillBtnHeight, 6);
        ctx.fill();
        ctx.stroke();
        
        ctx.fillStyle = '#ffff00';
        ctx.font = '16px "Courier New", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`SKILL TREE (${this.skillTree.skillPoints} pts)`, CANVAS_WIDTH / 2, skillBtnY + 24);
        ctx.restore();
        
        // Help button (tappable)
        const helpBtnY = CANVAS_HEIGHT / 2 + 155;
        const helpBtnWidth = 200;
        const helpBtnHeight = 32;
        const helpBtnX = CANVAS_WIDTH / 2 - helpBtnWidth / 2;
        
        this.uiButtons.help = { x: helpBtnX, y: helpBtnY, w: helpBtnWidth, h: helpBtnHeight };
        
        ctx.save();
        ctx.fillStyle = 'rgba(0, 255, 255, 0.12)';
        ctx.strokeStyle = '#00ffff';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#00ffff';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.roundRect(helpBtnX, helpBtnY, helpBtnWidth, helpBtnHeight, 6);
        ctx.fill();
        ctx.stroke();
        
        ctx.fillStyle = '#00ffff';
        ctx.font = '14px "Courier New", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('HELP & CONTROLS', CANVAS_WIDTH / 2, helpBtnY + 22);
        ctx.restore();
        
        // Load game button (if saves exist)
        if (this.saveLoadUI.saveManager.hasSaves()) {
            const loadBtnY = CANVAS_HEIGHT / 2 + 195;
            const loadBtnWidth = 200;
            const loadBtnHeight = 32;
            const loadBtnX = CANVAS_WIDTH / 2 - loadBtnWidth / 2;
            
            this.uiButtons.load = { x: loadBtnX, y: loadBtnY, w: loadBtnWidth, h: loadBtnHeight };
            
            ctx.save();
            ctx.fillStyle = 'rgba(0, 255, 136, 0.12)';
            ctx.strokeStyle = '#00ff88';
            ctx.lineWidth = 2;
            ctx.shadowColor = '#00ff88';
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.roundRect(loadBtnX, loadBtnY, loadBtnWidth, loadBtnHeight, 6);
            ctx.fill();
            ctx.stroke();
            
            ctx.fillStyle = '#00ff88';
            ctx.font = '14px "Courier New", monospace';
            ctx.textAlign = 'center';
            ctx.fillText('LOAD SAVED GAME', CANVAS_WIDTH / 2, loadBtnY + 22);
            ctx.restore();
        } else {
            this.uiButtons.load = null;
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
        
        // Draw high scores on right side
        const scores = highScoreManager.getScores();
        if (scores.length > 0) {
            ctx.save();
            ctx.textAlign = 'right';
            
            // Title
            ctx.shadowColor = '#ffff00';
            ctx.shadowBlur = 10;
            ctx.fillStyle = '#ffff00';
            ctx.font = 'bold 18px "Courier New", monospace';
            ctx.fillText('HIGH SCORES', CANVAS_WIDTH - 30, 40);
            
            // Scores list
            ctx.shadowBlur = 5;
            ctx.font = '14px "Courier New", monospace';
            scores.slice(0, 5).forEach((entry, i) => {
                const y = 65 + i * 22;
                const color = i === 0 ? '#ffd700' : i === 1 ? '#c0c0c0' : i === 2 ? '#cd7f32' : '#888888';
                ctx.fillStyle = color;
                ctx.fillText(`${i + 1}. ${entry.initials} ${entry.score.toLocaleString()}`, CANVAS_WIDTH - 30, y);
            });
            ctx.restore();
        }
    }

    drawPauseMenu(ctx) {
        // Dim overlay
        ctx.save();
        ctx.fillStyle = 'rgba(0, 0, 20, 0.85)';
        ctx.fillRect(-20, -20, CANVAS_WIDTH + 40, CANVAS_HEIGHT + 40);
        ctx.restore();
        
        // PAUSED title - static, subtle glow
        ctx.save();
        ctx.shadowColor = '#00ffff';
        ctx.shadowBlur = 12;
        ctx.fillStyle = '#00ffff';
        ctx.font = 'bold 48px "Courier New", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('PAUSED', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 100);
        ctx.restore();
        
        // Current stats box
        const boxY = CANVAS_HEIGHT / 2 - 50;
        const boxWidth = 280;
        const boxHeight = 120;
        const boxX = CANVAS_WIDTH / 2 - boxWidth / 2;
        
        // Stats box background
        ctx.save();
        ctx.fillStyle = 'rgba(0, 20, 40, 0.9)';
        ctx.strokeStyle = '#00ffff';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#00ffff';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.roundRect(boxX, boxY, boxWidth, boxHeight, 8);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
        
        // Stats labels
        ctx.save();
        ctx.textAlign = 'left';
        ctx.font = '18px "Courier New", monospace';
        ctx.fillStyle = '#888888';
        ctx.fillText('Score:', boxX + 20, boxY + 35);
        ctx.fillText('Level:', boxX + 20, boxY + 65);
        ctx.fillText('Lives:', boxX + 20, boxY + 95);
        
        // Stats values with glow
        ctx.textAlign = 'right';
        ctx.shadowBlur = 10;
        
        ctx.shadowColor = '#00ffff';
        ctx.fillStyle = '#00ffff';
        ctx.fillText(this.score.toLocaleString(), boxX + boxWidth - 20, boxY + 35);
        
        ctx.shadowColor = '#ffff00';
        ctx.fillStyle = '#ffff00';
        ctx.fillText(this.level, boxX + boxWidth - 20, boxY + 65);
        
        ctx.shadowColor = '#ff4466';
        ctx.fillStyle = '#ff4466';
        ctx.fillText(this.lives, boxX + boxWidth - 20, boxY + 95);
        ctx.restore();
        
        // Menu options - tappable buttons
        const menuY = CANVAS_HEIGHT / 2 + 90;
        const btnWidth = 260;
        const btnHeight = 40;
        const btnGap = 12;
        
        // Resume button
        const resumeBtnX = CANVAS_WIDTH / 2 - btnWidth / 2;
        const resumeBtnY = menuY;
        this.uiButtons.resume = { x: resumeBtnX, y: resumeBtnY, w: btnWidth, h: btnHeight };
        
        ctx.save();
        ctx.fillStyle = 'rgba(0, 255, 136, 0.2)';
        ctx.strokeStyle = '#00ff88';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#00ff88';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.roundRect(resumeBtnX, resumeBtnY, btnWidth, btnHeight, 8);
        ctx.fill();
        ctx.stroke();
        
        ctx.fillStyle = '#00ff88';
        ctx.font = 'bold 18px "Courier New", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('RESUME', CANVAS_WIDTH / 2, resumeBtnY + 26);
        ctx.restore();
        
        // Restart button
        const restartBtnY = menuY + btnHeight + btnGap;
        this.uiButtons.restart = { x: resumeBtnX, y: restartBtnY, w: btnWidth, h: btnHeight };
        
        ctx.save();
        ctx.fillStyle = 'rgba(255, 136, 0, 0.2)';
        ctx.strokeStyle = '#ff8800';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#ff8800';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.roundRect(resumeBtnX, restartBtnY, btnWidth, btnHeight, 8);
        ctx.fill();
        ctx.stroke();
        
        ctx.fillStyle = '#ff8800';
        ctx.font = 'bold 18px "Courier New", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('RESTART', CANVAS_WIDTH / 2, restartBtnY + 26);
        ctx.restore();
        
        // Touch controls toggle button
        const touchLabel = this.touchControls ? this.touchControls.getModeLabel() : 'N/A';
        const touchText = `Touch: ${touchLabel}`;
        const touchBtnY = restartBtnY + btnHeight + btnGap;
        const touchBtnWidth = 200;
        const touchBtnHeight = 32;
        const touchBtnX = CANVAS_WIDTH / 2 - touchBtnWidth / 2;
        
        // Store bounds for click detection (both old and new location)
        this.touchToggleBounds = { x: touchBtnX, y: touchBtnY, w: touchBtnWidth, h: touchBtnHeight };
        this.uiButtons.touchToggle = this.touchToggleBounds;
        
        ctx.save();
        ctx.fillStyle = 'rgba(255, 0, 255, 0.15)';
        ctx.strokeStyle = '#ff00ff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(touchBtnX, touchBtnY, touchBtnWidth, touchBtnHeight, 6);
        ctx.fill();
        ctx.stroke();
        
        ctx.shadowColor = '#ff00ff';
        ctx.shadowBlur = 10;
        ctx.fillStyle = '#ff00ff';
        ctx.font = '14px "Courier New", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(touchText, CANVAS_WIDTH / 2, touchBtnY + 21);
        ctx.restore();
        
        // Controls reminder at bottom
        ctx.save();
        ctx.textAlign = 'center';
        ctx.font = '14px "Courier New", monospace';
        ctx.fillStyle = '#555555';
        ctx.fillText('WASD/Arrows = Move  |  Space = Shoot  |  1-5 = Use Items', CANVAS_WIDTH / 2, CANVAS_HEIGHT - 60);
        ctx.fillText('M = SFX  |  N = Music  |  K = Skills  |  F5 = Save  |  F9 = Load', CANVAS_WIDTH / 2, CANVAS_HEIGHT - 40);
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
        ctx.fillText('GAME OVER', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 80);
        ctx.restore();
        
        // Score
        ctx.save();
        ctx.shadowColor = COLORS.shipPrimary;
        ctx.shadowBlur = 15;
        ctx.fillStyle = '#ffffff';
        ctx.font = '24px "Courier New", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`Final Score: ${this.score.toLocaleString()}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 20);
        ctx.restore();
        
        // High score entry or celebration
        if (this.isEnteringInitials) {
            // New high score - subtle glow, no pulsing
            ctx.save();
            ctx.shadowColor = '#ffff00';
            ctx.shadowBlur = 10;
            ctx.fillStyle = '#ffff00';
            ctx.font = 'bold 24px "Courier New", monospace';
            ctx.fillText(`NEW HIGH SCORE! #${this.newHighScoreRank}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 25);
            ctx.restore();
            
            // Initials entry
            ctx.save();
            ctx.fillStyle = '#ffffff';
            ctx.font = '20px "Courier New", monospace';
            ctx.fillText('Enter your initials:', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 60);
            
            // Draw initials boxes - properly centered
            const boxWidth = 40;
            const boxGap = 10;
            const totalWidth = boxWidth * 3 + boxGap * 2; // 140px total
            const startX = CANVAS_WIDTH / 2 - totalWidth / 2;
            for (let i = 0; i < 3; i++) {
                const x = startX + i * (boxWidth + boxGap);
                const y = CANVAS_HEIGHT / 2 + 75;
                
                // Box background
                ctx.strokeStyle = i < this.initials.length ? '#00ffff' : '#444444';
                ctx.lineWidth = 2;
                ctx.strokeRect(x, y, boxWidth, 45);
                
                // Letter
                if (i < this.initials.length) {
                    ctx.shadowColor = '#00ffff';
                    ctx.shadowBlur = 10;
                    ctx.fillStyle = '#00ffff';
                    ctx.font = 'bold 32px "Courier New", monospace';
                    ctx.fillText(this.initials[i], x + boxWidth/2, y + 34);
                }
                
                // Cursor blink
                if (i === this.initials.length && Math.floor(this.time / 20) % 2 === 0) {
                    ctx.fillStyle = '#00ffff';
                    ctx.fillRect(x + 10, y + 35, boxWidth - 20, 3);
                }
            }
            ctx.restore();
            
            // Virtual keyboard for touch devices
            if (this.touchControls && this.touchControls.enabled) {
                this.drawInitialsKeyboard(ctx);
            } else {
                ctx.fillStyle = '#888888';
                ctx.font = '14px "Courier New", monospace';
                ctx.fillText('Type letters, press ENTER to confirm', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 145);
            }
        } else {
            // Show rank if just submitted
            const topScore = highScoreManager.getTopScore();
            if (this.score === topScore && topScore > 0) {
                ctx.save();
                ctx.shadowColor = '#ffd700';
                ctx.shadowBlur = 15;
                ctx.fillStyle = '#ffd700';
                ctx.font = 'bold 20px "Courier New", monospace';
                ctx.fillText('TOP SCORE!', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 25);
                ctx.restore();
            }
            
            // Restart prompt - indicate tap works too
            ctx.fillStyle = '#aaaaaa';
            ctx.font = '20px "Courier New", monospace';
            ctx.textAlign = 'center';
            if (this.touchControls && this.touchControls.enabled) {
                ctx.fillText('Tap to Restart', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 70);
            } else {
                ctx.fillText('Press ENTER to Restart', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 70);
            }
        }
    }
    
    // Draw virtual keyboard for initials entry on touch devices
    drawInitialsKeyboard(ctx) {
        const keyWidth = 36;
        const keyHeight = 40;
        const keyGap = 6;
        
        // QWERTY-style layout rows with backspace
        const rows = [
            ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
            ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', '⌫'],
            ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
        ];
        
        const totalWidth = rows[0].length * (keyWidth + keyGap) - keyGap;
        const startX = CANVAS_WIDTH / 2 - totalWidth / 2;
        const startY = CANVAS_HEIGHT / 2 + 150;
        
        // Store keyboard info for click detection
        this.initialsKeyboard = {
            rows: rows,
            keyWidth: keyWidth,
            keyHeight: keyHeight,
            keyGap: keyGap,
            startX: startX,
            startY: startY,
            totalWidth: totalWidth
        };
        
        ctx.save();
        
        // Draw each row
        for (let row = 0; row < rows.length; row++) {
            const rowKeys = rows[row];
            const rowWidth = rowKeys.length * (keyWidth + keyGap) - keyGap;
            const rowX = startX + (totalWidth - rowWidth) / 2;
            const rowY = startY + row * (keyHeight + keyGap);
            
            for (let col = 0; col < rowKeys.length; col++) {
                const key = rowKeys[col];
                const keyX = rowX + col * (keyWidth + keyGap);
                
                // Key background
                const isBackspace = key === '⌫';
                ctx.fillStyle = isBackspace ? 'rgba(255, 100, 100, 0.2)' : 'rgba(0, 255, 255, 0.15)';
                ctx.strokeStyle = isBackspace ? '#ff6666' : '#00ffff';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.roundRect(keyX, rowY, keyWidth, keyHeight, 4);
                ctx.fill();
                ctx.stroke();
                
                // Key letter
                ctx.fillStyle = isBackspace ? '#ff6666' : '#00ffff';
                ctx.font = 'bold 18px "Courier New", monospace';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(key, keyX + keyWidth / 2, rowY + keyHeight / 2);
            }
        }
        
        // Confirm button
        const confirmBtnWidth = 160;
        const confirmBtnHeight = 40;
        const confirmBtnX = CANVAS_WIDTH / 2 - confirmBtnWidth / 2;
        const confirmBtnY = startY + rows.length * (keyHeight + keyGap) + 10;
        
        this.uiButtons.confirmInitials = { x: confirmBtnX, y: confirmBtnY, w: confirmBtnWidth, h: confirmBtnHeight };
        
        const canConfirm = this.initials.length > 0;
        ctx.fillStyle = canConfirm ? 'rgba(0, 255, 0, 0.25)' : 'rgba(100, 100, 100, 0.15)';
        ctx.strokeStyle = canConfirm ? '#00ff00' : '#666666';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(confirmBtnX, confirmBtnY, confirmBtnWidth, confirmBtnHeight, 6);
        ctx.fill();
        ctx.stroke();
        
        ctx.fillStyle = canConfirm ? '#00ff00' : '#666666';
        ctx.font = 'bold 18px "Courier New", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('CONFIRM', confirmBtnX + confirmBtnWidth / 2, confirmBtnY + confirmBtnHeight / 2);
        
        ctx.restore();
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

    drawFloatingTexts(ctx) {
        if (!this.floatingTexts) return;
        
        this.floatingTexts.forEach(ft => {
            ctx.save();
            ctx.globalAlpha = ft.alpha;
            ctx.shadowColor = ft.color;
            ctx.shadowBlur = 10;
            ctx.fillStyle = ft.color;
            ctx.font = 'bold 16px "Courier New", monospace';
            ctx.textAlign = 'center';
            ctx.fillText(ft.text, ft.x, ft.y);
            ctx.restore();
        });
    }
    
    // Draw on-canvas inventory for touch users
    drawTouchInventory(ctx) {
        if (!this.touchControls || !this.touchControls.enabled) return;
        if (this.state !== 'playing') return;
        
        const slotSize = 40;
        const slotGap = 8;
        const startX = CANVAS_WIDTH / 2 - ((this.maxInventorySlots * (slotSize + slotGap)) - slotGap) / 2;
        const startY = 15;
        
        // Store slot positions for touch detection
        this.touchInventorySlots = [];
        
        for (let i = 0; i < this.maxInventorySlots; i++) {
            const x = startX + i * (slotSize + slotGap);
            const y = startY;
            
            this.touchInventorySlots.push({ x, y, width: slotSize, height: slotSize, index: i });
            
            ctx.save();
            
            // Slot background
            ctx.fillStyle = 'rgba(0, 0, 20, 0.7)';
            ctx.strokeStyle = '#333366';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.roundRect(x, y, slotSize, slotSize, 6);
            ctx.fill();
            ctx.stroke();
            
            // Item in slot
            if (i < this.inventory.length) {
                const item = this.inventory[i];
                const itemType = ITEM_TYPES[item.type];
                
                ctx.strokeStyle = itemType.color;
                ctx.shadowColor = itemType.color;
                ctx.shadowBlur = 8;
                ctx.stroke();
                
                ctx.fillStyle = itemType.color;
                ctx.font = 'bold 20px "Courier New", monospace';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(itemType.symbol, x + slotSize / 2, y + slotSize / 2);
            }
            
            // Slot number
            ctx.shadowBlur = 0;
            ctx.fillStyle = '#444466';
            ctx.font = '10px "Courier New", monospace';
            ctx.textAlign = 'right';
            ctx.textBaseline = 'bottom';
            ctx.fillText(i + 1, x + slotSize - 4, y + slotSize - 2);
            
            ctx.restore();
        }
    }

    drawComboIndicator(ctx) {
        if (this.comboCount < 2) return;
        
        const mult = this.getComboMultiplier();
        const isMaxed = mult >= COMBO_MULTIPLIER_CAP;
        const comboColor = isMaxed ? COLORS.comboMax : COLORS.combo;
        
        const alpha = this.comboDisplayTimer > 0 ? 1 : Math.max(0.4, this.comboTimer / COMBO_TIMEOUT);
        
        ctx.save();
        ctx.globalAlpha = alpha;
        
        // Position: top center of screen
        const x = CANVAS_WIDTH / 2;
        const y = 50;
        
        // Subtle glow
        ctx.shadowColor = comboColor;
        ctx.shadowBlur = 10;
        
        // Combo count - static size
        ctx.fillStyle = comboColor;
        ctx.font = 'bold 32px "Courier New", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${this.comboCount}x COMBO`, x, y);
        
        // Multiplier display
        ctx.shadowBlur = 5;
        ctx.font = 'bold 16px "Courier New", monospace';
        ctx.fillStyle = isMaxed ? '#ffffff' : comboColor;
        ctx.fillText(`SCORE x${mult.toFixed(1)}`, x, y + 28);
        
        // Timer bar
        const barWidth = 100;
        const barHeight = 4;
        const timePercent = this.comboTimer / COMBO_TIMEOUT;
        
        ctx.shadowBlur = 5;
        ctx.fillStyle = '#333333';
        ctx.fillRect(x - barWidth / 2, y + 45, barWidth, barHeight);
        
        ctx.fillStyle = comboColor;
        ctx.fillRect(x - barWidth / 2, y + 45, barWidth * timePercent, barHeight);
        
        ctx.restore();
        
        // Floating "+combo" text at kill location
        if (this.comboDisplayTimer > 50 && this.comboCount > 1) {
            const floatAlpha = (this.comboDisplayTimer - 50) / 10;
            const floatY = this.lastKillY - (60 - this.comboDisplayTimer) * 2;
            
            ctx.save();
            ctx.globalAlpha = floatAlpha;
            ctx.shadowColor = comboColor;
            ctx.shadowBlur = 10;
            ctx.fillStyle = comboColor;
            ctx.font = 'bold 18px "Courier New", monospace';
            ctx.textAlign = 'center';
            ctx.fillText(`+${this.comboCount}`, this.lastKillX, floatY);
            ctx.restore();
        }
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

// ============== UFO CLASS ==============
class UFO {
    constructor(x, y, direction, game) {
        this.x = x;
        this.y = y;
        this.game = game;
        this.direction = direction;
        this.vx = Math.cos(direction) * UFO_SPEED;
        this.vy = Math.sin(direction) * UFO_SPEED;
        
        // Sinusoidal movement
        this.baseY = y;
        this.waveOffset = Math.random() * Math.PI * 2;
        this.waveAmplitude = 50 + Math.random() * 30;
        this.waveFrequency = 0.02 + Math.random() * 0.01;
        this.travelDistance = 0;
        
        // Shooting
        this.shootTimer = UFO_SHOOT_INTERVAL / 2 + Math.random() * UFO_SHOOT_INTERVAL / 2;
        
        // Animation
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.rotationPhase = 0;
        this.lightPhase = 0;
        
        // State
        this.frozen = false;
        this.frozenVx = 0;
        this.frozenVy = 0;
        this.offScreen = false;
    }
    
    update() {
        if (this.frozen) {
            // Just update visuals when frozen
            this.pulsePhase += 0.05;
            this.lightPhase += 0.1;
            return;
        }
        
        // Move forward
        this.x += this.vx;
        this.travelDistance += Math.abs(this.vx);
        
        // Sinusoidal vertical movement
        const waveY = Math.sin(this.travelDistance * this.waveFrequency + this.waveOffset) * this.waveAmplitude;
        this.y = this.baseY + waveY;
        this.baseY += this.vy * 0.1; // Slight vertical drift
        
        // Animation
        this.pulsePhase += 0.05;
        this.rotationPhase += 0.03;
        this.lightPhase += 0.15;
        
        // Shooting logic - aim at player
        this.shootTimer--;
        if (this.shootTimer <= 0 && this.game.ship) {
            this.shoot();
            this.shootTimer = UFO_SHOOT_INTERVAL + (Math.random() - 0.5) * 30;
        }
        
        // Check if off-screen (with margin for despawn)
        const margin = 100;
        if (this.x < -margin || this.x > CANVAS_WIDTH + margin ||
            this.y < -margin || this.y > CANVAS_HEIGHT + margin) {
            // Give it some time to potentially come back
            if (this.travelDistance > CANVAS_WIDTH * 1.5) {
                this.offScreen = true;
            }
        }
    }
    
    shoot() {
        if (!this.game.ship) return;
        
        // Calculate angle to player with some inaccuracy
        const dx = this.game.ship.x - this.x;
        const dy = this.game.ship.y - this.y;
        const angle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 0.3; // Add inaccuracy
        
        this.game.enemyBullets.push(new EnemyBullet(this.x, this.y, angle, this.game));
        soundManager.playUfoLaser();
    }
    
    draw(ctx) {
        const pulse = 1 + Math.sin(this.pulsePhase) * 0.05;
        const frozen = this.frozen;
        
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.scale(pulse, pulse);
        
        const glowColor = frozen ? '#87ceeb' : COLORS.ufoGlow;
        const primaryColor = frozen ? '#aaddee' : COLORS.ufoPrimary;
        const secondaryColor = frozen ? '#cceeee' : COLORS.ufoSecondary;
        
        // Outer glow
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = 20;
        
        // === CLASSIC UFO SHAPE ===
        
        // Bottom dome (darker)
        const bottomGradient = ctx.createRadialGradient(0, 3, 0, 0, 3, UFO_SIZE * 0.6);
        bottomGradient.addColorStop(0, primaryColor + '60');
        bottomGradient.addColorStop(1, primaryColor + '20');
        
        ctx.fillStyle = bottomGradient;
        ctx.beginPath();
        ctx.ellipse(0, 3, UFO_SIZE * 0.5, UFO_SIZE * 0.25, 0, 0, Math.PI);
        ctx.fill();
        
        // Main saucer body
        const bodyGradient = ctx.createLinearGradient(0, -UFO_SIZE * 0.4, 0, UFO_SIZE * 0.2);
        bodyGradient.addColorStop(0, secondaryColor);
        bodyGradient.addColorStop(0.5, primaryColor);
        bodyGradient.addColorStop(1, primaryColor + '80');
        
        ctx.fillStyle = bodyGradient;
        ctx.strokeStyle = primaryColor;
        ctx.lineWidth = 2;
        
        ctx.beginPath();
        ctx.ellipse(0, 0, UFO_SIZE, UFO_SIZE * 0.35, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        // Top dome (cockpit)
        const domeGradient = ctx.createRadialGradient(0, -3, 0, 0, -3, UFO_SIZE * 0.45);
        domeGradient.addColorStop(0, '#ffffff');
        domeGradient.addColorStop(0.3, secondaryColor);
        domeGradient.addColorStop(1, primaryColor + '80');
        
        ctx.fillStyle = domeGradient;
        ctx.beginPath();
        ctx.ellipse(0, -3, UFO_SIZE * 0.4, UFO_SIZE * 0.35, 0, Math.PI, 0);
        ctx.fill();
        
        ctx.strokeStyle = primaryColor;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.ellipse(0, -3, UFO_SIZE * 0.4, UFO_SIZE * 0.35, 0, Math.PI, 0);
        ctx.stroke();
        
        // Rotating lights around the rim
        ctx.shadowBlur = 10;
        const numLights = 6;
        for (let i = 0; i < numLights; i++) {
            const lightAngle = (i / numLights) * Math.PI * 2 + this.lightPhase;
            const lightX = Math.cos(lightAngle) * UFO_SIZE * 0.85;
            const lightY = Math.sin(lightAngle) * UFO_SIZE * 0.3;
            
            // Alternating colors
            const lightOn = Math.sin(this.lightPhase * 2 + i * Math.PI / 3) > 0;
            ctx.fillStyle = lightOn ? '#ffffff' : primaryColor + '60';
            ctx.shadowColor = lightOn ? '#ffffff' : glowColor;
            
            ctx.beginPath();
            ctx.arc(lightX, lightY, 2, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Center bottom light (targeting beam hint)
        if (!frozen) {
            const beamPulse = (Math.sin(this.pulsePhase * 3) + 1) * 0.5;
            ctx.shadowColor = COLORS.ufoBullet;
            ctx.shadowBlur = 15 * beamPulse;
            ctx.fillStyle = COLORS.ufoBullet + Math.floor(beamPulse * 255).toString(16).padStart(2, '0');
            ctx.beginPath();
            ctx.arc(0, UFO_SIZE * 0.2, 3, 0, Math.PI * 2);
            ctx.fill();
        }
        
        ctx.restore();
        
        // Warning indicator if UFO is targeting
        if (!frozen && this.game.ship && this.shootTimer < 30) {
            const warningAlpha = (30 - this.shootTimer) / 30;
            ctx.save();
            ctx.strokeStyle = `rgba(255, 0, 0, ${warningAlpha * 0.5})`;
            ctx.lineWidth = 1;
            ctx.setLineDash([5, 5]);
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.game.ship.x, this.game.ship.y);
            ctx.stroke();
            ctx.restore();
        }
    }
}

// ============== ENEMY BULLET CLASS ==============
class EnemyBullet {
    constructor(x, y, angle, game) {
        this.x = x;
        this.y = y;
        this.game = game;
        this.vx = Math.cos(angle) * UFO_BULLET_SPEED;
        this.vy = Math.sin(angle) * UFO_BULLET_SPEED;
        this.lifetime = 120; // Longer than player bullets
        this.trailCounter = 0;
        this.pulsePhase = Math.random() * Math.PI * 2;
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.lifetime--;
        this.trailCounter++;
        this.pulsePhase += 0.2;
        
        // Spawn trail particles (green)
        if (this.trailCounter % 3 === 0) {
            this.game.trailParticles.push(new TrailParticle(
                this.x,
                this.y,
                COLORS.ufoBullet,
                2,
                8,
                -this.vx * 0.05,
                -this.vy * 0.05
            ));
        }
        
        // Wrap around screen
        if (this.x < 0) this.x = CANVAS_WIDTH;
        if (this.x > CANVAS_WIDTH) this.x = 0;
        if (this.y < 0) this.y = CANVAS_HEIGHT;
        if (this.y > CANVAS_HEIGHT) this.y = 0;
    }
    
    draw(ctx) {
        const pulse = 1 + Math.sin(this.pulsePhase) * 0.2;
        
        ctx.save();
        
        // Outer glow - green
        ctx.shadowColor = COLORS.ufoBullet;
        ctx.shadowBlur = 12;
        ctx.fillStyle = COLORS.ufoBullet;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 4 * pulse, 0, Math.PI * 2);
        ctx.fill();
        
        // Bright core
        ctx.shadowBlur = 5;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2 * pulse, 0, Math.PI * 2);
        ctx.fill();
        
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
        this.touchThrustAmount = 0;  // For gentler touch controls
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
            // Touch controls use gentler, variable thrust (50% of keyboard)
            const touchMod = this.touchThrustAmount > 0 ? this.touchThrustAmount * 0.5 : 1;
            this.vx += Math.cos(this.angle) * SHIP_THRUST * speedMultiplier * touchMod;
            this.vy += Math.sin(this.angle) * SHIP_THRUST * speedMultiplier * touchMod;
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
        
        // Play laser sound
        soundManager.playLaser();
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
        
        // Color palette matching reference image
        const bodyDark = '#8B4513';      // Dark brown
        const bodyMid = '#CD853F';       // Peru/copper
        const bodyLight = '#DEB887';     // Burlywood
        const wingTip = '#FF8C00';       // Dark orange
        const wingTipGlow = '#FFD700';   // Gold
        const crystalDark = '#006666';   // Dark teal
        const crystalMid = '#00CED1';    // Dark turquoise  
        const crystalLight = '#7FFFD4';  // Aquamarine
        const flameOrange = '#FF6600';
        const flameYellow = '#FFCC00';
        
        // === MAIN ENGINE FLAME (center, behind ship) ===
        if (this.thrustAmount > 0) {
            const flameLen = (25 + this.engineFlicker * 15) * this.thrustAmount;
            const flameWid = 8 * this.thrustAmount;
            
            // Main center flame
            const flameGrad = ctx.createLinearGradient(-S * 0.6 - flameLen, 0, -S * 0.6, 0);
            flameGrad.addColorStop(0, 'transparent');
            flameGrad.addColorStop(0.3, flameOrange + '60');
            flameGrad.addColorStop(0.6, flameOrange);
            flameGrad.addColorStop(0.85, flameYellow);
            flameGrad.addColorStop(1, '#FFFFFF');
            
            ctx.save();
            ctx.shadowColor = flameOrange;
            ctx.shadowBlur = 25;
            ctx.fillStyle = flameGrad;
            ctx.beginPath();
            ctx.moveTo(-S * 0.6, -flameWid);
            ctx.quadraticCurveTo(-S * 0.6 - flameLen * 0.7, 0, -S * 0.6 - flameLen, 0);
            ctx.quadraticCurveTo(-S * 0.6 - flameLen * 0.7, 0, -S * 0.6, flameWid);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
            
            // Wing tip flames (smaller)
            const tipFlameLen = (12 + this.engineFlicker * 8) * this.thrustAmount;
            const tipFlameWid = 4 * this.thrustAmount;
            
            [[-S * 0.75, -S * 0.65], [-S * 0.75, S * 0.65]].forEach(pos => {
                const tipGrad = ctx.createLinearGradient(pos[0] - tipFlameLen, pos[1], pos[0], pos[1]);
                tipGrad.addColorStop(0, 'transparent');
                tipGrad.addColorStop(0.4, flameOrange + '80');
                tipGrad.addColorStop(1, flameYellow);
                
                ctx.save();
                ctx.shadowColor = flameOrange;
                ctx.shadowBlur = 12;
                ctx.fillStyle = tipGrad;
                ctx.beginPath();
                ctx.moveTo(pos[0], pos[1] - tipFlameWid);
                ctx.lineTo(pos[0] - tipFlameLen, pos[1]);
                ctx.lineTo(pos[0], pos[1] + tipFlameWid);
                ctx.closePath();
                ctx.fill();
                ctx.restore();
            });
        }

        // === SWEPT WINGS (angular, copper colored) ===
        ctx.shadowColor = wingTip;
        ctx.shadowBlur = 8;
        
        // Top wing - main body
        const wingGrad1 = ctx.createLinearGradient(-S * 0.8, -S * 0.8, S * 0.2, 0);
        wingGrad1.addColorStop(0, bodyDark);
        wingGrad1.addColorStop(0.5, bodyMid);
        wingGrad1.addColorStop(1, bodyLight);
        
        ctx.fillStyle = wingGrad1;
        ctx.strokeStyle = bodyDark;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(S * 0.1, -S * 0.1);
        ctx.lineTo(-S * 0.2, -S * 0.25);
        ctx.lineTo(-S * 0.85, -S * 0.75);  // Wing tip back
        ctx.lineTo(-S * 0.65, -S * 0.55);
        ctx.lineTo(-S * 0.5, -S * 0.15);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        // Top wing orange tip
        ctx.fillStyle = wingTip;
        ctx.shadowColor = wingTipGlow;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.moveTo(-S * 0.7, -S * 0.6);
        ctx.lineTo(-S * 0.85, -S * 0.75);
        ctx.lineTo(-S * 0.75, -S * 0.65);
        ctx.closePath();
        ctx.fill();
        
        // Bottom wing - main body
        ctx.shadowBlur = 8;
        ctx.fillStyle = wingGrad1;
        ctx.strokeStyle = bodyDark;
        ctx.beginPath();
        ctx.moveTo(S * 0.1, S * 0.1);
        ctx.lineTo(-S * 0.2, S * 0.25);
        ctx.lineTo(-S * 0.85, S * 0.75);  // Wing tip back
        ctx.lineTo(-S * 0.65, S * 0.55);
        ctx.lineTo(-S * 0.5, S * 0.15);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        // Bottom wing orange tip
        ctx.fillStyle = wingTip;
        ctx.shadowColor = wingTipGlow;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.moveTo(-S * 0.7, S * 0.6);
        ctx.lineTo(-S * 0.85, S * 0.75);
        ctx.lineTo(-S * 0.75, S * 0.65);
        ctx.closePath();
        ctx.fill();

        // === MAIN FUSELAGE (copper/bronze angular body) ===
        ctx.shadowColor = bodyMid;
        ctx.shadowBlur = 10;
        
        const bodyGrad = ctx.createLinearGradient(-S * 0.5, -S * 0.3, S * 0.5, S * 0.3);
        bodyGrad.addColorStop(0, bodyDark);
        bodyGrad.addColorStop(0.3, bodyMid);
        bodyGrad.addColorStop(0.7, bodyLight);
        bodyGrad.addColorStop(1, bodyMid);
        
        ctx.fillStyle = bodyGrad;
        ctx.strokeStyle = bodyDark;
        ctx.lineWidth = 1.5;
        
        ctx.beginPath();
        // Pointed nose
        ctx.moveTo(S * 1.1, 0);
        // Top edge
        ctx.lineTo(S * 0.4, -S * 0.2);
        ctx.lineTo(-S * 0.1, -S * 0.25);
        ctx.lineTo(-S * 0.5, -S * 0.2);
        // Back (engine area)
        ctx.lineTo(-S * 0.6, -S * 0.1);
        ctx.lineTo(-S * 0.6, S * 0.1);
        // Bottom edge
        ctx.lineTo(-S * 0.5, S * 0.2);
        ctx.lineTo(-S * 0.1, S * 0.25);
        ctx.lineTo(S * 0.4, S * 0.2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        // Body detail lines (angular panels)
        ctx.strokeStyle = bodyDark + '80';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(S * 0.3, -S * 0.18);
        ctx.lineTo(S * 0.3, S * 0.18);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-S * 0.2, -S * 0.22);
        ctx.lineTo(-S * 0.2, S * 0.22);
        ctx.stroke();

        // === CRYSTAL COCKPIT (large, faceted, cyan) ===
        ctx.shadowColor = crystalLight;
        ctx.shadowBlur = 15;
        
        // Main crystal shape
        const crystalGrad = ctx.createLinearGradient(S * 0.8, -S * 0.15, S * 0.2, S * 0.15);
        crystalGrad.addColorStop(0, crystalLight);
        crystalGrad.addColorStop(0.3, crystalMid);
        crystalGrad.addColorStop(0.7, crystalDark);
        crystalGrad.addColorStop(1, '#004444');
        
        ctx.fillStyle = crystalGrad;
        ctx.strokeStyle = crystalMid;
        ctx.lineWidth = 1.5;
        
        // Diamond/crystal shape cockpit
        ctx.beginPath();
        ctx.moveTo(S * 0.9, 0);           // Front point
        ctx.lineTo(S * 0.55, -S * 0.18);  // Top left
        ctx.lineTo(S * 0.2, -S * 0.12);   // Back top
        ctx.lineTo(S * 0.2, S * 0.12);    // Back bottom
        ctx.lineTo(S * 0.55, S * 0.18);   // Bottom left
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        // Crystal facet lines (inner detail)
        ctx.strokeStyle = crystalLight + '60';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(S * 0.9, 0);
        ctx.lineTo(S * 0.4, 0);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(S * 0.55, -S * 0.18);
        ctx.lineTo(S * 0.45, 0);
        ctx.lineTo(S * 0.55, S * 0.18);
        ctx.stroke();
        
        // Crystal shine highlight
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.beginPath();
        ctx.moveTo(S * 0.85, -S * 0.02);
        ctx.lineTo(S * 0.6, -S * 0.12);
        ctx.lineTo(S * 0.5, -S * 0.08);
        ctx.lineTo(S * 0.7, 0);
        ctx.closePath();
        ctx.fill();

        // === ENGINE HOUSING (back center) ===
        ctx.shadowBlur = 5;
        ctx.fillStyle = bodyDark;
        ctx.strokeStyle = '#5C3317';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(-S * 0.5, -S * 0.12);
        ctx.lineTo(-S * 0.65, -S * 0.08);
        ctx.lineTo(-S * 0.65, S * 0.08);
        ctx.lineTo(-S * 0.5, S * 0.12);
        ctx.closePath();
        ctx.fill();
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

// ============== BOSS CLASS ==============
class Boss {
    constructor(game) {
        this.game = game;
        this.x = CANVAS_WIDTH / 2;
        this.y = -BOSS_SIZE * 2;
        
        this.tier = Math.ceil(game.level / 5);
        this.maxHealth = BOSS_BASE_HEALTH + (this.tier - 1) * BOSS_HEALTH_PER_TIER;
        this.health = this.maxHealth;
        
        this.targetY = 100;
        this.vx = 0;
        this.vy = 0;
        this.movePhase = Math.random() * Math.PI * 2;
        this.entering = true;
        
        this.rotation = 0;
        this.pulsePhase = 0;
        this.coreRotation = 0;
        this.damageFlash = 0;
        
        this.shootTimer = 120;
        this.attackPattern = 0;
        this.burstCount = 0;
        
        this.defeated = false;
        this.deathAnimation = 0;
        
        soundManager.playBossAppear();
    }
    
    update() {
        if (this.defeated) {
            this.updateDeathAnimation();
            return;
        }
        
        if (this.entering) {
            this.y += 2;
            if (this.y >= this.targetY) {
                this.y = this.targetY;
                this.entering = false;
            }
            this.pulsePhase += 0.1;
            this.coreRotation += 0.02;
            return;
        }
        
        this.movePhase += 0.015;
        const moveX = Math.sin(this.movePhase) * 200;
        const moveY = Math.sin(this.movePhase * 2) * 30;
        
        this.x = CANVAS_WIDTH / 2 + moveX;
        this.y = this.targetY + moveY;
        
        this.rotation += 0.01;
        this.pulsePhase += 0.05;
        this.coreRotation += 0.03;
        
        if (this.damageFlash > 0) this.damageFlash -= 0.1;
        
        this.updateAttacks();
    }
    
    updateAttacks() {
        if (this.entering || !this.game.ship) return;
        
        this.shootTimer--;
        
        if (this.shootTimer <= 0) {
            switch (this.attackPattern) {
                case 0: this.attackSpiral(); break;
                case 1: this.attackSpread(); break;
                case 2: this.attackTargeted(); break;
                case 3: this.attackRing(); break;
            }
        }
    }
    
    attackSpiral() {
        this.burstCount++;
        const angle = this.burstCount * 0.3 + Math.PI / 2;
        this.fireBullet(angle);
        soundManager.playBossLaser();
        
        if (this.burstCount >= 20) {
            this.burstCount = 0;
            this.attackPattern = (this.attackPattern + 1) % 4;
            this.shootTimer = 90;
        } else {
            this.shootTimer = 4;
        }
    }
    
    attackSpread() {
        const spreadCount = 5 + this.tier;
        const spreadAngle = Math.PI / 3;
        const startAngle = Math.PI / 2 - spreadAngle / 2;
        
        for (let i = 0; i < spreadCount; i++) {
            const angle = startAngle + (i / (spreadCount - 1)) * spreadAngle;
            this.fireBullet(angle);
        }
        soundManager.playBossLaser();
        
        this.burstCount++;
        if (this.burstCount >= 3) {
            this.burstCount = 0;
            this.attackPattern = (this.attackPattern + 1) % 4;
            this.shootTimer = 90;
        } else {
            this.shootTimer = 30;
        }
    }
    
    attackTargeted() {
        if (!this.game.ship) return;
        
        const dx = this.game.ship.x - this.x;
        const dy = this.game.ship.y - this.y;
        const angle = Math.atan2(dy, dx);
        
        for (let i = -1; i <= 1; i++) {
            this.fireBullet(angle + i * 0.1, BOSS_BULLET_SPEED * 1.3);
        }
        soundManager.playBossLaser();
        
        this.burstCount++;
        if (this.burstCount >= 4) {
            this.burstCount = 0;
            this.attackPattern = (this.attackPattern + 1) % 4;
            this.shootTimer = 90;
        } else {
            this.shootTimer = 20;
        }
    }
    
    attackRing() {
        const bulletCount = 12 + this.tier * 2;
        for (let i = 0; i < bulletCount; i++) {
            const angle = (i / bulletCount) * Math.PI * 2;
            this.fireBullet(angle);
        }
        soundManager.playBossLaser();
        
        this.burstCount++;
        if (this.burstCount >= 2) {
            this.burstCount = 0;
            this.attackPattern = (this.attackPattern + 1) % 4;
            this.shootTimer = 120;
        } else {
            this.shootTimer = 40;
        }
    }
    
    fireBullet(angle, speed = BOSS_BULLET_SPEED) {
        this.game.enemyBullets.push(new BossBullet(this.x, this.y, angle, speed, this.game));
    }
    
    takeDamage() {
        if (this.entering || this.defeated) return false;
        
        this.health--;
        this.damageFlash = 1;
        this.game.screenShake.trigger(8);
        soundManager.playBossHit();
        
        if (this.health <= 0) {
            this.defeat();
            return true;
        }
        return false;
    }
    
    defeat() {
        this.defeated = true;
        this.deathAnimation = 0;
        this.game.addScore(BOSS_POINTS);
        this.game.screenShake.trigger(40);
        soundManager.playBossDefeat();
        
        // Award skill points for boss defeat
        this.game.awardBossSkillPoints();
    }
    
    updateDeathAnimation() {
        this.deathAnimation++;
        
        if (this.deathAnimation % 8 === 0 && this.deathAnimation < 80) {
            const offsetX = (Math.random() - 0.5) * BOSS_SIZE * 1.5;
            const offsetY = (Math.random() - 0.5) * BOSS_SIZE * 1.5;
            this.game.createExplosion(this.x + offsetX, this.y + offsetY, 15);
        }
        
        if (this.deathAnimation === 80) {
            this.game.createExplosion(this.x, this.y, 50);
            this.game.triggerFlash('#ff8800', 0.6);
            
            for (let i = 0; i < 3; i++) {
                const types = Object.keys(POWERUP_TYPES);
                const randomType = types[Math.floor(Math.random() * types.length)];
                const ox = (Math.random() - 0.5) * 60;
                const oy = (Math.random() - 0.5) * 60;
                this.game.powerUps.push(new PowerUp(this.x + ox, this.y + oy, randomType, this.game));
            }
            
            const itemTypes = Object.keys(ITEM_TYPES);
            for (let i = 0; i < 2; i++) {
                const randomItem = itemTypes[Math.floor(Math.random() * itemTypes.length)];
                const ox = (Math.random() - 0.5) * 40;
                const oy = (Math.random() - 0.5) * 40;
                this.game.items.push(new Item(this.x + ox, this.y + oy, randomItem, this.game));
            }
        }
    }
    
    isFinished() {
        return this.defeated && this.deathAnimation > 100;
    }
    
    draw(ctx) {
        if (this.defeated && this.deathAnimation > 80) return;
        
        const pulse = 1 + Math.sin(this.pulsePhase) * 0.05;
        const flash = this.damageFlash;
        
        ctx.save();
        ctx.translate(this.x, this.y);
        
        if (!this.entering && !this.defeated) {
            this.drawHealthBar(ctx);
        }
        
        ctx.scale(pulse, pulse);
        
        const glowColor = flash > 0 ? '#ffffff' : '#ff0066';
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = 30 + Math.sin(this.pulsePhase * 2) * 10;
        
        ctx.save();
        ctx.rotate(this.rotation);
        
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, BOSS_SIZE);
        if (flash > 0) {
            gradient.addColorStop(0, '#ffffff');
            gradient.addColorStop(0.5, '#ff6688');
            gradient.addColorStop(1, '#cc0044');
        } else {
            gradient.addColorStop(0, '#660033');
            gradient.addColorStop(0.5, '#990044');
            gradient.addColorStop(1, '#330022');
        }
        
        ctx.fillStyle = gradient;
        ctx.strokeStyle = flash > 0 ? '#ffffff' : '#ff0066';
        ctx.lineWidth = 3;
        
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
            const x = Math.cos(angle) * BOSS_SIZE;
            const y = Math.sin(angle) * BOSS_SIZE;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        ctx.strokeStyle = '#ff3366';
        ctx.lineWidth = 2;
        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(Math.cos(angle) * BOSS_SIZE * 0.8, Math.sin(angle) * BOSS_SIZE * 0.8);
            ctx.stroke();
        }
        
        ctx.restore();
        
        ctx.save();
        ctx.rotate(-this.coreRotation * 2);
        
        const coreGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, BOSS_SIZE * 0.4);
        coreGradient.addColorStop(0, '#ff88aa');
        coreGradient.addColorStop(0.5, '#ff0066');
        coreGradient.addColorStop(1, '#880033');
        
        ctx.fillStyle = coreGradient;
        ctx.beginPath();
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const r = BOSS_SIZE * (i % 2 === 0 ? 0.4 : 0.25);
            const x = Math.cos(angle) * r;
            const y = Math.sin(angle) * r;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
        
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.arc(0, 0, BOSS_SIZE * 0.12, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
        
        for (let i = 0; i < 4; i++) {
            const orbitAngle = this.rotation * 3 + (i / 4) * Math.PI * 2;
            const orbitRadius = BOSS_SIZE * 0.7;
            const orbX = Math.cos(orbitAngle) * orbitRadius;
            const orbY = Math.sin(orbitAngle) * orbitRadius;
            
            ctx.fillStyle = '#ff3366';
            ctx.shadowColor = '#ff0066';
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(orbX, orbY, 5, 0, Math.PI * 2);
            ctx.fill();
        }
        
        ctx.restore();
    }
    
    drawHealthBar(ctx) {
        const barWidth = BOSS_SIZE * 2;
        const barHeight = 8;
        const barY = -BOSS_SIZE - 25;
        
        ctx.fillStyle = '#330022';
        ctx.fillRect(-barWidth / 2, barY, barWidth, barHeight);
        
        const healthPercent = this.health / this.maxHealth;
        const healthColor = healthPercent > 0.5 ? '#ff0066' : (healthPercent > 0.25 ? '#ff6600' : '#ff0000');
        ctx.fillStyle = healthColor;
        ctx.shadowColor = healthColor;
        ctx.shadowBlur = 10;
        ctx.fillRect(-barWidth / 2, barY, barWidth * healthPercent, barHeight);
        
        ctx.strokeStyle = '#ff3366';
        ctx.lineWidth = 2;
        ctx.strokeRect(-barWidth / 2, barY, barWidth, barHeight);
        
        ctx.fillStyle = '#ff3366';
        ctx.font = 'bold 14px "Courier New", monospace';
        ctx.textAlign = 'center';
        ctx.shadowBlur = 5;
        ctx.fillText(`MOTHERSHIP MK${this.tier}`, 0, barY - 8);
    }
}

// ============== BOSS BULLET CLASS ==============
class BossBullet {
    constructor(x, y, angle, speed, game) {
        this.x = x;
        this.y = y;
        this.game = game;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.lifetime = 180;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.trailCounter = 0;
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.lifetime--;
        this.pulsePhase += 0.2;
        this.trailCounter++;
        
        if (this.trailCounter % 4 === 0) {
            this.game.trailParticles.push(new TrailParticle(
                this.x, this.y, '#ff0066', 2, 10, -this.vx * 0.05, -this.vy * 0.05
            ));
        }
        
        if (this.x < 0) this.x = CANVAS_WIDTH;
        if (this.x > CANVAS_WIDTH) this.x = 0;
        if (this.y < 0) this.y = CANVAS_HEIGHT;
        if (this.y > CANVAS_HEIGHT) this.y = 0;
    }
    
    draw(ctx) {
        const pulse = 1 + Math.sin(this.pulsePhase) * 0.3;
        
        ctx.save();
        
        ctx.shadowColor = '#ff0066';
        ctx.shadowBlur = 15;
        ctx.fillStyle = '#ff0066';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 5 * pulse, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.shadowBlur = 5;
        ctx.fillStyle = '#ffaacc';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2.5 * pulse, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    }
}

// ============== BOSS SOUND METHODS ==============
SoundManager.prototype.playBossAppear = function() {
    if (!this.initialized) return;
    this.resume();
    
    const now = this.audioContext.currentTime;
    
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(60, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 1);
    
    const filter = this.audioContext.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(200, now);
    filter.frequency.exponentialRampToValueAtTime(800, now + 1);
    
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.3, now + 0.5);
    gain.gain.linearRampToValueAtTime(0.1, now + 1);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 1.5);
    
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    
    osc.start(now);
    osc.stop(now + 1.5);
    
    const klaxon = this.audioContext.createOscillator();
    const klaxonGain = this.audioContext.createGain();
    
    klaxon.type = 'square';
    klaxon.frequency.setValueAtTime(440, now);
    klaxon.frequency.setValueAtTime(330, now + 0.3);
    klaxon.frequency.setValueAtTime(440, now + 0.6);
    klaxon.frequency.setValueAtTime(330, now + 0.9);
    
    klaxonGain.gain.setValueAtTime(0.15, now);
    klaxonGain.gain.setValueAtTime(0.05, now + 0.25);
    klaxonGain.gain.setValueAtTime(0.15, now + 0.3);
    klaxonGain.gain.setValueAtTime(0.05, now + 0.55);
    klaxonGain.gain.setValueAtTime(0.15, now + 0.6);
    klaxonGain.gain.setValueAtTime(0.05, now + 0.85);
    klaxonGain.gain.setValueAtTime(0.15, now + 0.9);
    klaxonGain.gain.exponentialRampToValueAtTime(0.01, now + 1.2);
    
    klaxon.connect(klaxonGain);
    klaxonGain.connect(this.masterGain);
    
    klaxon.start(now);
    klaxon.stop(now + 1.2);
};

SoundManager.prototype.playBossLaser = function() {
    if (!this.initialized) return;
    this.resume();
    
    const now = this.audioContext.currentTime;
    
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    
    osc.type = 'square';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.1);
    
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
    
    osc.connect(gain);
    gain.connect(this.masterGain);
    
    osc.start(now);
    osc.stop(now + 0.1);
};

SoundManager.prototype.playBossHit = function() {
    if (!this.initialized) return;
    this.resume();
    
    const now = this.audioContext.currentTime;
    
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(50, now + 0.2);
    
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
    
    osc.connect(gain);
    gain.connect(this.masterGain);
    
    osc.start(now);
    osc.stop(now + 0.2);
    
    const clang = this.audioContext.createOscillator();
    const clangGain = this.audioContext.createGain();
    
    clang.type = 'triangle';
    clang.frequency.setValueAtTime(800, now);
    clang.frequency.exponentialRampToValueAtTime(400, now + 0.1);
    
    clangGain.gain.setValueAtTime(0.15, now);
    clangGain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
    
    clang.connect(clangGain);
    clangGain.connect(this.masterGain);
    
    clang.start(now);
    clang.stop(now + 0.15);
};

SoundManager.prototype.playBossDefeat = function() {
    if (!this.initialized) return;
    this.resume();
    
    const now = this.audioContext.currentTime;
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => this.playExplosion(3), i * 150);
    }
    
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, i) => {
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        
        osc.type = 'square';
        osc.frequency.value = freq;
        
        const startTime = now + 0.8 + i * 0.12;
        
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.2, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);
        
        osc.connect(gain);
        gain.connect(this.masterGain);
        
        osc.start(startTime);
        osc.stop(startTime + 0.3);
    });
};

// === SHIP DEATH SOUND ===
// Dramatic cascading explosions with deep bass
SoundManager.prototype.playShipDeath = function() {
    if (!this.initialized) return;
    this.resume();
    
    const now = this.audioContext.currentTime;
    
    // Deep bass impact
    const bass = this.audioContext.createOscillator();
    const bassGain = this.audioContext.createGain();
    
    bass.type = 'sine';
    bass.frequency.setValueAtTime(80, now);
    bass.frequency.exponentialRampToValueAtTime(20, now + 0.8);
    
    bassGain.gain.setValueAtTime(0.5, now);
    bassGain.gain.exponentialRampToValueAtTime(0.01, now + 0.8);
    
    bass.connect(bassGain);
    bassGain.connect(this.masterGain);
    
    bass.start(now);
    bass.stop(now + 0.8);
    
    // Cascading explosions
    for (let i = 0; i < 4; i++) {
        const time = now + i * 0.12;
        
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(200 - i * 30, time);
        osc.frequency.exponentialRampToValueAtTime(40, time + 0.2);
        
        const filter = this.audioContext.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1500 - i * 200, time);
        filter.frequency.exponentialRampToValueAtTime(100, time + 0.25);
        
        gain.gain.setValueAtTime(0.25 - i * 0.04, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + 0.25);
        
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);
        
        osc.start(time);
        osc.stop(time + 0.25);
    }
    
    // Metal shatter noise
    const bufferSize = this.audioContext.sampleRate * 0.5;
    const noiseBuffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
    }
    
    const noise = this.audioContext.createBufferSource();
    noise.buffer = noiseBuffer;
    
    const noiseFilter = this.audioContext.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(2000, now);
    noiseFilter.frequency.exponentialRampToValueAtTime(500, now + 0.5);
    noiseFilter.Q.value = 3;
    
    const noiseGain = this.audioContext.createGain();
    noiseGain.gain.setValueAtTime(0.2, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
    
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.masterGain);
    
    noise.start(now);
    noise.stop(now + 0.5);
};

// === COMBO MILESTONE SOUND ===
// Celebratory ascending tone for combo milestones
SoundManager.prototype.playComboMilestone = function(comboCount) {
    if (!this.initialized) return;
    this.resume();
    
    const now = this.audioContext.currentTime;
    
    // Higher pitch for bigger combos
    const baseFreq = 400 + Math.min(comboCount * 20, 400);
    
    // Quick ascending notes
    const notes = [baseFreq, baseFreq * 1.25, baseFreq * 1.5];
    
    notes.forEach((freq, i) => {
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        
        osc.type = 'square';
        osc.frequency.value = freq;
        
        const startTime = now + i * 0.05;
        
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.15, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.12);
        
        osc.connect(gain);
        gain.connect(this.masterGain);
        
        osc.start(startTime);
        osc.stop(startTime + 0.12);
    });
    
    // Add sparkle for big combos
    if (comboCount >= 10) {
        const sparkle = this.audioContext.createOscillator();
        const sparkleGain = this.audioContext.createGain();
        
        sparkle.type = 'sine';
        sparkle.frequency.setValueAtTime(2000, now);
        sparkle.frequency.exponentialRampToValueAtTime(3000, now + 0.2);
        
        sparkleGain.gain.setValueAtTime(0.1, now);
        sparkleGain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        
        sparkle.connect(sparkleGain);
        sparkleGain.connect(this.masterGain);
        
        sparkle.start(now);
        sparkle.stop(now + 0.2);
    }
};

// === COMBO BREAK SOUND ===
// Descending tone when combo ends
SoundManager.prototype.playComboBreak = function() {
    if (!this.initialized) return;
    this.resume();
    
    const now = this.audioContext.currentTime;
    
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(100, now + 0.2);
    
    const filter = this.audioContext.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, now);
    filter.frequency.exponentialRampToValueAtTime(200, now + 0.2);
    
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
    
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    
    osc.start(now);
    osc.stop(now + 0.2);
};

// === SAVE GAME SOUND ===
// Ascending confirmation beeps
SoundManager.prototype.playSaveSound = function() {
    if (!this.initialized) return;
    this.resume();
    
    const now = this.audioContext.currentTime;
    
    const notes = [440, 554.37, 659.25]; // A4, C#5, E5 (A major chord)
    notes.forEach((freq, i) => {
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        
        osc.type = 'sine';
        osc.frequency.value = freq;
        
        const startTime = now + i * 0.08;
        
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.15, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.15);
        
        osc.connect(gain);
        gain.connect(this.masterGain);
        
        osc.start(startTime);
        osc.stop(startTime + 0.15);
    });
};

// === LOAD GAME SOUND ===
// Tech-y loading sound with sweep
SoundManager.prototype.playLoadSound = function() {
    if (!this.initialized) return;
    this.resume();
    
    const now = this.audioContext.currentTime;
    
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(200, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.15);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.3);
    
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.15, now + 0.05);
    gain.gain.setValueAtTime(0.15, now + 0.2);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
    
    osc.connect(gain);
    gain.connect(this.masterGain);
    
    osc.start(now);
    osc.stop(now + 0.35);
    
    // Confirmation blip
    const blip = this.audioContext.createOscillator();
    const blipGain = this.audioContext.createGain();
    
    blip.type = 'square';
    blip.frequency.value = 880;
    
    blipGain.gain.setValueAtTime(0, now + 0.3);
    blipGain.gain.linearRampToValueAtTime(0.1, now + 0.32);
    blipGain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
    
    blip.connect(blipGain);
    blipGain.connect(this.masterGain);
    
    blip.start(now + 0.3);
    blip.stop(now + 0.4);
};

// Initialize game
window.addEventListener('DOMContentLoaded', () => {
    new Game();
});

