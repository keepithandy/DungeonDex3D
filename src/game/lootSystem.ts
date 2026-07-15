import { Rarity, Weapon, Armor, LootItem } from "./store";

const RARITY_COLORS: Record<Rarity, string> = {
  common: "#aaaaaa",
  uncommon: "#1eff00",
  rare: "#0070dd",
  epic: "#a335ee",
  legendary: "#ff8000",
};

const RARITY_WEIGHTS: Record<Rarity, number> = {
  common: 55,
  uncommon: 25,
  rare: 12,
  epic: 6,
  legendary: 2,
};

const WEAPON_NAMES: Record<string, string[]> = {
  common: ["Iron Sword", "Rusty Axe", "Wooden Club", "Chipped Dagger"],
  uncommon: ["Steel Blade", "Battle Axe", "Spiked Mace", "Silver Dagger"],
  rare: ["Elven Longsword", "Dwarf Cleaver", "Shadow Blade", "Viper Fang"],
  epic: ["Arcane Saber", "Void Reaper", "Chaos Axe", "Dragon Tooth"],
  legendary: ["Excalibur", "Ragnarok", "Doomhammer", "Soul Edge"],
};

const ARMOR_NAMES: Record<string, string[]> = {
  common: ["Leather Vest", "Iron Plate", "Padded Tunic", "Wood Shield"],
  uncommon: ["Chain Mail", "Steel Breastplate", "Hardened Leather", "Iron Shield"],
  rare: ["Mithril Armor", "Knight's Plate", "Shadow Cloak", "Dragon Scale"],
  epic: ["Arcane Plate", "Void Armor", "Chaos Mail", "Titan Vest"],
  legendary: ["Divine Armor", "God's Aegis", "Eternal Shell", "Infernal Plate"],
};

function pickRarity(depth: number): Rarity {
  const bonusEpic = Math.min(depth * 0.5, 8);
  const bonusRare = Math.min(depth * 1, 15);
  const weights = {
    common: Math.max(RARITY_WEIGHTS.common - depth * 2, 20),
    uncommon: RARITY_WEIGHTS.uncommon,
    rare: RARITY_WEIGHTS.rare + bonusRare,
    epic: RARITY_WEIGHTS.epic + bonusEpic,
    legendary: RARITY_WEIGHTS.legendary + Math.min(depth * 0.2, 3),
  };
  const total = Object.values(weights).reduce((a, b) => a + b, 0);
  let rand = Math.random() * total;
  for (const [rarity, weight] of Object.entries(weights)) {
    rand -= weight;
    if (rand <= 0) return rarity as Rarity;
  }
  return "common";
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateWeapon(depth: number): Weapon {
  const rarity = pickRarity(depth);
  const scaleMult = 1 + depth * 0.18;
  const rarityMult: Record<Rarity, number> = {
    common: 1,
    uncommon: 1.3,
    rare: 1.7,
    epic: 2.3,
    legendary: 3.5,
  };
  const mult = scaleMult * rarityMult[rarity];
  return {
    id: `weapon-${Date.now()}-${Math.random()}`,
    name: pick(WEAPON_NAMES[rarity]),
    damage: Math.round(8 * mult),
    fireRate: parseFloat((1.5 + Math.random() * 1.5 * (rarityMult[rarity] * 0.3)).toFixed(1)),
    range: Math.round(18 + rarityMult[rarity] * 4),
    rarity,
    color: RARITY_COLORS[rarity],
  };
}

function generateArmor(depth: number): Armor {
  const rarity = pickRarity(depth);
  const scaleMult = 1 + depth * 0.15;
  const rarityMult: Record<Rarity, number> = {
    common: 1,
    uncommon: 1.3,
    rare: 1.7,
    epic: 2.3,
    legendary: 3.5,
  };
  const mult = scaleMult * rarityMult[rarity];
  return {
    id: `armor-${Date.now()}-${Math.random()}`,
    name: pick(ARMOR_NAMES[rarity]),
    defense: Math.round(3 * mult),
    maxHpBonus: Math.round(10 * mult),
    rarity,
    color: RARITY_COLORS[rarity],
  };
}

export function generateLootDrop(
  position: [number, number, number],
  depth: number
): LootItem {
  if (Math.random() < 0.5) {
    return { type: "weapon", item: generateWeapon(depth) };
  }
  return { type: "armor", item: generateArmor(depth) };
}

export function rarityLabel(rarity: Rarity): string {
  return rarity.charAt(0).toUpperCase() + rarity.slice(1);
}

export { RARITY_COLORS };
