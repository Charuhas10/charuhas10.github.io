import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { prepare, layoutWithLines } from "@chenglou/pretext";
import "../styles/hero.css";

function buildCharPositions(ctx, lines, canvasWidth, lineHeight, fontSize) {
  const chars = [];
  lines.forEach((line, lineIdx) => {
    const lineWidth = ctx.measureText(line.text).width;
    let x = (canvasWidth - lineWidth) / 2;
    const y = (lineIdx + 1) * lineHeight;

    for (const char of line.text) {
      const charWidth = ctx.measureText(char).width;
      if (char !== " ") {
        chars.push({
          char,
          targetX: x,
          targetY: y,
          startX: Math.random() * canvasWidth,
          startY: (Math.random() - 0.5) * fontSize * 4,
        });
      }
      x += charWidth;
    }
  });
  return chars;
}

export default function Hero() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");

    const run = async () => {
      await document.fonts.ready;

      const cssVar = getComputedStyle(document.documentElement)
        .getPropertyValue("--hero-font-size")
        .trim();
      // Parse clamp value: take the middle value or fall back
      const fontSize = parseInt(cssVar) || 72;
      const fontStr = `700 ${fontSize}px Inter, Helvetica, Arial, sans-serif`;
      const lineHeight = fontSize * 1.3;

      const setup = () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);

        const w = container.offsetWidth;
        const h = lineHeight * 3;
        canvas.width = w;
        canvas.height = h;

        ctx.font = fontStr;

        let lines;
        try {
          const prepared = prepare("CHARUHAS REDDY BALAM", fontStr);
          const result = layoutWithLines(prepared, w, lineHeight);
          lines = result.lines;
        } catch {
          // Fallback: manual line split if pretext errors
          lines = [
            { text: "CHARUHAS", width: ctx.measureText("CHARUHAS").width },
            {
              text: "REDDY BALAM",
              width: ctx.measureText("REDDY BALAM").width,
            },
          ];
        }

        const chars = buildCharPositions(ctx, lines, w, lineHeight, fontSize);

        const STAGGER = 18;
        const DURATION = 900;
        const INIT_DELAY = 100;
        const startTime = performance.now();

        const easeOutExpo = (t) =>
          t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);

        const frame = (now) => {
          ctx.clearRect(0, 0, w, h);
          ctx.font = fontStr;
          ctx.fillStyle = "#fffae9";

          let allDone = true;
          chars.forEach((c, i) => {
            const elapsed =
              now - startTime - INIT_DELAY - i * STAGGER;
            const t = Math.max(0, Math.min(1, elapsed / DURATION));
            const eased = easeOutExpo(t);
            if (t < 1) allDone = false;

            ctx.globalAlpha = eased;
            ctx.fillText(
              c.char,
              c.startX + (c.targetX - c.startX) * eased,
              c.startY + (c.targetY - c.startY) * eased
            );
          });

          ctx.globalAlpha = 1;
          if (!allDone) rafRef.current = requestAnimationFrame(frame);
        };

        rafRef.current = requestAnimationFrame(frame);
      };

      setup();

      const ro = new ResizeObserver(setup);
      ro.observe(container);
      return () => {
        ro.disconnect();
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    };

    let cleanup;
    run().then((fn) => {
      cleanup = fn;
    });

    return () => {
      if (cleanup) cleanup();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="hero" id="home">
      <div className="hero-canvas-wrap" ref={containerRef}>
        <canvas ref={canvasRef} className="hero-canvas" />
      </div>

      <motion.div
        className="hero-sub"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } },
        }}
        initial="hidden"
        animate="visible"
      >
        <motion.p className="hero-role" variants={fadeUp}>
          Full-Stack Developer
        </motion.p>
        <motion.p className="hero-company" variants={fadeUp}>
          @ Myntra &nbsp;·&nbsp; Bangalore
        </motion.p>
      </motion.div>

      <motion.a
        href="#work"
        className="hero-cta"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.5 }}
      >
        View My Work ↓
      </motion.a>

      <img src="/p3.jpg" alt="Charuhas Reddy Balam" className="hero-photo" />
    </section>
  );
}
