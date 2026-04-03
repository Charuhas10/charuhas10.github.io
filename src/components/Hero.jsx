import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { prepare, layoutWithLines } from "@chenglou/pretext";
import "../styles/hero.css";

// ─── Pretext magnetic-repulsion hero ──────────────────────────
//
// pretext gives us pixel-accurate glyph positions.
// No max-width on the section → the name fills the full viewport.
// Mouse repulsion is subtle: chars gently push away, spring back.

const NAME           = "CHARUHAS REDDY BALAM";
const REPEL_RADIUS   = 110;   // px — influence zone
const REPEL_STRENGTH = 36;    // px — push distance
const SPRING         = 0.22;  // snap-back rate — snappier jumble
const IDLE_AMP       = 1.2;   // px — barely-perceptible float

function buildChars(ctx, W, fontSize) {
  const fontStr = `700 ${fontSize}px Inter, Helvetica, Arial, sans-serif`;
  ctx.font = fontStr;

  let lines;
  try {
    const prep = prepare(NAME, fontStr);
    const res  = layoutWithLines(prep, W * 4, fontSize * 1.5);
    lines = res.lines;
  } catch {
    lines = [{ text: NAME, width: ctx.measureText(NAME).width }];
  }

  const line  = lines[0];
  const baseY = fontSize; // baseline

  const chars = [];
  let x = 0;
  for (const char of line.text) {
    const cw = ctx.measureText(char).width;
    if (char !== " ") {
      chars.push({
        char,
        tx: x, ty: baseY,
        cx: x, cy: baseY,
        phase: Math.random() * Math.PI * 2,
      });
    }
    x += cw;
  }
  return chars;
}

export default function Hero() {
  const canvasRef    = useRef(null);
  const containerRef = useRef(null);
  const stateRef     = useRef({
    chars: [], mouse: { x: null, y: null },
    rafId: null, startTime: Date.now(), fontSize: 0,
  });

  // ─── Setup: full-width canvas, auto-size font ─────────────────
  useEffect(() => {
    const canvas    = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");

    async function setup() {
      await document.fonts.ready;

      const W = container.clientWidth;
      if (!W) return;

      const dpr = window.devicePixelRatio || 1;
      const setFont = (sz) => {
        ctx.font = `700 ${sz}px Inter, Helvetica, Arial, sans-serif`;
      };

      // Grow the font until it fills 94-99 % of the container width.
      // Max cap is 300 px — at full viewport width the name is dramatic.
      let fontSize = 120;
      setFont(fontSize);
      while (ctx.measureText(NAME).width > W * 0.99 && fontSize > 20) {
        fontSize -= 1;
        setFont(fontSize);
      }
      while (ctx.measureText(NAME).width < W * 0.94 && fontSize < 160) {
        fontSize += 1;
        setFont(fontSize);
      }

      const cssH = Math.ceil(fontSize * 1.42);
      canvas.width        = Math.round(W   * dpr);
      canvas.height       = Math.round(cssH * dpr);
      canvas.style.width  = `${W}px`;
      canvas.style.height = `${cssH}px`;
      ctx.scale(dpr, dpr);

      stateRef.current.chars    = buildChars(ctx, W, fontSize);
      stateRef.current.fontSize = fontSize;
      stateRef.current.canvasW  = W;
      stateRef.current.canvasH  = cssH;
    }

    setup();
    const ro = new ResizeObserver(setup);
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  // ─── Mouse tracking (relative to canvas, CSS pixels) ─────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      stateRef.current.mouse = {
        x: e.clientX - r.left,
        y: e.clientY - r.top,
      };
    };
    const onLeave = () => { stateRef.current.mouse = { x: null, y: null }; };

    // Listen on the whole document so hovering anywhere near the name works
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // ─── Continuous RAF loop ──────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    function frame() {
      stateRef.current.rafId = requestAnimationFrame(frame);
      const { chars, mouse, fontSize, canvasW, canvasH } = stateRef.current;
      if (!chars.length || !fontSize) return;

      const t = (Date.now() - stateRef.current.startTime) / 1000;
      ctx.clearRect(0, 0, canvasW || canvas.clientWidth, canvasH || canvas.clientHeight);
      ctx.font      = `700 ${fontSize}px Inter, Helvetica, Arial, sans-serif`;
      ctx.fillStyle = "#fffae9";

      chars.forEach((c) => {
        // 1. Gentle idle bob (very subtle, per-char phase offset)
        const idleY = Math.sin(t * 0.9 + c.phase) * IDLE_AMP;

        // 2. Soft magnetic repulsion from cursor
        let pushX = 0, pushY = 0;
        if (mouse.x !== null) {
          // Use the home position (tx/ty) as repulsion anchor so chars push
          // away from where they *should* be, not where they currently are.
          // This prevents exponential drift.
          const dx   = c.tx - mouse.x;
          const dy   = c.ty - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          if (dist < REPEL_RADIUS) {
            const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH;
            pushX = (dx / dist) * force;
            pushY = (dy / dist) * force;
          }
        }

        // 3. Spring toward (target + push + idle)
        c.cx += (c.tx + pushX        - c.cx) * SPRING;
        c.cy += (c.ty + idleY + pushY - c.cy) * SPRING;

        ctx.fillText(c.char, c.cx, c.cy);
      });
    }

    frame();
    return () => { if (stateRef.current.rafId) cancelAnimationFrame(stateRef.current.rafId); };
  }, []);

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section className="hero" id="home">
      {/* Full-width canvas — containerRef measures true available width */}
      <motion.div
        className="hero-canvas-wrap"
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9 }}
      >
        <canvas ref={canvasRef} className="hero-canvas" />
      </motion.div>

      {/* Desc + actions — constrained width so they stay readable */}
      <div className="hero-content-wrap">
        <motion.div className="hero-desc" {...fadeUp(0.7)}>
          <p className="hero-role">Full-Stack Developer</p>
          <p className="hero-detail">
            SDE at Myntra &nbsp;·&nbsp; Bangalore, India
            <br />
            React Native &nbsp;·&nbsp; GoLang &nbsp;·&nbsp; Next.js &nbsp;·&nbsp; Node.js
          </p>
        </motion.div>

        <motion.div className="hero-actions" {...fadeUp(1.0)}>
          <a href="#work"   className="hero-btn hero-btn-primary">View My Work</a>
          <a href="#resume" className="hero-btn hero-btn-ghost">Resume ↗</a>
        </motion.div>
      </div>
    </section>
  );
}
