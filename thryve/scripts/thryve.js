/**
 * Thryve TTRPG System
 * Main initialization file
 */

// Import modules
// Import modules
import { ThryveActor } from './documents/actor.js';
import { ThryveItem } from './documents/item.js';
import { ThryveCharacterSheet } from './sheets/character-sheet.js';
import { ThryveNPCSheet } from './sheets/npc-sheet.js';
import { ThryveMonsterSheet } from './sheets/monster-sheet.js';
import { ThryveItemSheet } from './sheets/item-sheet.js';
import { ItemGenerator } from './data/item-generator.js';
/* -------------------------------------------- */
/*  Init Hook                                   */
/* -------------------------------------------- */

Hooks.once('init', async function() {
  console.log('Thryve | Initializing Thryve System');

  // Define custom Document classes
  CONFIG.Actor.documentClass = ThryveActor;
  CONFIG.Item.documentClass = ThryveItem;

  // Register sheet application classes
Actors.unregisterSheet("core", ActorSheet);

// Register Character sheet
Actors.registerSheet("thryve", ThryveCharacterSheet, {
  types: ["character"],
  makeDefault: true,
  label: "Thryve Character Sheet"
});

// Register NPC sheet
Actors.registerSheet("thryve", ThryveNPCSheet, {
  types: ["npc"],
  makeDefault: true,
  label: "Thryve NPC Sheet"
});

// Register Monster sheet
Actors.registerSheet("thryve", ThryveMonsterSheet, {
  types: ["monster"],
  makeDefault: true,
  label: "Thryve Monster Sheet"
});

  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("thryve", ThryveItemSheet, {
    types: ["item", "weapon", "armor"],
    makeDefault: true,
    label: "THRYVE.SheetClassItem"
  });

  // Preload Handlebars templates
  return preloadHandlebarsTemplates();
});

/* -------------------------------------------- */
/*  Handlebars Helpers                          */
/* -------------------------------------------- */

Hooks.once('ready', async function() {
  Handlebars.registerHelper('concat', function() {
    return Array.prototype.slice.call(arguments, 0, -1).join('');
  });

  Handlebars.registerHelper('toLowerCase', function(str) {
    return str.toLowerCase();
  });

  Handlebars.registerHelper('includes', function(array, value) {
    return Array.isArray(array) && array.includes(value);
  });
});

/* -------------------------------------------- */
/*  Preload Templates                           */
/* -------------------------------------------- */

async function preloadHandlebarsTemplates() {
  return loadTemplates([
Hooks.once('ready', () => {
  window.ItemGenerator = ItemGenerator;
  console.log("ItemGenerator is ready! Use: ItemGenerator.generateLightMeleeWeapons()");
})
  ]);

  
  
};