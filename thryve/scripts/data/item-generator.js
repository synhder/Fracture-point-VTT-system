/**
 * Item Generator
 * Creates pre-made weapons and armor in the world Items directory
 */

import { LIGHT_MELEE_WEAPONS, LIGHT_RANGED_WEAPONS } from './light-weapons.js';
import { MEDIUM_MELEE_WEAPONS, MEDIUM_RANGED_WEAPONS } from './medium-weapons.js';
import { HEAVY_MELEE_WEAPONS, HEAVY_RANGED_WEAPONS } from './heavy-weapons.js';
import { LIGHT_ARMOR, MEDIUM_ARMOR, HEAVY_ARMOR } from './armor-data.js';

export class ItemGenerator {
  
  // ==================== LIGHT WEAPONS ====================
  
  static async generateLightMeleeWeapons() {
    for (let weaponData of LIGHT_MELEE_WEAPONS) {
      await Item.create(weaponData);
    }
    ui.notifications.info(`Created ${LIGHT_MELEE_WEAPONS.length} light melee weapons!`);
  }

  static async generateLightRangedWeapons() {
    for (let weaponData of LIGHT_RANGED_WEAPONS) {
      await Item.create(weaponData);
    }
    ui.notifications.info(`Created ${LIGHT_RANGED_WEAPONS.length} light ranged weapons!`);
  }

  static async generateAllLightWeapons() {
    await this.generateLightMeleeWeapons();
    await this.generateLightRangedWeapons();
    ui.notifications.info("All light weapons created!");
  }

  // ==================== MEDIUM WEAPONS ====================
  
  static async generateMediumMeleeWeapons() {
    for (let weaponData of MEDIUM_MELEE_WEAPONS) {
      await Item.create(weaponData);
    }
    ui.notifications.info(`Created ${MEDIUM_MELEE_WEAPONS.length} medium melee weapons!`);
  }

  static async generateMediumRangedWeapons() {
    for (let weaponData of MEDIUM_RANGED_WEAPONS) {
      await Item.create(weaponData);
    }
    ui.notifications.info(`Created ${MEDIUM_RANGED_WEAPONS.length} medium ranged weapons!`);
  }

  static async generateAllMediumWeapons() {
    await this.generateMediumMeleeWeapons();
    await this.generateMediumRangedWeapons();
    ui.notifications.info("All medium weapons created!");
  }

  // ==================== HEAVY WEAPONS ====================
  
  static async generateHeavyMeleeWeapons() {
    for (let weaponData of HEAVY_MELEE_WEAPONS) {
      await Item.create(weaponData);
    }
    ui.notifications.info(`Created ${HEAVY_MELEE_WEAPONS.length} heavy melee weapons!`);
  }

  static async generateHeavyRangedWeapons() {
    for (let weaponData of HEAVY_RANGED_WEAPONS) {
      await Item.create(weaponData);
    }
    ui.notifications.info(`Created ${HEAVY_RANGED_WEAPONS.length} heavy ranged weapons!`);
  }

  static async generateAllHeavyWeapons() {
    await this.generateHeavyMeleeWeapons();
    await this.generateHeavyRangedWeapons();
    ui.notifications.info("All heavy weapons created!");
  }

  // ==================== ALL WEAPONS ====================
  
  static async generateAllWeapons() {
    await this.generateAllLightWeapons();
    await this.generateAllMediumWeapons();
    await this.generateAllHeavyWeapons();
    ui.notifications.info("ALL WEAPONS CREATED!");
  }

  // ==================== ARMOR ====================
  
  static async generateLightArmor() {
    for (let armorData of LIGHT_ARMOR) {
      await Item.create(armorData);
    }
    ui.notifications.info(`Created ${LIGHT_ARMOR.length} light armor pieces!`);
  }

  static async generateMediumArmor() {
    for (let armorData of MEDIUM_ARMOR) {
      await Item.create(armorData);
    }
    ui.notifications.info(`Created ${MEDIUM_ARMOR.length} medium armor pieces!`);
  }

  static async generateHeavyArmor() {
    for (let armorData of HEAVY_ARMOR) {
      await Item.create(armorData);
    }
    ui.notifications.info(`Created ${HEAVY_ARMOR.length} heavy armor pieces!`);
  }

  static async generateAllArmor() {
    await this.generateLightArmor();
    await this.generateMediumArmor();
    await this.generateHeavyArmor();
    ui.notifications.info("ALL ARMOR CREATED!");
  }

  // ==================== GENERATE EVERYTHING ====================
  
  static async generateEverything() {
    console.log("Starting item generation...");
    await this.generateAllWeapons();
    await this.generateAllArmor();
    ui.notifications.info("🎉 ALL WEAPONS AND ARMOR CREATED! 🎉");
  }

  // ==================== UTILITY: CLEAR ALL ITEMS ====================
  
  static async clearAllItems() {
    const confirmed = await Dialog.confirm({
      title: "Clear All Items",
      content: "<p>Are you sure you want to delete ALL items from the world?</p><p><strong>This cannot be undone!</strong></p>",
      yes: () => true,
      no: () => false
    });

    if (!confirmed) {
      ui.notifications.info("Cancelled item deletion.");
      return;
    }

    const allItems = game.items.contents;
    for (let item of allItems) {
      await item.delete();
    }
    
    ui.notifications.warn(`Deleted ${allItems.length} items!`);
  }
}

// Make globally accessible
window.ItemGenerator = ItemGenerator;