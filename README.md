# Asteroids Game

A classic Asteroids arcade game built with HTML5 Canvas and JavaScript.

## Features

- Classic asteroids gameplay with ship movement, shooting, and asteroid destruction
- Progressive difficulty with increasing levels
- Score tracking and lives system
- Particle effects for explosions
- Smooth controls with keyboard support
- Asteroids break into smaller pieces when hit
- Screen wrapping for all game objects

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

## Technical Details

- Pure vanilla JavaScript (no dependencies)
- HTML5 Canvas for rendering
- 60 FPS game loop
- Object-oriented design with classes for Ship, Asteroid, Bullet, and Particle
- Collision detection using circle-based physics

## File Structure

- `index.html` - Main HTML file with canvas and UI
- `game.js` - Complete game logic and classes

Enjoy playing Asteroids!
