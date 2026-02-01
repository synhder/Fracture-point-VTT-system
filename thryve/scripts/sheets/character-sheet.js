import { CarapaceManager } from '../carapace/carapace-manager.js';
import { IdentityManager } from '../identity/identity-manager.js';
import { MagicSystem } from '../magic/magic-system.js';
import { WeaponSystem } from '../combat/weapon-system.js';
/**
 * Character Sheet (Player Characters)
 */
export class ThryveCharacterSheet extends ActorSheet {

  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["thryve", "sheet", "actor", "character"],
      width: 720,
      height: 680,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "skills" }]
    });
  }

  /** @override */
  get template() {
    return `systems/thryve/templates/actor/actor-character-sheet.hbs`;
  }

  /** @override */
  getData() {
    const context = super.getData();
    const actorData = this.actor.toObject(false);

    context.system = actorData.system;
    context.flags = actorData.flags;

    this._prepareItems(context);
    this._prepareCharacterData(context);

    context.rollData = context.actor.getRollData();
    context.enrichedBiography = TextEditor.enrichHTML(context.system.biography, {async: false});

    return context;
  }

  _prepareCharacterData(context) {
    // Future: Add character-specific calculations here
  }

  _prepareItems(context) {
    const items = [];
    const weapons = [];
    const armor = [];

    for (let i of context.items) {
      i.img = i.img || DEFAULT_TOKEN;
      
      if (i.type === 'item') {
        items.push(i);
      } else if (i.type === 'weapon') {
        weapons.push(i);
      } else if (i.type === 'armor') {
        armor.push(i);
      }
    }

    context.items = items;
    context.weapons = weapons;
    context.armor = armor;
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

  html.find('.skill-roll').click(this._onSkillRoll.bind(this));
  html.find('.identity-choose').click(this._onChooseIdentity.bind(this));
  html.find('.level-up-button').click(this._onLevelUp.bind(this));
  html.find('.carapace-choose').click(this._onChooseCarapace.bind(this));
  html.find('.cast-spell-button').click(this._onCastSpell.bind(this));
  
  // Weapon attack/damage rolls
  html.find('.weapon-attack').click(this._onWeaponAttack.bind(this));
  html.find('.weapon-damage').click(this._onWeaponDamage.bind(this));

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

  _onSkillRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const skillKey = element.dataset.skill;
    
    if (skillKey) {
      this.actor.rollSkill(skillKey);
    }
  }

  async _onChooseIdentity(event) {
  event.preventDefault();
  await IdentityManager.showSelectionDialog(this.actor);
  }

  async _onLevelUp(event) {
    event.preventDefault();
    
    new Dialog({
      title: "Level Up",
      content: `<div class="level-up-choice"><p>Choose how you want to improve your character:</p></div>`,
      buttons: {
        skill: {
          icon: '<i class="fas fa-dice"></i>',
          label: "Step Up Skill Die",
          callback: async () => await this._levelUpSkill()
        },
        attribute: {
          icon: '<i class="fas fa-fist-raised"></i>',
          label: "Raise Attribute +1",
          callback: async () => await this._levelUpAttribute()
        },
        stability: {
          icon: '<i class="fas fa-shield-alt"></i>',
          label: "+2 Max Stability",
          callback: async () => {
            await this.actor.update({
              'system.stability.bonus': (this.actor.system.stability.bonus || 0) + 2
            });
            ui.notifications.info("Gained +2 max Stability!");
          }
        },
        both: {
          icon: '<i class="fas fa-heart"></i>',
          label: "+1 Body & +1 Stability",
          callback: async () => {
            await this.actor.update({
              'system.body.bonus': (this.actor.system.body.bonus || 0) + 1,
              'system.stability.bonus': (this.actor.system.stability.bonus || 0) + 1
            });
            ui.notifications.info("Gained +1 max Body and +1 max Stability!");
          }
        }
      },
      default: "skill"
    }).render(true);
  }

  async _levelUpSkill() {
    const skills = this.actor.system.skills;
    
    let content = '<div class="skill-levelup"><p>Choose a skill to step up:</p><select id="skill-select">';
    
    for (let [key, skill] of Object.entries(skills)) {
      const currentDie = skill.die;
      const nextDie = this._getNextDie(currentDie);
      
      if (nextDie) {
        content += `<option value="${key}">${skill.label}: ${currentDie} → ${nextDie}</option>`;
      }
    }
    
    content += '</select></div>';
    
    new Dialog({
      title: "Step Up Skill",
      content: content,
      buttons: {
        upgrade: {
          icon: '<i class="fas fa-check"></i>',
          label: "Upgrade",
          callback: async (html) => {
            const skillKey = html.find('#skill-select').val();
            const skill = skills[skillKey];
            const nextDie = this._getNextDie(skill.die);
            
            if (nextDie) {
              await this.actor.update({
                [`system.skills.${skillKey}.die`]: nextDie
              });
              ui.notifications.info(`${skill.label} upgraded to ${nextDie}!`);
            }
          }
        },
        cancel: {
          icon: '<i class="fas fa-times"></i>',
          label: "Cancel"
        }
      },
      default: "upgrade"
    }).render(true);
  }

  async _levelUpAttribute() {
    const attributes = this.actor.system.attributes;
    
    let content = '<div class="attribute-levelup"><p>Choose an attribute to raise:</p><select id="attribute-select">';
    
    for (let [key, attr] of Object.entries(attributes)) {
      if (attr.value < attr.max) {
        content += `<option value="${key}">${attr.label}: ${attr.value} → ${attr.value + 1}</option>`;
      }
    }
    
    content += '</select></div>';
    
    new Dialog({
      title: "Raise Attribute",
      content: content,
      buttons: {
        upgrade: {
          icon: '<i class="fas fa-check"></i>',
          label: "Upgrade",
          callback: async (html) => {
            const attrKey = html.find('#attribute-select').val();
            const attr = attributes[attrKey];
            
            if (attr.value < attr.max) {
              await this.actor.update({
                [`system.attributes.${attrKey}.value`]: attr.value + 1
              });
              ui.notifications.info(`${attr.label} raised to ${attr.value + 1}!`);
            } else {
              ui.notifications.warn(`${attr.label} is already at maximum!`);
            }
          }
        },
        cancel: {
          icon: '<i class="fas fa-times"></i>',
          label: "Cancel"
        }
      },
      default: "upgrade"
    }).render(true);
  }

  _getNextDie(currentDie) {
    const progression = {
      'd4': 'd6',
      'd6': 'd8',
      'd8': 'd10',
      'd10': 'd12',
      'd12': null
    };
    
    return progression[currentDie] || null;
  }

  async _onChooseCarapace(event) {
    event.preventDefault();
    await CarapaceManager.showSelectionDialog(this.actor);
  }

  async _onCastSpell(event) {
    event.preventDefault();
    await MagicSystem.showCastingDialog(this.actor);
  }
  async _onWeaponAttack(event) {
  event.preventDefault();
  const itemId = event.currentTarget.dataset.itemId;
  const weapon = this.actor.items.get(itemId);
  
  if (weapon) {
    await WeaponSystem.rollAttack(this.actor, weapon);
  }
}

async _onWeaponDamage(event) {
  event.preventDefault();
  const itemId = event.currentTarget.dataset.itemId;
  const weapon = this.actor.items.get(itemId);
  
  if (weapon) {
    await WeaponSystem.rollDamage(this.actor, weapon);
  }
}
}