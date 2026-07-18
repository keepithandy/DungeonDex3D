import { create } from "zustand";
import {
  enqueueNotification,
  tickNotificationState,
  type NotificationEntry,
} from "./notificationQueue.mjs";

export type Rarity = "common" | "uncommon" | "rare" | "epic" | "legendary";

export interface Weapon {
  id: string;
  name: string;
  damage: number;
  fireRate: number;
  range: number;
  rarity: Rarity;
  color: string;
}

export interface Armor {
  id: string;
  name: string;
  defense: number;
  maxHpBonus: number;
  rarity: Rarity;
  color: string;
}

export type LootItem = { type: "weapon"; item: Weapon } | { type: "armor"; item: Armor };

export interface LootDrop {
  id: string;
  position: [number, number, number];
  loot: LootItem;
}

export interface Enemy {
  id: string;
  position: [number, number, number];
  hp: number;
  maxHp: number;
  damage: number;
  speed: number;
  xpReward: number;
  kind: "skeleton" | "zombie" | "demon" | "boss";
  dead: boolean;
  lastAttack: number;
}

export interface Bullet {
  id: string;
  position: [number, number, number];
  direction: [number, number, number];
  damage: number;
  speed: number;
  distanceTraveled: number;
}

export interface PlayerState {
  hp: number;
  maxHp: number;
  xp: number;
  xpToNext: number;
  playerLevel: number;
  weapon: Weapon;
  armor: Armor | null;
  lastShot: number;
  position: [number, number, number];
  yaw: number;
  pitch: number;
}

export type GamePhase = "menu" | "playing" | "dead";

const STARTING_WEAPON: Weapon = {
  id: "starter-sword",
  name: "Iron Sword",
  damage: 10,
  fireRate: 2,
  range: 20,
  rarity: "common",
  color: "#aaaaaa",
};

const BASE_PLAYER: PlayerState = {
  hp: 100,
  maxHp: 100,
  xp: 0,
  xpToNext: 100,
  playerLevel: 1,
  weapon: STARTING_WEAPON,
  armor: null,
  lastShot: 0,
  position: [0, 1, 0],
  yaw: 0,
  pitch: 0,
};

interface GameStore {
  phase: GamePhase;
  depth: number;
  player: PlayerState;
  enemies: Enemy[];
  loot: LootDrop[];
  bullets: Bullet[];
  killCount: number;
  totalKills: number;
  notification: string;
  notificationTimer: number;
  notificationQueue: NotificationEntry[];
  exitActive: boolean;

  setPhase: (phase: GamePhase) => void;
  startGame: () => void;
  goDeeper: () => void;

  updatePlayer: (partial: Partial<PlayerState>) => void;
  damagePlayer: (amount: number) => void;
  gainXp: (amount: number) => void;
  equipWeapon: (weapon: Weapon) => void;
  equipArmor: (armor: Armor) => void;

  setEnemies: (enemies: Enemy[]) => void;
  updateEnemy: (id: string, partial: Partial<Enemy>) => void;
  damageEnemy: (id: string, amount: number) => void;

  setLoot: (loot: LootDrop[]) => void;
  removeLoot: (id: string) => void;

  addBullet: (bullet: Bullet) => void;
  updateBullets: (bullets: Bullet[]) => void;
  removeBullet: (id: string) => void;

  showNotification: (msg: string) => void;
  tickNotification: (dt: number) => void;
  setExitActive: (v: boolean) => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  phase: "menu",
  depth: 1,
  player: { ...BASE_PLAYER },
  enemies: [],
  loot: [],
  bullets: [],
  killCount: 0,
  totalKills: 0,
  notification: "",
  notificationTimer: 0,
  notificationQueue: [],
  exitActive: false,

  setPhase: (phase) => set({ phase }),

  startGame: () =>
    set({
      phase: "playing",
      depth: 1,
      player: { ...BASE_PLAYER, weapon: STARTING_WEAPON },
      enemies: [],
      loot: [],
      bullets: [],
      killCount: 0,
      totalKills: 0,
      notification: "",
      notificationTimer: 0,
      notificationQueue: [],
      exitActive: false,
    }),

  goDeeper: () => {
    const { depth, player } = get();
    const newDepth = depth + 1;
    const hpRegen = Math.round(player.maxHp * 0.3);
    set({
      depth: newDepth,
      enemies: [],
      loot: [],
      bullets: [],
      killCount: 0,
      notification: "",
      notificationTimer: 0,
      notificationQueue: [],
      exitActive: false,
      player: {
        ...player,
        hp: Math.min(player.maxHp, player.hp + hpRegen),
        position: [0, 1, 0],
        yaw: 0,
        pitch: 0,
      },
    });
  },

  updatePlayer: (partial) =>
    set((s) => ({ player: { ...s.player, ...partial } })),

  damagePlayer: (amount) =>
    set((s) => {
      const defense = s.player.armor ? s.player.armor.defense : 0;
      const mitigated = Math.max(1, amount - defense);
      const newHp = Math.max(0, s.player.hp - mitigated);
      return {
        player: { ...s.player, hp: newHp },
        phase: newHp <= 0 ? "dead" : s.phase,
      };
    }),

  gainXp: (amount) =>
    set((s) => {
      let { xp, xpToNext, playerLevel, maxHp, hp } = s.player;
      xp += amount;
      let leveled = false;
      while (xp >= xpToNext) {
        xp -= xpToNext;
        playerLevel += 1;
        xpToNext = Math.round(xpToNext * 1.4);
        maxHp = Math.round(maxHp * 1.1);
        hp = maxHp;
        leveled = true;
      }

      return {
        player: { ...s.player, xp, xpToNext, playerLevel, maxHp, hp },
        ...(leveled
          ? enqueueNotification(s, `LEVEL UP! Now level ${playerLevel}`, 3)
          : {
              notification: s.notification,
              notificationTimer: s.notificationTimer,
              notificationQueue: s.notificationQueue,
            }),
      };
    }),

  equipWeapon: (weapon) =>
    set((s) => ({
      player: { ...s.player, weapon },
      ...enqueueNotification(s, `Equipped ${weapon.name}!`),
    })),

  equipArmor: (armor) =>
    set((s) => {
      const newMaxHp = s.player.maxHp + armor.maxHpBonus;
      return {
        player: {
          ...s.player,
          armor,
          maxHp: newMaxHp,
          hp: Math.min(s.player.hp + armor.maxHpBonus, newMaxHp),
        },
        ...enqueueNotification(s, `Equipped ${armor.name}!`),
      };
    }),

  setEnemies: (enemies) => set({ enemies }),

  updateEnemy: (id, partial) =>
    set((s) => ({
      enemies: s.enemies.map((e) => (e.id === id ? { ...e, ...partial } : e)),
    })),

  damageEnemy: (id, amount) =>
    set((s) => {
      let killedXp = 0;
      let killedPos: [number, number, number] | null = null;
      let killedId: string | null = null;
      const enemies = s.enemies.map((e) => {
        if (e.id !== id || e.dead) return e;
        const newHp = Math.max(0, e.hp - amount);
        if (newHp <= 0 && !e.dead) {
          killedXp = e.xpReward;
          killedPos = e.position;
          killedId = e.id;
          return { ...e, hp: 0, dead: true };
        }
        return { ...e, hp: newHp };
      });

      const allDead = enemies.every((e) => e.dead);
      let newKillCount = s.killCount;
      let newTotalKills = s.totalKills;
      let exitActive = s.exitActive;

      if (killedId) {
        newKillCount = s.killCount + 1;
        newTotalKills = s.totalKills + 1;
      }
      if (allDead && enemies.length > 0) {
        exitActive = true;
      }

      return {
        enemies,
        killCount: newKillCount,
        totalKills: newTotalKills,
        exitActive,
        ...(allDead && enemies.length > 0
          ? enqueueNotification(s, "All enemies slain! Find the exit portal!", 3)
          : {
              notification: s.notification,
              notificationTimer: s.notificationTimer,
              notificationQueue: s.notificationQueue,
            }),
        player: killedXp > 0 ? (() => {
          let { xp, xpToNext, playerLevel, maxHp, hp } = s.player;
          xp += killedXp;
          while (xp >= xpToNext) {
            xp -= xpToNext;
            playerLevel += 1;
            xpToNext = Math.round(xpToNext * 1.4);
            maxHp = Math.round(maxHp * 1.1);
            hp = maxHp;
          }
          return { ...s.player, xp, xpToNext, playerLevel, maxHp, hp };
        })() : s.player,
      };
    }),

  setLoot: (loot) => set({ loot }),
  removeLoot: (id) => set((s) => ({ loot: s.loot.filter((l) => l.id !== id) })),

  addBullet: (bullet) =>
    set((s) => ({ bullets: [...s.bullets, bullet] })),

  updateBullets: (bullets) => set({ bullets }),

  removeBullet: (id) =>
    set((s) => ({ bullets: s.bullets.filter((b) => b.id !== id) })),

  showNotification: (msg) =>
    set((s) => enqueueNotification(s, msg)),

  tickNotification: (dt) =>
    set((s) => tickNotificationState(s, dt)),

  setExitActive: (v) => set({ exitActive: v }),
}));
