/**
 * Armor System
 * Handles armor properties and management
 */

export class ArmorSystem {
  
  /**
   * Get armor type options
   */
  static getArmorTypes() {
    return {
      "light": "Light Armor",
      "medium": "Medium Armor",
      "heavy": "Heavy Armor",
      "shield": "Shield"
    };
  }

  /**
   * Get default armor data
   */
  static getDefaultArmorData() {
    return {
      dr: 0,
      armorPoints: 0,
      weight: 0,
      armorType: "light",
      description: ""
    };
  }

  /**
   * Calculate total DR from equipped armor
   * @param {Actor} actor - The actor wearing armor
   * @returns {number} Total DR
   */
  static calculateTotalDR(actor) {
    let totalDR = 0;
    
    for (let item of actor.items) {
      if (item.type === "armor" && item.system.equipped) {
        totalDR += item.system.dr || 0;
      }
    }
    
    return totalDR;
  }

  /**
   * Calculate total ArP from equipped armor
   * @param {Actor} actor - The actor wearing armor
   * @returns {number} Total ArP
   */
  static calculateTotalArP(actor) {
    let totalArP = 0;
    
    for (let item of actor.items) {
      if (item.type === "armor" && item.system.equipped) {
        totalArP += item.system.armorPoints || 0;
      }
    }
    
    return totalArP;
  }
}