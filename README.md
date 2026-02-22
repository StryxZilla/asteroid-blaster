# Asteroid Blaster (Neon Edition)

Arcade-style Asteroids built with vanilla JavaScript + HTML5 Canvas.

## Requirements

- Any modern browser (Chrome/Edge/Firefox)
- Optional: Python 3 (for local web server)

## Run Locally (Windows)

### Option 1: Open directly

1. Open `index.html` in your browser.
2. Press **Enter** to start.

### Option 2 (recommended): local server

```powershell
cd C:\Users\Stryx\.openclaw\workspace\asteroid-blaster
python -m http.server 8080
```

Then open: `http://localhost:8080`

## Controls

### Keyboard

- **Arrow Left / A**: Rotate left
- **Arrow Right / D**: Rotate right
- **Arrow Up / W**: Thrust
- **Space**: Shoot
- **1-5**: Use inventory item in matching slot
- **Enter**: Start / restart
- **Esc**: Pause, close help/menu layers
- **P**: Pause / resume
- **R** (while paused): Restart run
- **T** (while paused): Cycle touch controls mode
- **K**: Open skill tree (start screen or between waves)
- **L**: Open load menu (start screen)
- **F5**: Quick save (in game)
- **F9**: Open load menu
- **M**: Toggle SFX mute
- **N**: Toggle music mute
- **H**: Toggle help overlay

### Touch

- Left side virtual stick: steer/thrust
- Right side fire button: auto-fire while held
- Top-center pause button: pause/resume
- Tap inventory slot: use item

## Gameplay Notes

- Clear all asteroids to advance waves.
- Asteroids split from large -> medium -> small.
- Avoid collisions; you start with 3 lives.
- Power-ups and inventory items drop from destroyed asteroids.

## Recent Polish Improvements

- Added **auto-pause on tab/window focus loss** (prevents unfair deaths when alt-tabbing).
- Added **input reset on blur/visibility change** (fixes stuck movement/shooting after context switch).
- Added **arrow/space default prevention** to avoid browser/page scrolling during gameplay.

## Project Structure

- `index.html` - page layout and UI shell
- `game.js` - gameplay, rendering, audio, input, progression systems
- `manifest.json` - PWA metadata

## Build/Test

No build step required (pure static app).

Quick verification checklist:

1. Launch game from browser.
2. Start with **Enter**.
3. Move, shoot, and pause/unpause.
4. Alt-tab away and back: game should pause and controls should not stick.
5. Confirm no page scroll when pressing arrow keys/space.
