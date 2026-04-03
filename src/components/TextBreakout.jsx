import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { prepare, layoutWithLines } from "@chenglou/pretext";
import "../styles/textbreakout.css";

// ─── Game constants ───────────────────────────────────────────
const BALL_RADIUS = 7;
const PADDLE_H = 10;
const PADDLE_W_RATIO = 0.15;
const BRICK_ROWS = [
  "REACT   GOLANG   NODEJS",
  "NEXT.JS   MONGODB   PRISMA",
  "TYPESCRIPT   PYTHON   JAVA",
];
const BRICK_FONT_SIZE = 22;
const BRICK_PADDING_X = 6;
const BRICK_PADDING_Y = 8;
const ROW_GAP = 14;
const BRICK_AREA_TOP = 60; // px from canvas top

// ─── Build bricks using pretext ──────────────────────────────
function buildBricks(ctx, canvasWidth) {
  const fontStr = `700 ${BRICK_FONT_SIZE}px Inter, Helvetica, Arial, sans-serif`;
  ctx.font = fontStr;

  const bricks = [];

  BRICK_ROWS.forEach((rowText, rowIdx) => {
    let lines;
    try {
      const lineH = BRICK_FONT_SIZE + BRICK_PADDING_Y * 2 + ROW_GAP;
      const prepared = prepare(rowText, fontStr);
      const result = layoutWithLines(prepared, canvasWidth - 80, lineH);
      lines = result.lines;
    } catch {
      lines = [{ text: rowText, width: ctx.measureText(rowText).width }];
    }

    lines.forEach((line, lineSubIdx) => {
      const lineY =
        BRICK_AREA_TOP +
        (rowIdx * (BRICK_FONT_SIZE + BRICK_PADDING_Y * 2 + ROW_GAP)) +
        (lineSubIdx * (BRICK_FONT_SIZE + BRICK_PADDING_Y * 2 + ROW_GAP));

      const lineWidth = ctx.measureText(line.text).width;
      let charX = (canvasWidth - lineWidth) / 2;

      for (const char of line.text) {
        const cw = ctx.measureText(char).width;
        if (char !== " ") {
          bricks.push({
            char,
            x: charX - BRICK_PADDING_X,
            y: lineY - BRICK_FONT_SIZE - BRICK_PADDING_Y,
            w: cw + BRICK_PADDING_X * 2,
            h: BRICK_FONT_SIZE + BRICK_PADDING_Y * 2,
            active: true,
          });
        }
        charX += cw;
      }
    });
  });

  return bricks;
}

// ─── Component ────────────────────────────────────────────────
export default function TextBreakout() {
  const canvasRef = useRef(null);
  const stateRef = useRef(null); // mutable game state
  const rafRef = useRef(null);
  const containerRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | playing | won | lost

  function initGame(canvas) {
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;
    const paddleW = W * PADDLE_W_RATIO;

    const bricks = buildBricks(ctx, W);

    stateRef.current = {
      ctx,
      W,
      H,
      paddleX: W / 2 - paddleW / 2,
      paddleW,
      ball: {
        x: W / 2,
        y: H - 80,
        vx: (Math.random() > 0.5 ? 1 : -1) * 3.5,
        vy: -4.5,
      },
      bricks,
      score: 0,
      total: bricks.length,
      running: true,
    };
  }

  function startGame() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setStatus("playing");
    initGame(canvas);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    loop();
  }

  function loop() {
    const s = stateRef.current;
    if (!s || !s.running) return;

    const { ctx, W, H, ball, bricks } = s;

    // Move ball
    ball.x += ball.vx;
    ball.y += ball.vy;

    // Wall collisions
    if (ball.x - BALL_RADIUS < 0) { ball.x = BALL_RADIUS; ball.vx *= -1; }
    if (ball.x + BALL_RADIUS > W) { ball.x = W - BALL_RADIUS; ball.vx *= -1; }
    if (ball.y - BALL_RADIUS < 0) { ball.y = BALL_RADIUS; ball.vy *= -1; }

    // Paddle collision
    const paddleTop = H - PADDLE_H - 20;
    if (
      ball.vy > 0 &&
      ball.y + BALL_RADIUS >= paddleTop &&
      ball.y + BALL_RADIUS <= paddleTop + PADDLE_H + ball.vy + 2 &&
      ball.x >= s.paddleX &&
      ball.x <= s.paddleX + s.paddleW
    ) {
      ball.vy *= -1;
      // Angle based on where ball hits paddle
      const hitPos = (ball.x - (s.paddleX + s.paddleW / 2)) / (s.paddleW / 2);
      ball.vx = hitPos * 5;
      ball.y = paddleTop - BALL_RADIUS - 1;
    }

    // Fell below
    if (ball.y > H + 20) {
      s.running = false;
      setStatus("lost");
      drawFrame();
      return;
    }

    // Brick collisions
    for (const b of bricks) {
      if (!b.active) continue;
      if (
        ball.x + BALL_RADIUS > b.x &&
        ball.x - BALL_RADIUS < b.x + b.w &&
        ball.y + BALL_RADIUS > b.y &&
        ball.y - BALL_RADIUS < b.y + b.h
      ) {
        b.active = false;
        s.score++;
        // Determine bounce axis
        const overlapLeft = ball.x + BALL_RADIUS - b.x;
        const overlapRight = b.x + b.w - (ball.x - BALL_RADIUS);
        const overlapTop = ball.y + BALL_RADIUS - b.y;
        const overlapBottom = b.y + b.h - (ball.y - BALL_RADIUS);
        const minH = Math.min(overlapLeft, overlapRight);
        const minV = Math.min(overlapTop, overlapBottom);
        if (minH < minV) ball.vx *= -1; else ball.vy *= -1;
        break;
      }
    }

    // Won?
    if (s.score >= s.total) {
      s.running = false;
      setStatus("won");
      drawFrame();
      return;
    }

    drawFrame();
    rafRef.current = requestAnimationFrame(loop);
  }

  function drawFrame() {
    const s = stateRef.current;
    if (!s) return;
    const { ctx, W, H, ball, bricks } = s;

    // Background
    ctx.clearRect(0, 0, W, H);

    // Bricks
    ctx.font = `700 ${BRICK_FONT_SIZE}px Inter, Helvetica, Arial, sans-serif`;
    bricks.forEach((b) => {
      if (!b.active) return;
      // Brick bg
      ctx.fillStyle = "rgba(195,172,208,0.08)";
      ctx.strokeStyle = "rgba(195,172,208,0.3)";
      ctx.lineWidth = 1;
      roundRect(ctx, b.x, b.y, b.w, b.h, 4);
      ctx.fill();
      ctx.stroke();
      // Char
      ctx.fillStyle = "#fffae9";
      ctx.fillText(b.char, b.x + BRICK_PADDING_X, b.y + b.h - BRICK_PADDING_Y - 2);
    });

    // Ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, BALL_RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = "#c3acd0";
    ctx.shadowColor = "#c3acd0";
    ctx.shadowBlur = 12;
    ctx.fill();
    ctx.shadowBlur = 0;

    // Paddle
    ctx.fillStyle = "#fffae9";
    ctx.shadowColor = "rgba(255,250,233,0.4)";
    ctx.shadowBlur = 8;
    roundRect(ctx, s.paddleX, H - PADDLE_H - 20, s.paddleW, PADDLE_H, 5);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Score
    ctx.font = "600 13px Inter, sans-serif";
    ctx.fillStyle = "rgba(255,250,233,0.35)";
    ctx.fillText(`${s.score} / ${s.total}`, 16, H - 10);
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  // Mouse / touch paddle control
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onMove = (clientX) => {
      const s = stateRef.current;
      if (!s || !s.running) return;
      const rect = canvas.getBoundingClientRect();
      const x = (clientX - rect.left) * (canvas.width / rect.width);
      s.paddleX = Math.max(0, Math.min(x - s.paddleW / 2, s.W - s.paddleW));
    };

    const onMouse = (e) => onMove(e.clientX);
    const onTouch = (e) => { e.preventDefault(); onMove(e.touches[0].clientX); };

    canvas.addEventListener("mousemove", onMouse);
    canvas.addEventListener("touchmove", onTouch, { passive: false });
    return () => {
      canvas.removeEventListener("mousemove", onMouse);
      canvas.removeEventListener("touchmove", onTouch);
    };
  }, []);

  // Resize + initial draw
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resize = () => {
      canvas.width = container.offsetWidth;
      canvas.height = 420;
      if (stateRef.current) drawFrame();
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);
    return () => {
      ro.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className="breakout-section" id="play">
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="breakout-header"
        >
          <span className="section-tag">Just for fun</span>
          <h2 className="breakout-heading">Break My Stack</h2>
          <p className="breakout-desc">
            Move your mouse (or finger) to control the paddle. Break all the
            text bricks — each one is a tech I use.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="breakout-wrap"
          ref={containerRef}
        >
          <canvas ref={canvasRef} className="breakout-canvas" />

          {status !== "playing" && (
            <div className="breakout-overlay">
              {status === "won" && (
                <p className="breakout-result breakout-win">You cleared it! 🎉</p>
              )}
              {status === "lost" && (
                <p className="breakout-result breakout-lose">Ball dropped. Try again.</p>
              )}
              <button className="breakout-btn" onClick={startGame}>
                {status === "idle" ? "Start Game" : "Play Again"}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
