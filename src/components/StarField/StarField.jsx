import React, { useEffect, useRef } from "react";

export default function StarField({
  density = 0.00012,
  className = "",
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let raf = 0;
    let stars = [];
    let width = 0;
    let height = 0;

    // Mouse parallax
    let mouseX = 0;
    let mouseY = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = "100%";
      canvas.style.height = "100%";

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(
        320,
        Math.max(90, Math.floor(width * height * density))
      );

      stars = Array.from({ length: count }, () => {
        const random = Math.random();

        const smallSize = Math.pow(Math.random(), 1.7) * 1.25 + 0.45;

        // ⭐ 3.5% = special starburst
        const starburst = random < 0.035;

        // ✨ Next 10% = bright/big star
        const bright = !starburst && random < 0.115;

        return {
          x: Math.random() * width,
          y: Math.random() * height,

          // Normal → small
          // Bright → bigger
          // Starburst → biggest


          r: starburst
            ? Math.random() * 1.5 + 2.0
            : bright
              ? Math.random() * 1.7 + 1.5
              : smallSize,

          // Brightness
          a: starburst
            ? Math.random() * 0.2 + 0.8
            : bright
              ? Math.random() * 0.25 + 0.65
              : Math.random() * 0.55 + 0.25,

          // Twinkle speed
          s: Math.random() * 0.018 + 0.003,

          // Random animation phase
          p: Math.random() * Math.PI * 2,

          // Very subtle movement
          speed: Math.random() * 0.018 + 0.004,

          bright,
          starburst,

          // Different parallax depth
          depth: Math.random() * 0.8 + 0.2,
        };
      });
    };

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / width - 0.5) * 2;
      mouseY = (event.clientY / height - 0.5) * 2;
    };

    const drawStarburst = (star, alpha) => {
      const size = star.r * 4;

      ctx.save();

      ctx.globalAlpha = alpha;
      ctx.strokeStyle = "#c8eaff";
      ctx.lineWidth = 0.6;

      ctx.shadowBlur = 10;
      ctx.shadowColor = "#66cfff";

      // Vertical ray
      ctx.beginPath();
      ctx.moveTo(star.x, star.y - size);
      ctx.lineTo(star.x, star.y + size);
      ctx.stroke();

      // Horizontal ray
      ctx.beginPath();
      ctx.moveTo(star.x - size, star.y);
      ctx.lineTo(star.x + size, star.y);
      ctx.stroke();

      // Center
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const draw = (time) => {
      ctx.clearRect(0, 0, width, height);

      for (const star of stars) {
        /*
          ✨ Twinkle
        */
        const twinkle =
          star.a +
          Math.sin(time * star.s + star.p) * 0.18;

        const alpha = Math.max(0.05, twinkle);

        /*
          🌌 Subtle mouse parallax
        */
        const parallaxX =
          mouseX * star.depth * 5;

        const parallaxY =
          mouseY * star.depth * 3;

        const x = star.x + parallaxX;
        const y = star.y + parallaxY;

        /*
          ⭐ Special starburst
        */
        if (star.starburst) {
          drawStarburst(
            {
              ...star,
              x,
              y,
            },
            alpha
          );
        } else {
          /*
            ✨ Normal / bright star
          */
          ctx.save();

          ctx.globalAlpha = alpha;

          if (star.bright) {
            ctx.shadowBlur = 9;
            ctx.shadowColor = "#69cfff";
          } else {
            ctx.shadowBlur = 0;
          }

          ctx.fillStyle = star.bright
            ? "#d7f3ff"
            : "#a9d5ff";

          ctx.beginPath();

          ctx.arc(
            x,
            y,
            star.r,
            0,
            Math.PI * 2
          );

          ctx.fill();

          ctx.restore();
        }

        /*
          🌠 Slow downward movement
        */
        star.y += star.speed;

        if (star.y > height + 5) {
          star.y = -5;
          star.x = Math.random() * width;
        }
      }

      raf = requestAnimationFrame(draw);
    };

    resize();

    window.addEventListener("resize", resize);
    window.addEventListener(
      "pointermove",
      handleMouseMove,
      { passive: true }
    );

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);

      window.removeEventListener(
        "resize",
        resize
      );

      window.removeEventListener(
        "pointermove",
        handleMouseMove
      );
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      className={`star-field ${className}`}
      aria-hidden="true"
    />
  );
}