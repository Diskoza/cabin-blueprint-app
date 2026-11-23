import { useState } from "react";

const views = ["floor", "section", "ondol", "3d"];

const labels = {
  floor: "План этажа",
  section: "Разрез (А–А)",
  ondol: "Система ондол",
  "3d": "3D вид",
};

export default function CabinBlueprint() {
  const [active, setActive] = useState("floor");
  const [showLegend, setShowLegend] = useState(true);

  return (
    <div style={{
      fontFamily: "'Georgia', serif",
      background: "#1a1208",
      minHeight: "100vh",
      color: "#e8d5a3",
      padding: "0",
    }}>
      <div style={{
        borderBottom: "1px solid #5a3e1b",
        padding: "18px 28px 14px",
        display: "flex",
        alignItems: "baseline",
        gap: "18px",
        background: "#110d04",
      }}>
        <span style={{ fontSize: "11px", letterSpacing: "3px", color: "#8a6a3a", textTransform: "uppercase" }}>Проект</span>
        <span style={{ fontSize: "20px", color: "#d4a84b", fontWeight: "bold", letterSpacing: "1px" }}>Лесная хижина — Тип «Ондол»</span>
        <span style={{ marginLeft: "auto", fontSize: "11px", color: "#5a3e1b", letterSpacing: "2px" }}>~16 м² · Бревно + Глина</span>
      </div>

      <div style={{
        display: "flex",
        gap: "0",
        borderBottom: "1px solid #3a2810",
        background: "#110d04",
        padding: "0 28px",
      }}>
        {views.map(v => (
          <button key={v} onClick={() => setActive(v)} style={{
            background: active === v ? "#2a1c08" : "transparent",
            border: "none",
            borderBottom: active === v ? "2px solid #d4a84b" : "2px solid transparent",
            color: active === v ? "#d4a84b" : "#6a5030",
            padding: "10px 22px",
            cursor: "pointer",
            fontSize: "13px",
            fontFamily: "Georgia, serif",
            letterSpacing: "0.5px",
            transition: "all 0.2s",
          }}>{labels[v]}</button>
        ))}
        <button onClick={() => setShowLegend(s => !s)} style={{
          marginLeft: "auto",
          background: "transparent",
          border: "1px solid #3a2810",
          color: "#6a5030",
          padding: "6px 14px",
          cursor: "pointer",
          fontSize: "11px",
          fontFamily: "Georgia, serif",
          alignSelf: "center",
          borderRadius: "3px",
        }}>Легенда {showLegend ? "▲" : "▼"}</button>
      </div>

      <div style={{ display: "flex", gap: "0" }}>
        <div style={{ flex: 1, padding: "28px", overflowX: "auto" }}>
          {active === "floor" && <FloorPlan />}
          {active === "section" && <SectionView />}
          {active === "ondol" && <OndolDetail />}
          {active === "3d" && <View3D />}
        </div>

        {/* Legend */}
        {showLegend && (
          <div style={{
            width: "210px",
            borderLeft: "1px solid #3a2810",
            padding: "20px 16px",
            fontSize: "12px",
            background: "#110d04",
            flexShrink: 0,
          }}>
            <div style={{ color: "#8a6a3a", letterSpacing: "2px", fontSize: "10px", marginBottom: "14px", textTransform: "uppercase" }}>Условные обозначения</div>
            {[
              ["#8B4513", "Бревенчатые стены"],
              ["#c8a870", "Глиняная обмазка"],
              ["#4a3010", "Каналы ондол"],
              ["#e74c3c", "Очаг / Топка"],
              ["#3498db", "Окна"],
              ["#95a5a6", "Камни"],
              ["#27ae60", "Дымоход"],
            ].map(([color, label]) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <div style={{ width: "18px", height: "12px", background: color, borderRadius: "2px", flexShrink: 0 }} />
                <span style={{ color: "#a08050" }}>{label}</span>
              </div>
            ))}

            <div style={{ borderTop: "1px solid #3a2810", marginTop: "16px", paddingTop: "14px" }}>
              <div style={{ color: "#8a6a3a", letterSpacing: "2px", fontSize: "10px", marginBottom: "10px", textTransform: "uppercase" }}>Размеры</div>
              {[
                ["Общий", "4.0 × 4.0 м"],
                ["Жилая зона", "4.0 × 2.8 м"],
                ["Лежанка", "2.0 × 1.8 м"],
                ["Высота стен", "2.2 м"],
                ["Высота конька", "3.2 м"],
                ["Каналы ондол", "0.2 × 0.15 м"],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <span style={{ color: "#6a5030" }}>{k}</span>
                  <span style={{ color: "#d4a84b" }}>{v}</span>
                </div>
              ))}
            </div>

            <div style={{ borderTop: "1px solid #3a2810", marginTop: "14px", paddingTop: "14px" }}>
              <div style={{ color: "#8a6a3a", letterSpacing: "2px", fontSize: "10px", marginBottom: "10px", textTransform: "uppercase" }}>Материалы</div>
              {[
                ["Каркас", "Брёвна Ø15–20 см"],
                ["Стены", "Глина + солома"],
                ["Пол", "Глина + камни"],
                ["Крыша", "Жерди + кора"],
                ["Раствор", "Глина + песок 1:3"],
              ].map(([k, v]) => (
                <div key={k} style={{ marginBottom: "8px" }}>
                  <div style={{ color: "#6a5030", fontSize: "10px" }}>{k}</div>
                  <div style={{ color: "#c8a870" }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function FloorPlan() {
  return (
    <div>
      <div style={{ color: "#8a6a3a", fontSize: "11px", letterSpacing: "2px", marginBottom: "16px", textTransform: "uppercase" }}>
        ↑ Север · Масштаб 1:50 · Вид сверху
      </div>
      <svg viewBox="0 0 700 620" style={{ width: "1400px", maxWidth: "none", display: "block" }}>
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#2a1c08" strokeWidth="0.5" />
          </pattern>
          <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="6" stroke="#5a3e1b" strokeWidth="1.5" />
          </pattern>
        </defs>

        <rect x="50" y="40" width="600" height="550" fill="url(#grid)" />

        <rect x="100" y="80" width="480" height="400" fill="#3d2510" stroke="#8B4513" strokeWidth="16" />
        <rect x="116" y="96" width="448" height="368" fill="#2a1c08" />

        <rect x="116" y="96" width="220" height="250" fill="#1e1608" />
        {[120, 152, 184, 216, 248, 280, 312].map((y, i) => (
          <rect key={i} x="124" y={y} width="200" height="14" fill="#3a2800" stroke="#4a3010" strokeWidth="1" rx="2" />
        ))}
        <text x="226" y="355" textAnchor="middle" fill="#5a4020" fontSize="11" fontStyle="italic">каналы ондол</text>

        <rect x="116" y="96" width="220" height="250" fill="none" stroke="#d4a84b" strokeWidth="1.5" strokeDasharray="6,3" />
        <text x="226" y="248" textAnchor="middle" fill="#d4a84b" fontSize="13" fontWeight="bold">ЛЕЖАНКА</text>
        <text x="226" y="264" textAnchor="middle" fill="#8a6a3a" fontSize="10">2.2 × 2.5 м</text>

        <text x="450" y="248" textAnchor="middle" fill="#8a6a3a" fontSize="13" fontWeight="bold">ЖИЛАЯ ЗОНА</text>
        <text x="450" y="264" textAnchor="middle" fill="#6a5030" fontSize="10">2.2 × 4.0 м</text>

        <rect x="116" y="96" width="80" height="80" fill="#c0392b" stroke="#e74c3c" strokeWidth="2" rx="4" />
        <text x="156" y="132" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">ОЧАГ</text>
        <text x="156" y="146" textAnchor="middle" fill="#ffaaaa" fontSize="9">топка</text>
        <text x="156" y="166" textAnchor="middle" fontSize="14">🔥</text>

        <rect x="116" y="176" width="30" height="30" fill="#27ae60" stroke="#2ecc71" strokeWidth="2" />
        <text x="131" y="196" textAnchor="middle" fill="#fff" fontSize="8">ДЫМ</text>

        <rect x="240" y="456" width="80" height="16" fill="#3498db" stroke="#5dade2" strokeWidth="2" rx="2" />
        <text x="280" y="472" textAnchor="middle" fill="#5dade2" fontSize="9">окно</text>
        <rect x="380" y="456" width="80" height="16" fill="#3498db" stroke="#5dade2" strokeWidth="2" rx="2" />
        <text x="420" y="472" textAnchor="middle" fill="#5dade2" fontSize="9">окно</text>

        <rect x="572" y="220" width="16" height="80" fill="#3498db" stroke="#5dade2" strokeWidth="2" rx="2" />

        <rect x="340" y="456" width="40" height="16" fill="#2a1c08" stroke="#d4a84b" strokeWidth="2" />
        <rect x="340" y="456" width="40" height="16" fill="none" stroke="#d4a84b" strokeWidth="1" strokeDasharray="2,2" />
        <path d="M340,456 Q340,420 380,456" fill="none" stroke="#d4a84b" strokeWidth="1" strokeDasharray="3,2" />
        <text x="360" y="448" textAnchor="middle" fill="#d4a84b" fontSize="9">ДВЕРЬ</text>

        <rect x="336" y="96" width="228" height="80" fill="#252015" stroke="#3a2810" strokeWidth="1" strokeDasharray="4,3" />
        <text x="450" y="140" textAnchor="middle" fill="#6a5030" fontSize="11">Зона хранения</text>

        <line x1="100" y1="510" x2="580" y2="510" stroke="#5a3e1b" strokeWidth="1" />
        <line x1="100" y1="505" x2="100" y2="515" stroke="#5a3e1b" strokeWidth="1" />
        <line x1="580" y1="505" x2="580" y2="515" stroke="#5a3e1b" strokeWidth="1" />
        <text x="340" y="527" textAnchor="middle" fill="#8a6a3a" fontSize="12">4.0 м</text>

        <line x1="60" y1="80" x2="60" y2="480" stroke="#5a3e1b" strokeWidth="1" />
        <line x1="55" y1="80" x2="65" y2="80" stroke="#5a3e1b" strokeWidth="1" />
        <line x1="55" y1="480" x2="65" y2="480" stroke="#5a3e1b" strokeWidth="1" />
        <text x="40" y="285" textAnchor="middle" fill="#8a6a3a" fontSize="12" transform="rotate(-90,40,285)">4.0 м</text>

        <line x1="100" y1="280" x2="580" y2="280" stroke="#e74c3c" strokeWidth="1" strokeDasharray="8,4" opacity="0.6" />
        <text x="88" y="284" fill="#e74c3c" fontSize="12" fontWeight="bold">A</text>
        <text x="590" y="284" fill="#e74c3c" fontSize="12" fontWeight="bold">A</text>

        <text x="630" y="70" textAnchor="middle" fill="#8a6a3a" fontSize="18">↑</text>
        <text x="630" y="85" textAnchor="middle" fill="#6a5030" fontSize="10">С</text>

        <rect x="400" y="548" width="260" height="60" fill="#110d04" stroke="#3a2810" strokeWidth="1" />
        <text x="530" y="564" textAnchor="middle" fill="#8a6a3a" fontSize="9" letterSpacing="1">ПЛАН ЭТАЖА</text>
        <text x="530" y="578" textAnchor="middle" fill="#d4a84b" fontSize="11">Хижина «Ондол» — Тип А</text>
        <text x="530" y="592" textAnchor="middle" fill="#6a5030" fontSize="9">Масштаб 1:50 · Лист 1/4</text>
      </svg>
    </div>
  );
}

function SectionView() {
  return (
    <div>
      <div style={{ color: "#8a6a3a", fontSize: "11px", letterSpacing: "2px", marginBottom: "16px", textTransform: "uppercase" }}>
        Разрез А–А · Вид изнутри · Масштаб 1:40
      </div>
      <svg viewBox="0 0 700 560" style={{ width: "1400px", maxWidth: "none", display: "block" }}>
        <defs>
          <pattern id="grid2" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#2a1c08" strokeWidth="0.5" />
          </pattern>
          <pattern id="soil" width="8" height="8" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="#3a2810" />
            <circle cx="6" cy="6" r="0.8" fill="#3a2810" />
          </pattern>
          <pattern id="wood" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(0)">
            <line x1="0" y1="5" x2="10" y2="5" stroke="#5a3010" strokeWidth="0.8" />
          </pattern>
        </defs>

        <rect x="30" y="20" width="640" height="520" fill="url(#grid2)" />

        <rect x="30" y="390" width="640" height="150" fill="url(#soil)" />
        <rect x="30" y="390" width="640" height="4" fill="#5a3e1b" />
        <text x="650" y="386" fill="#5a3e1b" fontSize="10" textAnchor="end">уровень земли ±0.00</text>

        {[60, 120, 180, 560, 620].map((x, i) => (
          <rect key={i} x={x} y={370} width={50} height={25} fill="#95a5a6" stroke="#7f8c8d" strokeWidth="1.5" rx="2" />
        ))}
        <text x="340" y="383" textAnchor="middle" fill="#95a5a6" fontSize="10">камни фундамента</text>

        <rect x="60" y="160" width="60" height="230" fill="url(#wood)" stroke="#8B4513" strokeWidth="2" />
        <rect x="60" y="160" width="60" height="230" fill="#8B4513" opacity="0.7" />
        {[160,190,220,250,280,310,340,370].map((y,i) => (
          <ellipse key={i} cx="90" cy={y} rx="25" ry="12" fill="none" stroke="#6a3010" strokeWidth="1.5" />
        ))}
        <text x="90" y="408" textAnchor="middle" fill="#c8a870" fontSize="10">бревно</text>

        <rect x="580" y="160" width="60" height="230" fill="#8B4513" opacity="0.7" stroke="#8B4513" strokeWidth="2" />
        {[160,190,220,250,280,310,340,370].map((y,i) => (
          <ellipse key={i} cx="610" cy={y} rx="25" ry="12" fill="none" stroke="#6a3010" strokeWidth="1.5" />
        ))}

        <rect x="50" y="160" width="10" height="230" fill="#c8a870" opacity="0.8" />
        <rect x="640" y="160" width="10" height="230" fill="#c8a870" opacity="0.8" />
        <text x="44" y="280" textAnchor="end" fill="#c8a870" fontSize="9">глина</text>

        <line x1="340" y1="40" x2="60" y2="200" stroke="#8B4513" strokeWidth="10" />
        <line x1="340" y1="40" x2="620" y2="200" stroke="#8B4513" strokeWidth="10" />
        <rect x="320" y="30" width="40" height="20" fill="#6a3010" stroke="#8B4513" strokeWidth="2" rx="3" />
        <text x="340" y="25" textAnchor="middle" fill="#d4a84b" fontSize="10">конёк</text>

        <line x1="120" y1="165" x2="560" y2="165" stroke="#6a3010" strokeWidth="6" />
        <line x1="160" y1="135" x2="520" y2="135" stroke="#6a3010" strokeWidth="5" opacity="0.8" />
        <line x1="230" y1="100" x2="450" y2="100" stroke="#6a3010" strokeWidth="5" opacity="0.6" />

        <polygon points="60,200 340,40 620,200" fill="none" stroke="#5a3e1b" strokeWidth="1.5" strokeDasharray="4,3" />
        <text x="340" y="110" textAnchor="middle" fill="#6a5030" fontSize="10">кора / дёрн</text>

        <rect x="120" y="350" width="460" height="20" fill="#c8a870" opacity="0.9" />
        <text x="340" y="362" textAnchor="middle" fill="#3a2010" fontSize="10" fontWeight="bold">глиняный пол (5–8 см)</text>

        <rect x="120" y="322" width="460" height="28" fill="#95a5a6" opacity="0.85" />
        {[120,175,230,285,340,395,450,505].map((x,i) => (
          <rect key={i} x={x+2} y={324} width={50} height={24} fill="#7f8c8d" stroke="#95a5a6" strokeWidth="1" rx="1" />
        ))}
        <text x="340" y="340" textAnchor="middle" fill="#fff" fontSize="10">плоские камни (теплоаккумулятор)</text>

        {[292, 307].map((y,i) => (
          <rect key={i} x="120" y={y} width="460" height="14" fill="#2a1800" stroke="#4a3010" strokeWidth="1" rx="2" />
        ))}
        <text x="340" y="308" textAnchor="middle" fill="#8a6040" fontSize="10">каналы дыма (h=15 см)</text>

        {[120, 180, 240, 300, 360, 420, 480, 540].map((x,i) => (
          <rect key={i} x={x} y={285} width={8} height={37} fill="#3a2810" />
        ))}
        <text x="340" y="285" textAnchor="middle" fill="#6a4020" fontSize="10">стенки каналов (глина)</text>

        <rect x="120" y="270" width="460" height="15" fill="#3a2810" opacity="0.6" />
        <text x="340" y="266" textAnchor="middle" fill="#5a3e1b" fontSize="9">уплотнённый грунт</text>

        <rect x="60" y="270" width="60" height="110" fill="#c0392b" stroke="#e74c3c" strokeWidth="2" rx="3" />
        <text x="90" y="318" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">ОЧАГ</text>
        <text x="90" y="330" textAnchor="middle" fill="#ffaaaa" fontSize="9">топка</text>
        <text x="90" y="358" textAnchor="middle" fontSize="16">🔥</text>

        <path d="M120,310 L160,310" stroke="#ff8c00" strokeWidth="2" markerEnd="url(#arr)" />
        <defs>
          <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6Z" fill="#ff8c00" />
          </marker>
        </defs>

        <rect x="570" y="120" width="50" height="250" fill="none" stroke="#27ae60" strokeWidth="2.5" strokeDasharray="5,3" />
        <rect x="558" y="110" width="74" height="30" fill="#27ae60" opacity="0.6" stroke="#2ecc71" strokeWidth="2" />
        <text x="585" y="131" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">ДЫМОХОД</text>
        {[150,180,210,240,270,300,330].map((y,i) => (
          <text key={i} x="585" y={y} textAnchor="middle" fill="#27ae60" fontSize="12" opacity={0.3 + i*0.1}>↑</text>
        ))}

        {[200, 260, 320, 380, 440, 500].map((x,i) => (
          <text key={i} x={x} y={303} textAnchor="middle" fill="#ff8c00" fontSize="10" opacity="0.7">→</text>
        ))}
        <text x="540" y="303" textAnchor="middle" fill="#ff8c00" fontSize="10" opacity="0.7">↑</text>

        <line x1="660" y1="160" x2="680" y2="160" stroke="#5a3e1b" strokeWidth="1" />
        <line x1="660" y1="390" x2="680" y2="390" stroke="#5a3e1b" strokeWidth="1" />
        <line x1="670" y1="160" x2="670" y2="390" stroke="#5a3e1b" strokeWidth="1" />
        <text x="690" y="280" textAnchor="start" fill="#8a6a3a" fontSize="11" transform="rotate(90,690,280)">2.2 м стены</text>

        <line x1="660" y1="40" x2="680" y2="40" stroke="#5a3e1b" strokeWidth="1" />
        <line x1="660" y1="160" x2="680" y2="160" stroke="#5a3e1b" strokeWidth="1" />
        <line x1="670" y1="40" x2="670" y2="160" stroke="#5a3e1b" strokeWidth="1" />
        <text x="684" y="105" fill="#d4a84b" fontSize="10">+1.0 м</text>
        <text x="684" y="115" fill="#6a5030" fontSize="9">крыша</text>

        <text x="340" y="530" textAnchor="middle" fill="#8a6a3a" fontSize="9" letterSpacing="1">ПОПЕРЕЧНЫЙ РАЗРЕЗ А–А · МАСШТАБ 1:40 · ЛИСТ 2/4</text>
      </svg>
    </div>
  );
}

function OndolDetail() {
  return (
    <div>
      <div style={{ color: "#8a6a3a", fontSize: "11px", letterSpacing: "2px", marginBottom: "16px", textTransform: "uppercase" }}>
        Система подогрева пола (ондол) · Детальная схема
      </div>
      <svg viewBox="0 0 700 580" style={{ width: "1400px", maxWidth: "none", display: "block" }}>
        <defs>
          <pattern id="grid3" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#2a1c08" strokeWidth="0.5" />
          </pattern>
          <linearGradient id="heatGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e74c3c" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#e67e22" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#f39c12" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        <rect x="20" y="20" width="660" height="540" fill="url(#grid3)" />

        <text x="350" y="45" textAnchor="middle" fill="#d4a84b" fontSize="14" fontWeight="bold">Вид сверху — план каналов</text>
        <text x="350" y="58" textAnchor="middle" fill="#6a5030" fontSize="10">(плиты пола условно убраны)</text>

        <rect x="60" y="65" width="580" height="200" fill="#1e1608" stroke="#5a3e1b" strokeWidth="2" rx="4" />

        <rect x="60" y="65" width="90" height="90" fill="#c0392b" stroke="#e74c3c" strokeWidth="2" rx="4" />
        <text x="105" y="100" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">ОЧАГ</text>
        <text x="105" y="115" textAnchor="middle" fill="#ffcccc" fontSize="9">t° 400–600°C</text>
        <text x="105" y="130" textAnchor="middle" fontSize="14">🔥</text>

        <rect x="150" y="90" width="25" height="50" fill="#e74c3c" opacity="0.6" rx="2" />
        <text x="163" y="120" textAnchor="middle" fill="#fff" fontSize="9">вход</text>

        {[80, 105, 130, 155, 180, 205].map((y, i) => {
          const goRight = i % 2 === 0;
          return (
            <g key={i}>
              <rect x={goRight ? 175 : 180} y={y} width={goRight ? 415 : 410} height={18}
                fill={`rgba(${Math.max(180-i*20,80)},${60+i*10},0,0.7)`}
                stroke="#4a3010" strokeWidth="1" rx="3" />
              <rect x={goRight ? 175 : 180} y={y} width={goRight ? 415 : 410} height={18}
                fill="url(#heatGrad)" opacity={0.3 + (5-i)*0.08} rx="3"
                transform={goRight ? "" : "scale(-1,1) translate(-1130,0)"} />
            </g>
          );
        })}

        {[1,3,5].map(i => (
          <rect key={i} x={580} y={80 + i*25} width={60} height={18+25} fill="#3a2000" stroke="#4a3010" strokeWidth="1" rx="3" />
        ))}
        {[0,2,4].map(i => (
          <rect key={i} x={175} y={80 + (i+1)*25} width={10} height={25} fill="#3a2000" stroke="#4a3010" strokeWidth="1" rx="3" />
        ))}

        <rect x="595" y="65" width="45" height="200" fill="none" stroke="#27ae60" strokeWidth="2" strokeDasharray="5,3" rx="3" />
        <text x="618" y="90" textAnchor="middle" fill="#27ae60" fontSize="9" fontWeight="bold">ДЫМ</text>
        <text x="618" y="102" textAnchor="middle" fill="#2ecc71" fontSize="9">ход</text>
        <text x="618" y="120" textAnchor="middle" fill="#27ae60" fontSize="10">↑</text>
        <text x="618" y="140" textAnchor="middle" fill="#27ae60" fontSize="10">↑</text>
        <text x="618" y="160" textAnchor="middle" fill="#27ae60" fontSize="10">↑</text>

        {[80,105,130,155,180,205].map((y, i) => {
          const goRight = i % 2 === 0;
          const xs = goRight ? [200,270,340,410,480,540] : [540,470,400,330,260,200];
          return xs.slice(0,4).map((x, j) => (
            <text key={j} x={x} y={y+13} textAnchor="middle" fill="#ff8c00" fontSize="10" opacity="0.8">
              {goRight ? "→" : "←"}
            </text>
          ));
        })}

        <text x="300" y="82" fill="#e74c3c" fontSize="9">≈ 250°C</text>
        <text x="300" y="107" fill="#e67e22" fontSize="9">≈ 200°C</text>
        <text x="300" y="132" fill="#f39c12" fontSize="9">≈ 150°C</text>
        <text x="300" y="157" fill="#f1c40f" fontSize="9">≈ 120°C</text>
        <text x="300" y="182" fill="#a9cce3" fontSize="9">≈ 80°C</text>
        <text x="300" y="207" fill="#85c1e9" fontSize="9">≈ 50°C</text>

        <text x="350" y="298" textAnchor="middle" fill="#d4a84b" fontSize="14" fontWeight="bold">Поперечный разрез пола</text>

        {[
          { y: 315, h: 25, fill: "#c8a870", label: "Глиняный пол (5–8 см)", sub: "финишный слой" },
          { y: 340, h: 20, fill: "#7f8c8d", label: "Камни-плиты (4–6 см)", sub: "теплоаккумулятор" },
          { y: 360, h: 28, fill: "#2a1800", label: "Каналы дыма (h=15 см)", sub: "здесь течёт горячий дым" },
          { y: 388, h: 15, fill: "#3a2810", label: "Глиняное основание", sub: "герметизирует каналы снизу" },
          { y: 403, h: 25, fill: "#1a1208", label: "Грунт / щебень (утрамб.)", sub: "дренажный слой" },
        ].map(({ y, h, fill, label, sub }, i) => (
          <g key={i}>
            <rect x="60" y={y} width="400" height={h} fill={fill} stroke="#3a2810" strokeWidth="1" />
            {y === 360 && [110, 160, 210, 260, 310, 360, 410].map(cx => (
              <rect key={cx} x={cx} y={360} width={8} height={28} fill="#5a3e1b" />
            ))}
            <line x1="462" y1={y + h/2} x2="490" y2={y + h/2} stroke="#5a3e1b" strokeWidth="1" />
            <text x="496" y={y + h/2 + 4} fill="#c8a870" fontSize="11">{label}</text>
            <text x="496" y={y + h/2 + 16} fill="#6a5030" fontSize="9">{sub}</text>
          </g>
        ))}

        {[90, 130, 170, 210, 250, 290, 330, 370].map((x, i) => (
          <g key={i}>
            <line x1={x} y1={426} x2={x} y2={318} stroke="#ff6600" strokeWidth="1.5" strokeDasharray="3,2" opacity="0.5" markerEnd="url(#hArr)" />
          </g>
        ))}
        <defs>
          <marker id="hArr" markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto">
            <path d="M0,4 L2.5,0 L5,4Z" fill="#ff6600" opacity="0.6" />
          </marker>
        </defs>
        <text x="240" y="445" textAnchor="middle" fill="#ff6600" fontSize="10" opacity="0.7">тепло поднимается вверх</text>

        <rect x="30" y="468" width="320" height="80" fill="#1a0a00" stroke="#c0392b" strokeWidth="1.5" rx="4" />
        <text x="45" y="485" fill="#e74c3c" fontSize="11" fontWeight="bold">⚠ Критически важно:</text>
        <text x="45" y="500" fill="#a08050" fontSize="10">1. Все стыки каналов — герметично глиной</text>
        <text x="45" y="514" fill="#a08050" fontSize="10">2. Дымоход должен быть выше уровня крыши</text>
        <text x="45" y="528" fill="#a08050" fontSize="10">3. Первая топка — слабая, для просушки</text>
        <text x="45" y="542" fill="#a08050" fontSize="10">4. Проверь тягу перед закрытием пола!</text>

        <rect x="360" y="468" width="310" height="80" fill="#001a08" stroke="#27ae60" strokeWidth="1.5" rx="4" />
        <text x="376" y="485" fill="#2ecc71" fontSize="11" fontWeight="bold">✓ Как проверить тягу:</text>
        <text x="376" y="500" fill="#a0c090" fontSize="10">Зажги бумагу у входа в канал</text>
        <text x="376" y="514" fill="#a0c090" fontSize="10">Дым должен уйти в канал — не обратно</text>
        <text x="376" y="528" fill="#a0c090" fontSize="10">Если нет тяги → поднять дымоход</text>
        <text x="376" y="542" fill="#a0c090" fontSize="10">Смотровое отверстие в начале канала</text>

        <text x="350" y="570" textAnchor="middle" fill="#5a3e1b" fontSize="9" letterSpacing="1">СИСТЕМА ОНДОЛ — ДЕТАЛЬНАЯ СХЕМА · ЛИСТ 3/4</text>
      </svg>
    </div>
  );
}

function View3D() {
  return (
    <div>
      <div style={{ color: "#8a6a3a", fontSize: "11px", letterSpacing: "2px", marginBottom: "16px", textTransform: "uppercase" }}>
        Изометрический вид · Материалы и конструкция
      </div>
      <svg viewBox="0 0 700 560" style={{ width: "1400px", maxWidth: "none", display: "block" }}>
        <defs>
          <pattern id="logTex" width="20" height="20" patternUnits="userSpaceOnUse">
            <line x1="0" y1="10" x2="20" y2="10" stroke="#6a3010" strokeWidth="1.5" />
            <line x1="0" y1="0" x2="20" y2="0" stroke="#7a4020" strokeWidth="0.5" />
          </pattern>
          <pattern id="roofTex" width="15" height="15" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
            <line x1="0" y1="0" x2="15" y2="0" stroke="#3a2808" strokeWidth="2" />
          </pattern>
        </defs>

        <polygon points="80,280 80,440 340,510 340,350" fill="#8B4513" opacity="0.9" />
        {[295,315,335,355,375,395,415,435].map((y,i) => (
          <line key={i} x1="80" y1={y} x2={80+(340-80)} y2={y+(510-440)*((y-295)/(440-295))+350-350+(y-295)*0.3} stroke="#6a3010" strokeWidth="1.5" opacity="0.7" />
        ))}
        <polygon points="80,280 80,440 340,510 340,350" fill="#c8a870" opacity="0.35" />

        <polygon points="340,350 340,510 600,440 600,280" fill="#9B5523" opacity="0.85" />
        {[295,315,335,355,375,395,415,435].map((y,i) => (
          <line key={i} x1="340" y1={y+(i*1.5)} x2="600" y2={y-15+(i*1.5)} stroke="#7a4020" strokeWidth="1.5" opacity="0.6" />
        ))}
        <polygon points="340,350 340,510 600,440 600,280" fill="#c8a870" opacity="0.2" />

        <polygon points="60,280 80,280 340,350 320,350" fill="url(#roofTex)" />
        <polygon points="60,280 80,280 340,350 320,350" fill="#3a2808" opacity="0.85" />
        <polygon points="320,350 340,350 340,210 320,210" fill="#3a2808" opacity="0.7" />
        <polygon points="80,280 340,210 340,350 80,280" fill="#4a3010" opacity="0.8" />

        <polygon points="340,210 600,280 600,350 340,350" fill="#3d2808" opacity="0.85" />
        <line x1="340" y1="210" x2="600" y2="280" stroke="#8B4513" strokeWidth="6" />

        <line x1="340" y1="210" x2="340" y2="350" stroke="#8B4513" strokeWidth="5" />

        <rect x="610" y="200" width="35" height="120" fill="#555" stroke="#27ae60" strokeWidth="2" />
        <rect x="605" y="190" width="45" height="20" fill="#666" stroke="#2ecc71" strokeWidth="1.5" />
        <text x="628" y="185" textAnchor="middle" fill="#2ecc71" fontSize="10">↑ дым</text>
        {[165, 150, 135].map((y, i) => (
          <text key={i} x="628" y={y} textAnchor="middle" fill="#27ae60" fontSize="12" opacity={0.3 + i * 0.25}>↑</text>
        ))}

        <polygon points="130,380 130,460 180,475 180,395" fill="#5a3010" stroke="#d4a84b" strokeWidth="2" />
        <line x1="165" y1="425" x2="170" y2="427" stroke="#d4a84b" strokeWidth="2" />
        <polygon points="110,460 185,480 185,488 110,468" fill="#95a5a6" />
        <polygon points="115,468 185,488 185,496 115,476" fill="#7f8c8d" />

        <polygon points="210,360 210,400 265,414 265,374" fill="#3498db" opacity="0.7" stroke="#5dade2" strokeWidth="1.5" />
        <line x1="210" y1="380" x2="265" y2="394" stroke="#5dade2" strokeWidth="1" />
        <line x1="237" y1="360" x2="237" y2="407" stroke="#5dade2" strokeWidth="1" />

        <polygon points="420,360 420,400 490,386 490,346" fill="#3498db" opacity="0.6" stroke="#5dade2" strokeWidth="1.5" />
        <line x1="420" y1="373" x2="490" y2="366" stroke="#5dade2" strokeWidth="1" />
        <line x1="455" y1="347" x2="455" y2="400" stroke="#5dade2" strokeWidth="1" />

        <ellipse cx="605" cy="440" rx="20" ry="8" fill="#95a5a6" opacity="0.6" stroke="#7f8c8d" strokeWidth="1.5" />
        <text x="640" y="444" fill="#95a5a6" fontSize="9">фундамент</text>

        {[
          { x: 42, y: 275, text: "дёрн / кора", arrow: "→" },
          { x: 340, y: 200, text: "конёк", anchor: "middle" },
        ].map(({ x, y, text, arrow, anchor }, i) => (
          <text key={i} x={x} y={y} textAnchor={anchor || "start"} fill="#8a6a3a" fontSize="10">{arrow} {text}</text>
        ))}

        <line x1="90" y1="360" x2="30" y2="330" stroke="#5a3e1b" strokeWidth="1" />
        <text x="28" y="327" textAnchor="end" fill="#c8a870" fontSize="10">Глина + солома</text>
        <text x="28" y="339" textAnchor="end" fill="#6a5030" fontSize="9">(саман)</text>

        <line x1="500" y1="320" x2="640" y2="295" stroke="#5a3e1b" strokeWidth="1" />
        <text x="644" y="292" fill="#8B4513" fontSize="10">Брёвна Ø15–20</text>

        <line x1="340" y1="510" x2="340" y2="535" stroke="#5a3e1b" strokeWidth="1" />
        <text x="340" y="548" textAnchor="middle" fill="#c8a870" fontSize="10">Глиняный пол с системой ондол</text>

        <polygon points="80,440 340,510 600,440 340,370" fill="#c8a870" opacity="0.2" stroke="#c8a870" strokeWidth="1" strokeDasharray="4,3" />

        <text x="660" y="115" textAnchor="middle" fill="#5a3e1b" fontSize="12">↑</text>
        <text x="660" y="127" textAnchor="middle" fill="#5a3e1b" fontSize="9">С</text>

        <line x1="80" y1="545" x2="230" y2="545" stroke="#5a3e1b" strokeWidth="2" />
        <line x1="80" y1="540" x2="80" y2="550" stroke="#5a3e1b" strokeWidth="1.5" />
        <line x1="155" y1="542" x2="155" y2="548" stroke="#5a3e1b" strokeWidth="1" />
        <line x1="230" y1="540" x2="230" y2="550" stroke="#5a3e1b" strokeWidth="1.5" />
        <text x="80" y="558" textAnchor="middle" fill="#6a5030" fontSize="9">0</text>
        <text x="155" y="558" textAnchor="middle" fill="#6a5030" fontSize="9">2 м</text>
        <text x="230" y="558" textAnchor="middle" fill="#6a5030" fontSize="9">4 м</text>

        <text x="350" y="558" textAnchor="middle" fill="#5a3e1b" fontSize="9" letterSpacing="1">ИЗОМЕТРИЯ · ХИЖИНА «ОНДОЛ» · ЛИСТ 4/4</text>
      </svg>
    </div>
  );
}
