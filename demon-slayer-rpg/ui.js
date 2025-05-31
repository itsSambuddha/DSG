// ui.js - UI class and DOM updates

export class UI {
  constructor(player) {
    this.player = player;
    this.healthBar = document.querySelector('#health-bar .fill');
    this.staminaBar = document.querySelector('#stamina-bar .fill');
    this.xpBar = document.querySelector('#xp-bar .fill');
    this.dialogueBox = document.getElementById('dialogue-box');
    this.dialogueText = document.getElementById('dialogue-text');
    this.dialogueNext = document.getElementById('dialogue-next');

    this.dialogueNext.addEventListener('click', () => {
      if (this.onDialogueNext) {
        this.onDialogueNext();
      }
    });
  }

  update() {
    this.healthBar.style.width = (this.player.health / this.player.maxHealth) * 100 + '%';
    this.staminaBar.style.width = (this.player.stamina / this.player.maxStamina) * 100 + '%';
    this.xpBar.style.width = (this.player.xp % 100) + '%';
  }

  showDialogue(text) {
    this.dialogueText.textContent = text;
    this.dialogueBox.classList.remove('hidden');
  }

  hideDialogue() {
    this.dialogueBox.classList.add('hidden');
  }
}
