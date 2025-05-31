// enemy.js - Enemy class with AI, health, attacks, and spawn logic

export class Enemy {
  constructor(x, y, type = 'demon') {
    this.x = x;
    this.y = y;
    this.width = 32;
    this.height = 32;
    this.speed = 1.5;
    this.health = 50;
    this.maxHealth = 50;
    this.type = type;
    this.isAlive = true;
    this.direction = 'left';
    this.attackCooldown = 0;
  }

  update(player, delta) {
    if (!this.isAlive) return;

    // Simple AI: move towards player if within range
    const dx = player.x - this.x;
    const dy = player.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 200) {
      // Move towards player
      const angle = Math.atan2(dy, dx);
      this.x += Math.cos(angle) * this.speed;
      this.y += Math.sin(angle) * this.speed;

      // Set direction based on movement
      if (Math.abs(dx) > Math.abs(dy)) {
        this.direction = dx > 0 ? 'right' : 'left';
      } else {
        this.direction = dy > 0 ? 'down' : 'up';
      }
    }

    if (this.attackCooldown > 0) {
      this.attackCooldown -= delta;
    }

    // Attack player if close
    if (distance < 40 && this.attackCooldown <= 0) {
      this.attack(player);
      this.attackCooldown = 1000; // milliseconds cooldown
    }
  }

  attack(player) {
    // Simple attack: reduce player health
    player.health -= 10;
    if (player.health < 0) player.health = 0;
  }

  takeDamage(amount) {
    this.health -= amount;
    if (this.health <= 0) {
      this.health = 0;
      this.isAlive = false;
    }
  }

  draw(renderer) {
    if (!this.isAlive) return;

    // Placeholder: draw enemy as a red rectangle
    renderer.drawRect(this.x, this.y, this.width, this.height, 'red');

    // Draw health bar above enemy
    const healthBarWidth = this.width;
    const healthRatio = this.health / this.maxHealth;
    renderer.drawRect(this.x, this.y - 6, healthBarWidth * healthRatio, 4, 'green');
    renderer.drawRect(this.x + healthBarWidth * healthRatio, this.y - 6, healthBarWidth * (1 - healthRatio), 4, 'darkred');
  }
}

// Spawn manager for enemies
export class EnemySpawner {
  constructor() {
    this.enemies = [];
    this.spawnInterval = 3000; // milliseconds
    this.lastSpawn = 0;
    this.difficulty = 1;
  }

  update(player, delta, timestamp) {
    // Spawn enemies at random intervals with increasing difficulty
    if (timestamp - this.lastSpawn > this.spawnInterval) {
      this.spawnEnemy();
      this.lastSpawn = timestamp;
      // Increase difficulty by reducing spawn interval
      this.spawnInterval = Math.max(1000, this.spawnInterval - 50);
      this.difficulty += 0.1;
    }

    // Update all enemies
    this.enemies.forEach(enemy => enemy.update(player, delta));
    // Remove dead enemies
    this.enemies = this.enemies.filter(enemy => enemy.isAlive);
  }

  spawnEnemy() {
    // Spawn enemy at random position around the edges
    const spawnEdges = ['top', 'bottom', 'left', 'right'];
    const edge = spawnEdges[Math.floor(Math.random() * spawnEdges.length)];
    let x, y;
    const canvasWidth = 800;
    const canvasHeight = 600;

    switch (edge) {
      case 'top':
        x = Math.random() * canvasWidth;
        y = -40;
        break;
      case 'bottom':
        x = Math.random() * canvasWidth;
        y = canvasHeight + 40;
        break;
      case 'left':
        x = -40;
        y = Math.random() * canvasHeight;
        break;
      case 'right':
        x = canvasWidth + 40;
        y = Math.random() * canvasHeight;
        break;
    }

    const enemy = new Enemy(x, y);
    // Increase enemy stats based on difficulty
    enemy.health += this.difficulty * 10;
    enemy.maxHealth = enemy.health;
    enemy.speed += this.difficulty * 0.1;

    this.enemies.push(enemy);
  }

  draw(renderer) {
    this.enemies.forEach(enemy => enemy.draw(renderer));
  }
}
