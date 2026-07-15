import { useGameStore } from "./game/store";
import { Game } from "./game/Game";
import { RARITY_COLORS } from "./game/lootSystem";

function Menu() {
  const startGame = useGameStore((s) => s.startGame);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "linear-gradient(135deg, #0a0010 0%, #100020 50%, #0a0018 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Courier New', monospace",
        color: "#eee",
        gap: 28,
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontSize: 56,
            fontWeight: "bold",
            color: "#cc44ff",
            textShadow: "0 0 30px #8800cc, 0 0 60px #440066",
            letterSpacing: 4,
            marginBottom: 6,
          }}
        >
          DUNGEON CRAWLER
        </div>
        <div style={{ fontSize: 18, color: "#8844cc", letterSpacing: 8 }}>
          FIRST PERSON
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          background: "rgba(0,0,0,0.5)",
          border: "1px solid #442266",
          borderRadius: 12,
          padding: "20px 36px",
          maxWidth: 440,
          width: "90%",
        }}
      >
        {([
          ["🗡️", "Loot weapons & armor with rarity tiers"],
          ["💀", "Monsters grow stronger each depth"],
          ["⬆️", "Level up to boost health & power"],
          ["🌀", "Find the portal to go deeper"],
          ["👑", "Boss battles every 5 floors"],
        ] as [string, string][]).map(([icon, text]) => (
          <div key={text} style={{ display: "flex", gap: 12, alignItems: "center", fontSize: 14, color: "#bbaadd" }}>
            <span style={{ fontSize: 18 }}>{icon}</span>
            <span>{text}</span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
        {(["common", "uncommon", "rare", "epic", "legendary"] as const).map((r) => (
          <div
            key={r}
            style={{
              fontSize: 11,
              color: RARITY_COLORS[r],
              background: "rgba(0,0,0,0.6)",
              border: `1px solid ${RARITY_COLORS[r]}`,
              borderRadius: 6,
              padding: "3px 10px",
              textTransform: "capitalize",
            }}
          >
            {r}
          </div>
        ))}
      </div>

      <div style={{ fontSize: 12, color: "#555", textAlign: "center", lineHeight: 2 }}>
        WASD to move &nbsp;&bull;&nbsp; MOUSE to look &nbsp;&bull;&nbsp; CLICK / F / SPACE to shoot
      </div>

      <button
        onClick={startGame}
        style={{
          background: "linear-gradient(135deg, #7700bb, #440077)",
          border: "2px solid #aa55ff",
          borderRadius: 10,
          color: "#fff",
          fontSize: 22,
          fontWeight: "bold",
          letterSpacing: 3,
          padding: "14px 56px",
          cursor: "pointer",
          boxShadow: "0 0 20px #6600aa",
          fontFamily: "inherit",
        }}
      >
        ENTER DUNGEON
      </button>
    </div>
  );
}

function DeathScreen() {
  const startGame = useGameStore((s) => s.startGame);
  const depth = useGameStore((s) => s.depth);
  const totalKills = useGameStore((s) => s.totalKills);
  const playerLevel = useGameStore((s) => s.player.playerLevel);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.95)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Courier New', monospace",
        color: "#eee",
        gap: 24,
      }}
    >
      <div
        style={{
          fontSize: 64,
          fontWeight: "bold",
          color: "#dd2222",
          textShadow: "0 0 40px #880000",
          letterSpacing: 4,
        }}
      >
        YOU DIED
      </div>

      <div
        style={{
          background: "rgba(0,0,0,0.7)",
          border: "1px solid #441111",
          borderRadius: 12,
          padding: "20px 40px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <div style={{ color: "#aa7777", fontSize: 14 }}>
          DEPTH REACHED: <span style={{ color: "#ff7755", fontWeight: "bold" }}>{depth}</span>
        </div>
        <div style={{ color: "#aa7777", fontSize: 14 }}>
          PLAYER LEVEL: <span style={{ color: "#ffdd55", fontWeight: "bold" }}>{playerLevel}</span>
        </div>
        <div style={{ color: "#aa7777", fontSize: 14 }}>
          TOTAL KILLS: <span style={{ color: "#88ddff", fontWeight: "bold" }}>{totalKills}</span>
        </div>
      </div>

      <button
        onClick={startGame}
        style={{
          background: "linear-gradient(135deg, #990011, #550000)",
          border: "2px solid #cc3322",
          borderRadius: 10,
          color: "#fff",
          fontSize: 18,
          fontWeight: "bold",
          letterSpacing: 3,
          padding: "12px 44px",
          cursor: "pointer",
          fontFamily: "inherit",
        }}
      >
        TRY AGAIN
      </button>
    </div>
  );
}

export default function App() {
  const phase = useGameStore((s) => s.phase);

  return (
    <>
      {phase === "menu" && <Menu />}
      {phase === "playing" && <Game />}
      {phase === "dead" && <DeathScreen />}
    </>
  );
}
