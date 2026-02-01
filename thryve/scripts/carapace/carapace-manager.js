/**
 * Carapace Management System
 * Handles all carapace data and selection
 */

export class CarapaceManager {
  
  /**
   * Get all available carapaces
   */
  static getCarapaces() {
    return {
      "veil": {
        name: "Veil Adaptation",
        stabilityBonus: 8,
        ability: "Once per scene, activate a 3m bubble. Everyone will ignore you unless they are close by (still with disadvantage to confirm you are there)."
      },
      "exo": {
        name: "Exo",
        stabilityBonus: 15,
        ability: "Load Redistribution - Once per scene, ignore terrain difficulties and gain advantage to strength tasks."
      },
      "bulwark": {
        name: "Bulwark",
        stabilityBonus: 12,
        ability: "Anchor Pressure - Once per scene create a 5m safety bubble, halving damage or creating a safe zone."
      },
      "weapons": {
        name: "Weapons",
        stabilityBonus: 7,
        ability: "Intent Shaping - Create weapons or tools (small tools, non-expendable) to fit the problem at hand, 3 times per scene."
      },
      "beast": {
        name: "Beast",
        stabilityBonus: 14,
        ability: "Distributed Agency - Your frame can shift into a beast, allowing you to be at 2 places at once. When you run out of stability, this ability is lost until recovered. Stability is halved during combat and they have 2 AP."
      },
      "controller": {
        name: "Controller",
        stabilityBonus: 11,
        ability: "Environmental Imprint - Once per scene, reshape terrain within 35m. Only once if in combat."
      },
      "conduit": {
        name: "Conduit",
        stabilityBonus: 13,
        ability: "Resonant Meditation - Once per scene, regain all Magic Gems spent without needing to rest."
      },
      "ccf": {
        name: "CCF (Close Combat Frame)",
        stabilityBonus: 12,
        ability: "Embodied Training - Up to 3 times per scene gain advantage from climbing, grappling, forcing movement, breaking restraint. Your punches go from 1d4 to 1d6 and will scale similar to medium weapons."
      },
      "construct": {
        name: "Construct",
        stabilityBonus: 9,
        ability: "Nanobots - Use nanobots to hack or fight alongside you, forming up to two turrets. Each turret has 3 Stability (removed from your total) and 1 AP each."
      }
    };
  }
  
  /**
   * Get a specific carapace by key
   */
  static getCarapace(key) {
    return this.getCarapaces()[key] || null;
  }
  
  /**
   * Apply a carapace to an actor
   */
  static async applyToActor(actor, carapaceKey) {
    const carapace = this.getCarapace(carapaceKey);
    
    if (!carapace) {
      ui.notifications.error("Invalid carapace!");
      return false;
    }
    
    await actor.update({
      'system.carapace.name': carapace.name,
      'system.carapace.stabilityBonus': carapace.stabilityBonus,
      'system.carapace.ability': carapace.ability
    });
    
    ui.notifications.info(`Applied carapace: ${carapace.name}!`);
    return true;
  }
  
  /**
   * Create carapace selection dialog
   */
  static async showSelectionDialog(actor) {
    const carapaces = this.getCarapaces();
    
    // Build dialog content
    let content = '<div class="carapace-selection">';
    content += '<p>Choose your Carapace:</p>';
    content += '<select id="carapace-select" style="width: 100%; padding: 5px; margin-bottom: 10px;">';
    
    for (let [key, carapace] of Object.entries(carapaces)) {
      content += `<option value="${key}">${carapace.name} (+${carapace.stabilityBonus} Stability)</option>`;
    }
    
    content += '</select>';
    content += '<div id="carapace-description" style="padding: 10px; background: rgba(0,0,0,0.1); border-radius: 5px; margin-top: 10px;"></div>';
    content += '</div>';
    
    // Create dialog
    return new Promise((resolve) => {
      new Dialog({
        title: "Choose Carapace",
        content: content,
        buttons: {
          apply: {
            icon: '<i class="fas fa-check"></i>',
            label: "Apply",
            callback: async (html) => {
              const selectedKey = html.find('#carapace-select').val();
              const success = await this.applyToActor(actor, selectedKey);
              resolve(success);
            }
          },
          cancel: {
            icon: '<i class="fas fa-times"></i>',
            label: "Cancel",
            callback: () => resolve(false)
          }
        },
        default: "apply",
        render: (html) => {
          // Update description when selection changes
          const updateDescription = () => {
            const selectedKey = html.find('#carapace-select').val();
            const carapace = carapaces[selectedKey];
            
            let desc = `<strong>${carapace.name}</strong><br>`;
            desc += `<strong>Stability Bonus:</strong> +${carapace.stabilityBonus}<br><br>`;
            desc += `<strong>Ability:</strong><br>${carapace.ability}`;
            
            html.find('#carapace-description').html(desc);
          };
          
          html.find('#carapace-select').change(updateDescription);
          updateDescription(); // Initial description
        }
      }).render(true);
    });
  }
}