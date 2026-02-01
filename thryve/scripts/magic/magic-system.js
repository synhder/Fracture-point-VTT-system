/**
 * Magic System
 * Handles spell casting for both characters and NPCs
 */

export class MagicSystem {
  
  /**
   * Show spell casting dialog
   * @param {Actor} actor - The actor casting the spell
   */
 static async showCastingDialog(actor) {
  const actorData = actor.system;
  const currentHumor = actorData.humor.value;
  
  // Get modifiers - characters/NPCs have attributes, monsters don't
  let intMod = 0;
  let resolveMod = 0;
  
  if (actorData.attributes) {
    intMod = actorData.attributes.intellect?.mod || 0;
    resolveMod = actorData.attributes.willpower?.mod || 0;
  }    
    let content = `
      <div class="spell-builder">
        <p><strong>Current Humor:</strong> ${currentHumor} / ${actorData.humor.max}</p>
        
        <div class="form-group">
          <label>Verb(s)</label>
          <select id="verb-primary">
            <option value="harm">Harm (Damage)</option>
            <option value="shield">Shield (Temp HP)</option>
            <option value="change">Change (Manipulate)</option>
            <option value="rejuvenate">Rejuvenate (Heal)</option>
            <option value="sustain">Sustain (Over Time)</option>
          </select>
        </div>
        
        <div class="form-group">
          <input type="checkbox" id="use-second-verb">
          <label for="use-second-verb">Use Second Verb (+2 Humor)</label>
          <select id="verb-secondary" disabled>
            <option value="">None</option>
            <option value="harm">Harm</option>
            <option value="shield">Shield</option>
            <option value="change">Change</option>
            <option value="rejuvenate">Rejuvenate</option>
            <option value="sustain">Sustain</option>
          </select>
        </div>
        
        <div class="form-group">
          <label>Element</label>
          <select id="element">
            <option value="lightning">Lightning</option>
            <option value="fire">Fire</option>
            <option value="ice">Ice</option>
            <option value="water">Water</option>
            <option value="earth">Earth</option>
            <option value="wind">Wind</option>
            <option value="glass">Glass</option>
            <option value="bone">Bone</option>
          </select>
        </div>
        
        <div class="form-group">
          <label>Seed (Optional)</label>
          <input type="text" id="seed" placeholder="Special condition...">
        </div>
        
        <hr>
        
        <div class="form-group">
          <label>Power Type</label>
          <input type="radio" name="power-type" value="damage" id="power-damage" checked>
          <label for="power-damage">Damage/Healing Dice</label>
          <br>
          <input type="radio" name="power-type" value="shape" id="power-shape">
          <label for="power-shape">Shape/Size</label>
        </div>
        
        <div id="damage-options">
          <label>Extra Dice (Max 2 additional)</label>
          <input type="number" id="extra-dice" min="0" max="2" value="0">
          <p><em>Cost: <span id="extra-dice-cost">0</span> Humor</em></p>
        </div>
        
        <div id="shape-options" style="display:none;">
          <label>Shape</label>
          <select id="shape">
            <option value="cone">Cone</option>
            <option value="circle">Circle</option>
            <option value="square">Square</option>
            <option value="line">Line</option>
          </select>
          <br>
          <label>Extra Size (starts at 3m)</label>
          <input type="number" id="extra-size" min="0" max="10" value="0">
          <p><em>Cost: <span id="extra-size-cost">0</span> Humor</em></p>
        </div>
        
        <hr>
        <p><strong>Total Humor Cost: <span id="total-cost">0</span></strong></p>
      </div>
    `;
    
    return new Dialog({
      title: "Cast Spell",
      content: content,
      buttons: {
        cast: {
          icon: '<i class="fas fa-magic"></i>',
          label: "Cast Spell",
          callback: async (html) => {
            await this._executeSpell(actor, html);
          }
        },
        convert: {
          icon: '<i class="fas fa-heart-broken"></i>',
          label: "Convert HP → Humor",
          callback: async () => {
            await this.convertHPToHumor(actor);
            this.showCastingDialog(actor); // Reopen dialog
          }
        },
        cancel: {
          icon: '<i class="fas fa-times"></i>',
          label: "Cancel"
        }
      },
      default: "cast",
      render: (html) => {
        html.find('#use-second-verb').change((e) => {
          html.find('#verb-secondary').prop('disabled', !e.target.checked);
          this._updateSpellCost(html);
        });
        
        html.find('input[name="power-type"]').change((e) => {
          if (e.target.value === 'damage') {
            html.find('#damage-options').show();
            html.find('#shape-options').hide();
          } else {
            html.find('#damage-options').hide();
            html.find('#shape-options').show();
          }
          this._updateSpellCost(html);
        });
        
        html.find('#extra-dice').change(() => this._updateSpellCost(html));
        html.find('#extra-size').change(() => this._updateSpellCost(html));
        
        this._updateSpellCost(html);
      }
    }).render(true);
  }
  
  /**
   * Update spell cost display
   * @private
   */
  static _updateSpellCost(html) {
    let cost = 0;
    
    if (html.find('#use-second-verb').is(':checked')) {
      cost += 2;
    }
    
    const powerType = html.find('input[name="power-type"]:checked').val();
    if (powerType === 'damage') {
      const extraDice = parseInt(html.find('#extra-dice').val()) || 0;
      cost += extraDice;
      html.find('#extra-dice-cost').text(extraDice);
    } else {
      const extraSize = parseInt(html.find('#extra-size').val()) || 0;
      cost += extraSize;
      html.find('#extra-size-cost').text(extraSize);
    }
    
    html.find('#total-cost').text(cost);
  }
  
  /**
   * Execute the spell
   * @private
   */
  static async _executeSpell(actor, html) {
    const actorData = actor.system;
    const currentHumor = actorData.humor.value;
    
    const verb1 = html.find('#verb-primary').val();
    const useSecondVerb = html.find('#use-second-verb').is(':checked');
    const verb2 = useSecondVerb ? html.find('#verb-secondary').val() : null;
    const element = html.find('#element').val();
    const seed = html.find('#seed').val();
    const powerType = html.find('input[name="power-type"]:checked').val();
    
    let cost = useSecondVerb ? 2 : 0;
    let diceCount = 2;
    let diceType = (verb1 === 'rejuvenate' || verb2 === 'rejuvenate') ? 'd4' : 'd6';
    let shape = '';
    let size = 3;
    
    if (powerType === 'damage') {
      const extraDice = parseInt(html.find('#extra-dice').val()) || 0;
      cost += extraDice;
      diceCount += extraDice;
      if (diceCount > 4) diceCount = 4;
    } else {
      shape = html.find('#shape').val();
      const extraSize = parseInt(html.find('#extra-size').val()) || 0;
      cost += extraSize;
      size += extraSize;
    }
    
    if (cost > currentHumor) {
      ui.notifications.warn("Not enough Humor to cast this spell!");
      return;
    }
    
    await actor.update({
      'system.humor.value': currentHumor - cost
    });
    
    let spellDesc = `**${verb1.charAt(0).toUpperCase() + verb1.slice(1)}**`;
    if (verb2) spellDesc += ` + **${verb2.charAt(0).toUpperCase() + verb2.slice(1)}**`;
    spellDesc += ` (${element.charAt(0).toUpperCase() + element.slice(1)})`;
    if (seed) spellDesc += ` - *${seed}*`;
    
    if (powerType === 'damage') {
      spellDesc += `<br><strong>Effect:</strong> ${diceCount}${diceType}`;
    } else {
      spellDesc += `<br><strong>Shape:</strong> ${shape.charAt(0).toUpperCase() + shape.slice(1)} (${size}m)`;
    }
    
    const resolveMod = actorData.attributes.willpower.mod || 0;
    const intMod = actorData.attributes.intellect.mod || 0;
    const spellRoll = new Roll(`1d10 + ${resolveMod + intMod}`);
    await spellRoll.evaluate();
    
    let effectRoll = null;
    if (powerType === 'damage' && (verb1 === 'harm' || verb1 === 'rejuvenate' || verb2 === 'harm' || verb2 === 'rejuvenate')) {
      effectRoll = new Roll(`${diceCount}${diceType}`);
      await effectRoll.evaluate();
    }
    
    let chatContent = `
      <div class="spell-cast">
        <h3>Spell Cast</h3>
        ${spellDesc}
        <hr>
        <p><strong>Casting Roll (Resolve + INT):</strong> ${spellRoll.total}</p>
    `;
    
    if (effectRoll) {
      chatContent += `<p><strong>${verb1 === 'rejuvenate' || verb2 === 'rejuvenate' ? 'Healing' : 'Damage'}:</strong> ${effectRoll.total}</p>`;
    }
    
    chatContent += `<p><em>Humor Spent: ${cost}</em></p></div>`;
    
    ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: actor }),
      content: chatContent,
      rolls: effectRoll ? [spellRoll, effectRoll] : [spellRoll]
    });
    
    ui.notifications.info(`Spell cast! Spent ${cost} Humor.`);
  }
  
  /**
   * Convert HP to Humor
   */
  static async convertHPToHumor(actor) {
    const actorData = actor.system;
    
    if (actorData.stability.value > 0) {
      await actor.update({
        'system.stability.value': actorData.stability.value - 1,
        'system.humor.value': Math.min(actorData.humor.value + 6, actorData.humor.max)
      });
      ui.notifications.info("Converted 1 Stability → 6 Humor!");
    } else if (actorData.body.value > 0) {
      await actor.update({
        'system.body.value': actorData.body.value - 1,
        'system.humor.value': Math.min(actorData.humor.value + 6, actorData.humor.max)
      });
      ui.notifications.info("Converted 1 Body → 6 Humor!");
    } else {
      ui.notifications.warn("No HP left to convert!");
    }
  }
}