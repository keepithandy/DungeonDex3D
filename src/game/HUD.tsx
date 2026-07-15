import { useGameStore } from "./store";
import { RARITY_COLORS, rarityLabel } from "./lootSystem";
import type { PointerLockStatus } from "./Player";

interface HUDProps {
  pointerLockStatus: PointerLockStatus;
}

export function HUD({ pointerLockStatus }: HUDProps) {
  const player = useGameStore((s) => s.player);
  const depth = useGameStore((s) => s.depth);
  const enemies = useGameStore((s) => s.enemies);
  const killCount = useGameStore((s) => s.killCount);
  const totalKills = useGameStore((s) => s.totalKills);
  const notification = useGameStore((s) => s.notification);
  const notificationTimer = useGameStore((s) => s.notificationTimer);
  const exitActive = useGameStore((s) => s.exitActive);

  const aliveEnemies = enemies.filter((e) => !e.dead).length;
  const hpFrac = player.hp / player.maxHp;
  const xpFrac = player.xp / player.xpToNext;

  const hpColor =
    hpFrac > 0.5 ? "#22cc44" : hpFrac > 0.25 ? "#ffaa22" : "#ee2222";

  const weaponColor = player.weapon ? RARITY_COLORS[player.weapon.rarity] : "#aaa";
  const armorColor = player.armor ? RARITY_COLORS[player.armor.rarity] : "#555";
  const controlHint =
    pointerLockStatus === "locked"
      ? "MOUSE LOOK ACTIVE • WASD MOVE • ESC RELEASE • CLICK / F / SPACE SHOOT"
      : pointerLockStatus === "error"
        ? "MOUSE LOCK UNAVAILABLE • WASD MOVE • F / SPACE SHOOT • TRY A TOP-LEVEL BROWSER"
        : "CLICK GAME TO FOCUS • WASD MOVE • MOUSE LOOK";
  const controlHintColor = pointerLockStatus === "error" ? "#ffbb66" : "rgba(255,255,255,0.72)";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        fontFamily: "'Courier New', monospace",
        userSelect: "none",
      }}
    >
      {/* Prototype label */}
      <div
        style={{
          position: "absolute",
          top: 16,
          left: 16,
          color: "rgba(210,180,230,0.65)",
          fontSize: 10,
          letterSpacing: 1.5,
          textTransform: "uppercase",
        }}
      >
        v0.0.1-alpha
      </div>

      {/* Crosshair */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "rgba(255,255,255,0.85)",
          fontSize: 22,
          lineHeight: 1,
          textShadow: "0 0 4px #000",
        }}
      >
        +
      </div>

      {/* Top Bar */}
      <div
        style={{
          position: "absolute",
          top: 16,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 32,
          alignItems: "center",
        }}
      >
        <div style={{ background: "rgba(0,0,0,0.7)", padding: "6px 18px", borderRadius: 8, color: "#aa77ff", fontSize: 15, fontWeight: "bold" }}>
          DEPTH {depth}
        </div>
        <div style={{ background: "rgba(0,0,0,0.7)", padding: "6px 18px", borderRadius: 8, color: "#ffbb44", fontSize: 15 }}>
          {aliveEnemies > 0 ? `${aliveEnemies} enemies remaining` : exitActive ? "Find the EXIT PORTAL" : "Loading..."}
        </div>
        <div style={{ background: "rgba(0,0,0,0.7)", padding: "6px 18px", borderRadius: 8, color: "#88ddff", fontSize: 15 }}>
          KILLS: {totalKills}
        </div>
      </div>

      {/* Bottom Left: HP + XP + Level */}
      <div
        style={{
          position: "absolute",
          bottom: 24,
          left: 24,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          minWidth: 200,
        }}
      >
        {/* Level */}
        <div style={{ color: "#ffdd55", fontSize: 13, fontWeight: "bold" }}>
          LVL {player.playerLevel}
        </div>

        {/* XP Bar */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: "#88aaff", fontSize: 11, width: 25 }}>XP</span>
          <div style={{ flex: 1, height: 6, background: "rgba(0,0,0,0.6)", borderRadius: 3, border: "1px solid #334", overflow: "hidden" }}>
            <div style={{ width: `${xpFrac * 100}%`, height: "100%", background: "#5599ff", transition: "width 0.2s" }} />
          </div>
          <span style={{ color: "#aaaacc", fontSize: 11 }}>{player.xp}/{player.xpToNext}</span>
        </div>

        {/* HP Bar */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: "#ff4444", fontSize: 11, width: 25 }}>HP</span>
          <div style={{ flex: 1, height: 10, background: "rgba(0,0,0,0.6)", borderRadius: 5, border: "1px solid #422", overflow: "hidden" }}>
            <div
              style={{
                width: `${hpFrac * 100}%`,
                height: "100%",
                background: hpColor,
                transition: "width 0.15s",
                boxShadow: `0 0 6px ${hpColor}`,
              }}
            />
          </div>
          <span style={{ color: "#ffaaaa", fontSize: 11 }}>{player.hp}/{player.maxHp}</span>
        </div>
      </div>

      {/* Bottom Right: Equipped Items */}
      <div
        style={{
          position: "absolute",
          bottom: 24,
          right: 24,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          alignItems: "flex-end",
        }}
      >
        {/* Weapon */}
        <div
          style={{
            background: "rgba(0,0,0,0.75)",
            border: `2px solid ${weaponColor}`,
            borderRadius: 8,
            padding: "8px 14px",
            color: weaponColor,
            fontSize: 13,
            minWidth: 180,
          }}
        >
          <div style={{ fontSize: 10, color: "#888", marginBottom: 2 }}>WEAPON</div>
          <div style={{ fontWeight: "bold" }}>{player.weapon?.name ?? "—"}</div>
          {player.weapon && (
            <div style={{ fontSize: 11, color: "#ccc", marginTop: 2 }}>
              {rarityLabel(player.weapon.rarity)} &bull; DMG {player.weapon.damage} &bull; {player.weapon.fireRate.toFixed(1)}/s
            </div>
          )}
        </div>

        {/* Armor */}
        <div
          style={{
            background: "rgba(0,0,0,0.75)",
            border: `2px solid ${armorColor}`,
            borderRadius: 8,
            padding: "8px 14px",
            color: armorColor,
            fontSize: 13,
            minWidth: 180,
          }}
        >
          <div style={{ fontSize: 10, color: "#888", marginBottom: 2 }}>ARMOR</div>
          <div style={{ fontWeight: "bold" }}>{player.armor?.name ?? "None"}</div>
          {player.armor && (
            <div style={{ fontSize: 11, color: "#ccc", marginTop: 2 }}>
              {rarityLabel(player.armor.rarity)} &bull; DEF {player.armor.defense} &bull; +{player.armor.maxHpBonus} HP
            </div>
          )}
        </div>
      </div>

      {/* Notification */}
      {notification && notificationTimer > 0 && (
        <div
          style={{
            position: "absolute",
            top: "38%",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(0,0,0,0.82)",
            color: "#ffdd00",
            fontSize: 22,
            fontWeight: "bold",
            padding: "12px 32px",
            borderRadius: 10,
            border: "2px solid #aa8800",
            textAlign: "center",
            maxWidth: 500,
            whiteSpace: "nowrap",
            pointerEvents: "none",
          }}
        >
          {notification}
        </div>
      )}

      {/* Camera and movement status */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: "50%",
          transform: "translateX(-50%)",
          color: controlHintColor,
          background: "rgba(0,0,0,0.62)",
          border: pointerLockStatus === "error" ? "1px solid rgba(255,170,80,0.7)" : "1px solid rgba(255,255,255,0.12)",
          borderRadius: 6,
          padding: "5px 10px",
          fontSize: 11,
          textAlign: "center",
          whiteSpace: "nowrap",
          pointerEvents: "none",
        }}
      >
        {controlHint}
      </div>
    </div>
  );
}
