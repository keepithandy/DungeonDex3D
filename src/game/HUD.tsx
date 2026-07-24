import { useGameStore } from "./store";
import { RARITY_COLORS, rarityLabel } from "./lootSystem";
import type { PointerLockStatus } from "./Player";

interface HUDProps {
  pointerLockStatus: PointerLockStatus;
}

const panelStyle = {
  background: "rgba(0,0,0,0.74)",
  borderRadius: 8,
  padding: "6px 12px",
  maxWidth: "min(92vw, 640px)",
  whiteSpace: "normal" as const,
  overflowWrap: "anywhere" as const,
};

export function HUD({ pointerLockStatus }: HUDProps) {
  const player = useGameStore((s) => s.player);
  const depth = useGameStore((s) => s.depth);
  const enemies = useGameStore((s) => s.enemies);
  const totalKills = useGameStore((s) => s.totalKills);
  const notification = useGameStore((s) => s.notification);
  const notificationTimer = useGameStore((s) => s.notificationTimer);
  const exitActive = useGameStore((s) => s.exitActive);

  const aliveEnemies = enemies.filter((e) => !e.dead).length;
  const hpFrac = player.hp / player.maxHp;
  const xpFrac = player.xp / player.xpToNext;
  const hpColor = hpFrac > 0.5 ? "#22cc44" : hpFrac > 0.25 ? "#ffaa22" : "#ee2222";
  const weaponColor = RARITY_COLORS[player.weapon.rarity];
  const armorColor = player.armor ? RARITY_COLORS[player.armor.rarity] : "#555";
  const objective = aliveEnemies > 0
    ? `DEFEAT ${aliveEnemies} ${aliveEnemies === 1 ? "ENEMY" : "ENEMIES"} • EXIT PORTAL OPENS AFTER FINAL ENEMY`
    : exitActive
      ? "ALL ENEMIES DEFEATED • FIND THE EXIT PORTAL"
      : "LOADING ENCOUNTER...";
  const controlHint = pointerLockStatus === "locked"
    ? "MOUSE LOOK ACTIVE • WASD MOVE • ESC RELEASE • CLICK / F / SPACE SHOOT"
    : pointerLockStatus === "error"
      ? "MOUSE LOCK UNAVAILABLE • WASD MOVE • F / SPACE SHOOT • TRY A TOP-LEVEL BROWSER"
      : "CLICK GAME TO FOCUS • WASD MOVE • MOUSE LOOK";

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", fontFamily: "'Courier New', monospace", userSelect: "none" }}>
      <div style={{ position: "absolute", top: "max(10px, env(safe-area-inset-top))", left: "max(10px, env(safe-area-inset-left))", color: "rgba(210,180,230,0.72)", fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase" }}>
        v0.0.1-alpha
      </div>

      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", color: "rgba(255,255,255,0.85)", fontSize: 22, lineHeight: 1, textShadow: "0 0 4px #000" }}>+</div>

      <div style={{ position: "absolute", top: "max(34px, calc(env(safe-area-inset-top) + 22px))", left: 8, right: 8, display: "flex", justifyContent: "center", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ ...panelStyle, color: "#aa77ff", fontSize: 13, fontWeight: "bold" }}>DEPTH {depth}</div>
        <div style={{ ...panelStyle, color: "#ffbb44", fontSize: 13, textAlign: "center", flex: "0 1 auto" }}>{objective}</div>
        <div style={{ ...panelStyle, color: "#88ddff", fontSize: 13 }}>KILLS: {totalKills}</div>
      </div>

      <div style={{ position: "absolute", bottom: "max(16px, env(safe-area-inset-bottom))", left: "max(12px, env(safe-area-inset-left))", display: "flex", flexDirection: "column", gap: 8, width: "min(44vw, 260px)", minWidth: 150 }}>
        <div style={{ color: "#ffdd55", fontSize: 13, fontWeight: "bold" }}>LVL {player.playerLevel}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ color: "#88aaff", fontSize: 11, width: 22 }}>XP</span>
          <div style={{ flex: 1, height: 6, background: "rgba(0,0,0,0.6)", borderRadius: 3, border: "1px solid #334", overflow: "hidden" }}><div style={{ width: `${Math.max(0, Math.min(1, xpFrac)) * 100}%`, height: "100%", background: "#5599ff", transition: "width 0.2s" }} /></div>
          <span style={{ color: "#aaaacc", fontSize: 10 }}>{player.xp}/{player.xpToNext}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ color: "#ff4444", fontSize: 11, width: 22 }}>HP</span>
          <div style={{ flex: 1, height: 10, background: "rgba(0,0,0,0.6)", borderRadius: 5, border: "1px solid #422", overflow: "hidden" }}><div style={{ width: `${Math.max(0, Math.min(1, hpFrac)) * 100}%`, height: "100%", background: hpColor, transition: "width 0.15s", boxShadow: `0 0 6px ${hpColor}` }} /></div>
          <span style={{ color: "#ffaaaa", fontSize: 10 }}>{player.hp}/{player.maxHp}</span>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: "max(16px, env(safe-area-inset-bottom))", right: "max(12px, env(safe-area-inset-right))", display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end", width: "min(42vw, 220px)" }}>
        <div style={{ ...panelStyle, width: "100%", border: `2px solid ${weaponColor}`, color: weaponColor, fontSize: 12 }}>
          <div style={{ fontSize: 9, color: "#aaa", marginBottom: 2 }}>WEAPON</div>
          <div style={{ fontWeight: "bold" }}>{player.weapon.name}</div>
          <div style={{ fontSize: 10, color: "#ddd", marginTop: 2 }}>{rarityLabel(player.weapon.rarity)} • DMG {player.weapon.damage} • {player.weapon.fireRate.toFixed(1)}/s</div>
        </div>
        <div style={{ ...panelStyle, width: "100%", border: `2px solid ${armorColor}`, color: armorColor, fontSize: 12 }}>
          <div style={{ fontSize: 9, color: "#aaa", marginBottom: 2 }}>ARMOR</div>
          <div style={{ fontWeight: "bold" }}>{player.armor?.name ?? "None"}</div>
          {player.armor && <div style={{ fontSize: 10, color: "#ddd", marginTop: 2 }}>{rarityLabel(player.armor.rarity)} • DEF {player.armor.defense} • +{player.armor.maxHpBonus} HP</div>}
        </div>
      </div>

      {notification && notificationTimer > 0 && (
        <div role="status" aria-live="polite" style={{ position: "absolute", top: "34%", left: "50%", transform: "translateX(-50%)", background: "rgba(0,0,0,0.86)", color: "#ffdd00", fontSize: "clamp(14px, 3vw, 22px)", fontWeight: "bold", padding: "10px 18px", borderRadius: 10, border: "2px solid #aa8800", textAlign: "center", maxWidth: "min(88vw, 520px)", whiteSpace: "normal", overflowWrap: "anywhere" }}>
          {notification}
        </div>
      )}

      <div style={{ position: "absolute", bottom: "max(92px, calc(env(safe-area-inset-bottom) + 76px))", left: "50%", transform: "translateX(-50%)", color: pointerLockStatus === "error" ? "#ffbb66" : "rgba(255,255,255,0.78)", background: "rgba(0,0,0,0.68)", border: pointerLockStatus === "error" ? "1px solid rgba(255,170,80,0.7)" : "1px solid rgba(255,255,255,0.12)", borderRadius: 6, padding: "5px 10px", fontSize: 10, textAlign: "center", whiteSpace: "normal", overflowWrap: "anywhere", width: "min(86vw, 680px)" }}>
        {controlHint}
      </div>
    </div>
  );
}
