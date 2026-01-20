# Asteroids Game

A classic Asteroids arcade game built with HTML5 Canvas and JavaScript.

## Features

- Classic asteroids gameplay with ship movement, shooting, and asteroid destruction
- **Power-up system** with 5 different collectible power-ups
- Progressive difficulty with increasing levels
- Score tracking and lives system
- Particle effects for explosions
- Smooth controls with keyboard support
- Asteroids break into smaller pieces when hit
- Screen wrapping for all game objects
- Active power-up indicators with countdown timers

## How to Play

1. Open `index.html` in a web browser
2. Press **ENTER** to start the game
3. Use the controls to navigate and destroy asteroids

### Controls

- **Arrow Keys** or **WASD**: Move and rotate the ship
  - Up/W: Thrust forward
  - Left/A: Rotate left
  - Right/D: Rotate right
- **SPACE**: Shoot
- **ENTER**: Start game / Restart after game over

## Game Rules

- Destroy all asteroids to advance to the next level
- Large asteroids break into 2 medium asteroids when hit
- Medium asteroids break into 2 small asteroids when hit
- Small asteroids are destroyed completely when hit
- Avoid colliding with asteroids or you lose a life
- Game ends when you run out of lives (starts with 3)

## Scoring

- Small asteroid: 60 points
- Medium asteroid: 40 points
- Large asteroid: 20 points

## Power-Ups

Power-ups have a 30% chance to spawn when you destroy an asteroid. They drift slowly in space and last for 10 seconds before disappearing. Collect them by flying into them!

### Available Power-Ups

- **Shield** (Cyan - S): Protects your ship from one asteroid collision. Asteroids are destroyed on impact instead of destroying your ship. Lasts 5 seconds.

- **Rapid Fire** (Magenta - R): Increases your fire rate by 3x, allowing you to shoot much faster. Lasts 5 seconds.

- **Triple Shot** (Yellow - T): Shoots 3 bullets at once in a spread pattern. Great for covering more area. Lasts 5 seconds.

- **Speed Boost** (Green - V): Doubles your movement and rotation speed for faster navigation. Lasts 5 seconds.

- **Extra Life** (Red - +): Instantly grants an additional life. This is permanent and doesn't expire.

### Power-Up Mechanics

- Power-ups pulse and glow in their respective colors
- Active power-ups are displayed in the top-left corner with countdown timers
- Power-ups will flash when they're about to expire (last 2 seconds)
- You can have multiple power-ups active at the same time

## Technical Details

- Pure vanilla JavaScript (no dependencies)
- HTML5 Canvas for rendering
- 60 FPS game loop
- Object-oriented design with classes for Ship, Asteroid, Bullet, Particle, and PowerUp
- Collision detection using circle-based physics
- Dynamic power-up system with timers and visual effects

## File Structure

- `index.html` - Main HTML file with canvas and UI
- `game.js` - Complete game logic and classes

Enjoy playing Asteroids!
