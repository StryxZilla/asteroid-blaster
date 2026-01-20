# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a classic Asteroids arcade game built with vanilla JavaScript and HTML5 Canvas. It runs entirely in the browser with no external dependencies.

## Running the Game

Open `index.html` in any web browser. No build process or server required.

## Architecture

The codebase consists of two files:
- **index.html**: Contains the canvas element, UI overlays, and CSS styling
- **game.js**: All game logic (~1120 lines) using ES6 classes

### Core Classes

- **Game**: Main controller handling initialization, game loop (60 FPS), state management, and collision detection
- **Ship**: Player vessel with rotation, thrust, shooting, and power-up state management
- **Asteroid**: Destructible rocks that break into smaller pieces (large → medium → small)
- **Bullet**: Projectiles with frame-based lifetime
- **Particle**: Visual explosion effects
- **PowerUp**: Instant-effect collectibles that spawn in space (shield, rapid fire, triple shot, speed boost, extra life)
- **Item**: Inventory-stored collectibles with on-demand activation (repair kit, bomb, freeze, magnet, score boost)

### Key Systems

1. **Power-Up System**: Spawns with 30% chance when asteroids are destroyed. Provides temporary buffs (5s duration except extra life).

2. **Inventory System**: 5 slots for storing Item drops. Items spawn with 25% chance from asteroids. Use keys 1-5 to activate stored items.

3. **Collision Detection**: Circle-based distance checking between all game entities.

4. **Screen Wrapping**: All objects wrap around canvas edges (800x600).

## Configuration

Game constants are defined at the top of `game.js` for easy tuning:
- Canvas dimensions, FPS, ship/asteroid sizes
- Power-up spawn rates and durations
- Item spawn chances and rarity weights
- Scoring values per asteroid size

## Controls

- Arrow keys / WASD: Rotate and thrust
- SPACE: Shoot
- 1-5: Use inventory items
- ENTER: Start/restart game
