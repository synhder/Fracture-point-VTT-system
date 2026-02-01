import { MagicSystem } from '../magic/magic-system.js';

/**
 * Monster Sheet
 */
export class ThryveMonsterSheet extends ActorSheet {

  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["thryve", "sheet", "actor", "monster"],
      width: 720,
      height: 680,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "abilities" }]
    });
  }

  /** @override */
  get template() {
    return `systems/thryve/templates/actor/actor-monster-sheet.hbs`;
  }

  /** @override */
  getData() {
    const context = super.getData();
    const actorData = this.actor.toObject(false);

    context.system = actorData.system;
    context.flags = actorData.flags;

    this._prepareItems(context);

    context.rollData = context.actor.getRollData();

    return context;
  }

  _prepareItems(context) {
    const items = [];
    const weapons = [];

    for (let i of context.items) {
      i.img = i.img || DEFAULT_TOKEN;
      
      if (i.type === 'item') {
        items.push(i);
      } else if (i.type === 'weapon') {
        weapons.push(i);
      }
    }

    context.items = items;
    context.weapons = weapons;
  }

 /** @override */
activateListeners(html) {
  super.activateListeners(html);

  if (!this.isEditable) return;

  html.find('.item-create').click(this._onItemCreate.bind(this));
  html.find('.item-delete').click(ev => {
    const li = $(ev.currentTarget).parents(".item");
    const item = this.actor.items.get(li.data("itemId"));
    item.delete();
    li.slideUp(200, () => this.render(false));
  });

  html.find('.cast-spell-button').click(this._onCastSpell.bind(this));
  html.find('.roll-attack-button').click(this._onRollAttack.bind(this));
  
  // Refresh sheet when tier changes
  html.find('select[name="system.tier"]').change(() => {
    this.submit({ preventClose: true }).then(() => this.render());
  });

  if (this.actor.isOwner) {
    let handler = ev => this._onDragStart(ev);
    html.find('li.item').each((i, li) => {
      if (li.classList.contains("inventory-header")) return;
      li.setAttribute("draggable", true);
      li.addEventListener("dragstart", handler, false);
    });
  }
}

  async _onItemCreate(event) {
    event.preventDefault();
    const header = event.currentTarget;
    const type = header.dataset.type;
    const data = duplicate(header.dataset);
    const name = `New ${type.capitalize()}`;
    const itemData = {
      name: name,
      type: type,
      system: data
    };
    delete itemData.system["type"];

    return await Item.create(itemData, {parent: this.actor});
  }

  async _onCastSpell(event) {
  event.preventDefault();
  await MagicSystem.showCastingDialog(this.actor);
}

 async _onRollAttack(event) {
  event.preventDefault();
  
  // Monsters always use 1d10 + 1d6 for attacks
  const formula = "1d10 + 1d6";
  const roll = new Roll(formula);
  await roll.evaluate();

  const label = `${this.actor.name} - Attack Roll`;
  
  roll.toMessage({
    speaker: ChatMessage.getSpeaker({ actor: this.actor }),
    flavor: label,
    rollMode: game.settings.get('core', 'rollMode'),
  });

  return roll;
}
}