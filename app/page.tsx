"use client";

import { useEffect } from "react";

export default function Christmas() {
  useEffect(() => {
    let gsap: any = null;
    let renderTicker: any = null;

    import("gsap").then((gsapModule) => {
      gsap = gsapModule.gsap;

      const c = document.querySelector("#c") as HTMLCanvasElement;
      const c2 = document.querySelector("#c2") as HTMLCanvasElement;

      if (!c || !c2) return;

      const ctx = c.getContext("2d")!;
      const ctx2 = c2.getContext("2d")!;

      const cw = (c.width = 4000);
      const ch = (c.height = 4000);
      c2.width = c2.height = 4000;

      const T = Math.PI * 2;

      const arr: any[] = [];
      const arr2: any[] = [];
      const m = { x: cw / 2, y: 0 };

      const xTo = gsap.quickTo(m, "x", { duration: 1.5, ease: "expo" });
      const yTo = gsap.quickTo(m, "y", { duration: 1.5, ease: "expo" });

      // Mouse Move
      const onMove = (e: PointerEvent) => {
        const rect = c.getBoundingClientRect();
        const mx = (e.clientX - rect.left) * (cw / rect.width);
        const my = (e.clientY - rect.top) * (ch / rect.height);
        xTo(mx);
        yTo(my);
      };

      c.addEventListener("pointermove", onMove);

      // Create particles
      for (let i = 0; i < 999; i++) {
        arr.push({
          i,
          cx: cw / 2,
          cy: gsap.utils.mapRange(0, 999, 600, 3700)(i),
          r: i < 900 ? gsap.utils.mapRange(0, 999, 3, 770)(i) : 50,
          dot: 9,
          prog: 0.25,
          s: 1,
        });

        const d = 99;
        arr[i].t = gsap.timeline({ repeat: -1 })
          .to(arr[i], { duration: d, prog: "+=1", ease: "slow(0.3, 0.4)" })
          .to(arr[i], { duration: d / 2, s: 0.15, repeat: 1, yoyo: true, ease: "power3.inOut" }, 0)
          .seek(Math.random() * d);

        arr2.push({
          x: cw * Math.random(),
          y: -9,
          i,
          s: 3 + 5 * Math.random(),
          a: 0.1 + 0.5 * Math.random(),
        });

        arr2[i].t = gsap.to(arr2[i], {
          ease: "none",
          y: ch,
          repeat: -1,
        })
          .seek(Math.random() * 99)
          .timeScale(arr2[i].s / 700);
      }

      ctx.fillStyle = ctx2.fillStyle = "#fff";
      ctx.strokeStyle = "rgba(255,255,255,0.05)";
      ctx.globalCompositeOperation = "lighter";

      // Draw tree dots
      function drawDot(c: any) {
        const angle = c.prog * T;
        const vs = 0.2;
        const x = Math.cos(angle) * c.r + c.cx;
        const y = Math.sin(angle) * c.r * vs + c.cy;
        const d = Math.sqrt((x - m.x) ** 2 + (y - m.y) ** 2);
        const ms = gsap.utils.clamp(0.07, 1, d / cw);

        ctx.beginPath();
        ctx.arc(x, y, (c.dot * c.s) / 2 / ms, 0, T);
        ctx.fill();
        ctx.lineWidth = (c.dot * c.s * 2) / ms;
        ctx.stroke();
      }

      // Draw snow
      function drawSnow(c: any) {
        const ys = gsap.utils.interpolate(1.3, 0.1, c.y / ch);
        ctx2.save();
        ctx2.translate(c.x, c.y);
        ctx2.rotate(50 * c.t.progress());
        ctx2.beginPath();
        ctx2.arc(
          gsap.utils.interpolate(-55, 55, c.i / 999),
          gsap.utils.interpolate(-25, 25, c.i / 999),
          c.s * ys,
          0,
          T
        );
        ctx2.globalAlpha = c.a * ys;
        ctx2.fill();
        ctx2.restore();
      }

      // Render loop
      function render() {
        ctx.clearRect(0, 0, cw, ch);
        ctx2.clearRect(0, 0, cw, ch);
        arr.forEach(drawDot);
        arr2.forEach(drawSnow);
      }

      // GSAP ticker
      renderTicker = gsap.ticker.add(render);

      // Intro
      gsap.from(arr, { duration: 1, dot: 0, ease: "back.out(9)", stagger: -0.0009 });
      gsap.from(m, { duration: 1.5, y: ch * 1.2, ease: "power2.inOut" });

      // Cleanup
      return () => {
        c.removeEventListener("pointermove", onMove);
        gsap.ticker.remove(renderTicker);
      };
    });
  }, []);

  return (
    <div>
      <div id="fixed-bg">
        <canvas id="c2"></canvas>
        <canvas id="c"></canvas>
      </div>

      <style jsx>{`
        #fixed-bg {
          position: fixed;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 100vw;
          height: 100vh;
        }

        canvas {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          aspect-ratio: 1;
        }

        #c {
          width: auto;
          height: 100%;
        }

        #c2 {
          width: 100%;
          height: auto;
        }

        @media (max-aspect-ratio: 1) {
          #c {
            width: 100%;
            height: auto;
          }
          #c2 {
            width: auto;
            height: 100%;
          }
        }
      `}</style>

      {/* Global CSS */}
      <style jsx global>{`
        html,
        body {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          background: #000;
        }
      `}</style>
    </div>
  );
}
