"use client";

import { useEffect, useRef } from "react";

export default function Christmas() {
  const canvasRef3 = useRef<HTMLCanvasElement>(null);
  const animationId = useRef<number | null>(null);

  useEffect(() => {
    let gsap: any = null;
    let renderTicker: any = null;

    import("gsap").then((gsapModule) => {
      gsap = gsapModule.gsap;

      const c = document.querySelector("#c") as HTMLCanvasElement;
      const c2 = document.querySelector("#c2") as HTMLCanvasElement;
      const c3 = canvasRef3.current;

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

      // Fireworks
      const fireworks: any[] = [];
      
      const createFirework = (x: number, y: number) => {
        const colors = ['#FF6B6B', '#4ECDC4', '#FFD166', '#EF476F', '#118AB2', '#06D6A0', '#FFD700'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        const particles = [];
        const particleCount = 50 + Math.floor(Math.random() * 50);
        
        for (let i = 0; i < particleCount; i++) {
          const angle = Math.random() * T;
          const speed = 3 + Math.random() * 5;
          particles.push({
            x: 0,
            y: 0,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 1,
            decay: 0.01 + Math.random() * 0.02,
            size: 2 + Math.random() * 4,
            color: color,
            gravity: 0.1
          });
        }
        
        fireworks.push({
          x,
          y,
          particles,
          created: Date.now()
        });
      };

      // Text
      const text = {
        x: cw / 2,
        y: 400,
        text: "MERRY CHRISTMAS",
        fontSize: 120,
        color: "#FFD700",
        glow: 0,
        shadow: 0
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

      ctx.fillStyle = ctx2.fillStyle = "#fff";
      ctx.strokeStyle = "rgba(255,255,255,0.05)";
      ctx.globalCompositeOperation = "lighter";
      ctx3.globalCompositeOperation = "lighter";

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

      // Draw fireworks
      function drawFireworks() {
        const now = Date.now();
        
        fireworks.forEach((firework, idx) => {
          firework.particles = firework.particles.filter(particle => {
            // Update particle
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += particle.gravity;
            particle.life -= particle.decay;
            
            // Draw if alive
            if (particle.life > 0) {
              ctx3.globalAlpha = particle.life;
              ctx3.fillStyle = particle.color;
              ctx3.beginPath();
              ctx3.arc(
                firework.x + particle.x,
                firework.y + particle.y,
                particle.size * particle.life,
                0,
                T
              );
              ctx3.fill();
              return true;
            }
            return false;
          });
          
          // Remove empty fireworks
          if (firework.particles.length === 0) {
            fireworks.splice(idx, 1);
          }
        });
        
        ctx3.globalAlpha = 1;
      }

      // Draw text
      function drawText() {
        ctx3.save();
        
        // Text glow effect
        ctx3.shadowColor = text.color;
        ctx3.shadowBlur = 30 + text.glow * 50;
        
        // Draw text
        ctx3.fillStyle = text.color;
        ctx3.font = `bold ${text.fontSize}px 'Arial Black', sans-serif`;
        ctx3.textAlign = "center";
        ctx3.textBaseline = "middle";
        ctx3.fillText(text.text, text.x, text.y);
        
        // Add sparkles around text
        for (let i = 0; i < 12; i++) {
          const angle = (Date.now() * 0.001 + i * 0.5) % T;
          const distance = 200 + Math.sin(Date.now() * 0.002 + i) * 50;
          const x = text.x + Math.cos(angle) * distance;
          const y = text.y + Math.sin(angle) * 0.3 * distance;
          
          ctx3.beginPath();
          ctx3.arc(x, y, 5 + Math.sin(Date.now() * 0.005 + i) * 3, 0, T);
          ctx3.fillStyle = i % 3 === 0 ? "#FF6B6B" : i % 3 === 1 ? "#4ECDC4" : "#FFD700";
          ctx3.fill();
        }
        
        ctx3.restore();
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
        text.glow = 0.5 + Math.sin(Date.now() * 0.002) * 0.5;
        
        // Random firework creation
        if (Math.random() < 0.02 && fireworks.length < 5) {
          const x = 500 + Math.random() * (cw - 1000);
          const y = 500 + Math.random() * (ch - 1000);
          createFirework(x, y);
        }
        
        // Draw all elements
        drawFireworks();
        drawText();
        drawStar();
        arr.forEach(drawDot);
        arr2.forEach(drawSnow);
      }

      // GSAP ticker
      renderTicker = gsap.ticker.add(render);

      // Intro animation for star
      gsap.from(star, {
        duration: 1.5,
        scale: 0,
        rotation: Math.PI * 2,
        ease: "back.out(1.7)",
        delay: 0.5
      });

      // Text intro animation
      gsap.from(text, {
        duration: 1.2,
        y: -200,
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
      gsap.to(text, {
        duration: 2,
        fontSize: 130,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Intro
      gsap.from(arr, { duration: 1, dot: 0, ease: "back.out(9)", stagger: -0.0009 });
      gsap.from(m, { duration: 1.5, y: ch * 1.2, ease: "power2.inOut" });

      // Create initial fireworks
      setTimeout(() => {
        createFirework(cw * 0.3, ch * 0.4);
        createFirework(cw * 0.7, ch * 0.3);
      }, 2000);

      // Cleanup
      return () => {
        c.removeEventListener("pointermove", onMove);
        gsap.ticker.remove(renderTicker);
        if (animationId.current) {
          cancelAnimationFrame(animationId.current);
        }
      };
    });
  }, []);

  return (
    <div>
      <div id="fixed-bg">
        <canvas id="c2"></canvas>
        <canvas ref={canvasRef3} id="c3"></canvas>
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