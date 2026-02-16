"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import type { FC, ReactNode, MouseEvent as ReactMouseEvent } from "react";
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar, RadarChart, Radar,
  PolarGrid, PolarAngleAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie
} from "recharts";

// ═══════════════════════════════════════════════════════════════
// UTILITY HOOKS
// ═══════════════════════════════════════════════════════════════
const useFlicker = (base: number, range: number = 10, speed: number = 200): number => {
  const [val, setVal] = useState<number>(base);
  useEffect(() => {
    const id = setInterval(() => {
      setVal((prev: number) => {
        const d = (Math.random() - 0.47) * range;
        return Math.max(base - range, Math.min(base + range, prev + d));
      });
    }, speed + Math.random() * 100);
    return () => clearInterval(id);
  }, [base, range, speed]);
  return val;
};

interface LiveDataPoint {
  x: number;
  y: number;
}

const useLiveArray = (len: number = 40, baseVal: number = 50, variance: number = 20, speed: number = 180): LiveDataPoint[] => {
  const [data, setData] = useState<LiveDataPoint[]>(() =>
    Array.from({ length: len }, (_, i) => ({ x: i, y: baseVal + Math.random() * variance }))
  );
  useEffect(() => {
    const id = setInterval(() => {
      setData((prev: LiveDataPoint[]) => {
        const next = [...prev.slice(1)];
        const last = prev[prev.length - 1];
        next.push({ x: last.x + 1, y: Math.max(5, Math.min(95, last.y + (Math.random() - 0.47) * variance * 0.6)) });
        return next;
      });
    }, speed);
    return () => clearInterval(id);
  }, [len, variance, speed]);
  return data;
};

// ═══════════════════════════════════════════════════════════════
// EYE SPEEDOMETER — The centrepiece
// ═══════════════════════════════════════════════════════════════
interface EyeSpeedometerProps {
  color: string;
  label: string;
  unit: string;
  baseValue: number;
  max: number;
  secondaryColor?: string;
  sublabel?: string;
}

const EyeSpeedometer: FC<EyeSpeedometerProps> = ({ color, label, unit, baseValue, max, secondaryColor, sublabel }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const val = useFlicker(baseValue, max * 0.08, 120);
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const subVal1 = useFlicker(baseValue * 0.6, 8, 300);
  const subVal2 = useFlicker(baseValue * 0.3, 5, 400);
  const subVal3 = useFlicker(baseValue * 0.9, 12, 250);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const S = canvas.width;
    const cx = S / 2, cy = S / 2;
    const R = S * 0.42;
    ctx.clearRect(0, 0, S, S);

    const pct = val / max;

    // Outer ring glow
    for (let i = 3; i >= 0; i--) {
      ctx.beginPath();
      ctx.arc(cx, cy, R + 8 + i * 4, 0, Math.PI * 2);
      ctx.strokeStyle = `${color}${String(Math.floor(5 + i * 3)).padStart(2, "0")}`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Background track (270 degree arc)
    const startA = Math.PI * 0.75;
    const endA = Math.PI * 2.25;
    const segments = 60;
    for (let i = 0; i < segments; i++) {
      const t = i / segments;
      const a1 = startA + t * (endA - startA);
      const a2 = startA + (i + 0.7) / segments * (endA - startA);
      ctx.beginPath();
      ctx.arc(cx, cy, R, a1, a2);
      ctx.strokeStyle = t <= pct ? `${color}${hovered ? "cc" : "88"}` : "rgba(255,255,255,0.04)";
      ctx.lineWidth = hovered ? 14 : 10;
      ctx.lineCap = "butt";
      ctx.stroke();
    }

    // Inner glow ring
    ctx.beginPath();
    ctx.arc(cx, cy, R - 18, 0, Math.PI * 2);
    ctx.strokeStyle = `${color}15`;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Tick marks — major
    for (let i = 0; i <= 10; i++) {
      const t = i / 10;
      const angle = startA + t * (endA - startA);
      const inner = R - 28;
      const outer = R - 14;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(angle) * inner, cy + Math.sin(angle) * inner);
      ctx.lineTo(cx + Math.cos(angle) * outer, cy + Math.sin(angle) * outer);
      ctx.strokeStyle = t <= pct ? `${color}aa` : "rgba(255,255,255,0.1)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Labels
      const labelR = R - 36;
      ctx.save();
      ctx.font = "9px monospace";
      ctx.fillStyle = t <= pct ? `${color}88` : "rgba(255,255,255,0.15)";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(((max / 10) * i).toFixed(0), cx + Math.cos(angle) * labelR, cy + Math.sin(angle) * labelR);
      ctx.restore();
    }

    // Minor ticks
    for (let i = 0; i <= 50; i++) {
      const t = i / 50;
      const angle = startA + t * (endA - startA);
      const inner = R - 17;
      const outer = R - 13;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(angle) * inner, cy + Math.sin(angle) * inner);
      ctx.lineTo(cx + Math.cos(angle) * outer, cy + Math.sin(angle) * outer);
      ctx.strokeStyle = t <= pct ? `${color}44` : "rgba(255,255,255,0.04)";
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }

    // Needle
    const needleAngle = startA + pct * (endA - startA);
    const needleLen = R * 0.55;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(needleAngle + Math.PI) * 8, cy + Math.sin(needleAngle + Math.PI) * 8);
    ctx.lineTo(cx + Math.cos(needleAngle) * needleLen, cy + Math.sin(needleAngle) * needleLen);
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2.5;
    ctx.shadowColor = "#fff";
    ctx.shadowBlur = hovered ? 20 : 10;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Center iris effect
    const irisGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 30);
    irisGrad.addColorStop(0, `${color}cc`);
    irisGrad.addColorStop(0.4, `${color}44`);
    irisGrad.addColorStop(0.7, `${secondaryColor || color}22`);
    irisGrad.addColorStop(1, "transparent");
    ctx.beginPath();
    ctx.arc(cx, cy, 30, 0, Math.PI * 2);
    ctx.fillStyle = irisGrad;
    ctx.shadowColor = color;
    ctx.shadowBlur = hovered ? 40 : 20;
    ctx.fill();
    ctx.shadowBlur = 0;

    // Pupil
    ctx.beginPath();
    ctx.arc(cx, cy, 8, 0, Math.PI * 2);
    ctx.fillStyle = `${color}`;
    ctx.shadowColor = color;
    ctx.shadowBlur = 30;
    ctx.fill();
    ctx.shadowBlur = 0;

    // Concentric pupil rings
    [14, 20, 26].forEach((r, idx) => {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = `${color}${20 + idx * 10}`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    });

  }, [val, max, color, hovered, secondaryColor]);

  return (
    <div className="flex flex-col items-center relative group"
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="relative cursor-pointer" onClick={() => setExpanded(!expanded)}
        style={{ transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)", transform: hovered ? "scale(1.05)" : "scale(1)" }}>
        <canvas ref={canvasRef} width={280} height={280}
          style={{ width: 280, height: 280, filter: hovered ? `drop-shadow(0 0 30px ${color}66)` : `drop-shadow(0 0 15px ${color}33)`, transition: "filter 0.4s ease" }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div className="font-mono text-3xl font-bold" style={{ color, textShadow: `0 0 20px ${color}88` }}>
            {val.toFixed(1)}
          </div>
          <div className="text-xs opacity-40 tracking-widest uppercase">{unit}</div>
        </div>
      </div>
      <div className="text-xs tracking-widest uppercase mt-1 font-mono" style={{ color: `${color}99` }}>{label}</div>
      <div className="text-xs opacity-25 tracking-wider">{sublabel}</div>

      {/* Expanded sub-metrics */}
      <div className="overflow-hidden transition-all duration-700 ease-in-out w-full"
        style={{ maxHeight: expanded ? 160 : 0, opacity: expanded ? 1 : 0 }}>
        <div className="mt-3 space-y-2 px-2">
          {[
            { l: "Peak Burst", v: subVal3.toFixed(1), u: unit, c: color },
            { l: "Avg Sustained", v: subVal1.toFixed(1), u: unit, c: secondaryColor || color },
            { l: "Thermal Envelope", v: subVal2.toFixed(1), u: "GHz", c: "#f43f5e" },
          ].map((m, i) => (
            <div key={i} className="flex justify-between items-center px-2 py-1 rounded text-xs font-mono border transition-all duration-300 hover:border-opacity-60"
              style={{ borderColor: `${m.c}22`, background: `${m.c}08` }}>
              <span className="opacity-40">{m.l}</span>
              <span style={{ color: m.c, textShadow: `0 0 8px ${m.c}44` }}>{m.v} <span className="opacity-40">{m.u}</span></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// INTERACTIVE BUTTON PANEL — Tiny lights, click to change data
// ═══════════════════════════════════════════════════════════════
interface ButtonPanelProps {
  title: string;
  buttons: string[];
  activeIndex: number;
  onSelect: (i: number) => void;
  accentColor?: string;
}

const ButtonPanel: FC<ButtonPanelProps> = ({ title, buttons, activeIndex, onSelect, accentColor = "#00f0ff" }) => (
  <div className="space-y-1.5">
    <div className="text-xs font-mono uppercase tracking-widest opacity-30 mb-2">{title}</div>
    <div className="flex flex-wrap gap-1.5">
      {buttons.map((btn, i) => (
        <button key={i} onClick={() => onSelect(i)}
          className="relative flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-mono transition-all duration-300 border group overflow-hidden"
          style={{
            borderColor: activeIndex === i ? `${accentColor}66` : "rgba(255,255,255,0.06)",
            background: activeIndex === i ? `${accentColor}15` : "rgba(255,255,255,0.02)",
            color: activeIndex === i ? accentColor : "rgba(255,255,255,0.35)",
            boxShadow: activeIndex === i ? `0 0 15px ${accentColor}22, inset 0 0 15px ${accentColor}08` : "none",
          }}>
          <div className="w-1.5 h-1.5 rounded-full transition-all duration-500"
            style={{
              background: activeIndex === i ? accentColor : "rgba(255,255,255,0.1)",
              boxShadow: activeIndex === i ? `0 0 8px ${accentColor}` : "none",
            }} />
          {btn}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: `radial-gradient(circle at 50% 50%, ${accentColor}10, transparent 70%)` }} />
        </button>
      ))}
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════
// ACCORDION PANEL
// ═══════════════════════════════════════════════════════════════
interface AccordionItemProps {
  title: string;
  children: ReactNode;
  color?: string;
  defaultOpen?: boolean;
}

const AccordionItem: FC<AccordionItemProps> = ({ title, children, color = "#00f0ff", defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border rounded-lg overflow-hidden transition-all duration-300"
      style={{ borderColor: open ? `${color}33` : "rgba(255,255,255,0.04)", background: open ? `${color}05` : "transparent" }}>
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2 text-xs font-mono uppercase tracking-wider group transition-all duration-300"
        style={{ color: open ? color : "rgba(255,255,255,0.4)" }}>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full transition-all duration-500"
            style={{ background: open ? color : "rgba(255,255,255,0.15)", boxShadow: open ? `0 0 8px ${color}` : "none" }} />
          {title}
        </div>
        <span className="transition-transform duration-500" style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>▾</span>
      </button>
      <div className="transition-all duration-700 ease-in-out overflow-hidden"
        style={{ maxHeight: open ? 400 : 0, opacity: open ? 1 : 0 }}>
        <div className="px-3 pb-3">{children}</div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// MINI CIRCULAR GAUGE (for side panels)
// ═══════════════════════════════════════════════════════════════
interface MiniGaugeProps {
  value: number;
  max?: number;
  color: string;
  label: string;
  size?: number;
}

const MiniGauge: FC<MiniGaugeProps> = ({ value, max = 100, color, label, size = 60 }) => {
  const v = useFlicker(value, max * 0.05, 400);
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const pct = v / max;
  const [hov, setHov] = useState(false);

  return (
    <div className="flex flex-col items-center cursor-pointer transition-transform duration-300"
      style={{ transform: hov ? "scale(1.15)" : "scale(1)" }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="4" />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={hov ? 5 : 4}
          strokeDasharray={circ} strokeDashoffset={circ * (1 - pct)} strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 ${hov ? 10 : 4}px ${color})`, transition: "all 0.4s ease" }} />
        <text x={size / 2} y={size / 2 + 4} textAnchor="middle" fill={color} fontSize="11" fontFamily="monospace"
          style={{ filter: `drop-shadow(0 0 4px ${color})` }}
          transform={`rotate(90 ${size / 2} ${size / 2})`}>{v.toFixed(0)}</text>
      </svg>
      <div className="text-xs opacity-30 mt-0.5 font-mono" style={{ fontSize: 8 }}>{label}</div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// GLOWING SLIDER
// ═══════════════════════════════════════════════════════════════
interface GlowSliderProps {
  label: string;
  value: number;
  color?: string;
}

const GlowSlider: FC<GlowSliderProps> = ({ label, value, color = "#00f0ff" }) => {
  const v = useFlicker(value, 8, 300);
  const [hov, setHov] = useState(false);
  return (
    <div className="space-y-1 group cursor-pointer" onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div className="flex justify-between text-xs font-mono">
        <span className="opacity-30 transition-opacity duration-300 group-hover:opacity-60">{label}</span>
        <span style={{ color, textShadow: hov ? `0 0 10px ${color}` : "none", transition: "all 0.3s" }}>{v.toFixed(1)}%</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.04)" }}>
        <div className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${v}%`, background: `linear-gradient(90deg, ${color}66, ${color})`,
            boxShadow: hov ? `0 0 12px ${color}66, 0 0 4px ${color}` : `0 0 6px ${color}33`,
          }} />
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// TOGGLE SWITCH
// ═══════════════════════════════════════════════════════════════
interface ToggleSwitchProps {
  label: string;
  color?: string;
  defaultOn?: boolean;
}

const ToggleSwitch: FC<ToggleSwitchProps> = ({ label, color = "#10b981", defaultOn = true }) => {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between py-1 cursor-pointer group" onClick={() => setOn(!on)}>
      <span className="text-xs font-mono opacity-30 group-hover:opacity-60 transition-opacity">{label}</span>
      <div className="w-8 h-4 rounded-full relative transition-all duration-500"
        style={{ background: on ? `${color}33` : "rgba(255,255,255,0.06)", border: `1px solid ${on ? `${color}66` : "rgba(255,255,255,0.08)"}` }}>
        <div className="absolute top-0.5 w-3 h-3 rounded-full transition-all duration-500"
          style={{
            left: on ? 16 : 2, background: on ? color : "rgba(255,255,255,0.2)",
            boxShadow: on ? `0 0 8px ${color}` : "none"
          }} />
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// WAVEFORM
// ═══════════════════════════════════════════════════════════════
interface WaveformProps {
  color?: string;
  height?: number;
  bars?: number;
}

const Waveform: FC<WaveformProps> = ({ color = "#ff6b00", height = 60, bars = 48 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let id: number;
    const draw = () => {
      frameRef.current += 0.025;
      const t = frameRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mid = canvas.height / 2;
      const bw = canvas.width / bars;
      for (let i = 0; i < bars; i++) {
        const freq = Math.sin(t * 1.2 + i * 0.18) * Math.cos(t * 0.6 + i * 0.08) * Math.sin(t * 0.3 + i * 0.25);
        const h = Math.abs(freq) * mid * 0.85 + 1;
        const a = 0.3 + Math.abs(freq) * 0.7;
        ctx.fillStyle = color;
        ctx.globalAlpha = a;
        ctx.fillRect(i * bw + 0.5, mid - h, bw - 1, h * 2);
      }
      ctx.globalAlpha = 1;
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(id);
  }, [color, bars]);

  return <canvas ref={canvasRef} width={400} height={height * 2} style={{ width: "100%", height }} />;
};

// ═══════════════════════════════════════════════════════════════
// NEURAL NET CANVAS
// ═══════════════════════════════════════════════════════════════
interface NeuralCanvasProps { width?: number; height?: number; }

const NeuralCanvas: FC<NeuralCanvasProps> = ({ width = 500, height = 200 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<{x:number;y:number;s:number;d:number;vx:number;vy:number}[]>(
    Array.from({ length: 55 }, () => ({
      x: Math.random() * 100, y: Math.random() * 100, s: 1.5 + Math.random() * 3, d: Math.random() * 4,
      vx: (Math.random() - 0.5) * 0.02, vy: (Math.random() - 0.5) * 0.02,
    }))
  );
  const edgesRef = useRef<{from:number;to:number;d:number}[]>([]);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const nodes = nodesRef.current;
    const edges: {from:number;to:number;d:number}[] = [];
    nodes.forEach((n, i) => {
      const conns = 1 + Math.floor(Math.random() * 2);
      for (let c = 0; c < conns; c++) {
        const t = Math.floor(Math.random() * nodes.length);
        if (t !== i) edges.push({ from: i, to: t, d: Math.random() * 5 });
      }
    });
    edgesRef.current = edges;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const nodes = nodesRef.current;
    const edges = edgesRef.current;
    let id: number;

    const draw = () => {
      frameRef.current += 0.008;
      const t = frameRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Drift nodes
      nodes.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > 100) n.vx *= -1;
        if (n.y < 0 || n.y > 100) n.vy *= -1;
      });

      edges.forEach(e => {
        const f = nodes[e.from], to = nodes[e.to];
        const fx = f.x * canvas.width / 100, fy = f.y * canvas.height / 100;
        const tx = to.x * canvas.width / 100, ty = to.y * canvas.height / 100;
        ctx.beginPath(); ctx.moveTo(fx, fy); ctx.lineTo(tx, ty);
        ctx.strokeStyle = "rgba(0,240,255,0.04)"; ctx.lineWidth = 0.5; ctx.stroke();

        const pt = ((t * 0.4 + e.d) % 3) / 3;
        if (pt < 1) {
          const px = fx + (tx - fx) * pt, py = fy + (ty - fy) * pt;
          ctx.beginPath(); ctx.arc(px, py, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0,240,255,${0.5 * (1 - pt)})`; ctx.fill();
        }
      });

      nodes.forEach(n => {
        const x = n.x * canvas.width / 100, y = n.y * canvas.height / 100;
        const p = Math.sin(t * 2 + n.d) * 0.5 + 0.5;
        ctx.beginPath(); ctx.arc(x, y, n.s * (0.8 + p * 0.4), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,240,255,${0.15 + p * 0.35})`;
        ctx.shadowColor = "rgba(0,240,255,0.4)"; ctx.shadowBlur = 8 * p;
        ctx.fill(); ctx.shadowBlur = 0;
      });

      id = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(id);
  }, [width, height]);

  return <canvas ref={canvasRef} width={width} height={height} style={{ width: "100%", height: "100%" }} />;
};

// ═══════════════════════════════════════════════════════════════
// MATRIX RAIN
// ═══════════════════════════════════════════════════════════════
interface MatrixRainProps { w?: number; h?: number; }

const MatrixRain: FC<MatrixRainProps> = ({ w = 200, h = 120 }) => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const cols = Math.floor(c.width / 12);
    const drops = Array(cols).fill(0).map(() => Math.random() * -30);
    const chars = "01アウエカキクケ∑∂√∞≈λΩ";
    const id = setInterval(() => {
      ctx.fillStyle = "rgba(5,5,20,0.1)"; ctx.fillRect(0, 0, c.width, c.height);
      ctx.font = "10px monospace";
      drops.forEach((y, i) => {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = `rgba(0,240,255,${Math.random() > 0.5 ? 0.7 : 0.25})`;
        ctx.fillText(ch, i * 12, y);
        drops[i] = y > c.height + Math.random() * 500 ? 0 : y + 12;
      });
    }, 55);
    return () => clearInterval(id);
  }, []);
  return <canvas ref={ref} width={w} height={h} style={{ width: "100%", height: "100%", opacity: 0.6 }} />;
};

// ═══════════════════════════════════════════════════════════════
// LOG STREAM
// ═══════════════════════════════════════════════════════════════
interface LogStreamProps { height?: number; }

interface LogEntry {
  id: number;
  text: string;
  ts: string;
  brightness: number;
}

const LogStream: FC<LogStreamProps> = ({ height = 140 }) => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const msgs = [
    "kernel: [%d.%d] sched: quantum_core0 migrated to node %d",
    "systemd[1]: Started Tensor Processing Unit slice %d.service",
    "neuralctl: inference pipeline %d.%d.%d established — nominal",
    "fusionctl: plasma containment field stable at %d.%d%%",
    "netfilter: ACCEPT IN=eth%d OUT= SRC=10.%d.%d.%d DST=10.%d.%d.1",
    "gpumon[%d]: thermal throttle averted — die temp %d.%dC",
    "memctl: HBM3 bank %d coherence check passed — %d.%dns latency",
    "cron: quantum_entangle --calibrate --node=%d --fidelity=%d.%d",
    "sshd[%d]: Accepted publickey for operator from 10.0.%d.%d port %d",
    "docker: container nexus-agent-%d health check: OK (%dms)",
    "systemd-journald: runtime journal (/run/log) %d.%dM used",
    "audit: CRYPTO_SESSION device=eth%d addr=10.%d.%d.%d quantum_key=OK",
    "kubelet: pod nexus-inference-%d successfully synced",
    "nvlink[%d]: peer-to-peer bandwidth: %d.%d GB/s sustained",
    "chrony: System clock offset: %d.%d%dns — stratum 1",
  ];

  useEffect(() => {
    let running = true;
    const pushLog = () => {
      if (!running) return;
      const msg = msgs[Math.floor(Math.random() * msgs.length)].replace(/%d/g, () => String(Math.floor(Math.random() * 999)));
      const brightness = 0.5 + Math.random() * 0.5;
      setLogs(prev => [...prev.slice(-20), {
        id: Date.now() + Math.random(), text: msg,
        ts: (new Date().toISOString().split("T")[1] ?? "00:00:00.000").slice(0, 12),
        brightness,
      }]);
      const delay = Math.random() < 0.2 ? 80 + Math.random() * 120 : 300 + Math.random() * 500;
      setTimeout(pushLog, delay);
    };
    pushLog();
    return () => { running = false; };
  }, []);

  return (
    <div className="font-mono overflow-hidden relative rounded" style={{ height, background: "#010201", fontSize: 10 }}>
      <div className="absolute inset-0 flex flex-col justify-end p-2 gap-px">
        {logs.map(l => (
          <div key={l.id} className="flex gap-1.5" style={{ animation: "logIn 0.3s ease forwards", opacity: 0 }}>
            <span style={{ color: "rgba(51,255,51,0.25)" }}>{l.ts}</span>
            <span style={{ color: `rgba(51,255,51,${l.brightness})` }}>{l.text}</span>
          </div>
        ))}
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
      }} />
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// PARTICLE FIELD BACKGROUND
// ═══════════════════════════════════════════════════════════════
const ParticleField: FC = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * c.width, y: Math.random() * c.height,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      s: 0.5 + Math.random() * 1.5, o: 0.1 + Math.random() * 0.3,
    }));
    let id: number;
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = c.width; if (p.x > c.width) p.x = 0;
        if (p.y < 0) p.y = c.height; if (p.y > c.height) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,240,255,${p.o})`; ctx.fill();
      });
      // Connect nearby
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 80) {
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,240,255,${0.03 * (1 - d / 80)})`; ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      }
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(id);
  }, []);
  return <canvas ref={ref} width={1400} height={900} className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.5 }} />;
};

// ═══════════════════════════════════════════════════════════════
// CARD WRAPPER WITH HOVER GLOW
// ═══════════════════════════════════════════════════════════════
interface CardProps { children: ReactNode; className?: string; color?: string; title?: string; noPad?: boolean; }

const Card: FC<CardProps> = ({ children, className = "", color = "#00f0ff", title, noPad = false }) => {
  const [hov, setHov] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  return (
    <div ref={ref} className={`relative rounded-xl overflow-hidden transition-all duration-500 ${className}`}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} onMouseMove={handleMove}
      style={{
        background: "linear-gradient(145deg, rgba(10,12,32,0.95), rgba(5,5,18,0.98))",
        border: `1px solid ${hov ? `${color}40` : `${color}12`}`,
        boxShadow: hov ? `0 0 40px ${color}15, inset 0 0 40px ${color}05` : `inset 0 1px 0 ${color}08`,
        transition: "all 0.5s ease",
      }}>
      {/* Mouse-following radial glow */}
      {hov && (
        <div className="absolute pointer-events-none transition-opacity duration-300" style={{
          width: 250, height: 250, borderRadius: "50%",
          left: mousePos.x - 125, top: mousePos.y - 125,
          background: `radial-gradient(circle, ${color}12, transparent 70%)`,
        }} />
      )}
      {/* Corner brackets */}
      {([
        { t: 0, l: 0, bt: "t" as const, bl: "l" as const },
        { t: 0, r: 0, bt: "t" as const, bl: "r" as const },
        { b: 0, l: 0, bt: "b" as const, bl: "l" as const },
        { b: 0, r: 0, bt: "b" as const, bl: "r" as const },
      ] as Array<{ t?: number; b?: number; l?: number; r?: number; bt: "t" | "b"; bl: "l" | "r" }>).map((pos, i) => (
        <div key={i} className="absolute w-3 h-3 transition-all duration-500" style={{
          top: pos.t, bottom: pos.b, left: pos.l, right: pos.r,
          [`border${pos.bt === "t" ? "Top" : "Bottom"}`]: `1px solid ${hov ? `${color}66` : `${color}25`}`,
          [`border${pos.bl === "l" ? "Left" : "Right"}`]: `1px solid ${hov ? `${color}66` : `${color}25`}`,
        }} />
      ))}
      {title && (
        <div className="flex items-center gap-2 px-3 pt-2.5 pb-1">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: color, boxShadow: `0 0 6px ${color}`, animation: "pulse 2s infinite" }} />
          <span className="text-xs font-mono uppercase tracking-widest transition-all duration-300" style={{ color: hov ? `${color}cc` : "rgba(255,255,255,0.35)" }}>{title}</span>
          <div className="flex-1 h-px ml-2" style={{ background: `linear-gradient(90deg, ${color}15, transparent)` }} />
        </div>
      )}
      <div className={noPad ? "" : "p-3"}>{children}</div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// GLITCH TEXT
// ═══════════════════════════════════════════════════════════════
interface GlitchTextProps { text: string; className?: string; }

const GlitchText: FC<GlitchTextProps> = ({ text, className = "" }) => (
  <span className={`relative inline-block ${className}`}>
    <span className="relative z-10">{text}</span>
    <span className="absolute top-0 left-0" style={{ color: "#ff0040", clipPath: "inset(10% 0 60% 0)", animation: "g1 2.5s infinite linear alternate-reverse", opacity: 0.7 }}>{text}</span>
    <span className="absolute top-0 left-0" style={{ color: "#00f0ff", clipPath: "inset(50% 0 10% 0)", animation: "g2 2.5s infinite linear alternate-reverse", opacity: 0.7 }}>{text}</span>
  </span>
);

// ═══════════════════════════════════════════════════════════════
// CYBER TOOLTIP
// ═══════════════════════════════════════════════════════════════
const CyberTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{name: string; value: number; color?: string}>; label?: string }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="px-2.5 py-1.5 rounded text-xs font-mono border" style={{
      background: "rgba(5,5,25,0.96)", borderColor: "rgba(0,240,255,0.25)", boxShadow: "0 0 25px rgba(0,240,255,0.12)"
    }}>
      <div style={{ color: "#00f0ff" }} className="mb-0.5">{label}</div>
      {payload.map((p, i) => (
        <div key={i} className="flex gap-2"><span style={{ color: p.color || "#fff" }}>{p.name}:</span><span className="text-white">{typeof p.value === "number" ? p.value.toFixed(2) : p.value}</span></div>
      ))}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// HEATMAP
// ═══════════════════════════════════════════════════════════════
interface HeatmapProps { rows?: number; cols?: number; color?: string; }

const Heatmap: FC<HeatmapProps> = ({ rows = 7, cols = 24, color = "#00f0ff" }) => {
  const data = useMemo(() =>
    Array.from({ length: rows * cols }, (_, i) => ({ r: Math.floor(i / cols), c: i % cols, v: Math.random() })), [rows, cols]);
  const [hovCell, setHovCell] = useState<number | null>(null);
  return (
    <div>
      <div className="grid gap-px" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {data.map((cell, i) => (
          <div key={i} className="aspect-square rounded-sm cursor-pointer transition-all duration-200"
            onMouseEnter={() => setHovCell(i)} onMouseLeave={() => setHovCell(null)}
            style={{
              background: `${color}${String(Math.floor(8 + cell.v * 120)).padStart(2, "0")}`,
              boxShadow: hovCell === i ? `0 0 8px ${color}88` : cell.v > 0.7 ? `0 0 3px ${color}33` : "none",
              transform: hovCell === i ? "scale(1.6)" : "scale(1)", zIndex: hovCell === i ? 10 : 1,
            }} />
        ))}
      </div>
      <div className="flex justify-between mt-1.5 text-xs opacity-20 font-mono">
        <span>00h</span><span>06h</span><span>12h</span><span>18h</span><span>23h</span>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// EXPANDABLE DATA CELL
// ═══════════════════════════════════════════════════════════════
interface DataCellProps { label: string; value: number; unit: string; detail: string; color?: string; }

const DataCell: FC<DataCellProps> = ({ label, value, unit, detail, color = "#00f0ff" }) => {
  const [expanded, setExpanded] = useState(false);
  const v = useFlicker(value, value * 0.06, 500);
  return (
    <div className="border rounded-lg cursor-pointer transition-all duration-500 overflow-hidden group"
      onClick={() => setExpanded(!expanded)}
      style={{
        borderColor: expanded ? `${color}44` : `${color}10`,
        background: expanded ? `${color}08` : "transparent",
      }}>
      <div className="flex items-center justify-between px-2.5 py-2">
        <div className="flex items-center gap-2">
          <div className="w-1 h-1 rounded-full transition-all duration-300"
            style={{ background: color, boxShadow: expanded ? `0 0 8px ${color}` : "none" }} />
          <span className="text-xs font-mono opacity-30 group-hover:opacity-60 transition-opacity">{label}</span>
        </div>
        <span className="text-sm font-mono font-bold transition-all duration-300"
          style={{ color, textShadow: expanded ? `0 0 12px ${color}66` : "none" }}>
          {v.toFixed(1)} <span className="text-xs opacity-40">{unit}</span>
        </span>
      </div>
      <div className="transition-all duration-600 overflow-hidden" style={{ maxHeight: expanded ? 100 : 0, opacity: expanded ? 1 : 0 }}>
        <div className="px-2.5 pb-2 text-xs font-mono opacity-40 border-t" style={{ borderColor: `${color}15` }}>
          <div className="pt-1.5">{detail}</div>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// STATUS BAR
// ═══════════════════════════════════════════════════════════════
const StatusBar: FC = () => {
  const [t, setT] = useState(new Date());
  useEffect(() => { const id = setInterval(() => setT(new Date()), 50); return () => clearInterval(id); }, []);
  const uptime = useFlicker(99.97, 0.02, 2000);
  return (
    <div className="flex items-center justify-between px-4 py-1.5 border-b font-mono border-t" style={{
      borderColor: "rgba(0,240,255,0.08)", background: "rgba(0,0,0,0.4)", fontSize: 10
    }}>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400" style={{ animation: "pulse 1.5s infinite", boxShadow: "0 0 6px rgba(74,222,128,0.6)" }} />
          <span className="text-green-400">ALL SYSTEMS NOMINAL</span>
        </div>
        <span className="opacity-15">│</span>
        <span className="opacity-25">NEXUS CORE v7.4.2-rc3</span>
        <span className="opacity-15">│</span>
        <span className="opacity-25">CLUSTER: 256 NODES</span>
        <span className="opacity-15">│</span>
        <span className="opacity-25">UPTIME: <span className="text-green-400">{uptime.toFixed(2)}%</span></span>
      </div>
      <div className="flex items-center gap-3">
        <span className="opacity-25">EPOCH: {Math.floor(Date.now() / 1000)}</span>
        <span className="opacity-15">│</span>
        <span style={{ color: "#00f0ff", textShadow: "0 0 8px rgba(0,240,255,0.5)" }}>
          {t.toLocaleTimeString("en-US", { hour12: false })}.{String(t.getMilliseconds()).padStart(3, "0")}
        </span>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// ROTATING GLOBE
// ═══════════════════════════════════════════════════════════════
interface RotatingGlobeProps { size?: number; }

const RotatingGlobe: FC<RotatingGlobeProps> = ({ size = 190 }) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const cx = c.width / 2, cy = c.height / 2, R = c.width * 0.4;
    let id: number;

    const landPts: {lat: number; lon: number}[] = [];
    for (let i = 0; i < 300; i++) {
      const cIdx = Math.floor(Math.random() * 5);
      const centers: number[][] = [[-0.2, 0.5], [0.3, 2.0], [-0.1, -1.5], [0.7, -0.5], [-0.5, 3.0]];
      const ctr = centers[cIdx] ?? [0, 0];
      landPts.push({ lat: ctr[0]! + (Math.random() - 0.5) * 0.8, lon: ctr[1]! + (Math.random() - 0.5) * 0.8 });
    }

    const lonLines = 18;

    const draw = () => {
      frameRef.current += 0.004;
      const rot = frameRef.current;
      ctx.clearRect(0, 0, c.width, c.height);

      const glow = ctx.createRadialGradient(cx, cy, R * 0.8, cx, cy, R * 1.4);
      glow.addColorStop(0, "rgba(0,240,255,0.06)"); glow.addColorStop(1, "transparent");
      ctx.fillStyle = glow; ctx.fillRect(0, 0, c.width, c.height);

      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,240,255,0.2)"; ctx.lineWidth = 1; ctx.stroke();

      for (let i = 1; i < 12; i++) {
        const lat = (i / 12 - 0.5) * Math.PI;
        const y = cy + R * Math.sin(lat);
        const rr = R * Math.cos(lat);
        if (rr > 0) { ctx.beginPath(); ctx.ellipse(cx, y, rr, rr * 0.3, 0, 0, Math.PI * 2); ctx.strokeStyle = "rgba(0,240,255,0.05)"; ctx.lineWidth = 0.5; ctx.stroke(); }
      }

      for (let i = 0; i < lonLines; i++) {
        const lon = (i / lonLines) * Math.PI * 2 + rot;
        ctx.beginPath();
        for (let j = 0; j <= 60; j++) {
          const lat = (j / 60 - 0.5) * Math.PI;
          const x3d = Math.cos(lat) * Math.cos(lon), z3d = Math.cos(lat) * Math.sin(lon), y3d = Math.sin(lat);
          if (z3d < -0.05) continue;
          const px = cx + x3d * R, py = cy - y3d * R;
          j === 0 || z3d < 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.strokeStyle = "rgba(0,240,255,0.05)"; ctx.lineWidth = 0.4; ctx.stroke();
      }

      landPts.forEach(pt => {
        const lon = pt.lon + rot;
        const x3d = Math.cos(pt.lat) * Math.cos(lon), z3d = Math.cos(pt.lat) * Math.sin(lon), y3d = Math.sin(pt.lat);
        if (z3d < 0) return;
        ctx.beginPath(); ctx.arc(cx + x3d * R, cy - y3d * R, 1.2 + z3d * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,240,255,${0.2 + z3d * 0.6})`; ctx.fill();
      });

      const t = frameRef.current;
      for (let i = 0; i < 4; i++) {
        const sLat = Math.sin(t * 0.3 + i * 1.5) * 0.6, sLon = t * 0.5 + i * 1.2 + rot;
        const eLat = Math.sin(t * 0.2 + i * 2.1) * 0.5, eLon = sLon + 1.5 + Math.sin(t + i);
        const sz = Math.cos(sLat) * Math.sin(sLon), ez = Math.cos(eLat) * Math.sin(eLon);
        if (sz < 0 && ez < 0) continue;
        const sx = cx + Math.cos(sLat) * Math.cos(sLon) * R, sy = cy - Math.sin(sLat) * R;
        const ex = cx + Math.cos(eLat) * Math.cos(eLon) * R, ey = cy - Math.sin(eLat) * R;
        const mx = (sx + ex) / 2, my = (sy + ey) / 2 - 25 - i * 8;
        ctx.beginPath(); ctx.moveTo(sx, sy); ctx.quadraticCurveTo(mx, my, ex, ey);
        ctx.strokeStyle = `rgba(0,240,255,${(0.08 + Math.max(sz, ez) * 0.15).toFixed(2)})`; ctx.lineWidth = 0.8; ctx.stroke();
        const pt2 = ((t * 0.3 + i * 0.7) % 1);
        const px2 = (1 - pt2) * (1 - pt2) * sx + 2 * (1 - pt2) * pt2 * mx + pt2 * pt2 * ex;
        const py2 = (1 - pt2) * (1 - pt2) * sy + 2 * (1 - pt2) * pt2 * my + pt2 * pt2 * ey;
        ctx.beginPath(); ctx.arc(px2, py2, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34,211,238,${(0.3 + (1 - pt2) * 0.6).toFixed(2)})`; ctx.fill();
      }

      id = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(id);
  }, [size]);

  return <canvas ref={ref} width={size * 2} height={size * 2} style={{ width: size, height: size }} />;
};

// ═══════════════════════════════════════════════════════════════
// MAIN DASHBOARD
// ═══════════════════════════════════════════════════════════════
const NexusDashboard: FC = () => {
  const [leftMetric, setLeftMetric] = useState(0);
  const [rightChart, setRightChart] = useState(0);
  const [viewMode, setViewMode] = useState(0);
  const liveData = useLiveArray(50, 55, 25, 150);
  const liveData2 = useLiveArray(50, 40, 20, 200);

  const areaData = useMemo(() => Array.from({ length: 30 }, (_, i) => ({
    t: `${String(i).padStart(2, "0")}:00`,
    v1: 40 + Math.sin(i * 0.4) * 25 + Math.random() * 10,
    v2: 30 + Math.cos(i * 0.3) * 20 + Math.random() * 8,
    v3: 50 + Math.sin(i * 0.6) * 15 + Math.random() * 12,
  })), []);

  const barData = useMemo(() => Array.from({ length: 16 }, (_, i) => ({
    n: `N${i}`, a: 20 + Math.random() * 60, b: 10 + Math.random() * 45,
  })), []);

  const radarData = [
    { s: "Inference", A: 92, B: 68 }, { s: "Training", A: 78, B: 85 },
    { s: "Embedding", A: 85, B: 72 }, { s: "Reasoning", A: 95, B: 60 },
    { s: "Retrieval", A: 70, B: 88 }, { s: "Generation", A: 88, B: 75 },
  ];

  const pieData = [
    { name: "Quantum", value: 30, fill: "#00f0ff" }, { name: "Neural", value: 25, fill: "#a855f7" },
    { name: "Photonic", value: 22, fill: "#ff6b00" }, { name: "Plasma", value: 23, fill: "#10b981" },
  ];

  const leftMetrics = [
    [
      { l: "Tensor Throughput", v: 847.3, u: "TF/s", d: "Peak sustained across 128 A100 cluster" },
      { l: "Quantum Coherence", v: 99.2, u: "%", d: "Qubit entanglement stability metric" },
      { l: "Plasma Conductance", v: 42.7, u: "PΩ", d: "Superconducting link bandwidth" },
      { l: "Neutrino Latency", v: 0.8, u: "μs", d: "Cross-node synchronization delta" },
    ],
    [
      { l: "Photon Bandwidth", v: 128.4, u: "PB/s", d: "Optical interconnect throughput" },
      { l: "Dark Energy Pool", v: 87.6, u: "ZJ", d: "Available computational reserves" },
      { l: "Graviton Flux", v: 3.14, u: "mT", d: "Field stabilization intensity" },
      { l: "Tachyon Buffer", v: 512.0, u: "EB", d: "Temporal cache allocation" },
    ],
  ];

  return (
    <div className="min-h-screen text-white relative overflow-x-hidden" style={{
      background: "#000000",
      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Orbitron:wght@400;500;700;900&display=swap');
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @keyframes g1 { 0%{clip-path:inset(10% 0 60% 0);transform:translate(-2px,0)}20%{clip-path:inset(30% 0 40% 0);transform:translate(2px,0)}40%{clip-path:inset(50% 0 20% 0);transform:translate(-1px,0)}60%{clip-path:inset(15% 0 55% 0);transform:translate(1px,0)}80%{clip-path:inset(70% 0 5% 0);transform:translate(-2px,0)}100%{clip-path:inset(5% 0 70% 0);transform:translate(2px,0)} }
        @keyframes g2 { 0%{clip-path:inset(60% 0 10% 0);transform:translate(2px,0)}20%{clip-path:inset(20% 0 50% 0);transform:translate(-2px,0)}40%{clip-path:inset(40% 0 30% 0);transform:translate(1px,0)}60%{clip-path:inset(70% 0 5% 0);transform:translate(-1px,0)}80%{clip-path:inset(10% 0 60% 0);transform:translate(2px,0)}100%{clip-path:inset(50% 0 20% 0);transform:translate(-2px,0)} }
        @keyframes logIn { from { opacity:0; transform:translateX(-8px); } to { opacity:0.75; transform:translateX(0); } }
        @keyframes scanDown { 0% { top: -2px; } 100% { top: 100%; } }
        @keyframes floatUp { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        @keyframes borderPulse { 0%, 100% { border-color: rgba(0,240,255,0.08); } 50% { border-color: rgba(0,240,255,0.25); } }
        @keyframes rotSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes orbFloat { 0%, 100% { transform: translate(0,0) scale(1); } 25% { transform: translate(3px,-3px) scale(1.02); } 50% { transform: translate(-2px,4px) scale(0.98); } 75% { transform: translate(4px,2px) scale(1.01); } }
        .recharts-cartesian-grid-horizontal line, .recharts-cartesian-grid-vertical line { stroke: rgba(255,255,255,0.025) !important; }
        .recharts-text { fill: rgba(255,255,255,0.2) !important; font-size: 9px !important; }
        ::-webkit-scrollbar { width: 3px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: rgba(0,240,255,0.15); border-radius: 2px; }
      `}</style>

      <ParticleField />

      {/* Scan line */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 50 }}>
        <div className="absolute w-full h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(0,240,255,0.12), transparent)", animation: "scanDown 8s linear infinite" }} />
      </div>

      {/* ═══ HEADER ═══ */}
      <header className="relative z-10 flex items-center justify-between px-5 py-3 border-b" style={{
        borderColor: "rgba(0,240,255,0.08)", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(20px)"
      }}>
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border" style={{ borderColor: "rgba(0,240,255,0.25)", animation: "rotSlow 12s linear infinite" }} />
            <div className="absolute inset-1 rounded-full border border-dashed" style={{ borderColor: "rgba(168,85,247,0.2)", animation: "rotSlow 18s linear infinite reverse" }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#00f0ff", boxShadow: "0 0 12px rgba(0,240,255,0.6)" }} />
          </div>
          <div>
            <div style={{ fontFamily: "'Orbitron', monospace", fontSize: 16, fontWeight: 700, letterSpacing: "0.15em" }}>
              <GlitchText text="AI WORKFLOW" />
            </div>
            <div className="text-xs opacity-20 tracking-widest" style={{ fontSize: 9 }}>AUTONOMOUS NEURAL OPERATIONS CENTER</div>
          </div>
        </div>
        <div className="flex items-center gap-5">
          {["NEURAL MESH", "QUANTUM BUS", "FUSION CORE", "SWARM INTEL", "CHRONO SYNC"].map((s, i) => (
            <div key={s} className="flex items-center gap-1.5 cursor-pointer group">
              <div className="w-1.5 h-1.5 rounded-full transition-all duration-300 group-hover:scale-150"
                style={{ background: i === 3 ? "#eab308" : "#10b981", boxShadow: `0 0 6px ${i === 3 ? "#eab308" : "#10b981"}`, animation: `pulse ${1.5 + i * 0.2}s infinite` }} />
              <span className="opacity-25 group-hover:opacity-60 transition-opacity" style={{ fontSize: 9 }}>{s}</span>
            </div>
          ))}
        </div>
      </header>
      <StatusBar />

      {/* ═══ MAIN LAYOUT — Mirrors the image: left panels | CENTER AI HEAD | right panels ═══ */}
      <main className="relative z-10 p-3 grid gap-3" style={{ gridTemplateColumns: "280px 1fr 280px" }}>

        {/* ═══════ LEFT COLUMN ═══════ */}
        <div className="space-y-3">
          {/* Control Panel */}
          <Card color="#ff6b00" title="Subsystem Control Matrix">
            <div className="space-y-3">
              <ButtonPanel title="Metric Layer" accentColor="#ff6b00"
                buttons={["Tensor", "Quantum", "Plasma", "Photon"]}
                activeIndex={leftMetric} onSelect={setLeftMetric} />
              <div className="space-y-1.5">
                {leftMetrics[leftMetric % 2].map((m, i) => (
                  <DataCell key={`${leftMetric}-${i}`} label={m.l} value={m.v} unit={m.u} detail={m.d}
                    color={["#ff6b00", "#00f0ff", "#a855f7", "#10b981"][i]} />
                ))}
              </div>
            </div>
          </Card>

          {/* Mini Gauges */}
          <Card color="#a855f7" title="Harmonic Oscillators">
            <div className="grid grid-cols-3 gap-2 py-1">
              <MiniGauge value={78} color="#a855f7" label="FLUX" />
              <MiniGauge value={92} color="#00f0ff" label="PHASE" />
              <MiniGauge value={65} color="#ff6b00" label="DRIFT" />
              <MiniGauge value={88} color="#10b981" label="SYNC" />
              <MiniGauge value={45} color="#f43f5e" label="DECAY" />
              <MiniGauge value={71} color="#eab308" label="GAIN" />
            </div>
          </Card>

          {/* Sliders */}
          <Card color="#10b981" title="Field Regulators">
            <div className="space-y-2.5">
              <GlowSlider label="Graviton Amplitude" value={72} color="#10b981" />
              <GlowSlider label="Neutrino Damping" value={58} color="#00f0ff" />
              <GlowSlider label="Tachyon Resonance" value={85} color="#a855f7" />
              <GlowSlider label="Plasma Intensity" value={43} color="#ff6b00" />
              <GlowSlider label="Chrono Stability" value={91} color="#eab308" />
            </div>
          </Card>

          {/* Toggles */}
          <Card color="#22d3ee" title="Core Subsystems">
            <div className="space-y-1">
              <ToggleSwitch label="Quantum Entanglement" color="#00f0ff" defaultOn />
              <ToggleSwitch label="Neural Backprop" color="#a855f7" defaultOn />
              <ToggleSwitch label="Fusion Reactor" color="#ff6b00" defaultOn />
              <ToggleSwitch label="Dark Matter Inject" color="#10b981" defaultOn={false} />
              <ToggleSwitch label="Graviton Shielding" color="#f43f5e" defaultOn />
              <ToggleSwitch label="Temporal Cache" color="#eab308" defaultOn />
            </div>
          </Card>

          <Card color="#22d3ee" title="Planetary Network">
            <div className="flex justify-center py-1">
              <RotatingGlobe size={195} />
            </div>
          </Card>
        </div>

        {/* ═══════ CENTER COLUMN — AI HEAD with Eye Speedometers ═══════ */}
        <div className="space-y-3">
          {/* THE EYES — Two Speedometers */}
          <Card color="#00f0ff" noPad>
            <div className="pt-2 pb-3">
              {/* Head frame / brow */}
              <div className="text-center mb-1">
                <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border" style={{
                  borderColor: "rgba(0,240,255,0.15)", background: "rgba(0,240,255,0.04)"
                }}>
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" style={{ animation: "pulse 1s infinite" }} />
                  <span style={{ fontFamily: "'Orbitron'", fontSize: 11, letterSpacing: "0.2em", color: "rgba(0,240,255,0.6)" }}>COGNITIVE CORE — DUAL HEMISPHERE MONITOR</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" style={{ animation: "pulse 1s infinite", animationDelay: "0.5s" }} />
                </div>
              </div>

              {/* The two eyes */}
              <div className="flex justify-center items-start gap-8 mt-2 px-4">
                <EyeSpeedometer
                  color="#00d4ff" secondaryColor="#0066ff"
                  label="Left Hemisphere — Logic Core"
                  sublabel="Tensor Processing Fabric"
                  unit="TFLOPS" baseValue={847} max={1200}
                />
                <EyeSpeedometer
                  color="#ff4444" secondaryColor="#ff8800"
                  label="Right Hemisphere — Creative Core"
                  sublabel="Neural Generative Matrix"
                  unit="PFLOPS" baseValue={12.4} max={20}
                />
              </div>

              {/* Connecting "bridge" between eyes */}
              <div className="flex items-center justify-center gap-4 mt-3 px-8">
                <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.3), rgba(255,68,68,0.3), transparent)" }} />
                <div className="px-3 py-1 rounded-full border text-xs font-mono" style={{
                  borderColor: "rgba(168,85,247,0.3)", color: "rgba(168,85,247,0.6)", fontSize: 9,
                  animation: "orbFloat 4s ease-in-out infinite",
                }}>CORPUS CALLOSUM SYNC: <span className="text-white">99.7%</span></div>
                <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,68,68,0.3), rgba(0,212,255,0.3), transparent)" }} />
              </div>
            </div>
          </Card>

          {/* Neural Network */}
          <Card color="#00f0ff" title="Synaptic Topology — Live Neural Mesh">
            <div style={{ height: 180 }}><NeuralCanvas width={700} height={180} /></div>
          </Card>

          {/* Charts Row */}
          <div className="grid grid-cols-2 gap-3">
            <Card color="#00f0ff" title="Inference Throughput — 30h">
              <ButtonPanel title="" accentColor="#00f0ff" buttons={["Tokens", "Embeddings", "Retrieval"]}
                activeIndex={rightChart} onSelect={setRightChart} />
              <div className="mt-2">
                <ResponsiveContainer width="100%" height={140}>
                  <AreaChart data={areaData}>
                    <defs>
                      <linearGradient id="ag1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#00f0ff" stopOpacity={0.35} /><stop offset="100%" stopColor="#00f0ff" stopOpacity={0} /></linearGradient>
                      <linearGradient id="ag2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#a855f7" stopOpacity={0.25} /><stop offset="100%" stopColor="#a855f7" stopOpacity={0} /></linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="t" /><YAxis />
                    <Tooltip content={<CyberTooltip />} />
                    <Area type="monotone" dataKey={["v1", "v2", "v3"][rightChart]} stroke={["#00f0ff", "#a855f7", "#10b981"][rightChart]} fill={["url(#ag1)", "url(#ag2)", "url(#ag1)"][rightChart]} strokeWidth={2} name={["Tokens/s", "Embeddings", "Retrieval"][rightChart]} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card color="#ff6b00" title="Compute Distribution">
              <ResponsiveContainer width="100%" height={175}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="n" /><YAxis />
                  <Tooltip content={<CyberTooltip />} />
                  <Bar dataKey="a" fill="#ff6b00" radius={[2, 2, 0, 0]} opacity={0.75} name="Allocated" />
                  <Bar dataKey="b" fill="#a855f7" radius={[2, 2, 0, 0]} opacity={0.55} name="Consumed" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Live feed + heatmap */}
          <div className="grid grid-cols-2 gap-3">
            <Card color="#f43f5e" title="Real-time Inference Signal">
              <ResponsiveContainer width="100%" height={120}>
                <LineChart data={liveData}>
                  <CartesianGrid strokeDasharray="3 3" /><YAxis domain={[0, 100]} />
                  <Line type="monotone" dataKey="y" stroke="#f43f5e" strokeWidth={2} dot={false} isAnimationActive={false} name="Signal" />
                </LineChart>
              </ResponsiveContainer>
              <ResponsiveContainer width="100%" height={60}>
                <LineChart data={liveData2}>
                  <Line type="monotone" dataKey="y" stroke="#10b981" strokeWidth={1.5} dot={false} isAnimationActive={false} name="Baseline" />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <Card color="#00f0ff" title="Cluster Activity — 7d × 24h">
              <Heatmap rows={7} cols={24} color="#00f0ff" />
            </Card>
          </div>

          {/* Waveform + Log */}
          <div className="grid grid-cols-2 gap-3">
            <Card color="#ff6b00" title="Signal Processor — Dual Band">
              <div style={{ height: 55 }}><Waveform color="#ff6b00" height={55} /></div>
              <div className="h-px my-1.5" style={{ background: "rgba(255,255,255,0.04)" }} />
              <div style={{ height: 55 }}><Waveform color="#a855f7" height={55} bars={32} /></div>
            </Card>

            <Card color="#10b981" title="Matrix Decode Stream">
              <div style={{ height: 120 }}><MatrixRain w={350} h={120} /></div>
            </Card>
          </div>
        </div>

        {/* ═══════ RIGHT COLUMN ═══════ */}
        <div className="space-y-3">
          {/* Radar */}
          <Card color="#a855f7" title="Capability Hexagram">
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.06)" />
                <PolarAngleAxis dataKey="s" tick={{ fontSize: 8, fill: "rgba(255,255,255,0.3)" }} />
                <Radar name="Alpha" dataKey="A" stroke="#a855f7" fill="#a855f7" fillOpacity={0.12} strokeWidth={2} />
                <Radar name="Beta" dataKey="B" stroke="#00f0ff" fill="#00f0ff" fillOpacity={0.08} strokeWidth={1.5} />
              </RadarChart>
            </ResponsiveContainer>
          </Card>

          {/* Pie / Donut */}
          <Card color="#00f0ff" title="Compute Fabric Allocation">
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={4} dataKey="value" stroke="none">
                  {pieData.map((e, i) => <Cell key={i} fill={e.fill} />)}
                </Pie>
                <Tooltip content={<CyberTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap justify-center gap-2 -mt-1">
              {pieData.map(d => (
                <div key={d.name} className="flex items-center gap-1 cursor-pointer group">
                  <div className="w-2 h-2 rounded-full transition-transform duration-300 group-hover:scale-150" style={{ background: d.fill }} />
                  <span className="opacity-30 group-hover:opacity-60 transition-opacity" style={{ fontSize: 9 }}>{d.name}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Accordions */}
          <Card color="#22d3ee" title="Deep Diagnostics">
            <div className="space-y-1.5">
              <AccordionItem title="Memory Hierarchy" color="#22d3ee" defaultOpen>
                <div className="space-y-2">
                  <GlowSlider label="L1 Cache Hit Rate" value={97} color="#22d3ee" />
                  <GlowSlider label="L2 Coherence" value={89} color="#00f0ff" />
                  <GlowSlider label="HBM3 Bandwidth" value={76} color="#a855f7" />
                  <GlowSlider label="NVLink Utilization" value={82} color="#10b981" />
                </div>
              </AccordionItem>
              <AccordionItem title="Thermal Management" color="#f43f5e">
                <div className="grid grid-cols-3 gap-2">
                  <MiniGauge value={72} color="#f43f5e" label="DIE" size={55} />
                  <MiniGauge value={58} color="#ff6b00" label="VRM" size={55} />
                  <MiniGauge value={34} color="#10b981" label="AMB" size={55} />
                </div>
              </AccordionItem>
              <AccordionItem title="Power Distribution" color="#eab308">
                <div className="space-y-2">
                  <GlowSlider label="GPU Power Draw" value={88} color="#eab308" />
                  <GlowSlider label="CPU Package" value={45} color="#ff6b00" />
                  <GlowSlider label="Memory Subsystem" value={62} color="#a855f7" />
                </div>
              </AccordionItem>
              <AccordionItem title="Network Topology" color="#10b981">
                <div className="space-y-1.5">
                  <DataCell label="InfiniBand Rate" value={400} unit="Gb/s" detail="8× HDR links aggregated" color="#10b981" />
                  <DataCell label="Packet Loss" value={0.001} unit="%" detail="Last 24h rolling avg" color="#22d3ee" />
                </div>
              </AccordionItem>
            </div>
          </Card>

          {/* View mode switcher */}
          <Card color="#eab308" title="Telemetry View">
            <ButtonPanel title="" accentColor="#eab308"
              buttons={["Realtime", "Historical", "Predictive"]}
              activeIndex={viewMode} onSelect={setViewMode} />
            <div className="mt-2" style={{ height: 100 }}>
              {viewMode === 0 && <Waveform color="#eab308" height={100} bars={40} />}
              {viewMode === 1 && (
                <ResponsiveContainer width="100%" height={100}>
                  <AreaChart data={areaData.slice(0, 15)}>
                    <Area type="monotone" dataKey="v1" stroke="#eab308" fill="#eab30815" strokeWidth={1.5} />
                  </AreaChart>
                </ResponsiveContainer>
              )}
              {viewMode === 2 && (
                <ResponsiveContainer width="100%" height={100}>
                  <LineChart data={areaData}>
                    <Line type="monotone" dataKey="v3" stroke="#eab308" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
                    <Line type="monotone" dataKey="v1" stroke="#eab30866" strokeWidth={1} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </Card>

          {/* Log Stream */}
          <Card color="#00f0ff" title="System Log — Live">
            <LogStream height={160} />
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-2 border-t font-mono opacity-15" style={{ borderColor: "rgba(0,240,255,0.06)", fontSize: 9 }}>
        NEXUS AI WORKFLOW v7.4.2 — CLASSIFICATION: OMEGA-BLACK — ALL SUBSYSTEMS OPERATIONAL — EPOCH {Math.floor(Date.now() / 1000)}
      </footer>
    </div>
  );
}

export { NexusDashboard };