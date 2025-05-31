import { Player } from './player.js';
import { UI } from './ui.js';
import { EnemySpawner } from './enemy.js';
import { Map } from './map.js';
import { NPC, Quest } from './npc.js';
import { Storage } from './storage.js';

// Renderer class for canvas drawing
class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  drawRect(x, y, w, h, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, w, h);
  }
}

class InputHandler {
  constructor() {
    this.keys = {};
    this.mouse = { x: 0, y: 0, clicked: false };

    window.addEventListener('keydown', (e) => {
      this.keys[e.key.toLowerCase()] = true;
    });

    window.addEventListener('keyup', (e) => {
      this.keys[e.key.toLowerCase()] = false;
    });

    window.addEventListener('mousedown', (e) => {
      this.mouse.clicked = true;
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    window.addEventListener('mouseup', (e) => {
      this.mouse.clicked = false;
    });
  }

  isKeyDown(key) {
    return !!this.keys[key.toLowerCase()];
  }
}

class Collision {
  static rectsOverlap(r1, r2) {
    return !(
      r2.x > r1.x + r1.width ||
      r2.x + r2.width < r1.x ||
      r2.y > r1.y + r1.height ||
      r2.y + r2.height < r1.y
    );
  }
}

class Game {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.renderer = new Renderer(this.canvas);
    this.input = new InputHandler();
    this.map = new Map();
    this.player = new Player(100, 100);
    this.ui = new UI(this.player);
    this.enemySpawner = new EnemySpawner();
    this.npcs = [
      new NPC(5, 5, [
        "Welcome to the Demon Slayer world!",
        "Your quest: Kill 3 demons.",
        "Press J to attack, K and L for special skills.",
        "Press E to interact with NPCs."
      ], new Quest("Kill 3 demons", 3, 'demon', 50)),
      new NPC(10, 10, [
        "Keep training to unlock new skills.",
        "Good luck!"
      ])
    ];
    this.questProgress = 0;
    this.lastTime = 0;

    this.gameLoop = this.gameLoop.bind(this);
  }

  start() {
    const savedQuestProgress = Storage.loadGame(this.player);
    if (savedQuestProgress !== null) {
      this.questProgress = savedQuestProgress;
    }
    requestAnimationFrame(this.gameLoop);
  }

  gameLoop(timestamp) {
    const delta = timestamp - this.lastTime;
    this.lastTime = timestamp;

    this.update(delta, timestamp);
    this.render();

    requestAnimationFrame(this.gameLoop);
  }

  update(delta, timestamp) {
    this.player.update(this.input);

    // Stamina regeneration
    this.player.stamina = Math.min(this.player.maxStamina, this.player.stamina + 0.1 * delta);

    // Update enemies
    this.enemySpawner.update(this.player, delta, timestamp);

    // Check player attacks on enemies
    if (this.player.isAttacking) {
      this.enemySpawner.enemies.forEach(enemy => {
        if (Collision.rectsOverlap(this.player, enemy)) {
          enemy.takeDamage(20);
          if (!enemy.isAlive) {
            this.questProgress++;
            this.player.xp += 10;
          }
        }
      });
    }

    // Update NPC dialogues interaction
    if (this.input.isKeyDown('e')) {
      this.npcs.forEach(npc => {
        const dx = npc.x * this.map.tileSize - this.player.x;
        const dy = npc.y * this.map.tileSize - this.player.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 50) {
          const dialogue = npc.interact(this.player);
          if (dialogue) {
            this.ui.showDialogue(dialogue);
          } else {
            this.ui.hideDialogue();
          }
        }
      });
    }

    this.ui.update();

    Storage.saveGame(this.player, this.questProgress);
  }

  render() {
    this.renderer.clear();
    this.map.draw(this.renderer);
    this.player.draw(this.renderer);
    this.enemySpawner.draw(this.renderer);
    this.npcs.forEach(npc => npc.draw(this.renderer, this.map.tileSize));
  }
}

window.onload = () => {
  const game = new Game();
  game.start();
};
