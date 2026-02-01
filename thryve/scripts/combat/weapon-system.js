/**
 * Weapon System
 * Handles weapon attacks and damage rolls
 */

export class WeaponSystem {
  
  /**
   * Roll an attack with a weapon
   * @param {Actor} actor - The actor making the attack
   * @param {Item} weapon - The weapon being used
   */
  static async rollAttack(actor, weapon) {
    const weaponData = weapon.system;
    const actorData = actor.system;

    // Determine which attribute to use based on weapon type
    const weaponType = weaponData.weaponType || "melee";
    let attrMod = 0;
    let attrLabel = "";

    if (actor.type === "monster") {
      // Monsters don't have attributes, just roll 1d10 + 1d6
      const formula = "1d10 + 1d6";
      const roll = new Roll(formula);
      await roll.evaluate();

      const label = `${weapon.name} - Attack Roll`;

      roll.toMessage({
        speaker: ChatMessage.getSpeaker({ actor: actor }),
        flavor: label,
        rollMode: game.settings.get('core', 'rollMode'),
      });

      return roll;
    }

    // Characters and NPCs use attributes
    const attrKey = weaponType === "melee" ? "strength" : "agility";
    attrMod = actorData.attributes[attrKey]?.mod || 0;
    attrLabel = attrKey.charAt(0).toUpperCase() + attrKey.slice(1);

    // Get attack die (default to 1d6)
    const attackDie = weaponData.attackDie || "1d6";

    // Build formula: Attack Die + Attribute Mod
    const formula = `${attackDie} + ${attrMod}`;

    const roll = new Roll(formula, actor.getRollData());
    await roll.evaluate();

    const label = `${weapon.name} - Attack Roll (${attrLabel} +${attrMod})`;

    roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: actor }),
      flavor: label,
      rollMode: game.settings.get('core', 'rollMode'),
    });

    return roll;
  }

  /**
   * Roll damage with a weapon
   * @param {Actor} actor - The actor dealing damage
   * @param {Item} weapon - The weapon being used
   */
  static async rollAttack(actor, weapon) {
  const weaponData = weapon.system;
  const actorData = actor.system;

  // Determine which attribute to use based on weapon damage die
  const damageDie = weaponData.damageDie || "1d6";
  let attrMod = 0;
  let attrLabel = "";

  if (actor.type === "monster") {
    // Monsters don't have attributes, just roll 1d10 + 1d6
    const formula = "1d10 + 1d6";
    const roll = new Roll(formula);
    await roll.evaluate();

    const label = `${weapon.name} - Attack Roll`;

    roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: actor }),
      flavor: label,
      rollMode: game.settings.get('core', 'rollMode'),
    });

    return roll;
  }

  // Characters and NPCs use attributes based on damage die
  let attrKey = "";
  
  // Light weapons (1d4) - Use Agility
  if (damageDie.includes("d4")) {
    attrKey = "agility";
    attrLabel = "Agility";
  }
  // Heavy weapons (1d8+) - Use Strength
  else if (damageDie.includes("d8") || damageDie.includes("d10") || damageDie.includes("d12") || damageDie.includes("2d")) {
    attrKey = "strength";
    attrLabel = "Strength";
  }
  // Medium weapons (1d6) - Use whichever is higher
  else {
    const str = actorData.attributes.strength?.value || 0;
    const agl = actorData.attributes.agility?.value || 0;
    
    if (str >= agl) {
      attrKey = "strength";
      attrLabel = "Strength";
    } else {
      attrKey = "agility";
      attrLabel = "Agility";
    }
  }

  attrMod = actorData.attributes[attrKey]?.mod || 0;

  // Get attack die (default to 1d10+1d6)
  const attackDie = weaponData.attackDie || "1d10+1d6";

  // Build formula: Attack Die + Attribute Mod
  const formula = `${attackDie} + ${attrMod}`;

  const roll = new Roll(formula, actor.getRollData());
  await roll.evaluate();

  const label = `${weapon.name} - Attack Roll (${attrLabel} +${attrMod})`;

  roll.toMessage({
    speaker: ChatMessage.getSpeaker({ actor: actor }),
    flavor: label,
    rollMode: game.settings.get('core', 'rollMode'),
  });

  return roll;
}

  /**
   * Get weapon type options
   */
  static getWeaponTypes() {
    return {
      "melee": "Melee (STR)",
      "ranged": "Ranged (AGL)"
    };
  }

  /**
   * Get default weapon data
   */
  static getDefaultWeaponData() {
    return {
      attackDie: "1d6",
      damageDie: "1d6",
      range: "Melee",
      weaponType: "melee",
      description: ""
    };
  }
}