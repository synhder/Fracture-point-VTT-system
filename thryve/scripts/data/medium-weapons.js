export const MEDIUM_MELEE_WEAPONS = [
  {
    name: "Longsword",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d6",
      range: "Melee",
      weaponType: "melee",
      passiveAbility: "If you haven't moved more than 1m, gain +1 DR until your next turn. Dual wield.",
      activeAbility: "You can switch between defense stance (+1 DR) or offense (+1 damage)",
      description: "Medium weapon that can be dual wielded.",
      tags: []
    }
  },
  {
    name: "Battle Axe",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d6",
      range: "Melee",
      weaponType: "melee",
      passiveAbility: "When you roll max damage on one die, gain +1 AP next turn",
      activeAbility: "Make one attack roll and apply it to two adjacent targets in melee. Deal +2 damage to each.",
      description: "Medium weapon.",
      tags: []
    }
  },
  {
    name: "Bo Staff",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d6",
      range: "Melee",
      weaponType: "melee",
      passiveAbility: "While wielding, you may redirect one melee attack targeting an adjacent ally to yourself.",
      activeAbility: "Move 1m and make an attack. If it hits, target gets -1 to all actions until end of your next turn",
      description: "Medium weapon.",
      tags: []
    }
  },
  {
    name: "Hammer",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d6",
      range: "Melee",
      weaponType: "melee",
      passiveAbility: "Once per round, if you deal 6 or more damage with a hammer attack, the target suffers -1 to their next defense roll.",
      activeAbility: "Strike a surface or object. Crack or breach it. Can also destroy cover within 1m.",
      description: "Medium weapon.",
      tags: []
    }
  },
  {
    name: "Khopesh",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d6",
      range: "Melee",
      weaponType: "melee",
      passiveAbility: "On hit, if the target has a shield or parry weapon -1 to their guard or block roll. If unarmed, push them 1m",
      activeAbility: "Once per round if you hit one target successfully, they cannot use any cover.",
      description: "Medium weapon.",
      tags: []
    }
  },
  {
    name: "Macuahuitl",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d6",
      range: "Melee",
      weaponType: "melee",
      passiveAbility: "On crit, reduce the target's armor by 1.",
      activeAbility: "Sweep in a 2m arc. Roll 1 attack against all targets. Gain +1 Stability per target hit.",
      description: "Medium weapon.",
      tags: []
    }
  },
  {
    name: "Yatagan",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d6",
      range: "Melee",
      weaponType: "melee",
      passiveAbility: "If you struck with an active last round, gain +1 to damage with this weapon this round.",
      activeAbility: "Dash 2m, then attack. If the target is already engaged, they suffer -1 Defense against this strike.",
      description: "Medium weapon.",
      tags: []
    }
  },
  {
    name: "Kukri",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d6",
      range: "Melee",
      weaponType: "melee",
      passiveAbility: "Attacks deal +1 damage if the target has 3 stability or less remaining",
      activeAbility: "On hit, the target must roll (TN 8-12) or become Slowed for 1 round.",
      description: "Medium weapon.",
      tags: []
    }
  },
  {
    name: "Liuyedao",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d6",
      range: "Melee",
      weaponType: "melee",
      passiveAbility: "If you move before attacking, add +1 to strike.",
      activeAbility: "Dash up to 2m. If you hit, you may immediately shift 1m in any direction after, not triggering an attack of opportunity.",
      description: "Medium weapon.",
      tags: []
    }
  },
  {
    name: "Mambele",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d6",
      range: "Melee / Thrown 10m",
      weaponType: "melee",
      passiveAbility: "Weapons can be thrown (10m range). If it crits, it returns to hand. Dual wield",
      activeAbility: "Throw in a 5m line. All enemies in path take 1d4 damage and must roll (TN 7-11) or fall Prone.",
      description: "Medium weapon that can be dual wielded.",
      tags: []
    }
  },
  {
    name: "Cutlass",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d6",
      range: "Melee",
      weaponType: "melee",
      passiveAbility: "On hit, if you're flanking, deal +1 damage and gain +1 to parry rolls until your next turn. Dual wield",
      activeAbility: "Attempt to trip or push target 1m on a hit. If successful, your next strike this round gains +2 to hit.",
      description: "Medium weapon that can be dual wielded.",
      tags: []
    }
  },
  {
    name: "Misericorde",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d6",
      range: "Melee",
      weaponType: "melee",
      passiveAbility: "When attacking a Prone, or 0 Stability target, gain +1d4 damage.",
      activeAbility: "If the target is at or below half Body, this attack ignores one effect of their armor.",
      description: "Medium weapon.",
      tags: []
    }
  },
  {
    name: "Falcata",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d6",
      range: "Melee",
      weaponType: "melee",
      passiveAbility: "On a crit, you may immediately reposition 3m.",
      activeAbility: "Deliver a crushing overhead strike. On hit, gain an additional damage die. If this drops the target's Stability to 0 or lower, they must roll (TN 8-12) or bleed effect.",
      description: "Medium weapon.",
      tags: []
    }
  },
  {
    name: "Baseball Bat",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d6",
      range: "Melee",
      weaponType: "melee",
      passiveAbility: "Can use ranged attacks similar to a light ranged.",
      activeAbility: "Can damage the armor dealing 2 ArP but only deal 1d4 damage. But at a -1 to hit.",
      description: "Medium weapon.",
      tags: []
    }
  },
  {
    name: "Arming Sword",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d6",
      range: "Melee",
      weaponType: "melee",
      passiveAbility: "You may reroll 1s on your damage die once per turn. Dual wield",
      activeAbility: "Until your next turn, if you are missed by an attack, you may immediately counterattack for +1d4 damage.",
      description: "Medium weapon that can be dual wielded.",
      tags: []
    }
  },
  {
    name: "Trisula",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d6",
      range: "Melee (Reach)",
      weaponType: "melee",
      passiveAbility: "If this attack hits, the target's movement is halved next round. If they move anyway, they take 1d4 damage. Reach",
      activeAbility: "When doing an attack of opportunity, you can suppress a target's reactions until the start of your next turn.",
      description: "Medium weapon with reach.",
      tags: []
    }
  },
  {
    name: "Sibat",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d6",
      range: "Melee (Reach)",
      weaponType: "melee",
      passiveAbility: "If you hit with active, you may move 1m immediately after without provoking reactions.",
      activeAbility: "Make a thrusting attack. If it hits, you may shift 2m in any direction and the target cannot make opportunity attacks until their next turn.",
      description: "Medium weapon with reach.",
      tags: []
    }
  },
  {
    name: "Short Glaive",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d6",
      range: "Melee (Reach)",
      weaponType: "melee",
      passiveAbility: "When fighting more than 1 enemy in melee, gain +1 to hit. Reach",
      activeAbility: "Strike 2 enemies in adjacent squares. On success to one or both they cannot flank the next round.",
      description: "Medium weapon with reach.",
      tags: []
    }
  },
  {
    name: "Qiang",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d6",
      range: "Melee (Reach)",
      weaponType: "melee",
      passiveAbility: "If an enemy moves into melee range, you may immediately roll a free parry (1/round). Reach",
      activeAbility: "On hit, ignore enemy spell defenses (e.g., shield, negation) this turn.",
      description: "Medium weapon with reach.",
      tags: []
    }
  },
  {
    name: "Boar Spear",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d6",
      range: "Melee (Reach)",
      weaponType: "melee",
      passiveAbility: "If you haven't moved this round, gain +1 damage on the next hit. Reach",
      activeAbility: "If the target moved toward you this round, deal +2 damage and reduce their movement next round by 2m.",
      description: "Medium weapon with reach.",
      tags: []
    }
  }
];

export const MEDIUM_RANGED_WEAPONS = [
  {
    name: "Atlatl",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d6",
      range: "32m",
      weaponType: "ranged",
      passiveAbility: "If you haven't moved this turn, add +1 strike.",
      activeAbility: "Fire at a high arc; hits next round, ignoring cover and Shields.",
      description: "Medium ranged weapon.",
      tags: []
    }
  },
  {
    name: "Cho Ku No",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d6",
      range: "32m",
      weaponType: "ranged",
      passiveAbility: "Attack can strike at two opponents however the second attack will have -2 to your attack roll.",
      activeAbility: "Fire 3 shots at up to 3 targets. Each deals +1d4 damage.",
      description: "Medium ranged weapon.",
      tags: []
    }
  },
  {
    name: "Boomerang",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d6",
      range: "32m",
      weaponType: "ranged",
      passiveAbility: "If it misses, roll (TN 9-6) to catch it automatically and ready it again",
      activeAbility: "Throw in a wide 90° arc. All in that arc roll (TN 8-11) or take +1d4 damage and are staggered.",
      description: "Medium ranged weapon.",
      tags: []
    }
  },
  {
    name: "Spine Quillgun",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d6",
      range: "32m",
      weaponType: "ranged",
      passiveAbility: "Regains 1 ammo per rest automatically",
      activeAbility: "Roll damage twice; choose higher, target loses 1 max stability and body.",
      description: "Medium ranged weapon.",
      tags: []
    }
  },
  {
    name: "Hand Cannon",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d6",
      range: "32m",
      weaponType: "ranged",
      passiveAbility: "If you're within 3m of the target, gain +1 to strike.",
      activeAbility: "Fire with +3 damage but take -1 to all rolls until the end of your next turn",
      description: "Medium ranged weapon.",
      tags: []
    }
  },
  {
    name: "Burst Rifle",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d6",
      range: "32m",
      weaponType: "ranged",
      passiveAbility: "Can hit the target next to original target at -1 damage",
      activeAbility: "Fire 3 bullets at one target. Each hit beyond the first adds +1 bonus damage.",
      description: "Medium ranged weapon.",
      tags: []
    }
  },
  {
    name: "Biolash Spitter",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d6",
      range: "32m",
      weaponType: "ranged",
      passiveAbility: "On hit, the target gains Caustic Mark: if they take movement, they suffer 1 extra damage from environmental sources or opportunity attacks.",
      activeAbility: "2m cone; all targets roll (TN 9-13) or take +1d4 per target failed.",
      description: "Medium ranged weapon.",
      tags: []
    }
  },
  {
    name: "Injector Launcher",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d6",
      range: "32m",
      weaponType: "ranged",
      passiveAbility: "On hit, the target is tagged +1 to locate in stealth for 1 turn.",
      activeAbility: "Fire a stim/venom payload at an ally or enemy. Gives +/-2 to intended target",
      description: "Medium ranged weapon.",
      tags: []
    }
  }
];