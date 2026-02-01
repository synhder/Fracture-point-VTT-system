export const LIGHT_MELEE_WEAPONS = [
  {
    name: "Bagh Nakh",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d4",
      range: "Melee",
      weaponType: "melee",
      passiveAbility: "First hit while stealth deals +2 strike.",
      activeAbility: "On hit, if they fail a check (TN 9-13), they drop an item.",
      description: "Light weapon that can be dual wielded.",
      tags: []
    }
  },
  {
    name: "Karambit",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d4",
      range: "Melee",
      weaponType: "melee",
      passiveAbility: "On crit, deal +1 extra damage and target gains bleed status effect.",
      activeAbility: "On hit, move the enemy 1m and gain +1 to your next Dodge roll this round.",
      description: "Light weapon that can be dual wielded.",
      tags: []
    }
  },
  {
    name: "Katar",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d4",
      range: "Melee",
      weaponType: "melee",
      passiveAbility: "On hit, reduce the target's Armor by 1 for the rest of the scene. If their Armor was already 0, they begin Bleeding 1.",
      activeAbility: "Strike with both hands in a brutal twin jab. On hit, deal +1d4 damage. If the target is Bleeding or Stunned, increase the total damage by +2.",
      description: "Light weapon that can be dual wielded.",
      tags: []
    }
  },
  {
    name: "Emeici",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d4",
      range: "Melee",
      weaponType: "melee",
      passiveAbility: "First miss each round gives -1 to target's next roll",
      activeAbility: "Pin and roll a single attack against two adjacent enemies (at -2).",
      description: "Light weapon that can be dual wielded.",
      tags: []
    }
  },
  {
    name: "Needle Blade",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d4",
      range: "Melee",
      weaponType: "melee",
      passiveAbility: "On hit vs unaware target, reduce their DR by 2 for one turn.",
      activeAbility: "On hit, the target must roll and will be slowed if the attack surpasses their Biological.",
      description: "Light weapon that can be dual wielded.",
      tags: []
    }
  },
  {
    name: "Glass Shiv",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d4",
      range: "Melee",
      weaponType: "melee",
      passiveAbility: "On crit, re-roll 1 damage die and keep highest. Shatters on crit failure and it stays buried on target unless they have heavy armor and deal bleed 1d4 for three turns.",
      activeAbility: "Target suffers -1 to Intimidation or Presence checks for the rest of the scene.",
      description: "Light weapon that can be dual wielded.",
      tags: []
    }
  },
  {
    name: "Poison Fang Dagger",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d4",
      range: "Melee",
      weaponType: "melee",
      passiveAbility: "Apply poison status effect on crit and deal +2 if the target is poisoned.",
      activeAbility: "If the target is poisoned, you can increase ED by 1 once per target.",
      description: "Light weapon that can be dual wielded.",
      tags: []
    }
  },
  {
    name: "Throwing Needle",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d4",
      range: "Melee / Thrown 20ft",
      weaponType: "melee",
      passiveAbility: "If the target is below half Stability, they must roll or lose 1 reaction (1 turn).",
      activeAbility: "On hit, the target suffers -1 to all actions for 1 round.",
      description: "Light weapon that can be dual wielded.",
      tags: []
    }
  },
  {
    name: "Wrist Blade",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d4",
      range: "Melee",
      weaponType: "melee",
      passiveAbility: "If you hit with this while undetected, you can immediately grapple the target.",
      activeAbility: "Instantly attack from concealment; if successful, remain undetected until end of round.",
      description: "Light weapon that can be dual wielded.",
      tags: []
    }
  },
  {
    name: "Dagger",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d4",
      range: "Melee",
      weaponType: "melee",
      passiveAbility: "If you spend 1 reaction to Defend and are wielding a dagger, gain +1 DR against melee attacks until the start of your next turn",
      activeAbility: "Gain +1 strike on this attack.",
      description: "Light weapon that can be dual wielded.",
      tags: []
    }
  },
  {
    name: "Hand Axe",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d4",
      range: "Melee",
      weaponType: "melee",
      passiveAbility: "On a crit, you can reduce their armor point by 1.",
      activeAbility: "Make a ranged attack (6m). If it hits, the target suffers -1 DR until the end of your next turn.",
      description: "Light weapon that can be dual wielded.",
      tags: []
    }
  },
  {
    name: "Tonfa",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d4",
      range: "Melee",
      weaponType: "melee",
      passiveAbility: "+1 DR while dual-wielding tonfa",
      activeAbility: "Make two attacks at -1 to hit each. If both hit, the target is Disarmed (drops 1 held item).",
      description: "Light weapon that can be dual wielded.",
      tags: []
    }
  },
  {
    name: "Urumi",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d4",
      range: "Melee",
      weaponType: "melee",
      passiveAbility: "If the Urumi user misses a melee attack, they may reroll the attack once against a different target within reach",
      activeAbility: "Make a melee attack. If it hits, the target must succeed a roll (TN 7-11) or be pulled 2m toward you and staggered.",
      description: "Light weapon that can be dual wielded.",
      tags: []
    }
  }
];

export const LIGHT_RANGED_WEAPONS = [
  {
    name: "Chakram",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d4",
      range: "20m",
      weaponType: "ranged",
      passiveAbility: "You can bounce attacks off targets within 3m.",
      activeAbility: "Throw at enemies within 3m of each other. Each takes +1d4 damage for each target hit.",
      description: "Light ranged weapon.",
      tags: []
    }
  },
  {
    name: "Shuriken",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d4",
      range: "20m",
      weaponType: "ranged",
      passiveAbility: "On active hit, the target suffers -1 to reaction rolls (e.g., dodge, defense) until next turn.",
      activeAbility: "Throw up to 3 shuriken in a cone. All targets take +3 damage and must roll(TN 7-11) or lose 1 AP.",
      description: "Light ranged weapon.",
      tags: []
    }
  },
  {
    name: "Throwing Needle",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d4",
      range: "20m",
      weaponType: "ranged",
      passiveAbility: "When you hit a target that has already acted this round they cannot benefit from dodge against the next attack made",
      activeAbility: "Make a precise throw (TN 7-11): If it hits, reduce the target's max AP by 1 next round.",
      description: "Light ranged weapon.",
      tags: []
    }
  },
  {
    name: "Blowgun",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d4",
      range: "20m",
      weaponType: "ranged",
      passiveAbility: "Does not break Stealth if the attack fails only once.",
      activeAbility: "Attack with poison. If it hits, roll (TN 8-12) or suffer -1 to all rolls for 1 round.",
      description: "Light ranged weapon.",
      tags: []
    }
  },
  {
    name: "Wrist Bolter",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d4",
      range: "20m",
      weaponType: "ranged",
      passiveAbility: "Weapons cannot be disarmed unless the user is fully restrained.",
      activeAbility: "May fire as a free interrupt when an enemy enters your line of sight. Doesn't waste ammo and auto reload",
      description: "Light ranged weapon.",
      tags: []
    }
  },
  {
    name: "Hand Crossbow",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d4",
      range: "20m",
      weaponType: "ranged",
      passiveAbility: "Free reload once per turn if you don't move",
      activeAbility: "Fire twice at separate targets within 6m, both at -1 to hit",
      description: "Light ranged weapon.",
      tags: []
    }
  },
  {
    name: "Shortbow",
    type: "weapon",
    system: {
      attackDie: "1d10+1d6",
      damageDie: "1d4",
      range: "20m",
      weaponType: "ranged",
      passiveAbility: "Attacks do not reveal your position if in light concealment or Veil-afflicted terrain.",
      activeAbility: "Fire with +1 damage die but increase TN by +1.",
      description: "Light ranged weapon.",
      tags: []
    }
  }
];