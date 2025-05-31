// Demon Slayer 2D RPG - Main Game Script

// Engine Layer
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

  drawText(text, x, y, color = '#fff', font = '16px monospace') {
    this.ctx.fillStyle = color;
    this.ctx.font = font;
    this.ctx.fillText(text, x, y);
  }

  // Placeholder for sprite drawing
  drawSprite(img, x, y, w, h) {
    this.ctx.drawImage(img, x, y, w, h);
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

// Game Logic Layer
class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 32;
    this.height = 32;
    this.speed = 2.5;
    this.health = 100;
    this.maxHealth = 100;
    this.stamina = 100;
    this.maxStamina = 100;
    this.xp = 0;
    this.level = 1;
    this.direction = 'down';
    this.isAttacking = false;
    this.attackCooldown = 0;
  }

  update(input) {
    let moved = false;
    if (input.isKeyDown('w')) {
      this.y -= this.speed;
      this.direction = 'up';
      moved = true;
    }
    if (input.isKeyDown('s')) {
      this.y += this.speed;
      this.direction = 'down';
      moved = true;
    }
    if (input.isKeyDown('a')) {
      this.x -= this.speed;
      this.direction = 'left';
      moved = true;
    }
    if (input.isKeyDown('d')) {
      this.x += this.speed;
      this.direction = 'right';
      moved = true;
    }

    if (this.attackCooldown > 0) {
      this.attackCooldown--;
    }

    if (input.isKeyDown('j') && this.attackCooldown === 0) {
      this.isAttacking = true;
      this.attackCooldown = 30; // cooldown frames
    } else {
      this.isAttacking = false;
    }
  }

  draw(renderer) {
    // Placeholder: draw player as a colored rectangle
    renderer.drawRect(this.x, this.y, this.width, this.height, 'cyan');

    // Draw attack indication
    if (this.isAttacking) {
      let attackX = this.x;
      let attackY = this.y;
      let attackW = 10;
      let attackH = 10;
      switch (this.direction) {
        case 'up':
          attackX += this.width / 2 - attackW / 2;
          attackY -= attackH;
          break;
        case 'down':
          attackX += this.width / 2 - attackW / 2;
          attackY += this.height;
          break;
        case 'left':
          attackX -= attackW;
          attackY += this.height / 2 - attackH / 2;
          break;
        case 'right':
          attackX += this.width;
          attackY += this.height / 2 - attackH / 2;
          break;
      }
      renderer.drawRect(attackX, attackY, attackW, attackH, 'yellow');
    }
  }
}

// UI Layer
class UI {
  constructor(player) {
    this.player = player;
    this.healthBar = document.querySelector('#health-bar .fill');
    this.staminaBar = document.querySelector('#stamina-bar .fill');
    this.xpBar = document.querySelector('#xp-bar .fill');
  }

  update() {
    this.healthBar.style.width = (this.player.health / this.player.maxHealth) * 100 + '%';
    this.staminaBar.style.width = (this.player.stamina / this.player.maxStamina) * 100 + '%';
    this.xpBar.style.width = (this.player.xp % 100) + '%';
  }
}

// Main Game Class
class Game {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.renderer = new Renderer(this.canvas);
    this.input = new InputHandler();
    this.player = new Player(100, 100);
    this.ui = new UI(this.player);
    this.lastTime = 0;

    this.gameLoop = this.gameLoop.bind(this);
  }

  start() {
    requestAnimationFrame(this.gameLoop);
  }

  gameLoop(timestamp) {
    const delta = timestamp - this.lastTime;
    this.lastTime = timestamp;

    this.update(delta);
    this.render();

    requestAnimationFrame(this.gameLoop);
  }

  update(delta) {
    this.player.update(this.input);
    this.ui.update();
  }

  render() {
    this.renderer.clear();
    this.player.draw(this.renderer);
  }
}

window.onload = () => {
  const game = new Game();
  game.start();
};
