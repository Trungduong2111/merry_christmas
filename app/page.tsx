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
      const c3 = document.querySelector("#c3") as HTMLCanvasElement;

      if (!c || !c2 || !c3) return;

      const ctx = c.getContext("2d")!;
      const ctx2 = c2.getContext("2d")!;
      const ctx3 = c3.getContext("2d")!;

      const cw = (c.width = 4000);
      const ch = (c.height = 4000);
      c2.width = c2.height = 4000;
      c3.width = c3.height = 4000;

      const T = Math.PI * 2;

      const arr: any[] = [];
      const arr2: any[] = [];
      const m = { x: cw / 2, y: 0 };

      // Star properties
      const star = {
        x: cw / 2,
        y: 600,
        size: 100,
        rotation: 0,
        glow: 1,
        spikes: 5,
        outerRadius: 100,
        innerRadius: 40
      };

      // Gift boxes around the tree
      const gifts = [
        { x: 800, y: 3200, width: 180, height: 180, color: "#FF6B6B", ribbon: "#FFD700", label: "MERRY", rotation: 0.1 },
        { x: 3200, y: 3200, width: 180, height: 180, color: "#4ECDC4", ribbon: "#FF6B6B", label: "XMAS", rotation: -0.1 },
        { x: 600, y: 3400, width: 220, height: 150, color: "#FFD166", ribbon: "#06D6A0", label: "JOY", rotation: 0.05 },
        { x: 3400, y: 3400, width: 220, height: 150, color: "#118AB2", ribbon: "#EF476F", label: "2024", rotation: -0.05 },
        { x: 1000, y: 3600, width: 150, height: 200, color: "#EF476F", ribbon: "#118AB2", label: "🎁", rotation: 0.08 },
        { x: 3000, y: 3600, width: 150, height: 200, color: "#06D6A0", ribbon: "#FFD166", label: "🎄", rotation: -0.08 },
      ];

      // Christmas balls decorations
      const balls = [
        { x: 1200, y: 2800, radius: 60, color: "#FF6B6B", glow: 0, rotation: 0 },
        { x: 2800, y: 2800, radius: 60, color: "#4ECDC4", glow: 0, rotation: 0 },
        { x: 900, y: 3000, radius: 50, color: "#FFD166", glow: 0, rotation: 0 },
        { x: 3100, y: 3000, radius: 50, color: "#118AB2", glow: 0, rotation: 0 },
        { x: 1400, y: 3200, radius: 70, color: "#EF476F", glow: 0, rotation: 0 },
        { x: 2600, y: 3200, radius: 70, color: "#06D6A0", glow: 0, rotation: 0 },
      ];

      // Merry Christmas text
      const merryText = {
        x: cw / 2,
        y: 400,
        text: "MERRY CHRISTMAS",
        fontSize: 120,
        color: "#FFD700",
        glow: 0
      };

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

      ctx.fillStyle = ctx2.fillStyle = ctx3.fillStyle = "#fff";
      ctx.strokeStyle = "rgba(255,255,255,0.05)";
      ctx.globalCompositeOperation = "lighter";
      ctx3.globalCompositeOperation = "lighter";

      // Draw gift box
      function drawGift(gift: any) {
        ctx3.save();
        ctx3.translate(gift.x, gift.y);
        ctx3.rotate(gift.rotation);
        
        // Gift box shadow
        ctx3.shadowColor = gift.color;
        ctx3.shadowBlur = 20;
        
        // Gift box
        ctx3.fillStyle = gift.color;
        ctx3.fillRect(-gift.width/2, -gift.height/2, gift.width, gift.height);
        
        // Ribbon vertical
        ctx3.fillStyle = gift.ribbon;
        ctx3.fillRect(-15, -gift.height/2, 30, gift.height);
        
        // Ribbon horizontal
        ctx3.fillRect(-gift.width/2, -15, gift.width, 30);
        
        // Ribbon bow
        ctx3.beginPath();
        ctx3.arc(0, 0, 20, 0, T);
        ctx3.fill();
        
        // Bow loops
        ctx3.beginPath();
        ctx3.arc(-25, 0, 15, 0, T);
        ctx3.arc(25, 0, 15, 0, T);
        ctx3.arc(0, -25, 15, 0, T);
        ctx3.arc(0, 25, 15, 0, T);
        ctx3.fill();
        
        // Gift label
        ctx3.save();
        ctx3.shadowColor = "#000";
        ctx3.shadowBlur = 10;
        ctx3.fillStyle = "#fff";
        ctx3.font = `bold ${gift.width/5}px Arial`;
        ctx3.textAlign = "center";
        ctx3.textBaseline = "middle";
        ctx3.fillText(gift.label, 0, 0);
        ctx3.restore();
        
        ctx3.restore();
      }

      // Draw Christmas ball
      function drawBall(ball: any) {
        ctx3.save();
        ctx3.translate(ball.x, ball.y);
        
        // Ball glow
        ctx3.shadowColor = ball.color;
        ctx3.shadowBlur = 20 + ball.glow * 10;
        
        // Ball body
        ctx3.fillStyle = ball.color;
        ctx3.beginPath();
        ctx3.arc(0, 0, ball.radius, 0, T);
        ctx3.fill();
        
        // Ball highlight
        ctx3.fillStyle = "rgba(255, 255, 255, 0.3)";
        ctx3.beginPath();
        ctx3.arc(-ball.radius/3, -ball.radius/3, ball.radius/3, 0, T);
        ctx3.fill();
        
        // Ball cap
        ctx3.fillStyle = "#FFD700";
        ctx3.beginPath();
        ctx3.arc(0, -ball.radius - 5, 8, 0, T);
        ctx3.fill();
        
        // Cap ring
        ctx3.beginPath();
        ctx3.rect(-10, -ball.radius - 10, 20, 5);
        ctx3.fill();
        
        ctx3.restore();
      }

      // Draw text with glow
      function drawText() {
        ctx3.save();
        ctx3.translate(merryText.x, merryText.y);
        
        // Text shadow/glow
        ctx3.shadowColor = merryText.color;
        ctx3.shadowBlur = 30 + merryText.glow * 20;
        
        // Text
        ctx3.fillStyle = merryText.color;
        ctx3.font = `bold ${merryText.fontSize}px 'Arial Black', sans-serif`;
        ctx3.textAlign = "center";
        ctx3.textBaseline = "middle";
        ctx3.fillText(merryText.text, 0, 0);
        
        // Additional sparkles
        for (let i = 0; i < 12; i++) {
          const angle = (Date.now() * 0.001 + i * 0.5) % (Math.PI * 2);
          const dist = 150 + Math.sin(Date.now() * 0.002 + i) * 50;
          const x = Math.cos(angle) * dist;
          const y = Math.sin(angle) * dist * 0.3;
          
          ctx3.beginPath();
          ctx3.arc(x, y, 5 + Math.sin(Date.now() * 0.005 + i) * 3, 0, T);
          ctx3.fillStyle = i % 3 === 0 ? "#FF6B6B" : i % 3 === 1 ? "#4ECDC4" : "#FFD700";
          ctx3.fill();
        }
        
        ctx3.restore();
      }

      // Draw star function
      function drawStar() {
        const rotation = (Math.PI / 2) * 3;
        const step = Math.PI / star.spikes;
        
        ctx.save();
        ctx.translate(star.x, star.y);
        ctx.rotate(star.rotation);
        
        // Star glow effect
        ctx.shadowColor = "#FFD700";
        ctx.shadowBlur = 20 * star.glow;
        
        ctx.beginPath();
        ctx.moveTo(0, 0 - star.outerRadius);
        
        for (let i = 0; i < star.spikes; i++) {
          // Outer point
          const x = Math.cos(rotation + (i * 2 * step)) * star.outerRadius;
          const y = Math.sin(rotation + (i * 2 * step)) * star.outerRadius;
          ctx.lineTo(x, y);
          
          // Inner point
          const ix = Math.cos(rotation + (i * 2 * step) + step) * star.innerRadius;
          const iy = Math.sin(rotation + (i * 2 * step) + step) * star.innerRadius;
          ctx.lineTo(ix, iy);
        }
        
        ctx.lineTo(0, 0 - star.outerRadius);
        ctx.closePath();
        
        // Fill star
        ctx.fillStyle = "#FFD700";
        ctx.fill();
        
        // Add sparkle effect
        ctx.beginPath();
        for (let i = 0; i < 8; i++) {
          const angle = (i * Math.PI) / 4;
          const length = 20 + Math.sin(Date.now() * 0.002 + i) * 10;
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos(angle) * length, Math.sin(angle) * length);
        }
        ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
        ctx.lineWidth = 3;
        ctx.stroke();
        
        ctx.restore();
      }

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
        ctx3.clearRect(0, 0, cw, ch);
        
        // Update animations
        star.rotation += 0.002;
        star.glow = 0.8 + Math.sin(Date.now() * 0.003) * 0.2;
        merryText.glow = Math.sin(Date.now() * 0.002) * 0.5 + 0.5;
        
        // Update gift rotations
        gifts.forEach((gift, i) => {
          gift.rotation = 0.1 * Math.sin(Date.now() * 0.001 + i);
        });
        
        // Update ball glows
        balls.forEach((ball, i) => {
          ball.glow = Math.sin(Date.now() * 0.003 + i) * 0.5 + 0.5;
          ball.rotation += 0.01;
        });
        
        // Draw decorations
        gifts.forEach(drawGift);
        balls.forEach(drawBall);
        drawText();
        drawStar();
        
        // Draw tree and snow
        arr.forEach(drawDot);
        arr2.forEach(drawSnow);
      }

      // GSAP ticker
      renderTicker = gsap.ticker.add(render);

      // Intro animations
      gsap.from(star, {
        duration: 1.5,
        scale: 0,
        rotation: Math.PI * 2,
        ease: "back.out(1.7)",
        delay: 0.5
      });

      // Animate gifts
      gifts.forEach((gift, i) => {
        gsap.from(gift, {
          duration: 1,
          scale: 0,
          rotation: Math.PI * 2,
          ease: "back.out(1.7)",
          delay: 0.7 + i * 0.1
        });
      });

      // Animate balls
      balls.forEach((ball, i) => {
        gsap.from(ball, {
          duration: 1,
          scale: 0,
          y: "+=200",
          ease: "bounce.out",
          delay: 0.8 + i * 0.1
        });
      });

      // Animate text
      gsap.from(merryText, {
        duration: 1.2,
        y: "-=100",
        opacity: 0,
        ease: "power3.out",
        delay: 0.3
      });

      // Star pulsing animation
      gsap.to(star, {
        duration: 1.5,
        scale: 1.1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Text glowing animation
      gsap.to(merryText, {
        duration: 2,
        fontSize: 130,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

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
        <canvas id="c3"></canvas>
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
          opacity: 0.6;
        }

        #c3 {
          width: auto;
          height: 100%;
          opacity: 0.9;
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
          #c3 {
            width: 100%;
            height: auto;
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
          background: linear-gradient(180deg, #0a0a2a 0%, #1a1a3a 100%);
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}