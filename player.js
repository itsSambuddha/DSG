// player.js - Player class and logic

export class Player {
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
