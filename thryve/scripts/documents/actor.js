/**
 * Extend the base Actor document
 */
export class ThryveActor extends Actor {

  /** @override */
  prepareData() {
    super.prepareData();
  }

  /** @override */
  prepareBaseData() {
    // Data modifications in this step occur before processing embedded documents
  }

 /** @override */
prepareDerivedData() {
  const actorData = this;
  const systemData = actorData.system;

  // Make separate methods for each Actor type
  this._prepareCharacterData(actorData);
  this._prepareNpcData(actorData);
  this._prepareMonsterData(actorData);
}

 /**
 * Prepare Character type specific data
 */
_prepareCharacterData(actorData) {
  if (actorData.type !== 'character') return;

  const systemData = actorData.system;
  const attrs = systemData.attributes;

  // Calculate attribute modifiers using the correct table from rulebook
  for (let [key, attribute] of Object.entries(attrs)) {
    const value = attribute.value;
    
    if (value === 1) {
      attribute.mod = 0;
    } else if (value >= 2 && value <= 3) {
      attribute.mod = 1;
    } else if (value >= 4 && value <= 5) {
      attribute.mod = 2;
    } else if (value >= 6 && value <= 7) {
      attribute.mod = 3;
    } else if (value >= 8 && value <= 9) {
      attribute.mod = 4;
    } else if (value >= 10) {
      attribute.mod = 5;
    } else {
      attribute.mod = 0;
    }
  }

  // Get attribute values for derived stats
  const str = attrs.strength.value;
  const agl = attrs.agility.value;
  const int = attrs.intellect.value;
  const cha = attrs.charisma.value;
  const will = attrs.willpower.value;

  // Calculate Body = 5 + STR + WILL + bonus from identity + bonus from leveling
  const identityBodyBonus = systemData.identity?.bodyBonus || 0;
  const bodyBonus = systemData.body?.bonus || 0;
  systemData.body.max = 5 + str + will + identityBodyBonus + bodyBonus;
  if (systemData.body.value > systemData.body.max) {
    systemData.body.value = systemData.body.max;
  }

  // Calculate Stability = 5 + AGL + CHA + bonus from identity + bonus from carapace + bonus from leveling
  const identityStabilityBonus = systemData.identity?.stabilityBonus || 0;
  const carapaceStabilityBonus = systemData.carapace?.stabilityBonus || 0;
  const stabilityBonus = systemData.stability?.bonus || 0;
  systemData.stability.max = 5 + agl + cha + identityStabilityBonus + carapaceStabilityBonus + stabilityBonus;
  if (systemData.stability.value > systemData.stability.max) {
    systemData.stability.value = systemData.stability.max;
  }

  // Calculate DV (Dodge Value) = 5 + AGL + INT
  systemData.dv.value = 5 + agl + int;

  // Calculate Movement = 6 + AGL
  systemData.movement.value = 6 + agl;

  // Calculate Resistances
  systemData.resistances.biological.value = 8 + str + will;
  systemData.resistances.arcane.value = 8 + int + cha;
  systemData.resistances.tech.value = 8 + agl + int;

  // Calculate Humor = (INT mod × 4) + 3
  const intMod = attrs.intellect.mod || 0;
  systemData.humor.max = (intMod * 4) + 3;
  if (systemData.humor.value > systemData.humor.max) {
    systemData.humor.value = systemData.humor.max;
  }
}

  /**
   * Prepare NPC type specific data
   */
  _prepareNpcData(actorData) {
    if (actorData.type !== 'npc') return;

    const systemData = actorData.system;
    const attrs = systemData.attributes;

    // Calculate attribute modifiers (same as characters)
    for (let [key, attribute] of Object.entries(attrs)) {
      const value = attribute.value;
      
      if (value === 1) {
        attribute.mod = 0;
      } else if (value >= 2 && value <= 3) {
        attribute.mod = 1;
      } else if (value >= 4 && value <= 5) {
        attribute.mod = 2;
      } else if (value >= 6 && value <= 7) {
        attribute.mod = 3;
      } else if (value >= 8 && value <= 9) {
        attribute.mod = 4;
      } else if (value >= 10) {
        attribute.mod = 5;
      } else {
        attribute.mod = 0;
      }
    }

    // Get attribute values
    const str = attrs.strength.value;
    const agl = attrs.agility.value;
    const int = attrs.intellect.value;
    const cha = attrs.charisma.value;
    const will = attrs.willpower.value;

    // Calculate derived stats (NPCs use same formulas)
    systemData.body.max = 5 + will + str;
    if (systemData.body.value > systemData.body.max) {
      systemData.body.value = systemData.body.max;
    }

    systemData.stability.max = 5 + agl + int;
    if (systemData.stability.value > systemData.stability.max) {
      systemData.stability.value = systemData.stability.max;
    }

    systemData.dv.value = 5 + agl + int;
    systemData.movement.value = 6 + agl;

    systemData.resistances.biological.value = 8 + str + will;
    systemData.resistances.arcane.value = 8 + int + cha;
    systemData.resistances.tech.value = 8 + agl + int;
    // Calculate Humor = (INT mod × 4) + 3
const intMod = attrs.intellect.mod || 0;
systemData.humor.max = (intMod * 4) + 3;
// Keep current value within max
if (systemData.humor.value > systemData.humor.max) {
  systemData.humor.value = systemData.humor.max;
}
  }

  /**
   * Roll a skill check
   * @param {string} skillKey - The key of the skill to roll (e.g., "force", "mobility")
   */
  async rollSkill(skillKey) {
    const skill = this.system.skills[skillKey];
    
    if (!skill) {
      ui.notifications.warn(`Skill ${skillKey} not found!`);
      return;
    }

    // Get the linked attribute and its modifier
    const linkedAttr = skill.attribute;
    const attrMod = this.system.attributes[linkedAttr].mod || 0;
    
    // Build formula: 1d10 (Base Die) + skill die (Relativity Die) + attribute mod
    const skillDie = skill.die || 'd4';
    const formula = `1d10 + 1${skillDie} + ${attrMod}`;
    
    const roll = new Roll(formula, this.getRollData());
    await roll.evaluate();

    const attrLabel = linkedAttr.charAt(0).toUpperCase() + linkedAttr.slice(1);
    const label = `${skill.label} Check (${attrLabel} +${attrMod})`;
    
    roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      flavor: label,
      rollMode: game.settings.get('core', 'rollMode'),
    });

    return roll;
  }

  /**
   * Apply an Identity to the character
   * @param {string} identityName - The name of the identity (e.g., "Enforcer", "Operative")
   * @param {object} skillDice - Object with skill dice values
   * @param {number} bodyBonus - Bonus to max Body (0 or 1)
   * @param {number} stabilityBonus - Bonus to max Stability (0 or 1)
   */
  async applyIdentity(identityName, skillDice, bodyBonus = 0, stabilityBonus = 0) {
    const updateData = {
      'system.identity.name': identityName,
      'system.identity.bodyBonus': bodyBonus,
      'system.identity.stabilityBonus': stabilityBonus
    };

    // Update skill dice
    for (let [skillKey, dieValue] of Object.entries(skillDice)) {
      updateData[`system.skills.${skillKey}.die`] = dieValue;
    }

    await this.update(updateData);
    
    ui.notifications.info(`Applied identity: ${identityName}`);
  }

  /** @override */
  getRollData() {
    const data = super.getRollData();
    return data;
  }
 /**
 * Prepare Monster type specific data
 */
_prepareMonsterData(actorData) {
  if (actorData.type !== 'monster') return;

  const systemData = actorData.system;
  
  // Safety check - make sure all required fields exist
  if (!systemData.body) systemData.body = { value: 5, max: 5 };
  if (!systemData.stability) systemData.stability = { value: 5, max: 5 };
  if (!systemData.dv) systemData.dv = { value: 10 };
  if (!systemData.movement) systemData.movement = { value: 6 };
  if (!systemData.resistances) {
    systemData.resistances = {
      biological: { value: 8 },
      arcane: { value: 8 },
      tech: { value: 8 }
    };
  }
  
  const tier = systemData.tier || 0;

  // Tier-based stats table
  const tierStats = {
    0: { body: 5, stability: 5, attackDie: "1d6", damageDie: "1d4", dv: 10, resistance: 8 },
    1: { body: 10, stability: 10, attackDie: "1d6", damageDie: "1d6", dv: 12, resistance: 10 },
    2: { body: 15, stability: 15, attackDie: "1d6", damageDie: "1d8", dv: 14, resistance: 12 },
    3: { body: 20, stability: 20, attackDie: "1d6", damageDie: "1d10", dv: 16, resistance: 14 },
    4: { body: 25, stability: 25, attackDie: "1d6", damageDie: "1d12", dv: 18, resistance: 16 },
    5: { body: 30, stability: 30, attackDie: "1d6", damageDie: "2d8", dv: 20, resistance: 18 }
  };

  const stats = tierStats[tier] || tierStats[0];

  // Apply tier-based stats
  systemData.body.max = stats.body;
  if (!systemData.body.value || systemData.body.value > stats.body) {
    systemData.body.value = stats.body;
  }

  systemData.stability.max = stats.stability;
  if (!systemData.stability.value || systemData.stability.value > stats.stability) {
    systemData.stability.value = stats.stability;
  }

  systemData.attackDie = stats.attackDie;
  systemData.damageDie = stats.damageDie;
  systemData.dv.value = stats.dv;
  
  // Set all resistances to the same value for monsters
  systemData.resistances.biological.value = stats.resistance;
  systemData.resistances.arcane.value = stats.resistance;
  systemData.resistances.tech.value = stats.resistance;

  systemData.movement.value = systemData.movement.value || 6;

  // Calculate Humor if uses magic
  if (systemData.usesMagic) {
    if (!systemData.humor) systemData.humor = { value: 0, max: 0 };
    systemData.humor.max = (tier * 5) + 5;
    if (systemData.humor.value > systemData.humor.max) {
      systemData.humor.value = systemData.humor.max;
    }
  }
}
}