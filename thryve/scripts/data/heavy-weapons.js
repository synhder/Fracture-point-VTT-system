export const HEAVY_MELEE_WEAPONS = [
  {
    name: "Greatsword",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d8",
      range: "Melee",
      weaponType: "melee",
      passiveAbility: "If you hit two enemies in one turn, the next turn you gain +1 Threat Range (crit on 9-10).",
      activeAbility: "Choose a 2m cone in front of you. All enemies inside must roll (TN 9-13) or take additional 1d8 and be knocked back 1m.",
      description: "Heavy weapon.",
      tags: []
    }
  },
  {
    name: "Warhammer",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d8",
      range: "Melee",
      weaponType: "melee",
      passiveAbility: "If you deal at least 10 damage in one hit, lower the target's armor soak by 1 until repaired.",
      activeAbility: "Strike the ground in a 1m radius. All adjacent enemies must roll (TN 9-13) or be knocked prone and lose 1 AP",
      description: "Heavy weapon.",
      tags: []
    }
  },
  {
    name: "Kanabo",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d8",
      range: "Melee",
      weaponType: "melee",
      passiveAbility: "If you move before attacking, deal +2 damage.",
      activeAbility: "On successful hits, if the target has an effect, increase the target's ED by +1 once per target.",
      description: "Heavy weapon.",
      tags: []
    }
  },
  {
    name: "Zweihander",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d8",
      range: "Melee",
      weaponType: "melee",
      passiveAbility: "On hit, targets with shields lose 1 DR this round.",
      activeAbility: "If the target is using a shield or is in cover, this attack deals +2 damage",
      description: "Heavy weapon.",
      tags: []
    }
  },
  {
    name: "Bradiche",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d8",
      range: "Melee",
      weaponType: "melee",
      passiveAbility: "If you don't move this turn, gain +1 to hit and knockback on your next Bardiche strike.",
      activeAbility: "Sweep in a 3m line. All targets must roll (8-11) or take full damage and be pushed 1m.",
      description: "Heavy weapon.",
      tags: []
    }
  },
  {
    name: "Nzappa Zap",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d8",
      range: "Melee / Thrown 10m",
      weaponType: "melee",
      passiveAbility: "Can be thrown (10m); on crit, bounces to a second enemy within 2m.",
      activeAbility: "Throw the Nzappa zap at a target. If it hits, roll again against a second target within 5m. Each enemy hit regains 1 stability.",
      description: "Heavy weapon.",
      tags: []
    }
  },
  {
    name: "Fangblade",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d8",
      range: "Melee",
      weaponType: "melee",
      passiveAbility: "On a crit, deal a second damage die for free.",
      activeAbility: "On hit, pull the enemy 1m toward you and reduce their AP by 1 next round unless they pass a check (TN 8-12).",
      description: "Heavy weapon.",
      tags: []
    }
  },
  {
    name: "Executioner's Sword",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d8",
      range: "Melee",
      weaponType: "melee",
      passiveAbility: "Attacks against Prone, Stunned, or Restrained targets gain +2 to damage.",
      activeAbility: "If the target is below half total HP (Stability + Body), this strike rolls +1d10 extra damage. If it crits, target gets -1 to all rolls for 1 round",
      description: "Heavy weapon.",
      tags: []
    }
  },
  {
    name: "Grinder Axe",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d8",
      range: "Melee",
      weaponType: "melee",
      passiveAbility: "On hit, the target suffers -1 to defense rolls next round (from rattle/disruption).",
      activeAbility: "Roll damage twice and keep the highest result.",
      description: "Heavy weapon.",
      tags: []
    }
  },
  {
    name: "Warpick",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d8",
      range: "Melee",
      weaponType: "melee",
      passiveAbility: "If you hit a target with heavy armor, increase your damage die by 1",
      activeAbility: "On hit, ignore all but 1 point of Armor. If the target has 0 Stability, inflict Weakened",
      description: "Heavy weapon.",
      tags: []
    }
  },
  {
    name: "Horseman's Flail",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d8",
      range: "Melee",
      weaponType: "melee",
      passiveAbility: "If you miss, your target still takes 1d4 damage.",
      activeAbility: "On hit, reduce the target's movement by half and apply -1 to their next attack.",
      description: "Heavy weapon.",
      tags: []
    }
  },
  {
    name: "Bone Harrower",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d8",
      range: "Melee",
      weaponType: "melee",
      passiveAbility: "If a target dies by your hand, gain a Perma +1 strike until the end of combat.",
      activeAbility: "On hit, regain 1 Body if the target dies this round. Can only trigger once per scene.",
      description: "Heavy weapon.",
      tags: []
    }
  },
  {
    name: "Guandao",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d8",
      range: "Melee (Reach)",
      weaponType: "melee",
      passiveAbility: "On a crit, knock the target 1m sideways and reduce their AP by 1 next turn. Reach",
      activeAbility: "Sweep in a 3m cone. All targets must roll(TN 8-12) or take 2 damage and fall Prone.",
      description: "Heavy weapon with reach.",
      tags: []
    }
  },
  {
    name: "Halberd",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d8",
      range: "Melee (Reach)",
      weaponType: "melee",
      passiveAbility: "If your hit roll is a 9 or 10, apply Bleed 1 or Weakened (your choice). Reach",
      activeAbility: "Strike and then attempt to trip. If the target is Prone after, deal an additional 1d6 damage.",
      description: "Heavy weapon with reach.",
      tags: []
    }
  },
  {
    name: "Naginata",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d8",
      range: "Melee (Reach)",
      weaponType: "melee",
      passiveAbility: "When you Dodge or Parry, your next attack gets +1 to hit. Reach",
      activeAbility: "You may strike two enemies in a 90° arc. If only one target is hit, they suffer -1 Defense next round.",
      description: "Heavy weapon with reach.",
      tags: []
    }
  },
  {
    name: "Ox Tongue Spear",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d8",
      range: "Melee (Reach)",
      weaponType: "melee",
      passiveAbility: "On hit, the enemy cannot Dash until the end of next round. Reach",
      activeAbility: "Throw this weapon. If it hits, the target is Rooted unless they succeed a check (TN 8-12). Must retrieve to reuse.",
      description: "Heavy weapon with reach.",
      tags: []
    }
  },
  {
    name: "Voulge",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d8",
      range: "Melee (Reach)",
      weaponType: "melee",
      passiveAbility: "If you haven't moved this round, gain +1 damage and +1 Defense. Reach",
      activeAbility: "Slam forward, pushing the enemy 1m and reducing their next AP cost by +1 for any movement.",
      description: "Heavy weapon with reach.",
      tags: []
    }
  }
];

export const HEAVY_RANGED_WEAPONS = [
  {
    name: "Gravebow",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d8",
      range: "44m",
      weaponType: "ranged",
      passiveAbility: "If the target dies, the arrow returns to hand.",
      activeAbility: "If it hits, the target cannot be moved or pushed until the end of the next round.",
      description: "Heavy ranged weapon.",
      tags: []
    }
  },
  {
    name: "Spinal Railgun",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d8",
      range: "44m",
      weaponType: "ranged",
      passiveAbility: "On hit, all enemies within 2m of the target take -1 to reactions.",
      activeAbility: "Triple the range. On hit, apply poison if Stability is 0.",
      description: "Heavy ranged weapon.",
      tags: []
    }
  },
  {
    name: "Molten Javelin Gun",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d8",
      range: "44m",
      weaponType: "ranged",
      passiveAbility: "On crit, apply burn at T2.",
      activeAbility: "Splash 1m radius. All targets take 1d6 and must succeed BIO RESIST or suffer Burn.",
      description: "Heavy ranged weapon.",
      tags: []
    }
  },
  {
    name: "Rot Harpooner",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d8",
      range: "44m",
      weaponType: "ranged",
      passiveAbility: "On hit, If the attempt to Dash anyway, they must succeed a check (TN 7-12) or be Rooted",
      activeAbility: "Pull the enemy 2m toward you. If they hit terrain or another enemy, both take 1d4.",
      description: "Heavy ranged weapon.",
      tags: []
    }
  },
  {
    name: "Fangthrower",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d8",
      range: "44m",
      weaponType: "ranged",
      passiveAbility: "When you roll max damage, regain 1 Stability.",
      activeAbility: "Cone attack. All targets roll (TN 7-11) or take 1d6 and suffer Poisoned next round.",
      description: "Heavy ranged weapon.",
      tags: []
    }
  },
  {
    name: "Sniper Rifle",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d8",
      range: "44m",
      weaponType: "ranged",
      passiveAbility: "If stationary, gain +1 strike",
      activeAbility: "Mark a target; allies gain +1 to hit. Your next attack gains +2 strike vs it.",
      description: "Heavy ranged weapon.",
      tags: []
    }
  },
  {
    name: "Shotgun",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d8",
      range: "44m",
      weaponType: "ranged",
      passiveAbility: "On hit, push target 1m if they're within 3m.",
      activeAbility: "Cone (2m). All inside roll AGI (TN 9-13) or take 1d6 and be stagger.",
      description: "Heavy ranged weapon.",
      tags: []
    }
  },
  {
    name: "Suppression Cannon",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d8",
      range: "44m",
      weaponType: "ranged",
      passiveAbility: "On a miss, the target loses 1 AP from suppressive fire.",
      activeAbility: "Choose a 3x3m zone. Targets must roll (TN 8-12) or go Prone + Suppressed.",
      description: "Heavy ranged weapon.",
      tags: []
    }
  }
];