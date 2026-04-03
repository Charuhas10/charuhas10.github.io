import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { prepare, layoutWithLines } from "@chenglou/pretext";
import "../styles/about.css";

// ─── About · Skill Brick-Breaker ───────────────────────────────
//
// Use pretext to measure glyphs accurately.
// Each character is a brick: opaque when alive, translucent when hit.
// Simple, pure gameplay: break all letters to win.

const ABOUT_TEXT = "JS · C++ · JAVA · REACT · GOLANG · NODE.JS · NEXT.JS · CSS · MONGODB · MYSQL";

// ── Visual constants ───────────────────────────────────────────
const FONT_SIZE    = 16;
const LINE_H       = 30;
const PAD_X        = 20;
const TEXT_TOP     = 18;

// ── Ball ───────────────────────────────────────────────────────
const BALL_R       = 5.5;
const BASE_SPEED   = 2.4;

// ── Paddle ─────────────────────────────────────────────────────
const PADDLE_W     = 88;
const PADDLE_LARGE = 170;
const PADDLE_H     = 9;
const PADDLE_FLOOR = 28;
const BIG_PAD_MS   = 8000;

// ── Power-ups ──────────────────────────────────────────────────
const PU_W         = 50;
const PU_H         = 18;
const PU_VY        = 1.2;
const PU = {
  multiball: { label: "✦ MULTI", color: "hsl(195,52%,60%)", chance: 0.14 },
  bigpaddle: { label: "⬛ WIDE",  color: "hsl(38,60%,58%)",  chance: 0.11 },
};

// ── Variants ───────────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function buildBricks(ctx, W) {
  const fontStr = `700 ${FONT_SIZE}px Inter, Helvetica, sans-serif`;
  ctx.font         = fontStr;
  ctx.textBaseline = "top";

  let lineTexts;
  try {
    const prep   = prepare(ABOUT_TEXT, fontStr);
    const result = layoutWithLines(prep, W - PAD_X * 2, LINE_H);
    lineTexts    = result.lines.map((l) => l.text.trimEnd());
  } catch {
    lineTexts = ["JS · C++ · JAVA · REACT · GOLANG", "NODE.JS · NEXT.JS · CSS · MONGODB · MYSQL"];
  }

  const bricks = [];
  lineTexts.forEach((line, li) => {
    const lineW = ctx.measureText(line).width;
    let x = PAD_X + Math.max(0, (W - PAD_X * 2 - lineW) / 2);
    const y = TEXT_TOP + li * LINE_H;

    for (const ch of line) {
      const cw = ctx.measureText(ch).width;
      bricks.push({
        char:    ch,
        x, y,
        w:       cw,
        h:       FONT_SIZE + 2,
        alive:   true,
        isBlank: ch === " ",
      });
      x += cw;
    }
  });

  return { bricks, textBottom: TEXT_TOP + lineTexts.length * LINE_H + 6 };
}

function makeBall(x, y, angleRad) {
  return {
    x, y,
    vx: BASE_SPEED * Math.cos(angleRad),
    vy: BASE_SPEED * Math.sin(angleRad),
  };
}

function launchBalls(W, textBottom) {
  const a = -Math.PI / 2 + (Math.random() - 0.5) * (Math.PI / 2.4);
  return [makeBall(W / 2, textBottom + 52, a)];
}

export default function About() {
  const canvasRef  = useRef(null);
  const paddleXRef = useRef(null);
  const gameRef    = useRef(null);
  const restartRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let ro;

    async function init() {
      await document.fonts.ready;

      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      if (!W || !H) return;

      const dpr = window.devicePixelRatio || 1;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (paddleXRef.current === null) {
        paddleXRef.current = W / 2 - PADDLE_W / 2;
      }

      const { bricks, textBottom } = buildBricks(ctx, W);
      const balls = launchBalls(W, textBottom);

      if (gameRef.current) gameRef.current.alive = false;

      const state = {
        alive:       true,
        W, H,
        bricks,
        textBottom,
        balls,
        powerups:    [],
        bigPadEnd:   0,
        phase:       "playing",  // "playing" | "dead" | "cleared"
        btnRect:     null,
      };
      gameRef.current = state;

      restartRef.current = () => {
        if (gameRef.current) gameRef.current.alive = false;
        paddleXRef.current = null;
        setTimeout(init, 30);
      };

      function frame() {
        if (!state.alive) return;
        requestAnimationFrame(frame);
        ctx.clearRect(0, 0, W, H);

        const bigActive = performance.now() < state.bigPadEnd;
        const padW      = bigActive ? PADDLE_LARGE : PADDLE_W;
        const px        = Math.max(0, Math.min(paddleXRef.current, W - padW));
        const py        = H - PADDLE_FLOOR;

        // Draw bricks
        ctx.font         = `700 ${FONT_SIZE}px Inter, Helvetica, sans-serif`;
        ctx.textBaseline = "top";
        ctx.textAlign    = "left";
        state.bricks.forEach((br) => {
          if (br.isBlank) return;
          if (br.alive) {
            ctx.globalAlpha = 1;
            ctx.fillStyle   = "#fffae9";
          } else {
            ctx.globalAlpha = 0.18;
            ctx.fillStyle   = "rgba(195,172,208,1)";
          }
          ctx.fillText(br.char, br.x, br.y);
        });
        ctx.globalAlpha = 1;

        if (state.phase === "playing") {
          // ── Power-ups ──────────────────────────────────
          state.powerups = state.powerups.filter((pu) => {
            pu.y += PU_VY;

            const caught =
              pu.y + PU_H >= py && pu.y <= py + PADDLE_H &&
              pu.x + PU_W >= px && pu.x <= px + padW;

            if (caught) {
              if (pu.type === "multiball") {
                const src = state.balls[0] ?? { x: W / 2, y: state.textBottom + 52 };
                state.balls.push(makeBall(src.x, src.y, -Math.PI / 4));
                state.balls.push(makeBall(src.x, src.y, (-Math.PI * 3) / 4));
              } else {
                state.bigPadEnd = performance.now() + BIG_PAD_MS;
              }
              return false;
            }
            if (pu.y > H) return false;

            ctx.fillStyle    = pu.color;
            ctx.beginPath();
            ctx.roundRect(pu.x, pu.y, PU_W, PU_H, PU_H / 2);
            ctx.fill();
            ctx.fillStyle    = "#0e0e0e";
            ctx.font         = `600 8px Inter, sans-serif`;
            ctx.textAlign    = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(pu.label, pu.x + PU_W / 2, pu.y + PU_H / 2);
            return true;
          });

          // Big-paddle countdown bar
          if (bigActive) {
            const now = performance.now();
            const pct = (state.bigPadEnd - now) / BIG_PAD_MS;
            ctx.fillStyle = "rgba(195,172,208,0.22)";
            ctx.fillRect(20, H - 6, (W - 40) * pct, 3);
          }

          // ── Paddle ────────────────────────────────────
          ctx.fillStyle = "rgba(195,172,208,0.9)";
          ctx.beginPath();
          ctx.roundRect(px, py, padW, PADDLE_H, PADDLE_H / 2);
          ctx.fill();

          // Balls
          const dead = [];
          state.balls.forEach((b, bi) => {
            b.x += b.vx;
            b.y += b.vy;

            if (b.x - BALL_R < 0)  { b.x = BALL_R;      b.vx =  Math.abs(b.vx); }
            if (b.x + BALL_R > W)  { b.x = W - BALL_R;  b.vx = -Math.abs(b.vx); }
            if (b.y - BALL_R < 0)  { b.y = BALL_R;       b.vy =  Math.abs(b.vy); }

            // Paddle collision
            if (
              b.vy > 0 &&
              b.y + BALL_R >= py &&
              b.y + BALL_R <= py + PADDLE_H + Math.abs(b.vy) + 1 &&
              b.x >= px - BALL_R && b.x <= px + padW + BALL_R
            ) {
              const rel = (b.x - (px + padW / 2)) / (padW / 2);
              const ang = rel * (Math.PI / 3);
              const spd = Math.hypot(b.vx, b.vy);
              b.vx = spd * Math.sin(ang);
              b.vy = -Math.abs(spd * Math.cos(ang));
              b.y  = py - BALL_R - 1;
            }

            if (b.y - BALL_R > H) { dead.push(bi); return; }

            // Brick collision
            state.bricks.forEach((br) => {
              if (!br.alive || br.isBlank) return;
              if (
                b.x + BALL_R > br.x && b.x - BALL_R < br.x + br.w &&
                b.y + BALL_R > br.y && b.y - BALL_R < br.y + br.h
              ) {
                const ol = (b.x + BALL_R) - br.x;
                const or = (br.x + br.w) - (b.x - BALL_R);
                const ot = (b.y + BALL_R) - br.y;
                const ob = (br.y + br.h) - (b.y - BALL_R);
                if (Math.min(ol, or) < Math.min(ot, ob)) b.vx *= -1;
                else b.vy *= -1;
                br.alive = false;

                // Power-up drop from broken letter
                const roll = Math.random();
                let type = null;
                if      (roll < PU.multiball.chance) type = "multiball";
                else if (roll < PU.multiball.chance + PU.bigpaddle.chance) type = "bigpaddle";
                if (type) {
                  state.powerups.push({
                    type,
                    label: PU[type].label,
                    color: PU[type].color,
                    x: br.x + br.w / 2 - PU_W / 2,
                    y: br.y + br.h,
                  });
                }
              }
            });

            // Draw ball
            ctx.fillStyle   = "#fffae9";
            ctx.shadowBlur  = 9;
            ctx.shadowColor = "rgba(255,250,233,0.5)";
            ctx.beginPath();
            ctx.arc(b.x, b.y, BALL_R, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
          });

          for (let i = dead.length - 1; i >= 0; i--) state.balls.splice(dead[i], 1);

          if (state.balls.length === 0) state.phase = "dead";
          const remaining = state.bricks.filter((br) => br.alive && !br.isBlank).length;
          if (remaining === 0) state.phase = "cleared";
        }

        // Overlay
        if (state.phase !== "playing") {
          ctx.fillStyle = "rgba(14,14,14,0.72)";
          ctx.fillRect(0, 0, W, H);

          const cleared = state.phase === "cleared";
          ctx.textAlign    = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle    = "#fffae9";
          ctx.font         = `700 19px Inter, Helvetica, sans-serif`;
          ctx.fillText(cleared ? "ALL SKILLS BROKEN! 🎉" : "BALL DROPPED", W / 2, H / 2 - 28);

          ctx.fillStyle = "rgba(255,250,233,0.5)";
          ctx.font      = `400 12px Inter, Helvetica, sans-serif`;
          ctx.fillText(cleared ? "master unlock" : "try again?", W / 2, H / 2 - 8);

          const btnW = 118, btnH = 36;
          const btnX = W / 2 - btnW / 2;
          const btnY = H / 2 + 12;
          ctx.fillStyle = "rgba(195,172,208,0.92)";
          ctx.beginPath();
          ctx.roundRect(btnX, btnY, btnW, btnH, 8);
          ctx.fill();
          ctx.fillStyle    = "#111";
          ctx.font         = `700 11px Inter, Helvetica, sans-serif`;
          ctx.textAlign    = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(cleared ? "PLAY AGAIN" : "RESTART", W / 2, btnY + btnH / 2);

          state.btnRect = { x: btnX, y: btnY, w: btnW, h: btnH };
        }
      }

      requestAnimationFrame(frame);
    }

    init();
    ro = new ResizeObserver(() => {
      paddleXRef.current = null;
      init();
    });
    ro.observe(canvas);

    return () => {
      if (gameRef.current) gameRef.current.alive = false;
      ro.disconnect();
    };
  }, []);

  const handleMouseMove = (e) => {
    const state  = gameRef.current;
    const canvas = canvasRef.current;
    if (!state || !canvas) return;
    const r = canvas.getBoundingClientRect();
    const mx = e.clientX - r.left;
    const my = e.clientY - r.top;

    if (state.phase === "playing") {
      canvas.style.cursor = "none";
      const now = performance.now();
      const pW  = now < state.bigPadEnd ? PADDLE_LARGE : PADDLE_W;
      paddleXRef.current = Math.max(0, Math.min(mx - pW / 2, state.W - pW));
    } else {
      const btn = state.btnRect;
      canvas.style.cursor =
        btn && mx >= btn.x && mx <= btn.x + btn.w && my >= btn.y && my <= btn.y + btn.h
          ? "pointer"
          : "default";
    }
  };

  const handleMouseLeave = () => {
    const canvas = canvasRef.current;
    if (canvas) canvas.style.cursor = "default";
  };

  const handleClick = (e) => {
    const state = gameRef.current;
    if (!state || state.phase === "playing" || !state.btnRect) return;
    const r   = canvasRef.current.getBoundingClientRect();
    const x   = e.clientX - r.left;
    const y   = e.clientY - r.top;
    const btn = state.btnRect;
    if (x >= btn.x && x <= btn.x + btn.w && y >= btn.y && y <= btn.y + btn.h) {
      restartRef.current?.();
    }
  };

  return (
    <section className="about-me" id="about">
      <div className="section-inner">
        <div className="about-layout">
          <motion.div
            className="about-text"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-80px" }}
          >
            <motion.span className="section-tag" variants={fadeUp}>About</motion.span>
            <motion.h2 className="about-title" variants={fadeUp}>Who am I</motion.h2>
            <motion.div className="about-me-body" variants={stagger}>
              <motion.p variants={fadeUp}>
                Hey, I&apos;m Charuhas Reddy Balam — a Full-Stack Developer who
                builds fast, responsive, and polished applications. Currently
                working as a Software Development Engineer at Myntra, where I
                work with React Native and Go.
              </motion.p>
              <motion.p variants={fadeUp}>
                I like diving into hard problems and coming out the other side
                with something that actually works well. Whether it&apos;s a
                widget that reaches millions of users or a side project I hacked
                together at 2am — I care about the craft.
              </motion.p>
              <motion.p variants={fadeUp}>
                When I&apos;m not at the keyboard, I&apos;m on the tennis court,
                lost in a book, grinding a game, or halfway through a movie
                marathon.
              </motion.p>
            </motion.div>
          </motion.div>

          <motion.div
            className="about-game-wrap"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <canvas
              ref={canvasRef}
              className="about-canvas"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={handleClick}
            />
            <p className="about-game-hint">move mouse · break the skills</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
