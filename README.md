# Demon Slayer 2D RPG Web Game

This is a lightweight 2D action RPG browser game inspired by Demon Slayer anime. It is built using pure HTML, CSS, and JavaScript without any frameworks, and runs entirely from static files. It is optimized for deployment on GitHub Pages.

## Features

- Pixel-art style with retro fonts and UI
- Player movement with W/A/S/D keys
- Attack with J key, special skills with K and L keys
- Interact with NPCs using E key
- Enemies with basic AI, health, and attacks
- Tile-based map with obstacles and NPCs
- Health, stamina, and XP bars with level-ups
- Quest system with dialogue trees and rewards
- Game state saving and loading using localStorage

## How to Run

1. Clone or download the repository.
2. Open `index.html` in a modern web browser (Chrome, Firefox, Edge).
3. Play the game directly from the static files, no server required.

## Controls

- W/A/S/D: Move player
- J: Basic attack
- K/L: Special skills (breathing techniques)
- E: Interact with NPCs

## Project Structure

- `index.html`: Main HTML file with canvas and UI elements
- `style.css`: Styles for canvas and UI
- `game.js`: Main game controller and loop
- `player.js`: Player class and logic
- `enemy.js`: Enemy class and spawn logic
- `map.js`: Tile-based map rendering and collision
- `npc.js`: NPC class with dialogue and quests
- `storage.js`: Save/load game state using localStorage
- `assets/`: Folder for images and sprites (currently placeholders)

## Notes

- The game uses ES6 modules; ensure your browser supports them.
- The game is optimized for 800x600 resolution.
- All assets are placeholders; you can replace them with your own pixel art.

Enjoy playing the Demon Slayer 2D RPG!
