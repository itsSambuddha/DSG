// storage.js - Save and load game state using localStorage

export class Storage {
  static saveGame(player, questProgress) {
    const state = {
      health: player.health,
      maxHealth: player.maxHealth,
      stamina: player.stamina,
      maxStamina: player.maxStamina,
      xp: player.xp,
      level: player.level,
      questProgress: questProgress,
    };
    localStorage.setItem('demonSlayerRPGSave', JSON.stringify(state));
  }

  static loadGame(player) {
    const stateStr = localStorage.getItem('demonSlayerRPGSave');
    if (!stateStr) return null;

    const state = JSON.parse(stateStr);
    player.health = state.health;
    player.maxHealth = state.maxHealth;
    player.stamina = state.stamina;
    player.maxStamina = state.maxStamina;
    player.xp = state.xp;
    player.level = state.level;

    return state.questProgress || null;
  }

  static clearSave() {
    localStorage.removeItem('demonSlayerRPGSave');
  }
}
