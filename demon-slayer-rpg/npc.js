// npc.js - NPC class with dialogue trees and quests

export class NPC {
  constructor(x, y, dialogues = [], quest = null) {
    this.x = x;
    this.y = y;
    this.width = 32;
    this.height = 32;
    this.dialogues = dialogues; // Array of dialogue strings
    this.quest = quest; // Quest object or null
    this.currentDialogueIndex = 0;
    this.isInDialogue = false;
  }

  interact(player) {
    if (!this.isInDialogue) {
      this.isInDialogue = true;
      this.currentDialogueIndex = 0;
      return this.dialogues[this.currentDialogueIndex];
    } else {
      this.currentDialogueIndex++;
      if (this.currentDialogueIndex >= this.dialogues.length) {
        this.isInDialogue = false;
        // Quest completion check
        if (this.quest && this.quest.isComplete(player)) {
          this.quest.reward(player);
          this.quest = null; // Quest completed
          return "Quest completed! Thank you!";
        }
        return null; // End of dialogue
      } else {
        return this.dialogues[this.currentDialogueIndex];
      }
    }
  }

  draw(renderer, tileSize) {
    // Placeholder: draw NPC as green square
    renderer.drawRect(this.x * tileSize, this.y * tileSize, this.width, this.height, 'green');
  }
}

// Example Quest class
export class Quest {
  constructor(description, targetCount, targetType, rewardXP) {
    this.description = description;
    this.targetCount = targetCount;
    this.targetType = targetType;
    this.rewardXP = rewardXP;
    this.progress = 0;
  }

  isComplete(player) {
    return this.progress >= this.targetCount;
  }

  reward(player) {
    player.xp += this.rewardXP;
  }

  updateProgress(killedType) {
    if (killedType === this.targetType) {
      this.progress++;
    }
  }
}
