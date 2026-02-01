import { WeaponSystem } from '../combat/weapon-system.js';
import { ArmorSystem } from '../combat/armor-system.js';

/**
 * Extend the basic ItemSheet
 */
export class ThryveItemSheet extends ItemSheet {

  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["thryve", "sheet", "item"],
      width: 520,
      height: 480,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }]
    });
  }

  /** @override */
  get template() {
    const path = "systems/thryve/templates/item";
    return `${path}/item-${this.item.type}-sheet.hbs`;
  }

  /* -------------------------------------------- */

  /** @override */
  getData() {
    const context = super.getData();

    const itemData = this.item.toObject(false);

    context.system = itemData.system;
    context.flags = itemData.flags;

    context.enrichedDescription = TextEditor.enrichHTML(context.system.description, {async: false});

    // Add weapon/armor type options
    if (this.item.type === 'weapon') {
      context.weaponTypes = WeaponSystem.getWeaponTypes();
    } else if (this.item.type === 'armor') {
      context.armorTypes = ArmorSystem.getArmorTypes();
    }

    return context;
  }

  /* -------------------------------------------- */

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Everything below here is only needed if the sheet is editable
    if (!this.isEditable) return;

    // Roll attack
    html.find('.roll-attack').click(this._onRollAttack.bind(this));

    // Roll damage
    html.find('.roll-damage').click(this._onRollDamage.bind(this));
  }

  /**
   * Handle rolling an attack
   */
  async _onRollAttack(event) {
    event.preventDefault();

    if (!this.item.actor) {
      ui.notifications.warn("This weapon must be owned by an actor to roll!");
      return;
    }

    await WeaponSystem.rollAttack(this.item.actor, this.item);
  }

  /**
   * Handle rolling damage
   */
  async _onRollDamage(event) {
    event.preventDefault();

    if (!this.item.actor) {
      ui.notifications.warn("This weapon must be owned by an actor to roll!");
      return;
    }

    await WeaponSystem.rollDamage(this.item.actor, this.item);
  }
}