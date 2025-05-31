// map.js - Tile-based static map rendering and collision

export class Map {
  constructor(tileSize = 32, rows = 20, cols = 25) {
    this.tileSize = tileSize;
    this.rows = rows;
    this.cols = cols;

    // Simple map layout: 0 = walkable, 1 = obstacle
    this.layout = [
      // 25 columns per row, 20 rows total
      // Example: border walls and some obstacles inside
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    ];

    // NPC positions (example)
    this.npcs = [
      { x: 5, y: 5 },
      { x: 10, y: 10 },
    ];
  }

  draw(renderer) {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const tile = this.layout[row][col];
        const x = col * this.tileSize;
        const y = row * this.tileSize;
        if (tile === 1) {
          renderer.drawRect(x, y, this.tileSize, this.tileSize, '#444'); // obstacle
        } else {
          renderer.drawRect(x, y, this.tileSize, this.tileSize, '#222'); // walkable
        }
      }
    }

    // Draw NPCs as yellow squares
    this.npcs.forEach(npc => {
      const x = npc.x * this.tileSize;
      const y = npc.y * this.tileSize;
      renderer.drawRect(x, y, this.tileSize, this.tileSize, 'yellow');
    });
  }

  isWalkable(x, y) {
    const col = Math.floor(x / this.tileSize);
    const row = Math.floor(y / this.tileSize);
    if (row < 0 || row >= this.rows || col < 0 || col >= this.cols) return false;
    return this.layout[row][col] === 0;
  }
}
