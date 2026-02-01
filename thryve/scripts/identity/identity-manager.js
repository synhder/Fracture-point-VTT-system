/**
 * Identity Management System
 * Handles all identity data and selection
 */

export class IdentityManager {
  
  /**
   * Get all available identities
   */
  static getIdentities() {
    return {
      "enforcer": {
        name: "Enforcer",
        description: "Strong and intimidating, excels at physical force and leadership.",
        skills: {
          force: "d10",
          influence: "d8",
          resolve: "d8",
          awareness: "d6",
          mobility: "d6",
          finesse: "d4",
          deception: "d4",
          systems: "d4"
        },
        bodyBonus: 1,
        stabilityBonus: 0
      },
      "operative": {
        name: "Operative",
        description: "Stealthy and precise, masters of infiltration and deception.",
        skills: {
          finesse: "d10",
          mobility: "d8",
          deception: "d8",
          awareness: "d6",
          systems: "d6",
          influence: "d4",
          force: "d4",
          resolve: "d4"
        },
        bodyBonus: 0,
        stabilityBonus: 1
      },
      "scav": {
        name: "Scav",
        description: "Expert scavengers, highly aware and technically skilled.",
        skills: {
          systems: "d10",
          awareness: "d10",
          finesse: "d8",
          resolve: "d8",
          mobility: "d6",
          deception: "d6",
          force: "d4",
          influence: "d4"
        },
        bodyBonus: 0,
        stabilityBonus: 0,
        choice: true
      },
      "hunter": {
        name: "Hunter",
        description: "Trackers and wilderness experts, highly perceptive.",
        skills: {
          awareness: "d10",
          mobility: "d8",
          finesse: "d8",
          resolve: "d6",
          force: "d6",
          systems: "d4",
          influence: "d4",
          deception: "d4"
        },
        bodyBonus: 1,
        stabilityBonus: 0
      },
      "brawler": {
        name: "Brawler",
        description: "Tough fighters who rely on raw strength and resilience.",
        skills: {
          force: "d10",
          resolve: "d8",
          awareness: "d8",
          finesse: "d6",
          mobility: "d6",
          influence: "d4",
          deception: "d4",
          systems: "d4"
        },
        bodyBonus: 1,
        stabilityBonus: 0
      },
      "runner": {
        name: "Runner",
        description: "Fast and evasive, experts at getting in and out quickly.",
        skills: {
          mobility: "d10",
          awareness: "d8",
          deception: "d8",
          finesse: "d6",
          influence: "d6",
          force: "d4",
          resolve: "d4",
          systems: "d4"
        },
        bodyBonus: 0,
        stabilityBonus: 1
      },
      "gearhead": {
        name: "Gearhead",
        description: "Technical wizards who can fix or build anything.",
        skills: {
          systems: "d10",
          finesse: "d8",
          awareness: "d8",
          resolve: "d6",
          influence: "d6",
          force: "d4",
          mobility: "d4",
          deception: "d4"
        },
        bodyBonus: 0,
        stabilityBonus: 0,
        choice: true
      },
      "medic": {
        name: "Medic",
        description: "Healers and support specialists, calm under pressure.",
        skills: {
          resolve: "d10",
          systems: "d8",
          awareness: "d8",
          influence: "d6",
          finesse: "d6",
          force: "d4",
          mobility: "d4",
          deception: "d4"
        },
        bodyBonus: 0,
        stabilityBonus: 1
      },
      "sciencenerd": {
        name: "Science Nerd",
        description: "Brilliant researchers with extensive technical knowledge.",
        skills: {
          systems: "d10",
          awareness: "d8",
          finesse: "d8",
          resolve: "d6",
          influence: "d6",
          force: "d4",
          mobility: "d4",
          deception: "d4"
        },
        bodyBonus: 0,
        stabilityBonus: 1
      },
      "dealer": {
        name: "Dealer",
        description: "Smooth talkers and negotiators, always making deals.",
        skills: {
          influence: "d10",
          awareness: "d8",
          deception: "d8",
          resolve: "d6",
          systems: "d6",
          force: "d4",
          finesse: "d4",
          mobility: "d4"
        },
        bodyBonus: 0,
        stabilityBonus: 1
      },
      "diver": {
        name: "Diver",
        description: "Virtual reality specialists, hackers of the digital realm.",
        skills: {
          systems: "d10",
          awareness: "d8",
          resolve: "d8",
          finesse: "d6",
          mobility: "d6",
          force: "d4",
          influence: "d4",
          deception: "d4"
        },
        bodyBonus: 0,
        stabilityBonus: 1
      },
      "survivalist": {
        name: "Survivalist",
        description: "Hardy individuals who thrive in the harshest conditions.",
        skills: {
          awareness: "d10",
          resolve: "d8",
          systems: "d8",
          finesse: "d6",
          mobility: "d6",
          force: "d4",
          influence: "d4",
          deception: "d4"
        },
        bodyBonus: 0,
        stabilityBonus: 0,
        choice: true
      }
    };
  }
  
  /**
   * Get a specific identity by key
   */
  static getIdentity(key) {
    return this.getIdentities()[key] || null;
  }
  
  /**
   * Show identity selection dialog
   */
  static async showSelectionDialog(actor) {
    const identities = this.getIdentities();
    
    let content = '<div class="identity-selection">';
    content += '<p>Choose your identity:</p>';
    content += '<select id="identity-select" style="width: 100%; padding: 5px; margin-bottom: 10px;">';
    
    for (let [key, identity] of Object.entries(identities)) {
      content += `<option value="${key}">${identity.name}</option>`;
    }
    
    content += '</select>';
    content += '<div id="identity-description" style="padding: 10px; background: rgba(0,0,0,0.1); border-radius: 5px; margin-top: 10px;"></div>';
    content += '</div>';
    
    return new Promise((resolve) => {
      new Dialog({
        title: "Choose Identity",
        content: content,
        buttons: {
          apply: {
            icon: '<i class="fas fa-check"></i>',
            label: "Apply",
            callback: async (html) => {
              const selectedKey = html.find('#identity-select').val();
              const identity = identities[selectedKey];
              
              if (!identity) {
                resolve(false);
                return;
              }
              
              // Handle choice-based identities (Scav, Gearhead, Survivalist)
              if (identity.choice) {
                const choiceDialog = await new Promise((resolveChoice) => {
                  new Dialog({
                    title: "Choose Bonus",
                    content: `<p>As a <strong>${identity.name}</strong>, choose your bonus:</p>`,
                    buttons: {
                      body: {
                        icon: '<i class="fas fa-heart"></i>',
                        label: "+1 Max Body",
                        callback: () => resolveChoice("body")
                      },
                      stability: {
                        icon: '<i class="fas fa-shield-alt"></i>',
                        label: "+1 Max Stability",
                        callback: () => resolveChoice("stability")
                      }
                    },
                    default: "body"
                  }).render(true);
                });
                
                if (choiceDialog === "body") {
                  identity.bodyBonus = 1;
                  identity.stabilityBonus = 0;
                } else {
                  identity.bodyBonus = 0;
                  identity.stabilityBonus = 1;
                }
              }
              
              // Apply identity to actor
              await actor.applyIdentity(
                identity.name,
                identity.skills,
                identity.bodyBonus,
                identity.stabilityBonus
              );
              
              ui.notifications.info(`Applied ${identity.name} identity!`);
              resolve(true);
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
          const updateDescription = () => {
            const selectedKey = html.find('#identity-select').val();
            const identity = identities[selectedKey];
            
            let desc = `<strong>${identity.name}</strong><br>`;
            desc += `<em>${identity.description}</em><br><br>`;
            desc += `<strong>Skills:</strong><br>`;
            
            for (let [skillKey, die] of Object.entries(identity.skills)) {
              const skillName = skillKey.charAt(0).toUpperCase() + skillKey.slice(1);
              desc += `${skillName}: ${die}<br>`;
            }
            
            desc += `<br><strong>Bonus:</strong> `;
            if (identity.choice) {
              desc += `+1 max Body OR Stability (your choice)`;
            } else if (identity.bodyBonus) {
              desc += `+1 max Body`;
            } else if (identity.stabilityBonus) {
              desc += `+1 max Stability`;
            }
            
            html.find('#identity-description').html(desc);
          };
          
          html.find('#identity-select').change(updateDescription);
          updateDescription();
        }
      }).render(true);
    });
  }
}