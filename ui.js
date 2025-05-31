// ui.js - UI class and DOM updates

export class UI {
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
